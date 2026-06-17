import type { KitMode, KitPattern } from '../types';

interface Props {
  markerScale: number;
  kitHue: number;
  kitColor: string;
  kitMode: KitMode;
  customKitPattern: KitPattern;
  customKitPrimaryHue: number;
  customKitSecondaryHue: number;
  showPlayerLabels: boolean;
  pitchLineOpacity: number;
  hasCustomBoard: boolean;
  hasCustomKit: boolean;
  onBoardImageUpload: (file: File) => void;
  onKitImageUpload: (file: File) => void;
  onClearCustomImages: () => void;
  onMarkerScaleChange: (scale: number) => void;
  onKitHueChange: (hue: number) => void;
  onKitModeChange: (mode: KitMode) => void;
  onCustomKitPatternChange: (pattern: KitPattern) => void;
  onCustomKitPrimaryHueChange: (hue: number) => void;
  onCustomKitSecondaryHueChange: (hue: number) => void;
  onSaveCustomKit: () => void;
  onShowPlayerLabelsChange: (show: boolean) => void;
  onPitchLineOpacityChange: (opacity: number) => void;
}

export function BoardToolsPanel(props: Props) {
  return <aside className="tools-panel panel-card">
    <div className="team-style-controls"><div className="selection-header"><strong>Team kit</strong><span style={{ color: props.kitColor }}>Kit</span></div><div className="kit-mode-tabs"><button className={props.kitMode === 'home' ? 'active' : ''} onClick={() => props.onKitModeChange('home')}>Home</button><button className={props.kitMode === 'away' ? 'active' : ''} onClick={() => props.onKitModeChange('away')}>Away</button><button className={props.kitMode === 'custom' ? 'active' : ''} onClick={() => props.onKitModeChange('custom')}>Custom</button></div><label>Icon size <strong>{props.markerScale.toFixed(2)}×</strong><input type="range" min="0.75" max="1.4" step="0.05" value={props.markerScale} onChange={(event) => props.onMarkerScaleChange(Number(event.target.value))} /></label><label>Base color <strong>{Math.round(props.kitHue)}°</strong><input className="kit-color-slider" type="range" min="0" max="360" step="1" value={props.kitHue} onChange={(event) => props.onKitHueChange(Number(event.target.value))} /></label><label className="toggle-field">Labels <input type="checkbox" checked={props.showPlayerLabels} onChange={(event) => props.onShowPlayerLabelsChange(event.target.checked)} /></label><div className="kit-preview" style={{ background: props.kitColor }}>Current kit accent</div></div>
    {props.kitMode === 'custom' && <div className="team-style-controls"><div className="selection-header"><strong>Custom kit</strong><span>{props.customKitPattern}</span></div><div className="kit-mode-tabs"><button className={props.customKitPattern === 'solid' ? 'active' : ''} onClick={() => props.onCustomKitPatternChange('solid')}>Normal</button><button className={props.customKitPattern === 'striped' ? 'active' : ''} onClick={() => props.onCustomKitPatternChange('striped')}>Striped</button></div><label>Primary <strong>{Math.round(props.customKitPrimaryHue)}°</strong><input type="range" min="0" max="360" step="1" value={props.customKitPrimaryHue} onChange={(event) => props.onCustomKitPrimaryHueChange(Number(event.target.value))} /></label><label>Secondary <strong>{Math.round(props.customKitSecondaryHue)}°</strong><input type="range" min="0" max="360" step="1" value={props.customKitSecondaryHue} onChange={(event) => props.onCustomKitSecondaryHueChange(Number(event.target.value))} /></label><button className="secondary-button" onClick={props.onSaveCustomKit}>Save custom kit</button></div>}
    <div className="team-style-controls"><div className="selection-header"><strong>Board settings</strong><span>Pitch</span></div><label>Line opacity <strong>{Math.round(props.pitchLineOpacity * 100)}%</strong><input type="range" min="0.35" max="1" step="0.05" value={props.pitchLineOpacity} onChange={(event) => props.onPitchLineOpacityChange(Number(event.target.value))} /></label><label className="upload-field">Upload board <input type="file" accept="image/*" onChange={(event) => { const file = event.target.files?.[0]; if (file) props.onBoardImageUpload(file); event.currentTarget.value = ''; }} /></label><label className="upload-field">Upload kit image <input type="file" accept="image/*" onChange={(event) => { const file = event.target.files?.[0]; if (file) props.onKitImageUpload(file); event.currentTarget.value = ''; }} /></label><button className="secondary-button" onClick={props.onClearCustomImages} disabled={!props.hasCustomBoard && !props.hasCustomKit}>Clear uploads</button><p className="upload-summary">{props.hasCustomBoard ? 'Custom board active' : 'Default board'} · {props.hasCustomKit ? 'Image kit active' : 'Generated kit active'}</p></div>
  </aside>;
}
