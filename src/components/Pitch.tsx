import { useCallback, useRef, useState } from 'react';
import type { CSSProperties, PointerEvent } from 'react';
import type { BoardMode, BoardPlayer, CameraAngle, CameraView, Club, FormationCoordinate, Player } from '../types';
import { clampCameraView } from '../utils/camera';
import { clampPitchCoordinate } from '../utils/formation';
import { PlayerMarker } from './PlayerMarker';

interface Props { boardPlayers: BoardPlayer[]; formationCoordinates: FormationCoordinate[]; activeRoleIndex: number | null; players: Player[]; clubs: Club[]; mode: BoardMode; cameraAngle: CameraAngle; cameraView: CameraView; markerScale: number; kitColor: string; customBoardImageUrl?: string; customKitImageUrl?: string; onCameraViewChange: (view: CameraView) => void; onMovePlayer: (playerId: string, x: number, y: number) => void; onSelectFormationSpot: (index: number) => void; onMoveFormationSpot: (index: number, x: number, y: number) => void; }

export function Pitch({ boardPlayers, formationCoordinates, activeRoleIndex, players, clubs, mode, cameraAngle, cameraView, markerScale, kitColor, customBoardImageUrl, customKitImageUrl, onCameraViewChange, onMovePlayer, onSelectFormationSpot, onMoveFormationSpot }: Props) {
  const pitchRef = useRef<HTMLDivElement>(null);
  const cameraDragRef = useRef<{ x: number; y: number; view: CameraView } | null>(null);
  const spotDragRef = useRef<number | null>(null);
  const [draggingId, setDraggingId] = useState<string | null>(null);
  const [draggingSpotIndex, setDraggingSpotIndex] = useState<number | null>(null);
  const [isRotatingCamera, setIsRotatingCamera] = useState(false);

  const pointerToPitchPosition = (clientX: number, clientY: number, padding = 4) => {
    const rect = pitchRef.current?.getBoundingClientRect();
    if (!rect) return null;
    return {
      x: clampPitchCoordinate(((clientX - rect.left) / rect.width) * 100, padding),
      y: clampPitchCoordinate(((clientY - rect.top) / rect.height) * 100, padding),
    };
  };

  const movePlayerFromPointer = useCallback((playerId: string, clientX: number, clientY: number) => {
    const rect = pitchRef.current?.getBoundingClientRect();
    if (!rect) return;
    const markerRadiusPercent = Math.max(3.8, Math.min(6, (34 * markerScale / Math.min(rect.width, rect.height)) * 100));
    const position = pointerToPitchPosition(clientX, clientY, markerRadiusPercent);
    if (position) onMovePlayer(playerId, position.x, position.y);
  }, [markerScale, onMovePlayer]);

  const startDrag = (playerId: string, event: PointerEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    event.currentTarget.setPointerCapture(event.pointerId);
    setDraggingId(playerId);
    movePlayerFromPointer(playerId, event.clientX, event.clientY);
  };

  const startSpotDrag = (index: number, event: PointerEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();
    event.currentTarget.setPointerCapture(event.pointerId);
    spotDragRef.current = index;
    setDraggingSpotIndex(index);
    onSelectFormationSpot(index);
    const position = pointerToPitchPosition(event.clientX, event.clientY, 4);
    if (position) onMoveFormationSpot(index, position.x, position.y);
  };

  const startCameraRotate = (event: PointerEvent<HTMLDivElement>) => {
    if ((event.target as HTMLElement).closest('.marker-wrap, .formation-spot')) return;
    event.preventDefault();
    event.currentTarget.setPointerCapture(event.pointerId);
    cameraDragRef.current = { x: event.clientX, y: event.clientY, view: cameraView };
    setIsRotatingCamera(true);
  };

  const updateCameraRotate = (event: PointerEvent<HTMLDivElement>) => {
    if (draggingId) movePlayerFromPointer(draggingId, event.clientX, event.clientY);
    if (spotDragRef.current !== null) {
      const position = pointerToPitchPosition(event.clientX, event.clientY, 4);
      if (position) onMoveFormationSpot(spotDragRef.current, position.x, position.y);
    }
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
    spotDragRef.current = null;
    setDraggingSpotIndex(null);
    cameraDragRef.current = null;
    setIsRotatingCamera(false);
  };

  const rotationPressure = Math.abs(Math.sin((cameraView.rotation * Math.PI) / 180));
  const cameraFit = Math.max(.62, 1 - rotationPressure * .28 - (cameraView.tilt / 72) * .08);
  const pitchStyle = {
    '--camera-transform': `rotateX(${cameraView.tilt}deg) rotateZ(${cameraView.rotation}deg) scale(${cameraView.zoom * cameraFit})`,
    '--kit-color': kitColor,
    '--board-image': customBoardImageUrl ? `url(${customBoardImageUrl})` : undefined,
  } as CSSProperties;

  return <div className={`pitch-stage camera-${cameraAngle} ${isRotatingCamera ? 'rotating-camera' : ''}`}><div ref={pitchRef} className={`pitch ${customBoardImageUrl ? 'custom-board' : ''}`} style={pitchStyle} onPointerDown={startCameraRotate} onPointerMove={updateCameraRotate} onPointerUp={stopPointerAction} onPointerCancel={stopPointerAction}>
    <div className="halfway" /><div className="center-circle" /><div className="box box-top" /><div className="box box-bottom" /><div className="six six-top" /><div className="six six-bottom" />
    {!boardPlayers.length && <div className="pitch-empty"><h2>Your tactics board is empty</h2><p>Select a suggested spot, then pick a player to fill it.</p></div>}
    {formationCoordinates.map((coordinate, index) => {
      const assigned = boardPlayers.find((item) => item.role === coordinate.role);
      const player = assigned ? players.find((item) => item.id === assigned.playerId) : undefined;
      return <button key={`${coordinate.role}-${index}`} className={`formation-spot ${activeRoleIndex === index ? 'active' : ''} ${assigned ? 'filled' : ''} ${draggingSpotIndex === index ? 'dragging' : ''}`} style={{ left: `${coordinate.x}%`, top: `${coordinate.y}%` }} onClick={(event) => { event.stopPropagation(); onSelectFormationSpot(index); }} onPointerDown={(event) => startSpotDrag(index, event)} title="Click to target this role. Drag to customize this spot."><span>{coordinate.role}</span>{player && <small>{player.shirtNumber}</small>}</button>;
    })}
    {boardPlayers.map((boardPlayer) => {
      const player = players.find((item) => item.id === boardPlayer.playerId);
      if (!player) return null;
      return <PlayerMarker key={boardPlayer.playerId} player={player} club={clubs.find((club) => club.id === player.clubId)} mode={mode} x={boardPlayer.x} y={boardPlayer.y} role={boardPlayer.role} isDragging={draggingId === boardPlayer.playerId} markerScale={markerScale} kitColor={kitColor} kitImageUrl={customKitImageUrl} onPointerDown={startDrag} />;
    })}
  </div></div>;
}
