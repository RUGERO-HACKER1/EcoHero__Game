import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions , ScrollView } from 'react-native';
import { useGameStore, LEVEL_REQUIREMENTS, Difficulty } from '../state/gameStore';

const { width } = Dimensions.get('window');

export default function DifficultySelect() {
  const setScreen = useGameStore((s) => s.setScreen);
  const setDifficulty = useGameStore((s) => s.setDifficulty);
  const coins = useGameStore((s) => s.coins);
  const unlockedLevels = useGameStore((s) => s.unlockedLevels);
  const unlockLevel = useGameStore((s) => s.unlockLevel);

  const handleSelectDifficulty = (level: Difficulty) => {
    if (!unlockedLevels.includes(level)) {
      // Try to unlock if player has enough coins
      if (coins >= LEVEL_REQUIREMENTS[level]) {
        unlockLevel(level);
        setDifficulty(level);
        setScreen('game');
      }
      return;
    }
    setDifficulty(level);
    setScreen('game');
  };

  const isLocked = (level: Difficulty) => !unlockedLevels.includes(level);
  const canAfford = (level: Difficulty) => coins >= LEVEL_REQUIREMENTS[level];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => setScreen('start')} style={styles.backBtn}>
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>
        <View style={styles.coinDisplay}>
          <Text style={styles.coinText}>{coins} Coins</Text>
          {/* <Text style={styles.coinIcon}> Coins</Text> */}
          {/* <Text style={styles.coinText}>{coins}</Text> */}
        </View>
      </View>
<ScrollView showsVerticalScrollIndicator={false}>
      <Text style={styles.title}>Choose Your Challenge</Text>
      <Text style={styles.subtitle}>Earn coins to unlock harder levels!</Text>

      <View style={styles.difficultyGrid}>
        <TouchableOpacity
          onPress={() => handleSelectDifficulty('easy')}
          style={[styles.difficultyCard, styles.easyCard]}
        >
          <View style={styles.cardHeader}>
            <Text style={styles.diffIcon}></Text>
            <Text style={styles.diffTitle}>Easy</Text>
            <View style={styles.freeBadge}>
              <Text style={styles.freeText}>FREE</Text>
            </View>
          </View>
          <View style={styles.cardBody}>
            <Text style={styles.diffDesc}> Slow trash spawn</Text>
            <Text style={styles.diffDesc}> +5 pollution per mistake</Text>
            <Text style={styles.diffDesc}> Perfect for beginners</Text>
            <Text style={styles.rewardText}> Reward: 10 coins</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => handleSelectDifficulty('medium')}
          style={[
            styles.difficultyCard, 
            styles.mediumCard,
            isLocked('medium') && styles.lockedCard
          ]}
          disabled={isLocked('medium') && !canAfford('medium')}
        >
          <View style={styles.cardHeader}>
            <Text style={styles.diffIcon}></Text>
            <Text style={styles.diffTitle}>Medium</Text>
            {isLocked('medium') ? (
              <View style={[styles.lockBadge, canAfford('medium') && styles.unlockBadge]}>
                <Text style={styles.lockText}>
                  {canAfford('medium') ? '🔓 Unlock' : `🔒 ${LEVEL_REQUIREMENTS.medium} Coins`}
                </Text>
              </View>
            ) : (
              <View style={styles.unlockedBadge}>
                <Text style={styles.unlockedText}>✓</Text>
              </View>
            )}
          </View>
          <View style={styles.cardBody}>
            <Text style={styles.diffDesc}> Normal speed</Text>
            <Text style={styles.diffDesc}> +10 pollution per mistake</Text>
            <Text style={styles.diffDesc}> Balanced challenge</Text>
            <Text style={styles.rewardText}> Reward: 25 Coins</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => handleSelectDifficulty('hard')}
          style={[
            styles.difficultyCard, 
            styles.hardCard,
            isLocked('hard') && styles.lockedCard
          ]}
          disabled={isLocked('hard') && !canAfford('hard')}
        >
          <View style={styles.cardHeader}>
            <Text style={styles.diffIcon}></Text>
            <Text style={styles.diffTitle}>Hard</Text>
            {isLocked('hard') ? (
              <View style={[styles.lockBadge, canAfford('hard') && styles.unlockBadge]}>
                <Text style={styles.lockText}>
                  {canAfford('hard') ? '🔓 Unlock' : `🔒 ${LEVEL_REQUIREMENTS.hard} Coins`}
                </Text>
              </View>
            ) : (
              <View style={styles.unlockedBadge}>
                <Text style={styles.unlockedText}>✓</Text>
              </View>
            )}
          </View>
          <View style={styles.cardBody}>
            <Text style={styles.diffDesc}> Fast trash spawn</Text>
            <Text style={styles.diffDesc}> +20 pollution per mistake</Text>
            <Text style={styles.diffDesc}> Expert challenge</Text>
            <Text style={styles.rewardText}> Reward: 50 Coins</Text>
          </View>
        </TouchableOpacity>
      </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#f0f4f8', 
    paddingHorizontal: 20, 
    paddingTop: 50 
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30
  },
  backBtn: {
    padding: 8
  },
  backText: {
    fontSize: 16,
    color: '#2b6cb0',
    fontWeight: '600'
  },
  coinDisplay: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffd700',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3
  },
  coinIcon: {
    fontSize: 20,
    marginRight: 6
  },
  coinText: {
    fontSize: 16,
    fontWeight: '800',
    color: '#8b6914'
  },
  title: { 
    fontSize: 36, 
    fontWeight: '900', 
    color: '#2b6cb0', 
    textAlign: 'center', 
    marginBottom: 8 
  },
  subtitle: { 
    fontSize: 16, 
    color: '#4a5568', 
    textAlign: 'center', 
    marginBottom: 30,
    fontWeight: '500'
  },
  difficultyGrid: { 
    flex: 1, 
    justifyContent: 'center', 
    gap: 16 
  },
  difficultyCard: {
    padding: 24,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 8,
    marginHorizontal: 4,
    borderWidth: 3,
    borderColor: 'transparent'
  },
  easyCard: { 
    backgroundColor: '#c6f6d5', 
    borderColor: '#28a745'
  },
  mediumCard: { 
    backgroundColor: '#feebc8', 
    borderColor: '#ff9800'
  },
  hardCard: { 
    backgroundColor: '#feb2b2', 
    borderColor: '#ff6b6b'
  },
  lockedCard: {
    opacity: 0.6,
    borderColor: '#999'
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16
  },
  diffIcon: { 
    fontSize: 48, 
    marginRight: 12
  },
  diffTitle: { 
    fontSize: 28, 
    fontWeight: '800',
    flex: 1,
    color: '#1a202c'
  },
  freeBadge: {
    backgroundColor: '#28a745',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12
  },
  freeText: {
    color: '#fff',
    fontWeight: '800',
    fontSize: 12
  },
  lockBadge: {
    backgroundColor: '#999',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12
  },
  unlockBadge: {
    backgroundColor: '#48bb78'
  },
  lockText: {
    color: '#fff',
    fontWeight: '800',
    fontSize: 12
  },
  unlockedBadge: {
    backgroundColor: '#48bb78',
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center'
  },
  unlockedText: {
    color: '#fff',
    fontWeight: '900',
    fontSize: 18
  },
  cardBody: {
    gap: 8
  },
  diffDesc: { 
    fontSize: 14, 
    color: '#2d3748',
    fontWeight: '500',
    marginBottom: 4
  },
  rewardText: {
    fontSize: 16,
    fontWeight: '800',
    color: '#2b6cb0',
    marginTop: 8,
    textAlign: 'center'
  }
});
