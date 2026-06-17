import { useMemo, useState } from 'react';
import { clubs, formations, leagues, nationalTeams, players } from '../data/mockData';
import type { BoardMode, BoardPlayer, CameraAngle, CameraView, PlayerPoolType } from '../types';
import { loadBoardState, saveBoardState } from '../utils/boardStorage';
import { exportBoardImage } from '../utils/exportBoardImage';
import { cameraPresets, clampCameraView } from '../utils/camera';
import { buildBoardPlayers } from '../utils/formation';
import { getPlayersForPool } from '../utils/playerPools';
import { BoardToolsPanel } from './BoardToolsPanel';
import { ControlPanel } from './ControlPanel';
import { Pitch } from './Pitch';

export function TacticsBoard() {
  const [mode, setMode] = useState<BoardMode>('club');
  const [playerPoolType, setPlayerPoolType] = useState<PlayerPoolType>('club');
  const [selectedPoolId, setSelectedPoolId] = useState('');
  const [formationId, setFormationId] = useState(formations[0].id);
  const [cameraAngle, setCameraAngle] = useState<CameraAngle>('top');
  const [cameraView, setCameraView] = useState<CameraView>(cameraPresets.top);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [boardPlayers, setBoardPlayers] = useState<BoardPlayer[]>([]);
  const [status, setStatus] = useState('');

  const selectedPlayers = useMemo(() => players.filter((player) => selectedIds.includes(player.id)), [selectedIds]);
  const currentFormationName = formations.find((formation) => formation.id === formationId)?.name ?? formations[0].name;
  const applyFormation = (ids = selectedIds, nextFormationId = formationId) => setBoardPlayers(buildBoardPlayers(ids, nextFormationId));
  const clearSelection = () => { setSelectedIds([]); setBoardPlayers([]); };

  const togglePlayer = (playerId: string) => {
    setSelectedIds((current) => {
      const next = current.includes(playerId) ? current.filter((id) => id !== playerId) : current.length < 11 ? [...current, playerId] : current;
      setBoardPlayers(buildBoardPlayers(next, formationId));
      setStatus(next.length === 11 ? 'XI complete. Drag players to refine shape.' : 'Player selection updated.');
      return next;
    });
  };

  const changeFormation = (id: string) => { setFormationId(id); applyFormation(selectedIds, id); setStatus('Formation applied.'); };
  const changeCameraAngle = (angle: CameraAngle) => { setCameraAngle(angle); setCameraView(cameraPresets[angle]); setStatus(`${angle[0].toUpperCase()}${angle.slice(1)} camera angle selected.`); };
  const changeCameraView = (view: CameraView) => { setCameraAngle('isometric'); setCameraView(clampCameraView(view)); setStatus('Camera adjusted.'); };
  const resetCamera = () => changeCameraAngle('top');
  const changeMode = (nextMode: BoardMode) => { setMode(nextMode); clearSelection(); setStatus(`${nextMode === 'best' ? 'Best XI' : 'Club XI'} mode selected.`); };
  const changePoolType = (nextPoolType: PlayerPoolType) => { setPlayerPoolType(nextPoolType); setSelectedPoolId(''); clearSelection(); setStatus(`${nextPoolType === 'nationalTeam' ? 'National teams' : nextPoolType === 'league' ? 'Leagues' : 'Clubs'} player pool selected.`); };
  const changePool = (nextPoolId: string) => { setSelectedPoolId(nextPoolId); clearSelection(); setStatus('Player pool changed. Pick your XI.'); };

  const saveBoard = () => {
    saveBoardState({ mode, playerPoolType, selectedPoolId, formationId, cameraAngle, cameraView, selectedIds, boardPlayers });
    setStatus('Board saved to this browser.');
  };

  const loadBoard = () => {
    const saved = loadBoardState();
    if (!saved) { setStatus('No saved board found.'); return; }
    setMode(saved.mode);
    setPlayerPoolType(saved.playerPoolType ?? 'club');
    setSelectedPoolId(saved.selectedPoolId ?? saved.clubId ?? '');
    setFormationId(saved.formationId);
    setCameraAngle(saved.cameraAngle ?? 'top');
    setCameraView(saved.cameraView ?? cameraPresets[saved.cameraAngle ?? 'top']);
    setSelectedIds(saved.selectedIds);
    setBoardPlayers(saved.boardPlayers);
    setStatus(`Loaded saved board from ${new Date(saved.savedAt).toLocaleString()}.`);
  };


  const loadExampleTeam = () => {
    const exampleIds = players.filter((player) => player.clubId === 'pampouks-xi').slice(0, 11).map((player) => player.id);
    setMode('club');
    setPlayerPoolType('club');
    setSelectedPoolId('pampouks-xi');
    setSelectedIds(exampleIds);
    setBoardPlayers(buildBoardPlayers(exampleIds, formationId));
    setStatus('Loaded Pampouks Example XI so you can test the board quickly.');
  };

  const selectedPoolPlayers = getPlayersForPool(playerPoolType, selectedPoolId, players, clubs);
  const poolHasSelectedPlayers = selectedIds.every((id) => selectedPoolPlayers.some((player) => player.id === id));

  return <main className="app-shell">
    <header className="app-header"><div><p className="eyebrow">Created by Pampouks</p><h1>Football Tactics Board</h1></div><p>Build a responsive XI from clubs, leagues, or national teams, then drag markers into your own shape.</p></header>
    <ControlPanel mode={mode} playerPoolType={playerPoolType} selectedPoolId={selectedPoolId} clubs={clubs} leagues={leagues} nationalTeams={nationalTeams} players={players} formationId={formationId} selectedIds={selectedIds} onModeChange={changeMode} onPoolTypeChange={changePoolType} onPoolChange={changePool} onFormationChange={changeFormation} onLoadExampleTeam={loadExampleTeam} onTogglePlayer={togglePlayer} />
    <section className="board-area panel-card"><div className="board-top"><div><p className="eyebrow">{mode === 'best' ? 'Mixed clubs' : playerPoolType === 'nationalTeam' ? 'National team' : playerPoolType === 'league' ? 'League selection' : 'Single club'}</p><h2>{selectedPlayers.length === 11 ? 'Starting XI ready' : 'Select 11 players'}</h2></div><span>{currentFormationName}</span></div><Pitch boardPlayers={boardPlayers} players={players} clubs={clubs} mode={mode} cameraAngle={cameraAngle} cameraView={cameraView} onCameraViewChange={changeCameraView} onMovePlayer={(playerId, x, y) => setBoardPlayers((current) => current.map((item) => item.playerId === playerId ? { ...item, x, y } : item))} /></section>
    <BoardToolsPanel cameraAngle={cameraAngle} cameraView={cameraView} selectedCount={selectedIds.length} status={poolHasSelectedPlayers ? status : 'Saved selection includes players outside the current pool.'} onCameraAngleChange={changeCameraAngle} onCameraViewChange={changeCameraView} onCameraReset={resetCamera} onReset={() => { applyFormation(); setStatus('Positions reset to formation defaults.'); }} onClear={() => { clearSelection(); setStatus('Board cleared.'); }} onSave={saveBoard} onLoad={loadBoard} onExport={() => exportBoardImage({ boardPlayers, players, clubs, mode, formationName: currentFormationName })} />
  </main>;
}
