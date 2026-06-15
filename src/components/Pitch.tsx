import type { DragEvent } from 'react';
import type { BoardMode, BoardPlayer, Club, Player } from '../types';
import { PlayerMarker } from './PlayerMarker';

interface Props { boardPlayers: BoardPlayer[]; players: Player[]; clubs: Club[]; mode: BoardMode; onMovePlayer: (playerId: string, x: number, y: number) => void; }

export function Pitch({ boardPlayers, players, clubs, mode, onMovePlayer }: Props) {
  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const playerId = event.dataTransfer.getData('text/plain');
    const rect = event.currentTarget.getBoundingClientRect();
    const x = Math.min(96, Math.max(4, ((event.clientX - rect.left) / rect.width) * 100));
    const y = Math.min(96, Math.max(4, ((event.clientY - rect.top) / rect.height) * 100));
    onMovePlayer(playerId, x, y);
  };

  return <div className="pitch" onDragOver={(event) => event.preventDefault()} onDrop={handleDrop}>
    <div className="halfway" /><div className="center-circle" /><div className="box box-top" /><div className="box box-bottom" /><div className="six six-top" /><div className="six six-bottom" />
    {!boardPlayers.length && <div className="pitch-empty"><h2>Your tactics board is empty</h2><p>Select 11 players and pick a formation to create your XI.</p></div>}
    {boardPlayers.map((boardPlayer) => {
      const player = players.find((item) => item.id === boardPlayer.playerId);
      if (!player) return null;
      return <PlayerMarker key={boardPlayer.playerId} player={player} club={clubs.find((club) => club.id === player.clubId)} mode={mode} x={boardPlayer.x} y={boardPlayer.y} role={boardPlayer.role} onDragStart={() => undefined} />;
    })}
  </div>;
}
