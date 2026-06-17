import type { CameraAngle, CameraView } from '../types';

export const cameraPresets: Record<CameraAngle, CameraView> = {
  top: { tilt: 0, rotation: 0, zoom: 1 },
  broadcast: { tilt: 54, rotation: 0, zoom: 1 },
  isometric: { tilt: 55, rotation: -22, zoom: .94 },
  sideline: { tilt: 66, rotation: 90, zoom: .9 },
};

export const clampCameraView = (view: CameraView): CameraView => ({
  tilt: Math.min(72, Math.max(0, view.tilt)),
  rotation: ((view.rotation + 180) % 360 + 360) % 360 - 180,
  zoom: Math.min(1.15, Math.max(.72, view.zoom)),
});
