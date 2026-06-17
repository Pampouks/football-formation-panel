import { formations } from '../data/mockData';
import type { BoardPlayer } from '../types';

export const clampPitchCoordinate = (value: number, markerRadiusPercent = 4) => Math.min(100 - markerRadiusPercent, Math.max(markerRadiusPercent, value));

export const buildBoardPlayers = (selectedIds: string[], formationId: string): BoardPlayer[] => {
  const formation = formations.find((item) => item.id === formationId) ?? formations[0];

  // Formation coordinates are pitch-relative percentages. The selected-player order is mapped onto the 11 tactical roles.
  return selectedIds.slice(0, 11).map((playerId, index) => {
    const coordinate = formation.coordinates[index];
    return {
      playerId,
      x: clampPitchCoordinate(coordinate?.x ?? 50),
      y: clampPitchCoordinate(coordinate?.y ?? 50),
      role: coordinate?.role ?? 'SUB',
    };
  });
};
