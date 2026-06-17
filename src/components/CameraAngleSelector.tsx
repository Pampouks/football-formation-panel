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
  onViewChange: (view: CameraView) => void;
  onReset: () => void;
}

export function CameraAngleSelector({ selectedAngle, cameraView, onChange, onViewChange, onReset }: Props) {
  return <div className="camera-field"><div className="selection-header"><strong>Camera angle</strong><span>{Math.round(cameraView.tilt)}° tilt · {Math.round(cameraView.rotation)}° rotate</span></div><div className="camera-grid">{cameraAngles.map((angle) => <button key={angle.id} className={selectedAngle === angle.id ? 'active' : ''} title={angle.description} onClick={() => onChange(angle.id)}>{angle.label}</button>)}</div><div className="camera-sliders" aria-label="Camera controls"><label>Rotate <strong>{Math.round(cameraView.rotation)}°</strong><input type="range" min="-180" max="180" step="1" value={cameraView.rotation} onChange={(event) => onViewChange({ ...cameraView, rotation: Number(event.target.value) })} /></label><label>Tilt <strong>{Math.round(cameraView.tilt)}°</strong><input type="range" min="0" max="72" step="1" value={cameraView.tilt} onChange={(event) => onViewChange({ ...cameraView, tilt: Number(event.target.value) })} /></label><label>Zoom <strong>{cameraView.zoom.toFixed(2)}×</strong><input type="range" min="0.72" max="1.15" step="0.01" value={cameraView.zoom} onChange={(event) => onViewChange({ ...cameraView, zoom: Number(event.target.value) })} /></label><button onClick={onReset}>Reset camera</button></div><p className="camera-hint">Tip: click and hold the pitch background, then drag to rotate the view.</p></div>;
}
