import type { CameraAngle } from '../types';

const cameraAngles: Array<{ id: CameraAngle; label: string; description: string }> = [
  { id: 'top', label: 'Top', description: 'Classic flat tactics-board view.' },
  { id: 'broadcast', label: 'Broadcast', description: 'Tilted TV-style match angle.' },
  { id: 'isometric', label: 'Isometric', description: 'Diagonal 3D coaching-board view.' },
  { id: 'sideline', label: 'Sideline', description: 'Low touchline perspective.' },
];

interface Props { selectedAngle: CameraAngle; onChange: (angle: CameraAngle) => void; }

export function CameraAngleSelector({ selectedAngle, onChange }: Props) {
  return <div className="camera-field"><div className="selection-header"><strong>Camera angle</strong><span>3D view</span></div><div className="camera-grid">{cameraAngles.map((angle) => <button key={angle.id} className={selectedAngle === angle.id ? 'active' : ''} title={angle.description} onClick={() => onChange(angle.id)}>{angle.label}</button>)}</div></div>;
}
