import { create } from 'zustand';

export type PowerUpType = 'magnet' | 'slowdown' | 'shield';

export interface PowerUp {
  type: PowerUpType;
  x: number;
  y: number;
  id: string;
}

interface PowerupStore {
  activePowerUp: PowerUpType | null;
  activePowerUpTimer: number;
  setPowerUp: (type: PowerUpType, duration: number) => void;
  clearPowerUp: () => void;
  tick: () => void;
}

export const usePowerupStore = create<PowerupStore>((set) => ({
  activePowerUp: null,
  activePowerUpTimer: 0,

  setPowerUp: (type: PowerUpType, duration: number) => {
    set({ activePowerUp: type, activePowerUpTimer: duration });
  },

  clearPowerUp: () => {
    set({ activePowerUp: null, activePowerUpTimer: 0 });
  },

  tick: () => {
    set((state) => {
      if (state.activePowerUpTimer <= 0) {
        return { activePowerUp: null, activePowerUpTimer: 0 };
      }
      return { activePowerUpTimer: state.activePowerUpTimer - 1 };
    });
  }
}));

// Spawn powerups randomly on the map
export function spawnPowerUp(): PowerUp {
  const types: PowerUpType[] = ['magnet', 'slowdown', 'shield'];
  const type = types[Math.floor(Math.random() * types.length)];
  const { width, height } = require('react-native').Dimensions.get('window');
  return {
    type,
    x: Math.random() * (width - 40) + 20,
    y: Math.random() * (height - 240) + 140,
    id: Math.random().toString(36).slice(2)
  };
}
