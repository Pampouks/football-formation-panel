import type { BoardMode, Club, Player } from '../types';

interface Props { player: Player; club?: Club; mode: BoardMode; x: number; y: number; role: string; onDragStart?: (playerId: string) => void; }
const initials = (name: string) => name.split(' ').map((part) => part[0]).join('').slice(0, 2).toUpperCase();

export function PlayerMarker({ player, club, mode, x, y, role, onDragStart }: Props) {
  const imageUrl = mode === 'best' ? club?.logoUrl : player.profileImageUrl;
  return <div className="marker-wrap" style={{ left: `${x}%`, top: `${y}%` }} draggable onDragStart={(event) => { event.dataTransfer.setData('text/plain', player.id); onDragStart?.(player.id); }}>
    <div className="marker">{imageUrl ? <img src={imageUrl} alt="" /> : <span>{initials(player.name)}</span>}</div>
    <div className="marker-label"><strong>{player.shirtNumber}</strong> {player.name.split(' ').at(-1)}<small>{role}</small></div>
  </div>;
}
