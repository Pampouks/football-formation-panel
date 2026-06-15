import type { Club, Player } from '../types';

interface Props { players: Player[]; clubs: Club[]; selectedIds: string[]; disabled?: boolean; onToggle: (playerId: string) => void; }

export function PlayerSelector({ players, clubs, selectedIds, disabled, onToggle }: Props) {
  if (!players.length) return <p className="empty">Select a club to show its squad, or switch to Best XI to mix clubs.</p>;
  const clubName = (id: string) => clubs.find((club) => club.id === id)?.name ?? 'Unknown';
  return <div className="player-list">{players.map((player) => {
    const selected = selectedIds.includes(player.id);
    return <button key={player.id} className={`player-row ${selected ? 'selected' : ''}`} disabled={disabled && !selected} onClick={() => onToggle(player.id)}>
      <span className="number">{player.shirtNumber}</span><span><strong>{player.name}</strong><small>{player.position} · {clubName(player.clubId)}</small></span><span>{selected ? '✓' : '+'}</span>
    </button>;
  })}</div>;
}
