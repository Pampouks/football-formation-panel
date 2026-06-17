import { describe, expect, it } from 'vitest';
import { cameraPresets, clampCameraView } from './camera';

describe('camera controls', () => {
  it('provides usable presets for every camera angle', () => {
    expect(Object.keys(cameraPresets)).toEqual(['top', 'broadcast', 'isometric', 'sideline']);
  });

  it('keeps manual camera rotation controls in a safe range', () => {
    expect(clampCameraView({ tilt: 99, rotation: 540, zoom: 2 })).toEqual({ tilt: 72, rotation: -180, zoom: 1.15 });
    expect(clampCameraView({ tilt: -10, rotation: -540, zoom: .2 })).toEqual({ tilt: 0, rotation: -180, zoom: .72 });
  });
});
