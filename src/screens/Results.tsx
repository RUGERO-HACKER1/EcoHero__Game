import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { useGameStore } from '../state/gameStore';

const { width, height } = Dimensions.get('window');

export default function Results() {
  const setScreen = useGameStore((s) => s.setScreen);
  const reset = useGameStore((s) => s.reset);
  const won = useGameStore((s) => s.won);
  const lastScore = useGameStore((s) => s.lastScore);

  const handlePlayAgain = () => {
    reset();
    setScreen('game');
  };

  const handleHome = () => {
    reset();
    setScreen('start');
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={[styles.title, { color: won ? '#48bb78' : '#d53f3f' }]}>
          {won ? '🎉 YOU WIN!' : '💀 GAME OVER'}
        </Text>

        <View style={styles.scoreBox}>
          <Text style={styles.scoreLabel}>Final Score</Text>
          <Text style={styles.scoreValue}>{lastScore}</Text>
        </View>

        <View style={styles.actions}>
          <TouchableOpacity onPress={handlePlayAgain} style={[styles.btn, { backgroundColor: '#63b3ed' }]}>
            <Text style={styles.btnText}>PLAY AGAIN</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleHome} style={[styles.btn, { backgroundColor: '#cbd5e1' }]}>
            <Text style={[styles.btnText, { color: '#333' }]}>HOME</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f7fafc', justifyContent: 'center', alignItems: 'center' },
  content: { width: width - 32, alignItems: 'center' },
  title: { fontSize: 40, fontWeight: '800', marginBottom: 32 },
  scoreBox: { backgroundColor: '#fff', borderRadius: 12, padding: 24, marginBottom: 32, width: '100%', alignItems: 'center' },
  scoreLabel: { fontSize: 14, color: '#666', marginBottom: 8 },
  scoreValue: { fontSize: 48, fontWeight: '800', color: '#2b6cb0' },
  actions: { width: '100%', gap: 12 },
  btn: { paddingHorizontal: 32, paddingVertical: 16, borderRadius: 12, alignItems: 'center' },
  btnText: { color: '#fff', fontWeight: '800', fontSize: 16 }
});
