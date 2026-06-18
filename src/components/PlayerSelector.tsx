import type { Club, NationalTeam, Player } from '../types';
import { positionMatchesRole } from '../utils/positionMatching';

interface Props { players: Player[]; clubs: Club[]; nationalTeams: NationalTeam[]; selectedIds: string[]; preferredRole?: string; disabled?: boolean; onToggle: (playerId: string) => void; }

export function PlayerSelector({ players, clubs, nationalTeams, selectedIds, preferredRole, disabled, onToggle }: Props) {
  if (!players.length) return <p className="empty">Select a source.</p>;
  const clubName = (id: string) => clubs.find((club) => club.id === id)?.name ?? 'Unknown club';
  const nationalTeamName = (id: string) => nationalTeams.find((team) => team.id === id)?.name ?? 'Unknown nation';
  return <div className="player-list">{players.map((player) => {
    const selected = selectedIds.includes(player.id);
    const preferred = preferredRole ? positionMatchesRole(player.position, preferredRole) : false;
    return <button key={player.id} className={`player-row ${selected ? 'selected' : ''} ${preferred ? 'preferred' : ''}`} disabled={disabled && !selected} onClick={() => onToggle(player.id)}>
      <span className="number">{player.shirtNumber}</span><span><strong>{player.name}</strong><small>{player.position} · {clubName(player.clubId)} · {nationalTeamName(player.nationalTeamId)}</small></span><span>{selected ? '✓' : '+'}</span>
    </button>;
  })}</div>;
}
