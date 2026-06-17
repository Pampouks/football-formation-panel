import { useMemo, useState } from 'react';
import { clubs, formations, leagues, nationalTeams, players } from '../data/mockData';
import type { BoardMode, BoardPlayer, CameraAngle, CameraView, FormationCoordinate, PlayerPoolType } from '../types';
import { loadBoardState, saveBoardState } from '../utils/boardStorage';
import { exportBoardImage } from '../utils/exportBoardImage';
import { cameraPresets, clampCameraView } from '../utils/camera';
import { buildBoardPlayers, clampPitchCoordinate } from '../utils/formation';
import { getPlayersForPool } from '../utils/playerPools';
import { BoardToolsPanel } from './BoardToolsPanel';
import { ControlPanel } from './ControlPanel';
import { Pitch } from './Pitch';
import { PositionPanel } from './PositionPanel';

const cloneFormationCoordinates = (formationId: string): FormationCoordinate[] => (formations.find((formation) => formation.id === formationId)?.coordinates ?? formations[0].coordinates).map((coordinate) => ({ ...coordinate }));
const kitColorFromHue = (hue: number) => `hsl(${hue} 82% 58%)`;
const readImageFile = (file: File) => new Promise<string>((resolve, reject) => {
  const reader = new FileReader();
  reader.onload = () => resolve(String(reader.result));
  reader.onerror = reject;
  reader.readAsDataURL(file);
});

