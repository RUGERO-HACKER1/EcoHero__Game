import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { useGameStore } from '../state/gameStore';
import Svg, { Circle, Rect, Path, Defs, LinearGradient, Stop } from 'react-native-svg';

const { width, height } = Dimensions.get('window');

export default function Start() {
  const setScreen = useGameStore((s) => s.setScreen);
  const reset = useGameStore((s) => s.reset);
  const coins = useGameStore((s) => s.coins);

  const handleStart = () => {
    reset();
    setScreen('difficulty');
  };

  return (
    <View style={styles.container}>
      <View style={styles.background}>
        <Svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
          <Defs>
            <LinearGradient id="bgGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <Stop offset="0%" stopColor="#87ceeb" stopOpacity={1} />
              <Stop offset="100%" stopColor="#e0f6ff" stopOpacity={1} />
            </LinearGradient>
          </Defs>
          <Rect width={width} height={height} fill="url(#bgGrad)" />
          {/* Clouds */}
          <Circle cx={width * 0.2} cy={100} r={40} fill="#fff" opacity={0.8} />
          <Circle cx={width * 0.3} cy={110} r={35} fill="#fff" opacity={0.8} />
          <Circle cx={width * 0.7} cy={120} r={45} fill="#fff" opacity={0.7} />
          <Circle cx={width * 0.8} cy={130} r={38} fill="#fff" opacity={0.7} />
        </Svg>
      </View>

      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}> EcoHero </Text>
          <Text style={styles.subtitle}>Clean the City, Save the Planet</Text>
        </View>

        <View style={styles.coinDisplay}>
          {/* <Text style={styles.coinIcon}>🪙</Text> */}
          <Text style={styles.coinText}>{coins} Coins</Text>
        </View>

        <View style={styles.rules}>
          <Text style={styles.ruleTitle}> How to Play:</Text>
          <View style={styles.ruleItem}>
            <Text style={styles.ruleIcon}></Text>
            <Text style={styles.rule}>Use joystick to move around</Text>
          </View>
          <View style={styles.ruleItem}>
            <Text style={styles.ruleIcon}></Text>
            <Text style={styles.rule}>Pick up trash from the city</Text>
          </View>
          <View style={styles.ruleItem}>
            <Text style={styles.ruleIcon}></Text>
            <Text style={styles.rule}>Sort trash into correct bins</Text>
          </View>
          <View style={styles.ruleItem}>
            <Text style={styles.ruleIcon}></Text>
            <Text style={styles.rule}>Plant trees to reduce pollution</Text>
          </View>
          <View style={styles.ruleItem}>
            <Text style={styles.ruleIcon}></Text>
            <Text style={styles.rule}>Earn coins to unlock new levels</Text>
          </View>
        </View>

        <TouchableOpacity onPress={handleStart} style={styles.btn}>
          <Text style={styles.btnText}> START GAME</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#e6f2ff', 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  background: {
    position: 'absolute',
    width,
    height
  },
  content: { 
    width: width - 40, 
    alignItems: 'center',
    zIndex: 1
  },
  header: {
    alignItems: 'center',
    marginBottom: 30
  },
  title: { 
    fontSize: 52, 
    fontWeight: '900', 
    color: '#2b6cb0', 
    marginBottom: 8,
    textShadowColor: 'rgba(0,0,0,0.1)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4
  },
  subtitle: { 
    fontSize: 18, 
    color: '#4a5568', 
    fontWeight: '600'
  },
  coinDisplay: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffd700',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 25,
    marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5
  },
  coinIcon: {
    fontSize: 24,
    marginRight: 8
  },
  coinText: {
    fontSize: 18,
    fontWeight: '800',
    color: '#8b6914'
  },
  rules: { 
    backgroundColor: '#fff', 
    borderRadius: 16, 
    padding: 20, 
    marginBottom: 30, 
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5
  },
  ruleTitle: { 
    fontSize: 20, 
    fontWeight: '800', 
    marginBottom: 16, 
    color: '#2b6cb0',
    textAlign: 'center'
  },
  ruleItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12
  },
  ruleIcon: {
    fontSize: 20,
    marginRight: 12,
    width: 30
  },
  rule: { 
    fontSize: 15, 
    color: '#4a5568',
    flex: 1,
    fontWeight: '500'
  },
  btn: { 
    backgroundColor: '#48bb78', 
    paddingHorizontal: 40, 
    paddingVertical: 18, 
    borderRadius: 16, 
    width: '100%', 
    alignItems: 'center',
    shadowColor: '#48bb78',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 8
  },
  btnText: { 
    color: '#fff', 
    fontWeight: '900', 
    fontSize: 20,
    letterSpacing: 1
  }
});
