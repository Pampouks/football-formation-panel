import type { PointerEvent } from 'react';
import type { BoardMode, Club, Player } from '../types';

interface Props { player: Player; club?: Club; mode: BoardMode; x: number; y: number; role: string; isDragging: boolean; onPointerDown: (playerId: string, event: PointerEvent<HTMLDivElement>) => void; }
const initials = (name: string) => name.split(' ').map((part) => part[0]).join('').slice(0, 2).toUpperCase();

export function PlayerMarker({ player, club, mode, x, y, role, isDragging, onPointerDown }: Props) {
  const imageUrl = mode === 'best' ? club?.logoUrl : player.profileImageUrl;
  return <div className={`marker-wrap ${isDragging ? 'dragging' : ''}`} style={{ left: `${x}%`, top: `${y}%` }} onPointerDown={(event) => onPointerDown(player.id, event)}>
    <div className="marker">{imageUrl ? <img src={imageUrl} alt="" draggable={false} /> : <span>{initials(player.name)}</span>}</div>
    <div className="marker-label"><strong>{player.shirtNumber}</strong> {player.name.split(' ').slice(-1)[0]}<small>{role}</small></div>
  </div>;
}
