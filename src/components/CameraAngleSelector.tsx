import type { CameraAngle, CameraView } from '../types';

const cameraAngles: Array<{ id: CameraAngle; label: string; description: string }> = [
  { id: 'top', label: 'Top', description: 'Classic flat tactics-board view.' },
  { id: 'broadcast', label: 'Broadcast', description: 'Tilted TV-style match angle.' },
  { id: 'isometric', label: 'Isometric', description: 'Diagonal 3D coaching-board view.' },
  { id: 'sideline', label: 'Sideline', description: 'Low touchline perspective.' },
];

interface Props {
  selectedAngle: CameraAngle;
  cameraView: CameraView;
  onChange: (angle: CameraAngle) => void;
  onNudge: (delta: Partial<CameraView>) => void;
  onReset: () => void;
}

export function CameraAngleSelector({ selectedAngle, cameraView, onChange, onNudge, onReset }: Props) {
  return <div className="camera-field"><div className="selection-header"><strong>Camera angle</strong><span>{Math.round(cameraView.tilt)}° tilt · {Math.round(cameraView.rotation)}° rotate</span></div><div className="camera-grid">{cameraAngles.map((angle) => <button key={angle.id} className={selectedAngle === angle.id ? 'active' : ''} title={angle.description} onClick={() => onChange(angle.id)}>{angle.label}</button>)}</div><div className="camera-controls" aria-label="Camera controls"><button onClick={() => onNudge({ rotation: cameraView.rotation - 10 })}>↺ Rotate</button><button onClick={() => onNudge({ rotation: cameraView.rotation + 10 })}>Rotate ↻</button><button onClick={() => onNudge({ tilt: cameraView.tilt + 5 })}>Tilt +</button><button onClick={() => onNudge({ tilt: cameraView.tilt - 5 })}>Tilt −</button><button onClick={() => onNudge({ zoom: cameraView.zoom + .05 })}>Zoom +</button><button onClick={() => onNudge({ zoom: cameraView.zoom - .05 })}>Zoom −</button><button onClick={onReset}>Reset</button></div><p className="camera-hint">Tip: click and hold the pitch background, then drag to rotate the view.</p></div>;
}
