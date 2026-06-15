import type { BoardMode, BoardPlayer } from '../types';

const STORAGE_KEY = 'pampouks-football-tactics-board';

export interface SavedBoardState {
  mode: BoardMode;
  clubId: string;
  formationId: string;
  selectedIds: string[];
  boardPlayers: BoardPlayer[];
  savedAt: string;
}

export const saveBoardState = (state: Omit<SavedBoardState, 'savedAt'>) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...state, savedAt: new Date().toISOString() }));
};

export const loadBoardState = (): SavedBoardState | null => {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw) as SavedBoardState;
    if (!parsed.mode || !Array.isArray(parsed.selectedIds) || !Array.isArray(parsed.boardPlayers)) return null;
    return parsed;
  } catch {
    return null;
  }
};
