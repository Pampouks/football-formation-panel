import { useCallback, useEffect, useRef, useState } from 'react';
import type { CSSProperties, PointerEvent } from 'react';
import type { BoardMode, BoardPlayer, CameraAngle, CameraView, Club, FormationCoordinate, Player } from '../types';
import { clampCameraView } from '../utils/camera';
import { clampPitchCoordinate } from '../utils/formation';
import { PlayerMarker } from './PlayerMarker';

interface Props { boardPlayers: BoardPlayer[]; formationCoordinates: FormationCoordinate[]; activeRoleIndex: number | null; players: Player[]; clubs: Club[]; mode: BoardMode; cameraAngle: CameraAngle; cameraView: CameraView; markerScale: number; kitColor: string; customBoardImageUrl?: string; customKitImageUrl?: string; showPlayerLabels: boolean; pitchLineOpacity: number; cameraLocked: boolean; highlightedRoles: Set<string>; onCameraViewChange: (view: CameraView) => void; onMovePlayer: (playerId: string, x: number, y: number) => void; onSelectFormationSpot: (index: number) => void; onMoveFormationSpot: (index: number, x: number, y: number) => void; }

export function Pitch({ boardPlayers, formationCoordinates, activeRoleIndex, players, clubs, mode, cameraAngle, cameraView, markerScale, kitColor, customBoardImageUrl, customKitImageUrl, showPlayerLabels, pitchLineOpacity, cameraLocked, highlightedRoles, onCameraViewChange, onMovePlayer, onSelectFormationSpot, onMoveFormationSpot }: Props) {
  const pitchRef = useRef<HTMLDivElement>(null);
  const cameraDragRef = useRef<{ x: number; y: number; view: CameraView } | null>(null);
  const spotDragRef = useRef<number | null>(null);
  const playerFrameRef = useRef<number | null>(null);
  const spotFrameRef = useRef<number | null>(null);
  const cameraFrameRef = useRef<number | null>(null);
  const pendingPlayerMoveRef = useRef<{ playerId: string; x: number; y: number } | null>(null);
  const pendingSpotMoveRef = useRef<{ index: number; x: number; y: number } | null>(null);
  const pendingCameraViewRef = useRef<CameraView | null>(null);
  const [draggingId, setDraggingId] = useState<string | null>(null);
  const [draggingSpotIndex, setDraggingSpotIndex] = useState<number | null>(null);
  const [isRotatingCamera, setIsRotatingCamera] = useState(false);


  const cancelScheduledUpdates = () => {
    for (const frameRef of [playerFrameRef, spotFrameRef, cameraFrameRef]) {
      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
      frameRef.current = null;
    }
    pendingPlayerMoveRef.current = null;
    pendingSpotMoveRef.current = null;
    pendingCameraViewRef.current = null;
  };

  const flushScheduledUpdates = () => {
    for (const frameRef of [playerFrameRef, spotFrameRef, cameraFrameRef]) {
      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
      frameRef.current = null;
    }
    const playerMove = pendingPlayerMoveRef.current;
    const spotMove = pendingSpotMoveRef.current;
    const cameraViewMove = pendingCameraViewRef.current;
    pendingPlayerMoveRef.current = null;
    pendingSpotMoveRef.current = null;
    pendingCameraViewRef.current = null;
    if (playerMove) onMovePlayer(playerMove.playerId, playerMove.x, playerMove.y);
    if (spotMove) onMoveFormationSpot(spotMove.index, spotMove.x, spotMove.y);
    if (cameraViewMove) onCameraViewChange(cameraViewMove);
  };

  useEffect(() => cancelScheduledUpdates, []);

  const schedulePlayerMove = (playerId: string, x: number, y: number) => {
    pendingPlayerMoveRef.current = { playerId, x, y };
    if (playerFrameRef.current !== null) return;
    playerFrameRef.current = requestAnimationFrame(() => {
      playerFrameRef.current = null;
      const move = pendingPlayerMoveRef.current;
      pendingPlayerMoveRef.current = null;
      if (move) onMovePlayer(move.playerId, move.x, move.y);
    });
  };

  const scheduleSpotMove = (index: number, x: number, y: number) => {
    pendingSpotMoveRef.current = { index, x, y };
    if (spotFrameRef.current !== null) return;
    spotFrameRef.current = requestAnimationFrame(() => {
      spotFrameRef.current = null;
      const move = pendingSpotMoveRef.current;
      pendingSpotMoveRef.current = null;
      if (move) onMoveFormationSpot(move.index, move.x, move.y);
    });
  };

  const scheduleCameraView = (view: CameraView) => {
    pendingCameraViewRef.current = view;
    if (cameraFrameRef.current !== null) return;
    cameraFrameRef.current = requestAnimationFrame(() => {
      cameraFrameRef.current = null;
      const nextView = pendingCameraViewRef.current;
      pendingCameraViewRef.current = null;
      if (nextView) onCameraViewChange(nextView);
    });
  };

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
    if (position) schedulePlayerMove(playerId, position.x, position.y);
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
    if (position) scheduleSpotMove(index, position.x, position.y);
  };

  const startCameraRotate = (event: PointerEvent<HTMLDivElement>) => {
    if (cameraLocked || (event.target as HTMLElement).closest('.marker-wrap, .formation-spot')) return;
    event.preventDefault();
    event.currentTarget.setPointerCapture(event.pointerId);
    cameraDragRef.current = { x: event.clientX, y: event.clientY, view: cameraView };
    setIsRotatingCamera(true);
  };

  const updateCameraRotate = (event: PointerEvent<HTMLDivElement>) => {
    if (draggingId) movePlayerFromPointer(draggingId, event.clientX, event.clientY);
    if (spotDragRef.current !== null) {
      const position = pointerToPitchPosition(event.clientX, event.clientY, 4);
      if (position) scheduleSpotMove(spotDragRef.current, position.x, position.y);
    }
    const drag = cameraDragRef.current;
    if (!drag) return;
    const nextView = clampCameraView({
      ...drag.view,
      rotation: drag.view.rotation + (event.clientX - drag.x) * .35,
      tilt: drag.view.tilt - (event.clientY - drag.y) * .18,
    });
    scheduleCameraView(nextView);
  };

  const stopPointerAction = () => {
    setDraggingId(null);
    spotDragRef.current = null;
    setDraggingSpotIndex(null);
    cameraDragRef.current = null;
    setIsRotatingCamera(false);
    flushScheduledUpdates();
  };

  const rotationPressure = Math.abs(Math.sin((cameraView.rotation * Math.PI) / 180));
  const cameraFit = Math.max(.62, 1 - rotationPressure * .28 - (cameraView.tilt / 72) * .08);
  const pitchStyle = {
    '--camera-transform': `rotateX(${cameraView.tilt}deg) rotateZ(${cameraView.rotation}deg) scale(${cameraView.zoom * cameraFit})`,
    '--kit-color': kitColor,
    '--board-image': customBoardImageUrl ? `url(${customBoardImageUrl})` : undefined,
    '--line-opacity': pitchLineOpacity,
  } as CSSProperties;

  return <div className={`pitch-stage camera-${cameraAngle} ${isRotatingCamera ? 'rotating-camera' : ''}`}><div ref={pitchRef} className={`pitch ${customBoardImageUrl ? 'custom-board' : ''}`} style={pitchStyle} onPointerDown={startCameraRotate} onPointerMove={updateCameraRotate} onPointerUp={stopPointerAction} onPointerCancel={stopPointerAction}>
    <div className="halfway" /><div className="center-circle" /><div className="box box-top" /><div className="box box-bottom" /><div className="six six-top" /><div className="six six-bottom" />
    {!boardPlayers.length && <div className="pitch-empty"><h2>Empty board</h2></div>}
    {formationCoordinates.map((coordinate, index) => {
      const assigned = boardPlayers.find((item) => item.role === coordinate.role);
      const player = assigned ? players.find((item) => item.id === assigned.playerId) : undefined;
      return <button key={`${coordinate.role}-${index}`} className={`formation-spot ${activeRoleIndex === index ? 'active' : ''} ${assigned ? 'filled' : ''} ${highlightedRoles.has(coordinate.role) ? 'preferred' : ''} ${draggingSpotIndex === index ? 'dragging' : ''}`} style={{ left: `${coordinate.x}%`, top: `${coordinate.y}%` }} onClick={(event) => { event.stopPropagation(); onSelectFormationSpot(index); }} onPointerDown={(event) => startSpotDrag(index, event)} title="Click to target this role. Drag to customize this spot."><span>{coordinate.role}</span>{player && <small>{player.shirtNumber}</small>}</button>;
    })}
    {boardPlayers.map((boardPlayer) => {
      const player = players.find((item) => item.id === boardPlayer.playerId);
      if (!player) return null;
      return <PlayerMarker key={boardPlayer.playerId} player={player} club={clubs.find((club) => club.id === player.clubId)} mode={mode} x={boardPlayer.x} y={boardPlayer.y} role={boardPlayer.role} isDragging={draggingId === boardPlayer.playerId} markerScale={markerScale} kitColor={kitColor} kitImageUrl={customKitImageUrl} showLabel={showPlayerLabels} onPointerDown={startDrag} />;
    })}
  </div></div>;
}
