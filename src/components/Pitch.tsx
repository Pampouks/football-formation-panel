import { useCallback, useRef, useState } from 'react';
import type { PointerEvent } from 'react';
import type { BoardMode, BoardPlayer, Club, Player } from '../types';
import { clampPitchCoordinate } from '../utils/formation';
import { PlayerMarker } from './PlayerMarker';

interface Props { boardPlayers: BoardPlayer[]; players: Player[]; clubs: Club[]; mode: BoardMode; onMovePlayer: (playerId: string, x: number, y: number) => void; }

export function Pitch({ boardPlayers, players, clubs, mode, onMovePlayer }: Props) {
  const pitchRef = useRef<HTMLDivElement>(null);
  const [draggingId, setDraggingId] = useState<string | null>(null);

  const movePlayerFromPointer = useCallback((playerId: string, clientX: number, clientY: number) => {
    const rect = pitchRef.current?.getBoundingClientRect();
    if (!rect) return;
    const markerRadiusPercent = Math.max(3.8, Math.min(6, (34 / Math.min(rect.width, rect.height)) * 100));
    const x = clampPitchCoordinate(((clientX - rect.left) / rect.width) * 100, markerRadiusPercent);
    const y = clampPitchCoordinate(((clientY - rect.top) / rect.height) * 100, markerRadiusPercent);
    onMovePlayer(playerId, x, y);
  }, [onMovePlayer]);

  const startDrag = (playerId: string, event: PointerEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.currentTarget.setPointerCapture(event.pointerId);
    setDraggingId(playerId);
    movePlayerFromPointer(playerId, event.clientX, event.clientY);
  };

  return <div ref={pitchRef} className="pitch" onPointerMove={(event) => draggingId && movePlayerFromPointer(draggingId, event.clientX, event.clientY)} onPointerUp={() => setDraggingId(null)} onPointerCancel={() => setDraggingId(null)}>
    <div className="halfway" /><div className="center-circle" /><div className="box box-top" /><div className="box box-bottom" /><div className="six six-top" /><div className="six six-bottom" />
    {!boardPlayers.length && <div className="pitch-empty"><h2>Your tactics board is empty</h2><p>Select 11 players and pick a formation to create your XI.</p></div>}
    {boardPlayers.map((boardPlayer) => {
      const player = players.find((item) => item.id === boardPlayer.playerId);
      if (!player) return null;
      return <PlayerMarker key={boardPlayer.playerId} player={player} club={clubs.find((club) => club.id === player.clubId)} mode={mode} x={boardPlayer.x} y={boardPlayer.y} role={boardPlayer.role} isDragging={draggingId === boardPlayer.playerId} onPointerDown={startDrag} />;
    })}
  </div>;
}