export function TacticsBoard() {
  const [mode, setMode] = useState<BoardMode>('club');
  const [playerPoolType, setPlayerPoolType] = useState<PlayerPoolType>('club');
  const [selectedPoolId, setSelectedPoolId] = useState('');
  const [formationId, setFormationId] = useState(formations[0].id);
  const [formationCoordinates, setFormationCoordinates] = useState<FormationCoordinate[]>(cloneFormationCoordinates(formations[0].id));
  const [activeRoleIndex, setActiveRoleIndex] = useState<number | null>(null);
  const [cameraAngle, setCameraAngle] = useState<CameraAngle>('top');
  const [cameraView, setCameraView] = useState<CameraView>(cameraPresets.top);
  const [markerScale, setMarkerScale] = useState(1);
  const [kitHue, setKitHue] = useState(169);
  const [customBoardImageUrl, setCustomBoardImageUrl] = useState('');
  const [customKitImageUrl, setCustomKitImageUrl] = useState('');
  const [boardPlayers, setBoardPlayers] = useState<BoardPlayer[]>([]);
  const [status, setStatus] = useState('');

  const selectedIds = useMemo(() => boardPlayers.map((player) => player.playerId), [boardPlayers]);
  const selectedPlayers = useMemo(() => players.filter((player) => selectedIds.includes(player.id)), [selectedIds]);
  const currentFormationName = formations.find((formation) => formation.id === formationId)?.name ?? formations[0].name;
  const kitColor = kitColorFromHue(kitHue);
  const clearSelection = () => { setBoardPlayers([]); setActiveRoleIndex(null); };
  const makeBoardPlayer = (playerId: string, roleIndex: number, coordinates = formationCoordinates): BoardPlayer => {
    const coordinate = coordinates[roleIndex] ?? coordinates[0];
    return { playerId, role: coordinate.role, x: coordinate.x, y: coordinate.y };
  };

  const resetPositionsToSpots = () => {
    setBoardPlayers((current) => current.map((boardPlayer) => {
      const coordinate = formationCoordinates.find((item) => item.role === boardPlayer.role);
      return coordinate ? { ...boardPlayer, x: coordinate.x, y: coordinate.y } : boardPlayer;
    }));
  };

  const togglePlayer = (playerId: string) => {
    setBoardPlayers((current) => {
      if (current.some((boardPlayer) => boardPlayer.playerId === playerId)) {
        setStatus('Player removed from the board.');
        return current.filter((boardPlayer) => boardPlayer.playerId !== playerId);
      }
      const roleIsFree = (index: number) => !current.some((boardPlayer) => boardPlayer.role === formationCoordinates[index]?.role);
      const suggestedIndex = activeRoleIndex !== null && roleIsFree(activeRoleIndex) ? activeRoleIndex : formationCoordinates.findIndex((_, index) => roleIsFree(index));
      if (suggestedIndex < 0 || current.length >= 11) {
        setStatus('All formation spots are filled. Remove a player or clear the board first.');
        return current;
      }
      setStatus(`Player assigned to ${formationCoordinates[suggestedIndex].role}. Pick or drag another suggested spot to customize the XI.`);
      const nextOpenIndex = formationCoordinates.findIndex((_, index) => index > suggestedIndex && roleIsFree(index));
      setActiveRoleIndex(nextOpenIndex >= 0 ? nextOpenIndex : null);
      return [...current, makeBoardPlayer(playerId, suggestedIndex)];
    });
  };

  const changeFormation = (id: string) => {
    const nextCoordinates = cloneFormationCoordinates(id);
    const ids = selectedIds.slice(0, 11);
    setFormationId(id);
    setFormationCoordinates(nextCoordinates);
    setBoardPlayers(buildBoardPlayers(ids, id));
    setActiveRoleIndex(null);
    setStatus('Formation applied with fresh suggested spots.');
  };

  const moveFormationSpot = (index: number, x: number, y: number) => {
    const nextX = clampPitchCoordinate(x, 4);
    const nextY = clampPitchCoordinate(y, 4);
    setFormationCoordinates((current) => current.map((coordinate, coordinateIndex) => coordinateIndex === index ? { ...coordinate, x: nextX, y: nextY } : coordinate));
    const role = formationCoordinates[index]?.role;
    if (role) setBoardPlayers((current) => current.map((boardPlayer) => boardPlayer.role === role ? { ...boardPlayer, x: nextX, y: nextY } : boardPlayer));
  };

  const uploadBoardImage = async (file: File) => {
    setCustomBoardImageUrl(await readImageFile(file));
    setStatus('Custom board image uploaded.');
  };

  const uploadKitImage = async (file: File) => {
    setCustomKitImageUrl(await readImageFile(file));
    setStatus('Custom player kit uploaded.');
  };

  const clearCustomImages = () => {
    setCustomBoardImageUrl('');
    setCustomKitImageUrl('');
    setStatus('Custom board and kit uploads cleared.');
  };

  const changeCameraAngle = (angle: CameraAngle) => { setCameraAngle(angle); setCameraView(cameraPresets[angle]); setStatus(`${angle[0].toUpperCase()}${angle.slice(1)} camera angle selected.`); };
  const changeCameraView = (view: CameraView) => { setCameraAngle('isometric'); setCameraView(clampCameraView(view)); setStatus('Camera adjusted.'); };
  const resetCamera = () => changeCameraAngle('top');
  const changeMode = (nextMode: BoardMode) => { setMode(nextMode); clearSelection(); setStatus(`${nextMode === 'best' ? 'Best XI' : 'Club XI'} mode selected.`); };
  const changePoolType = (nextPoolType: PlayerPoolType) => { setPlayerPoolType(nextPoolType); setSelectedPoolId(''); clearSelection(); setStatus(`${nextPoolType === 'nationalTeam' ? 'National teams' : nextPoolType === 'league' ? 'Leagues' : 'Clubs'} player pool selected.`); };
  const changePool = (nextPoolId: string) => { setSelectedPoolId(nextPoolId); clearSelection(); setStatus('Player pool changed. Pick a suggested spot, then pick your XI.'); };

  const saveBoard = () => {
    saveBoardState({ mode, playerPoolType, selectedPoolId, formationId, formationCoordinates, activeRoleIndex, cameraAngle, cameraView, markerScale, kitHue, customBoardImageUrl, customKitImageUrl, selectedIds, boardPlayers });
    setStatus('Board saved to this browser.');
  };

  const loadBoard = () => {
    const saved = loadBoardState();
    if (!saved) { setStatus('No saved board found.'); return; }
    setMode(saved.mode);
    setPlayerPoolType(saved.playerPoolType ?? 'club');
    setSelectedPoolId(saved.selectedPoolId ?? saved.clubId ?? '');
    setFormationId(saved.formationId);
    setFormationCoordinates(saved.formationCoordinates ?? cloneFormationCoordinates(saved.formationId));
    setActiveRoleIndex(saved.activeRoleIndex ?? null);
    setCameraAngle(saved.cameraAngle ?? 'top');
    setCameraView(saved.cameraView ?? cameraPresets[saved.cameraAngle ?? 'top']);
    setMarkerScale(saved.markerScale ?? 1);
    setKitHue(saved.kitHue ?? 169);
    setCustomBoardImageUrl(saved.customBoardImageUrl ?? '');
    setCustomKitImageUrl(saved.customKitImageUrl ?? '');
    setBoardPlayers(saved.boardPlayers);
    setStatus(`Loaded saved board from ${new Date(saved.savedAt).toLocaleString()}.`);
  };

  const loadExampleTeam = () => {
    const exampleIds = players.filter((player) => player.clubId === 'pampouks-xi').slice(0, 11).map((player) => player.id);
    setMode('club');
    setPlayerPoolType('club');
    setSelectedPoolId('pampouks-xi');
    setBoardPlayers(exampleIds.map((id, index) => makeBoardPlayer(id, index)));
    setActiveRoleIndex(null);
    setStatus('Loaded Pampouks Example XI so you can test the board quickly.');
  };

  const selectedPoolPlayers = getPlayersForPool(playerPoolType, selectedPoolId, players, clubs);
  const poolHasSelectedPlayers = selectedIds.every((id) => selectedPoolPlayers.some((player) => player.id === id));

  return <main className="app-shell">
    <header className="app-header"><div><p className="eyebrow">Created by Pampouks</p><h1>Football Tactics Board</h1></div><p>Build a responsive XI from clubs, leagues, or national teams, then drag markers into your own shape.</p></header>
    <ControlPanel mode={mode} playerPoolType={playerPoolType} selectedPoolId={selectedPoolId} clubs={clubs} leagues={leagues} nationalTeams={nationalTeams} players={players} selectedIds={selectedIds} onModeChange={changeMode} onPoolTypeChange={changePoolType} onPoolChange={changePool} onLoadExampleTeam={loadExampleTeam} onTogglePlayer={togglePlayer} />
    <PositionPanel formationId={formationId} formationCoordinates={formationCoordinates} boardPlayers={boardPlayers} players={players} activeRoleIndex={activeRoleIndex} onFormationChange={changeFormation} onSpotSelect={setActiveRoleIndex} />
    <section className="board-area panel-card"><div className="board-top"><div><p className="eyebrow">{mode === 'best' ? 'Mixed clubs' : playerPoolType === 'nationalTeam' ? 'National team' : playerPoolType === 'league' ? 'League selection' : 'Single club'}</p><h2>{selectedPlayers.length === 11 ? 'Starting XI ready' : activeRoleIndex !== null ? `Fill ${formationCoordinates[activeRoleIndex]?.role}` : 'Select a suggested spot'}</h2></div><span>{currentFormationName}</span></div><Pitch boardPlayers={boardPlayers} formationCoordinates={formationCoordinates} activeRoleIndex={activeRoleIndex} players={players} clubs={clubs} mode={mode} cameraAngle={cameraAngle} cameraView={cameraView} markerScale={markerScale} kitColor={kitColor} customBoardImageUrl={customBoardImageUrl} customKitImageUrl={customKitImageUrl} onCameraViewChange={changeCameraView} onSelectFormationSpot={setActiveRoleIndex} onMoveFormationSpot={moveFormationSpot} onMovePlayer={(playerId, x, y) => setBoardPlayers((current) => current.map((item) => item.playerId === playerId ? { ...item, x, y } : item))} /></section>
    <BoardToolsPanel cameraAngle={cameraAngle} cameraView={cameraView} selectedCount={selectedIds.length} status={poolHasSelectedPlayers ? status : 'Saved selection includes players outside the current pool.'} markerScale={markerScale} kitHue={kitHue} kitColor={kitColor} hasCustomBoard={Boolean(customBoardImageUrl)} hasCustomKit={Boolean(customKitImageUrl)} onBoardImageUpload={uploadBoardImage} onKitImageUpload={uploadKitImage} onClearCustomImages={clearCustomImages} onMarkerScaleChange={setMarkerScale} onKitHueChange={setKitHue} onCameraAngleChange={changeCameraAngle} onCameraViewChange={changeCameraView} onCameraReset={resetCamera} onReset={() => { resetPositionsToSpots(); setStatus('Positions reset to suggested spot locations.'); }} onClear={() => { clearSelection(); setStatus('Board cleared.'); }} onSave={saveBoard} onLoad={loadBoard} onExport={() => exportBoardImage({ boardPlayers, players, clubs, mode, formationName: currentFormationName, markerScale, kitColor, customBoardImageUrl, customKitImageUrl })} />
  </main>;
}
