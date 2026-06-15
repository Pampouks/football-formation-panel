import { describe, expect, it } from 'vitest';
import { formations } from '../data/mockData';
import { buildBoardPlayers, clampPitchCoordinate } from './formation';

describe('formation coordinate placement', () => {
  it('maps the first 11 selected players onto the selected formation roles', () => {
    const selectedIds = Array.from({ length: 12 }, (_, index) => `p${index + 1}`);
    const boardPlayers = buildBoardPlayers(selectedIds, '433');

    expect(boardPlayers).toHaveLength(11);
    expect(boardPlayers[0]).toEqual({ playerId: 'p1', role: 'GK', x: 50, y: 91 });
    expect(boardPlayers[10]).toEqual({ playerId: 'p11', role: 'RW', x: 78, y: 25 });
  });

  it('keeps every formation coordinate within draggable pitch boundaries', () => {
    for (const formation of formations) {
      const boardPlayers = buildBoardPlayers(Array.from({ length: 11 }, (_, index) => `${formation.id}-${index}`), formation.id);
      expect(boardPlayers.every((player) => player.x >= 4 && player.x <= 96 && player.y >= 4 && player.y <= 96)).toBe(true);
    }
  });

  it('clamps manual drag coordinates to the supplied marker radius', () => {
    expect(clampPitchCoordinate(-20, 6)).toBe(6);
    expect(clampPitchCoordinate(120, 6)).toBe(94);
    expect(clampPitchCoordinate(48, 6)).toBe(48);
  });
});
