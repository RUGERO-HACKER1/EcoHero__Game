import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { useLeaderboard } from '../game/LeaderboardManager';

const { width } = Dimensions.get('window');

export default function LeaderboardScreen() {
  const entries = useLeaderboard((s) => s.entries);
  const topScores = useLeaderboard((s) => s.getTopScores(10));

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🏆 Leaderboard</Text>
      
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {topScores.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>No scores yet!</Text>
            <Text style={styles.emptySubtext}>Play a game to get on the leaderboard</Text>
          </View>
        ) : (
          topScores.map((entry, index) => (
            <View key={entry.id} style={styles.scoreRow}>
              <Text style={styles.rank}>#{index + 1}</Text>
              <View style={styles.scoreInfo}>
                <Text style={styles.name}>{entry.name}</Text>
                <Text style={styles.difficulty}>{entry.difficulty.toUpperCase()}</Text>
              </View>
              <Text style={styles.score}>{entry.score}</Text>
            </View>
          ))
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f7fafc', paddingTop: 20 },
  title: { fontSize: 28, fontWeight: '800', color: '#2b6cb0', textAlign: 'center', marginBottom: 20 },
  scrollView: { flex: 1, paddingHorizontal: 16 },
  emptyState: { alignItems: 'center', justifyContent: 'center', paddingVertical: 40 },
  emptyText: { fontSize: 18, fontWeight: '700', color: '#333', marginBottom: 8 },
  emptySubtext: { fontSize: 14, color: '#666' },
  scoreRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 8,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2
  },
  rank: { fontSize: 16, fontWeight: '700', width: 40, color: '#2b6cb0' },
  scoreInfo: { flex: 1 },
  name: { fontSize: 14, fontWeight: '700', color: '#333' },
  difficulty: { fontSize: 11, color: '#999', marginTop: 2 },
  score: { fontSize: 18, fontWeight: '800', color: '#48bb78' }
});
