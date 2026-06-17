import type { CameraAngle, CameraView } from '../types';
import { CameraAngleSelector } from './CameraAngleSelector';

interface Props {
  cameraAngle: CameraAngle;
  cameraView: CameraView;
  selectedCount: number;
  status: string;
  onCameraAngleChange: (angle: CameraAngle) => void;
  onCameraViewChange: (view: CameraView) => void;
  onCameraReset: () => void;
  onReset: () => void;
  onClear: () => void;
  onSave: () => void;
  onLoad: () => void;
  onExport: () => void;
}

export function BoardToolsPanel(props: Props) {
  const hasPlayers = props.selectedCount > 0;

  return <aside className="tools-panel panel-card">
    <div><p className="eyebrow">Board tools</p><h2>Camera & export</h2><p className="panel-copy">Adjust the view, save your board locally, or export the current tactics board as a PNG.</p></div>
    <CameraAngleSelector selectedAngle={props.cameraAngle} cameraView={props.cameraView} onChange={props.onCameraAngleChange} onViewChange={props.onCameraViewChange} onReset={props.onCameraReset} />
    {props.status && <p className="status" role="status">{props.status}</p>}
    <div className="actions primary-actions"><button onClick={props.onSave}>Save board</button><button onClick={props.onLoad}>Load board</button><button onClick={props.onExport} disabled={!hasPlayers}>Export PNG</button></div>
    <div className="actions"><button onClick={props.onReset} disabled={!hasPlayers}>Reset positions</button><button className="danger" onClick={props.onClear} disabled={!hasPlayers}>Clear board</button></div>
  </aside>;
}
