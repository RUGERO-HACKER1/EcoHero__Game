import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { useGameStore } from './state/gameStore';
import Start from './screens/Start';
import DifficultySelect from './screens/DifficultySelect';
import Game from './screens/Game';
import Results from './screens/Results';

export default function App() {
  const screen = useGameStore((s) => s.screen);

  return (
    <SafeAreaView style={styles.container}>
      {screen === 'start' && <Start />}
      {screen === 'difficulty' && <DifficultySelect />}
      {screen === 'game' && <Game />}
      {screen === 'results' && <Results />}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#e6f2ff' }
});
