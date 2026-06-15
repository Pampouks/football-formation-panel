import { useMemo, useState } from 'react';
import { clubs, formations, players } from '../data/mockData';
import type { BoardMode, BoardPlayer } from '../types';
import { loadBoardState, saveBoardState } from '../utils/boardStorage';
import { exportBoardImage } from '../utils/exportBoardImage';
import { buildBoardPlayers } from '../utils/formation';
import { ControlPanel } from './ControlPanel';
import { Pitch } from './Pitch';

export function TacticsBoard() {
  const [mode, setMode] = useState<BoardMode>('club');
  const [clubId, setClubId] = useState('');
  const [formationId, setFormationId] = useState(formations[0].id);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [boardPlayers, setBoardPlayers] = useState<BoardPlayer[]>([]);
  const [status, setStatus] = useState('');

  const selectedPlayers = useMemo(() => players.filter((player) => selectedIds.includes(player.id)), [selectedIds]);
  const currentFormationName = formations.find((formation) => formation.id === formationId)?.name ?? formations[0].name;
  const applyFormation = (ids = selectedIds, nextFormationId = formationId) => setBoardPlayers(buildBoardPlayers(ids, nextFormationId));

  const togglePlayer = (playerId: string) => {
    setSelectedIds((current) => {
      const next = current.includes(playerId) ? current.filter((id) => id !== playerId) : current.length < 11 ? [...current, playerId] : current;
      setBoardPlayers(buildBoardPlayers(next, formationId));
      setStatus(next.length === 11 ? 'XI complete. Drag players to refine shape.' : 'Player selection updated.');
      return next;
    });
  };

  const changeFormation = (id: string) => { setFormationId(id); applyFormation(selectedIds, id); setStatus('Formation applied.'); };
  const changeMode = (nextMode: BoardMode) => { setMode(nextMode); setSelectedIds([]); setBoardPlayers([]); setStatus(`${nextMode === 'best' ? 'Best XI' : 'Club XI'} mode selected.`); };
  const changeClub = (nextClubId: string) => { setClubId(nextClubId); setSelectedIds([]); setBoardPlayers([]); setStatus('Club changed. Pick your XI.'); };

  const saveBoard = () => {
    saveBoardState({ mode, clubId, formationId, selectedIds, boardPlayers });
    setStatus('Board saved to this browser.');
  };

  const loadBoard = () => {
    const saved = loadBoardState();
    if (!saved) { setStatus('No saved board found.'); return; }
    setMode(saved.mode);
    setClubId(saved.clubId);
    setFormationId(saved.formationId);
    setSelectedIds(saved.selectedIds);
    setBoardPlayers(saved.boardPlayers);
    setStatus(`Loaded saved board from ${new Date(saved.savedAt).toLocaleString()}.`);
  };

  return <main className="app-shell">
    <ControlPanel mode={mode} clubs={clubs} players={players} clubId={clubId} formationId={formationId} selectedIds={selectedIds} status={status} onModeChange={changeMode} onClubChange={changeClub} onFormationChange={changeFormation} onTogglePlayer={togglePlayer} onReset={() => { applyFormation(); setStatus('Positions reset to formation defaults.'); }} onClear={() => { setSelectedIds([]); setBoardPlayers([]); setStatus('Board cleared.'); }} onSave={saveBoard} onLoad={loadBoard} onExport={() => exportBoardImage({ boardPlayers, players, clubs, mode, formationName: currentFormationName })} />
    <section className="board-area"><div className="board-top"><div><p className="eyebrow">{mode === 'best' ? 'Mixed clubs' : 'Single club'}</p><h2>{selectedPlayers.length === 11 ? 'Starting XI ready' : 'Select 11 players'}</h2></div><span>{currentFormationName}</span></div><Pitch boardPlayers={boardPlayers} players={players} clubs={clubs} mode={mode} onMovePlayer={(playerId, x, y) => setBoardPlayers((current) => current.map((item) => item.playerId === playerId ? { ...item, x, y } : item))} /></section>
  </main>;
}
