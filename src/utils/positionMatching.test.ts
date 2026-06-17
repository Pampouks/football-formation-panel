import { describe, expect, it } from 'vitest';
import { normalizeRole, positionMatchesRole } from './positionMatching';

describe('position matching', () => {
  it('matches sided center-back and midfield roles to preferred positions', () => {
    expect(positionMatchesRole('CB', 'LCB')).toBe(true);
    expect(positionMatchesRole('CM', 'RCM')).toBe(true);
    expect(positionMatchesRole('ST', 'LST')).toBe(true);
  });

  it('keeps different preferred lines separate', () => {
    expect(positionMatchesRole('GK', 'ST')).toBe(false);
    expect(positionMatchesRole('RW', 'LW')).toBe(false);
    expect(normalizeRole('RWB')).toBe('RB');
  });
});
