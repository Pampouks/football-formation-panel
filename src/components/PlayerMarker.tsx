import type { CSSProperties, PointerEvent } from 'react';
import type { BoardMode, Club, Player } from '../types';

interface Props { player: Player; club?: Club; mode: BoardMode; x: number; y: number; role: string; isDragging: boolean; markerScale: number; kitColor: string; kitImageUrl?: string; onPointerDown: (playerId: string, event: PointerEvent<HTMLDivElement>) => void; }
const initials = (name: string) => name.split(' ').map((part) => part[0]).join('').slice(0, 2).toUpperCase();

export function PlayerMarker({ player, club, mode, x, y, role, isDragging, markerScale, kitColor, kitImageUrl, onPointerDown }: Props) {
  const imageUrl = mode === 'best' ? club?.logoUrl : player.profileImageUrl;
  const style = { left: `${x}%`, top: `${y}%`, '--marker-scale': markerScale, '--kit-color': kitColor } as CSSProperties;
  return <div className={`marker-wrap ${isDragging ? 'dragging' : ''}`} style={style} onPointerDown={(event) => onPointerDown(player.id, event)}>
    <div className="marker">{kitImageUrl ? <><img src={kitImageUrl} alt="" draggable={false} /><span className="kit-number">{player.shirtNumber}</span></> : imageUrl ? <img src={imageUrl} alt="" draggable={false} /> : <span>{initials(player.name)}</span>}</div>
    <div className="marker-label"><strong>{player.shirtNumber}</strong> {player.name.split(' ').slice(-1)[0]}<small>{role}</small></div>
  </div>;
}
