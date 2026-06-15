import { useMemo, useState } from 'react';
import { clubs, formations, leagues, nationalTeams, players } from '../data/mockData';
import type { BoardMode, BoardPlayer, PlayerPoolType } from '../types';
import { loadBoardState, saveBoardState } from '../utils/boardStorage';
import { exportBoardImage } from '../utils/exportBoardImage';
import { buildBoardPlayers } from '../utils/formation';
import { getPlayersForPool } from '../utils/playerPools';
import { ControlPanel } from './ControlPanel';
import { Pitch } from './Pitch';

export function TacticsBoard() {
  const [mode, setMode] = useState<BoardMode>('club');
  const [playerPoolType, setPlayerPoolType] = useState<PlayerPoolType>('club');
  const [selectedPoolId, setSelectedPoolId] = useState('');
  const [formationId, setFormationId] = useState(formations[0].id);
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
  const changeMode = (nextMode: BoardMode) => { setMode(nextMode); clearSelection(); setStatus(`${nextMode === 'best' ? 'Best XI' : 'Club XI'} mode selected.`); };
  const changePoolType = (nextPoolType: PlayerPoolType) => { setPlayerPoolType(nextPoolType); setSelectedPoolId(''); clearSelection(); setStatus(`${nextPoolType === 'nationalTeam' ? 'National teams' : nextPoolType === 'league' ? 'Leagues' : 'Clubs'} player pool selected.`); };
  const changePool = (nextPoolId: string) => { setSelectedPoolId(nextPoolId); clearSelection(); setStatus('Player pool changed. Pick your XI.'); };

  const saveBoard = () => {
    saveBoardState({ mode, playerPoolType, selectedPoolId, formationId, selectedIds, boardPlayers });
    setStatus('Board saved to this browser.');
  };

  const loadBoard = () => {
    const saved = loadBoardState();
    if (!saved) { setStatus('No saved board found.'); return; }
    setMode(saved.mode);
    setPlayerPoolType(saved.playerPoolType ?? 'club');
    setSelectedPoolId(saved.selectedPoolId ?? saved.clubId ?? '');
    setFormationId(saved.formationId);
    setSelectedIds(saved.selectedIds);
    setBoardPlayers(saved.boardPlayers);
    setStatus(`Loaded saved board from ${new Date(saved.savedAt).toLocaleString()}.`);
  };

  const selectedPoolPlayers = getPlayersForPool(playerPoolType, selectedPoolId, players, clubs);
  const poolHasSelectedPlayers = selectedIds.every((id) => selectedPoolPlayers.some((player) => player.id === id));

  return <main className="app-shell">
    <ControlPanel mode={mode} playerPoolType={playerPoolType} selectedPoolId={selectedPoolId} clubs={clubs} leagues={leagues} nationalTeams={nationalTeams} players={players} formationId={formationId} selectedIds={selectedIds} status={poolHasSelectedPlayers ? status : 'Saved selection includes players outside the current pool.'} onModeChange={changeMode} onPoolTypeChange={changePoolType} onPoolChange={changePool} onFormationChange={changeFormation} onTogglePlayer={togglePlayer} onReset={() => { applyFormation(); setStatus('Positions reset to formation defaults.'); }} onClear={() => { clearSelection(); setStatus('Board cleared.'); }} onSave={saveBoard} onLoad={loadBoard} onExport={() => exportBoardImage({ boardPlayers, players, clubs, mode, formationName: currentFormationName })} />
    <section className="board-area"><div className="board-top"><div><p className="eyebrow">{mode === 'best' ? 'Mixed clubs' : playerPoolType === 'nationalTeam' ? 'National team' : playerPoolType === 'league' ? 'League selection' : 'Single club'}</p><h2>{selectedPlayers.length === 11 ? 'Starting XI ready' : 'Select 11 players'}</h2></div><span>{currentFormationName}</span></div><Pitch boardPlayers={boardPlayers} players={players} clubs={clubs} mode={mode} onMovePlayer={(playerId, x, y) => setBoardPlayers((current) => current.map((item) => item.playerId === playerId ? { ...item, x, y } : item))} /></section>
  </main>;
}
