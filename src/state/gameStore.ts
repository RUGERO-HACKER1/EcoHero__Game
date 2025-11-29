import { create } from 'zustand';

export type GameScreen = 'start' | 'difficulty' | 'game' | 'results';
export type Difficulty = 'easy' | 'medium' | 'hard';
export type TrashType = 'plastic' | 'organic' | 'nonrecyclable';
export type Trash = { id: string; type: TrashType; x: number; y: number };
export type Tree = { id: string; x: number; y: number };

export interface GameState {
  // UI
  screen: GameScreen;
  setScreen: (s: GameScreen) => void;

  // Difficulty
  difficulty: Difficulty;
  setDifficulty: (d: Difficulty) => void;

  // Game state
  score: number;
  setScore: (s: number | ((prev: number) => number)) => void;
  pollution: number;
  setPollution: (p: number | ((prev: number) => number)) => void;
  combo: number;
  setCombo: (c: number | ((prev: number) => number)) => void;
  trees: Tree[];
  setTrees: (t: Tree[] | ((prev: Tree[]) => Tree[])) => void;

  // Result state
  lastScore: number;
  setLastScore: (s: number) => void;
  won: boolean;
  setWon: (w: boolean) => void;

  // Coin system
  coins: number;
  setCoins: (c: number | ((prev: number) => number)) => void;
  unlockedLevels: Difficulty[];
  unlockLevel: (level: Difficulty) => void;

  // Reset
  reset: () => void;
}

// Level requirements (coins needed to unlock)
export const LEVEL_REQUIREMENTS: Record<Difficulty, number> = {
  easy: 0,      // Free
  medium: 50,   // 50 coins
  hard: 150     // 150 coins
};

const initialState = {
  screen: 'start' as GameScreen,
  difficulty: 'easy' as Difficulty,
  score: 0,
  pollution: 20,
  combo: 0,
  lastScore: 0,
  won: false,
  trees: [] as Tree[],
  coins: 0,
  unlockedLevels: ['easy'] as Difficulty[]
};

export const useGameStore = create<GameState>((set) => ({
  ...initialState,
  setScreen: (screen) => set({ screen }),
  setDifficulty: (difficulty) => set({ difficulty }),
  setScore: (score) => set((state) => ({ score: typeof score === 'function' ? score(state.score) : score })),
  setPollution: (pollution) => set((state) => ({ pollution: typeof pollution === 'function' ? pollution(state.pollution) : pollution })),
  setCombo: (combo) => set((state) => ({ combo: typeof combo === 'function' ? combo(state.combo) : combo })),
  setTrees: (trees) => set((state) => ({ trees: typeof trees === 'function' ? trees(state.trees) : trees })),
  setCoins: (coins) => set((state) => ({ coins: typeof coins === 'function' ? coins(state.coins) : coins })),
  unlockLevel: (level) => set((state) => {
    if (!state.unlockedLevels.includes(level)) {
      return { unlockedLevels: [...state.unlockedLevels, level] };
    }
    return state;
  }),
  setLastScore: (s) => set({ lastScore: s }),
  setWon: (w) => set({ won: w }),
  reset: () => set(initialState)
}));
