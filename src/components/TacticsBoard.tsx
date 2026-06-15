import { useMemo, useState } from 'react';
import { clubs, formations, players } from '../data/mockData';
import type { BoardMode, BoardPlayer } from '../types';
import { ControlPanel } from './ControlPanel';
import { Pitch } from './Pitch';

const buildBoardPlayers = (selectedIds: string[], formationId: string): BoardPlayer[] => {
  const formation = formations.find((item) => item.id === formationId) ?? formations[0];
  // Formation coordinates are percentages from the top-left of the pitch. The selected player order is mapped onto the 11 tactical roles.
  return selectedIds.slice(0, 11).map((playerId, index) => ({ playerId, x: formation.coordinates[index]?.x ?? 50, y: formation.coordinates[index]?.y ?? 50, role: formation.coordinates[index]?.role ?? 'SUB' }));
};

export function TacticsBoard() {
  const [mode, setMode] = useState<BoardMode>('club');
  const [clubId, setClubId] = useState('');
  const [formationId, setFormationId] = useState(formations[0].id);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [boardPlayers, setBoardPlayers] = useState<BoardPlayer[]>([]);

  const selectedPlayers = useMemo(() => players.filter((player) => selectedIds.includes(player.id)), [selectedIds]);
  const applyFormation = (ids = selectedIds, nextFormationId = formationId) => setBoardPlayers(buildBoardPlayers(ids, nextFormationId));

  const togglePlayer = (playerId: string) => {
    setSelectedIds((current) => {
      const next = current.includes(playerId) ? current.filter((id) => id !== playerId) : current.length < 11 ? [...current, playerId] : current;
      setBoardPlayers(buildBoardPlayers(next, formationId));
      return next;
    });
  };

  const changeFormation = (id: string) => { setFormationId(id); applyFormation(selectedIds, id); };
  const changeMode = (nextMode: BoardMode) => { setMode(nextMode); setSelectedIds([]); setBoardPlayers([]); };
  const changeClub = (nextClubId: string) => { setClubId(nextClubId); setSelectedIds([]); setBoardPlayers([]); };

  return <main className="app-shell">
    <ControlPanel mode={mode} clubs={clubs} players={players} clubId={clubId} formationId={formationId} selectedIds={selectedIds} onModeChange={changeMode} onClubChange={changeClub} onFormationChange={changeFormation} onTogglePlayer={togglePlayer} onReset={() => applyFormation()} onClear={() => { setSelectedIds([]); setBoardPlayers([]); }} />
    <section className="board-area"><div className="board-top"><div><p className="eyebrow">{mode === 'best' ? 'Mixed clubs' : 'Single club'}</p><h2>{selectedPlayers.length === 11 ? 'Starting XI ready' : 'Select 11 players'}</h2></div><span>{formations.find((formation) => formation.id === formationId)?.name}</span></div><Pitch boardPlayers={boardPlayers} players={players} clubs={clubs} mode={mode} onMovePlayer={(playerId, x, y) => setBoardPlayers((current) => current.map((item) => item.playerId === playerId ? { ...item, x, y } : item))} /></section>
  </main>;
}
