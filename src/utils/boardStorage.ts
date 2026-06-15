import type { BoardMode, BoardPlayer, CameraAngle, PlayerPoolType } from '../types';

const STORAGE_KEY = 'pampouks-football-tactics-board';

export interface SavedBoardState {
  mode: BoardMode;
  playerPoolType: PlayerPoolType;
  selectedPoolId: string;
  /** @deprecated Kept only so older saved boards can still be loaded. */
  clubId?: string;
  formationId: string;
  cameraAngle?: CameraAngle;
  selectedIds: string[];
  boardPlayers: BoardPlayer[];
  savedAt: string;
}

export const saveBoardState = (state: Omit<SavedBoardState, 'savedAt' | 'clubId'>) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...state, savedAt: new Date().toISOString() }));
};

export const loadBoardState = (): SavedBoardState | null => {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw) as SavedBoardState;
    if (!parsed.mode || !Array.isArray(parsed.selectedIds) || !Array.isArray(parsed.boardPlayers)) return null;
    return { ...parsed, playerPoolType: parsed.playerPoolType ?? 'club', selectedPoolId: parsed.selectedPoolId ?? parsed.clubId ?? '' };
  } catch {
    return null;
  }
};
