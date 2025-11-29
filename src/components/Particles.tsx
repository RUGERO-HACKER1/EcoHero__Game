import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';

type Particle = { id: string; x: number; y: number; life: number };

export default function Particles({ trigger }: { trigger: { x: number; y: number } | null }) {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    if (!trigger) return;

    const newParticles: Particle[] = [];
    for (let i = 0; i < 6; i++) {
      newParticles.push({
        id: Math.random().toString(36).slice(2),
        x: trigger.x,
        y: trigger.y,
        life: 1
      });
    }
    setParticles((prev) => [...prev, ...newParticles]);

    const interval = setInterval(() => {
      setParticles((prev) =>
        prev
          .map((p) => ({ ...p, life: p.life - 0.05 }))
          .filter((p) => p.life > 0)
      );
    }, 50);

    return () => clearInterval(interval);
  }, [trigger]);

  return (
    <View style={styles.container} pointerEvents="none">
      {particles.map((p) => (
        <View
          key={p.id}
          style={[
            styles.particle,
            {
              left: p.x + (Math.random() - 0.5) * 40 * (1 - p.life),
              top: p.y - 20 * (1 - p.life),
              opacity: p.life,
              transform: [{ scale: 1 + (1 - p.life) * 0.5 }]
            }
          ]}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { position: 'absolute', width: '100%', height: '100%' },
  particle: { position: 'absolute', width: 12, height: 12, borderRadius: 6, backgroundColor: '#48bb78' }
});
