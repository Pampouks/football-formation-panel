interface Props {
  selectedCount: number;
  status: string;
  markerScale: number;
  kitHue: number;
  kitColor: string;
  hasCustomBoard: boolean;
  hasCustomKit: boolean;
  onBoardImageUpload: (file: File) => void;
  onKitImageUpload: (file: File) => void;
  onClearCustomImages: () => void;
  onMarkerScaleChange: (scale: number) => void;
  onKitHueChange: (hue: number) => void;
  onReset: () => void;
  onClear: () => void;
  onSave: () => void;
  onLoad: () => void;
  onExport: () => void;
}

export function BoardToolsPanel(props: Props) {
  const hasPlayers = props.selectedCount > 0;

  return <aside className="tools-panel panel-card">
    <div className="team-style-controls"><div className="selection-header"><strong>Team style</strong><span style={{ color: props.kitColor }}>Kit</span></div><label>Icon size <strong>{props.markerScale.toFixed(2)}×</strong><input type="range" min="0.75" max="1.4" step="0.05" value={props.markerScale} onChange={(event) => props.onMarkerScaleChange(Number(event.target.value))} /></label><label>Kit color <strong>{Math.round(props.kitHue)}°</strong><input className="kit-color-slider" type="range" min="0" max="360" step="1" value={props.kitHue} onChange={(event) => props.onKitHueChange(Number(event.target.value))} /></label><div className="kit-preview" style={{ background: props.kitColor }}>Current kit accent</div><label className="upload-field">Upload board <input type="file" accept="image/*" onChange={(event) => { const file = event.target.files?.[0]; if (file) props.onBoardImageUpload(file); event.currentTarget.value = ''; }} /></label><label className="upload-field">Upload kit <input type="file" accept="image/*" onChange={(event) => { const file = event.target.files?.[0]; if (file) props.onKitImageUpload(file); event.currentTarget.value = ''; }} /></label><button className="secondary-button" onClick={props.onClearCustomImages} disabled={!props.hasCustomBoard && !props.hasCustomKit}>Clear uploads</button><p className="upload-summary">{props.hasCustomBoard ? 'Custom board active' : 'Default board'} · {props.hasCustomKit ? 'Custom kit active' : 'Default marker images'}</p></div>
    {props.status && <p className="status" role="status">{props.status}</p>}
    <div className="actions primary-actions"><button onClick={props.onSave}>Save board</button><button onClick={props.onLoad}>Load board</button><button onClick={props.onExport} disabled={!hasPlayers}>Export PNG</button></div>
    <div className="actions"><button onClick={props.onReset} disabled={!props.selectedCount}>Reset positions</button><button className="danger" onClick={props.onClear} disabled={!hasPlayers}>Clear board</button></div>
  </aside>;
}
