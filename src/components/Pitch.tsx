import { useCallback, useRef, useState } from 'react';
import type { CSSProperties, PointerEvent } from 'react';
import type { BoardMode, BoardPlayer, CameraAngle, CameraView, Club, Player } from '../types';
import { clampCameraView } from '../utils/camera';
import { clampPitchCoordinate } from '../utils/formation';
import { PlayerMarker } from './PlayerMarker';

interface Props { boardPlayers: BoardPlayer[]; players: Player[]; clubs: Club[]; mode: BoardMode; cameraAngle: CameraAngle; cameraView: CameraView; onCameraViewChange: (view: CameraView) => void; onMovePlayer: (playerId: string, x: number, y: number) => void; }

export function Pitch({ boardPlayers, players, clubs, mode, cameraAngle, cameraView, onCameraViewChange, onMovePlayer }: Props) {
  const pitchRef = useRef<HTMLDivElement>(null);
  const cameraDragRef = useRef<{ x: number; y: number; view: CameraView } | null>(null);
  const [draggingId, setDraggingId] = useState<string | null>(null);
  const [isRotatingCamera, setIsRotatingCamera] = useState(false);

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
    event.stopPropagation();
    event.currentTarget.setPointerCapture(event.pointerId);
    setDraggingId(playerId);
    movePlayerFromPointer(playerId, event.clientX, event.clientY);
  };

  const startCameraRotate = (event: PointerEvent<HTMLDivElement>) => {
    if ((event.target as HTMLElement).closest('.marker-wrap')) return;
    event.preventDefault();
    event.currentTarget.setPointerCapture(event.pointerId);
    cameraDragRef.current = { x: event.clientX, y: event.clientY, view: cameraView };
    setIsRotatingCamera(true);
  };

  const updateCameraRotate = (event: PointerEvent<HTMLDivElement>) => {
    if (draggingId) movePlayerFromPointer(draggingId, event.clientX, event.clientY);
    const drag = cameraDragRef.current;
    if (!drag) return;
    const nextView = clampCameraView({
      ...drag.view,
      rotation: drag.view.rotation + (event.clientX - drag.x) * .35,
      tilt: drag.view.tilt - (event.clientY - drag.y) * .18,
    });
    onCameraViewChange(nextView);
  };

  const stopPointerAction = () => {
    setDraggingId(null);
    cameraDragRef.current = null;
    setIsRotatingCamera(false);
  };

  const rotationPressure = Math.abs(Math.sin((cameraView.rotation * Math.PI) / 180));
  const cameraFit = Math.max(.62, 1 - rotationPressure * .28 - (cameraView.tilt / 72) * .08);
  const pitchStyle = {
    '--camera-transform': `rotateX(${cameraView.tilt}deg) rotateZ(${cameraView.rotation}deg) scale(${cameraView.zoom * cameraFit})`,
  } as CSSProperties;

  return <div className={`pitch-stage camera-${cameraAngle} ${isRotatingCamera ? 'rotating-camera' : ''}`}><div ref={pitchRef} className="pitch" style={pitchStyle} onPointerDown={startCameraRotate} onPointerMove={updateCameraRotate} onPointerUp={stopPointerAction} onPointerCancel={stopPointerAction}>
    <div className="halfway" /><div className="center-circle" /><div className="box box-top" /><div className="box box-bottom" /><div className="six six-top" /><div className="six six-bottom" />
    {!boardPlayers.length && <div className="pitch-empty"><h2>Your tactics board is empty</h2><p>Select 11 players and pick a formation to create your XI.</p></div>}
    {boardPlayers.map((boardPlayer) => {
      const player = players.find((item) => item.id === boardPlayer.playerId);
      if (!player) return null;
      return <PlayerMarker key={boardPlayer.playerId} player={player} club={clubs.find((club) => club.id === player.clubId)} mode={mode} x={boardPlayer.x} y={boardPlayer.y} role={boardPlayer.role} isDragging={draggingId === boardPlayer.playerId} onPointerDown={startDrag} />;
    })}
  </div></div>;
}
