import type { Club, NationalTeam, Player } from '../types';

interface Props { players: Player[]; clubs: Club[]; nationalTeams: NationalTeam[]; selectedIds: string[]; disabled?: boolean; onToggle: (playerId: string) => void; }

export function PlayerSelector({ players, clubs, nationalTeams, selectedIds, disabled, onToggle }: Props) {
  if (!players.length) return <p className="empty">Choose a club, league, or national team to show available players.</p>;
  const clubName = (id: string) => clubs.find((club) => club.id === id)?.name ?? 'Unknown club';
  const nationalTeamName = (id: string) => nationalTeams.find((team) => team.id === id)?.name ?? 'Unknown nation';
  return <div className="player-list">{players.map((player) => {
    const selected = selectedIds.includes(player.id);
    return <button key={player.id} className={`player-row ${selected ? 'selected' : ''}`} disabled={disabled && !selected} onClick={() => onToggle(player.id)}>
      <span className="number">{player.shirtNumber}</span><span><strong>{player.name}</strong><small>{player.position} · {clubName(player.clubId)} · {nationalTeamName(player.nationalTeamId)}</small></span><span>{selected ? '✓' : '+'}</span>
    </button>;
  })}</div>;
}
