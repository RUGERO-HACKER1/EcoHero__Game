import { create } from 'zustand';

export interface LeaderboardEntry {
  id: string;
  name: string;
  score: number;
  difficulty: 'easy' | 'medium' | 'hard';
  timestamp: number;
}

interface LeaderboardStore {
  entries: LeaderboardEntry[];
  addEntry: (name: string, score: number, difficulty: 'easy' | 'medium' | 'hard') => void;
  getTopScores: (limit: number, difficulty?: 'easy' | 'medium' | 'hard') => LeaderboardEntry[];
}

export const useLeaderboard = create<LeaderboardStore>((set, get) => ({
  entries: [
    { id: '1', name: 'Eco Hero', score: 850, difficulty: 'hard', timestamp: Date.now() },
    { id: '2', name: 'Clean Master', score: 720, difficulty: 'hard', timestamp: Date.now() },
    { id: '3', name: 'Green Warrior', score: 650, difficulty: 'medium', timestamp: Date.now() }
  ],

  addEntry: (name: string, score: number, difficulty: 'easy' | 'medium' | 'hard') => {
    const entry: LeaderboardEntry = {
      id: Math.random().toString(36).slice(2),
      name,
      score,
      difficulty,
      timestamp: Date.now()
    };
    
    const newEntries = [...get().entries, entry].sort((a, b) => b.score - a.score).slice(0, 50);
    set({ entries: newEntries });
  },

  getTopScores: (limit: number, difficulty?: 'easy' | 'medium' | 'hard') => {
    let filtered = get().entries;
    if (difficulty) {
      filtered = filtered.filter((e) => e.difficulty === difficulty);
    }
    return filtered.sort((a, b) => b.score - a.score).slice(0, limit);
  }
}));
