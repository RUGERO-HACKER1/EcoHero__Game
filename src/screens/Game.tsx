import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import Player from '../components/Player';
import PollutionBar from '../components/PollutionBar';
import Joystick from '../components/Joystick';
import Particles from '../components/Particles';
import EnhancedCityBackground from '../components/EnhancedCityBackground';
import RealisticPlayer from '../components/RealisticPlayer';
import RealisticTrash from '../components/RealisticTrash';
import RealisticBin from '../components/RealisticBin';
import { loadSound, playSound, loadBackgroundMusic, playBackgroundMusic, stopBackgroundMusic } from '../audio/audioManager';
import { useGameStore, TrashType, Trash, Tree } from '../state/gameStore';
import TreeComponent from '../components/Tree';
import PlantingZone from '../components/PlantingZone';

const { width, height } = Dimensions.get('window');
const PLAY_AREA_PADDING = 20;

// Define tree planting zones - in the WALKING AREAS (above and below the road)
// Road is centered at height * 0.50 (45% to 55% of screen)
// Planting zones are SEPARATE from recycle bins
const PLANTING_ZONES = [
  // Planting zones ABOVE the road (left side of upper walking area)
  { id: 'zone1', x: width * 0.20, y: height * 0.28, hasBin: null },
  { id: 'zone2', x: width * 0.35, y: height * 0.30, hasBin: null },
  { id: 'zone3', x: width * 0.50, y: height * 0.32, hasBin: null },
  // Planting zones BELOW the road (right side of lower walking area)
  { id: 'zone4', x: width * 0.60, y: height * 0.68, hasBin: null },
  { id: 'zone5', x: width * 0.75, y: height * 0.70, hasBin: null },
  { id: 'zone6', x: width * 0.85, y: height * 0.72, hasBin: null },
  { id: 'zone7', x: width * 0.25, y: height * 0.70, hasBin: null },
];

function rand(min: number, max: number) { return Math.random() * (max - min) + min }

export default function Game() {
  const setScreen = useGameStore((s) => s.setScreen);
  const storeScore = useGameStore((s) => s.score);
  const setStoreScore = useGameStore((s) => s.setScore);
  const storePollution = useGameStore((s) => s.pollution);
  const setStorePollution = useGameStore((s) => s.setPollution);
  const setLastScore = useGameStore((s) => s.setLastScore);
  const setWon = useGameStore((s) => s.setWon);

  // Start player in walking area (above the road, where bins and planting zones are)
  const [player, setPlayer] = useState({ x: width / 2, y: height * 0.30 });
  const [trash, setTrash] = useState<Trash[]>([]);
  const [carried, setCarried] = useState<Trash | null>(null);
  const [pollution, setPollution] = useState(storePollution);
  const [score, setScore] = useState(storeScore);
  const [particleTrigger, setParticleTrigger] = useState<{ x: number; y: number } | null>(null);
  const joystickRef = useRef({ x: 0, y: 0 });
  const [joystickActive, setJoystickActive] = useState(false);
  const storeTrees = useGameStore((s) => s.trees);
  const setStoreTrees = useGameStore((s) => s.setTrees);
  const [trees, setTrees] = useState<Tree[]>(storeTrees);
  const [discoveredZones, setDiscoveredZones] = useState<Set<string>>(new Set());
  const [nearZone, setNearZone] = useState<string | null>(null);
  const coins = useGameStore((s) => s.coins);

  useEffect(() => {
    // initial spawn
    const initial: Trash[] = [];
    for (let i = 0; i < 5; i++) initial.push(spawnTrash());
    setTrash(initial);

    // pre-load sounds (if present)
    try {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const pick = require('../../assets/sounds/pick.mp3');
      const correct = require('../../assets/sounds/correct.mp3');
      const wrong = require('../../assets/sounds/wrong.mp3');
      loadSound('pick', pick);
      loadSound('correct', correct);
      loadSound('wrong', wrong);
    } catch (e) {
      // assets might not exist yet
    }

    // Load and play background music
    const loadMusic = async () => {
      try {
        // Try to load background music file - try different possible names
        let bgMusic;
        try {
          // eslint-disable-next-line @typescript-eslint/no-var-requires
          bgMusic = require('../../assets/sounds/background.mp3');
        } catch (e1) {
          try {
            // eslint-disable-next-line @typescript-eslint/no-var-requires
            bgMusic = require('../../assets/sounds/background');
          } catch (e2) {
            throw new Error('Background music file not found');
          }
        }
        
        if (bgMusic) {
          await loadBackgroundMusic(bgMusic);
          // Small delay to ensure music is loaded
          setTimeout(async () => {
            await playBackgroundMusic(0.3); // 30% volume for background music
            console.log('Background music playing');
          }, 500);
        }
      } catch (e) {
        console.log('Background music error:', e);
        console.log('Make sure background.mp3 exists in assets/sounds/');
      }
    };
    loadMusic();

    const spawnTimer = setInterval(() => {
      setTrash(t => [...t, spawnTrash()]);
    }, 3000);

    return () => {
      clearInterval(spawnTimer);
      stopBackgroundMusic();
    };
  }, []);

  function spawnTrash(): Trash {
    const types: TrashType[] = ['plastic', 'organic', 'nonrecyclable'];
    const t = types[Math.floor(Math.random() * types.length)];
    // Spawn trash anywhere in the city - can be on road or off road
    // But prefer off-road areas (70% chance off-road, 30% on road)
    const roadTop = height * 0.45;
    const roadBottom = height * 0.55;
    let y;
    if (Math.random() < 0.7) {
      // Spawn off-road (above or below)
      y = Math.random() > 0.5 ? rand(50, roadTop - 20) : rand(roadBottom + 20, height - 100);
    } else {
      // Spawn on road (30% chance) - where bins and planting zones are
      y = rand(roadTop + 10, roadBottom - 10);
    }
    return { id: Math.random().toString(36).slice(2), type: t, x: rand(20, width - 20), y };
  }

  function move(dx: number, dy: number) {
    setPlayer(p => {
      // Allow full movement around the city - but avoid the road
      let nx = Math.max(10, Math.min(width - 10, p.x + dx));
      let ny = Math.max(10, Math.min(height - 10, p.y + dy));
      
      // Prevent walking on the road (bins and zones are in walking areas now)
      const roadTop = height * 0.45;
      const roadBottom = height * 0.55;
      
      // If trying to enter road, push player to nearest walking area
      if (ny > roadTop && ny < roadBottom) {
        // If player is closer to top of road, push them above
        if (Math.abs(p.y - roadTop) < Math.abs(p.y - roadBottom)) {
          ny = roadTop - 5; // Just above road (walking area)
        } else {
          ny = roadBottom + 5; // Just below road (walking area)
        }
      }
      
      // Discover zones when player gets close (auto-discover when near)
      PLANTING_ZONES.forEach(zone => {
        if (distance(zone.x, zone.y, nx, ny) < 100 && !discoveredZones.has(zone.id)) {
          setDiscoveredZones(prev => new Set([...prev, zone.id]));
        }
      });
      
      // Check if near a planting zone (can plant at any zone when close, discovered or not)
      // Increased detection range to 60 for better responsiveness
      const nearbyZone = PLANTING_ZONES.find(zone => 
        distance(zone.x, zone.y, nx, ny) < 60
      );
      setNearZone(nearbyZone ? nearbyZone.id : null);
      
      // if carrying, move carried item with player
      if (carried) setCarried({ ...carried, x: nx, y: ny });
      return { x: nx, y: ny };
    });
  }

  function tryPickup() {
    if (carried) return;
    // find nearby trash
    const found = trash.find(t => distance(t.x, t.y, player.x, player.y) < 40);
    if (found) {
      setCarried({ ...found });
      setTrash(t => t.filter(item => item.id !== found.id));
      playSound('pick');
    }
  }

  function tryDrop() {
    if (!carried) return;
    // define bin positions (in a line with spacing)
    const bins = [
      { type: 'plastic' as TrashType, x: width * 0.65, y: height * 0.28 },
      { type: 'organic' as TrashType, x: width * 0.80, y: height * 0.28 },
      { type: 'nonrecyclable' as TrashType, x: width * 0.95, y: height * 0.28 }
    ];
    const bin = bins.find(b => distance(b.x, b.y, player.x, player.y) < 50);
    if (!bin) {
      // not near a bin — drop on ground
      setTrash(t => [...t, { ...carried, id: Math.random().toString(36).slice(2), x: player.x + 30, y: player.y + 30 }]);
      setCarried(null);
      return;
    }

    if (bin.type === carried.type) {
      setScore(s => s + 1);
      setPollution(p => Math.max(0, p - 10));
      setParticleTrigger({ x: bin.x, y: bin.y });
      playSound('correct');
      // Award coins based on difficulty
      const currentDifficulty = useGameStore.getState().difficulty;
      const coinReward = currentDifficulty === 'easy' ? 1 : currentDifficulty === 'medium' ? 2 : 3;
      useGameStore.getState().setCoins((c: number) => c + coinReward);
    } else {
      setPollution(p => Math.min(100, p + 15));
      playSound('wrong');
    }
    setCarried(null);
  }

  function tryPlantTree() {
    // No score requirement - plant trees for free!
    
    // Check if near a planting zone - check directly instead of relying on nearZone state
    const nearbyZone = PLANTING_ZONES.find(zone => 
      distance(zone.x, zone.y, player.x, player.y) < 50
    );
    
    if (!nearbyZone) {
      console.log('Not near any planting zone');
      return;
    }
    
    // Check if tree already planted at this zone
    const treeAtZone = trees.find(t => distance(t.x, t.y, nearbyZone.x, nearbyZone.y) < 30);
    if (treeAtZone) {
      console.log('Tree already planted at this zone');
      return;
    }
    
    // Auto-discover zone when planting
    if (!discoveredZones.has(nearbyZone.id)) {
      setDiscoveredZones(prev => new Set([...prev, nearbyZone.id]));
    }
    
    // Plant the tree at the zone location
    const newTree: Tree = {
      id: Math.random().toString(36).slice(2),
      x: nearbyZone.x,
      y: nearbyZone.y
    };
    
    setTrees(t => [...t, newTree]);
    setStoreTrees(t => [...t, newTree]);
    // No score cost - free to plant!
    setPollution(p => Math.max(0, p - 20)); // Reduce pollution by 20
    setParticleTrigger({ x: nearbyZone.x, y: nearbyZone.y });
    playSound('correct');
    console.log('Tree planted successfully at zone:', nearbyZone.id);
  }

  // Win condition
  useEffect(() => {
    if (trash.length === 0 && !carried && score > 0) {
      setLastScore(score);
      setWon(true);
      // Award bonus coins for completing level
      const currentDifficulty = useGameStore.getState().difficulty;
      const bonusCoins = currentDifficulty === 'easy' ? 10 : currentDifficulty === 'medium' ? 25 : 50;
      useGameStore.getState().setCoins((c: number) => c + bonusCoins);
      setStoreScore(0);
      setStorePollution(20);
      setStoreTrees([]);
      setTimeout(() => setScreen('results'), 500);
    }
  }, [trash.length, carried, score]);

  // Lose condition
  useEffect(() => {
    if (pollution >= 100) {
      setLastScore(score);
      setWon(false);
      setStoreScore(0);
      setStorePollution(20);
      setStoreTrees([]);
      setTimeout(() => setScreen('results'), 500);
    }
  }, [pollution]);

  // run movement loop when joystick is active
  useEffect(() => {
    let raf: number | null = null;
    function loop() {
      const v = joystickRef.current;
      if (Math.abs(v.x) > 0.05 || Math.abs(v.y) > 0.05) {
        // scale speed - increased for better movement
        move(v.x * 8, v.y * 8);
      }
      raf = requestAnimationFrame(loop);
    }
    if (joystickActive) {
      loop();
    }
    return () => { if (raf) cancelAnimationFrame(raf); };
  }, [joystickActive]);

  return (
    <View style={styles.container}>
      <View style={styles.hud}>
        <View style={styles.hudTop}>
          <Text style={styles.title}>Waste Warrior</Text>
          <View style={styles.coinDisplay}>
            {/* <Text style={styles.coinIcon}>🪙</Text> */}
            <Text style={styles.coinText}>{coins} Coins</Text>
          </View>
        </View>
        <View style={styles.hudRow}>
          <Text style={styles.score}>Score: {score}</Text>
          <PollutionBar value={pollution} />
        </View>
        {nearZone && (
          <Text style={styles.hintText}> Near planting zone! Press Plant to plant a tree</Text>
        )}
        {discoveredZones.size > 0 && (
          <Text style={styles.hintText}>Zones discovered: {discoveredZones.size}/{PLANTING_ZONES.length}</Text>
        )}
      </View>

      <View style={styles.playArea}>
        <EnhancedCityBackground />
        {/* bins - positioned in a LINE with SPACING between them */}
        <RealisticBin type="plastic" x={width * 0.65} y={height * 0.28} />
        <RealisticBin type="organic" x={width * 0.80} y={height * 0.28} />
        <RealisticBin type="nonrecyclable" x={width * 0.95} y={height * 0.28} />

        {/* trash */}
        {trash.map(t => (
          <RealisticTrash key={t.id} type={t.type} x={t.x} y={t.y} />
        ))}

        {/* Planting zones - always visible so players know where to go */}
        {PLANTING_ZONES.map(zone => (
          <PlantingZone
            key={zone.id}
            x={zone.x}
            y={zone.y}
            isDiscovered={discoveredZones.has(zone.id)}
            isActive={nearZone === zone.id && score >= 3 && !trees.some(t => distance(t.x, t.y, zone.x, zone.y) < 30)}
          />
        ))}

        {/* planted trees */}
        {trees.map(t => (
          <TreeComponent key={t.id} x={t.x} y={t.y} />
        ))}

        {/* carried visual */}
        {carried && <RealisticTrash type={carried.type} x={player.x + 30} y={player.y - 10} />}

        <RealisticPlayer x={player.x} y={player.y} />
        <Particles trigger={particleTrigger} />
      </View>

      <View style={styles.controls}>
        <Joystick size={110} onMove={(nx, ny) => { joystickRef.current = { x: nx, y: ny }; setJoystickActive(true); }} onRelease={() => { joystickRef.current = { x: 0, y: 0 }; setJoystickActive(false); }} />

        <View style={styles.actions}>
          <TouchableOpacity onPress={tryPickup} style={[styles.actionBtn, { backgroundColor: '#63b3ed' }]}><Text style={styles.actionText}>Pick</Text></TouchableOpacity>
          <TouchableOpacity onPress={tryDrop} style={[styles.actionBtn, { backgroundColor: '#68d391' }]}><Text style={styles.actionText}>Drop</Text></TouchableOpacity>
          <TouchableOpacity 
            onPress={tryPlantTree} 
            style={[
              styles.actionBtn, 
              { 
                backgroundColor: (() => {
                  if (!nearZone) return '#a0aec0';
                  const zone = PLANTING_ZONES.find(z => z.id === nearZone);
                  if (!zone) return '#a0aec0';
                  const treeAtZone = trees.some(t => distance(t.x, t.y, zone.x, zone.y) < 30);
                  return treeAtZone ? '#a0aec0' : '#48bb78';
                })(),
                opacity: (() => {
                  if (!nearZone) return 0.6;
                  const zone = PLANTING_ZONES.find(z => z.id === nearZone);
                  if (!zone) return 0.6;
                  const treeAtZone = trees.some(t => distance(t.x, t.y, zone.x, zone.y) < 30);
                  return treeAtZone ? 0.6 : 1;
                })()
              }
            ]}
            disabled={(() => {
              if (!nearZone) return true;
              const zone = PLANTING_ZONES.find(z => z.id === nearZone);
              if (!zone) return true;
              return trees.some(t => distance(t.x, t.y, zone.x, zone.y) < 30);
            })()}
          >
            <Text style={styles.actionText}> Plant</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

function distance(x1: number, y1: number, x2: number, y2: number) {
  const dx = x1 - x2; const dy = y1 - y2; return Math.sqrt(dx * dx + dy * dy);
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  hud: { paddingTop: 24, paddingHorizontal: 16, paddingBottom: 8, backgroundColor: '#fff' },
  hudTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  title: { fontSize: 18, fontWeight: '700' },
  coinDisplay: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#ffd700', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 15 },
  coinIcon: { fontSize: 16, marginRight: 4 },
  coinText: { fontSize: 14, fontWeight: '800', color: '#8b6914' },
  hudRow: { marginTop: 8, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  score: { fontWeight: '700' },
  hintText: { fontSize: 12, color: '#48bb78', marginTop: 4, fontStyle: 'italic' },
  playArea: { flex: 1, backgroundColor: '#f7fafc' },
  dpad: { alignItems: 'center', gap: 8 },
  controls: { flexDirection: 'row', padding: 12, alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#fff' },
  btn: { width: 56, height: 56, borderRadius: 8, backgroundColor: '#e2e8f0', alignItems: 'center', justifyContent: 'center', margin: 6 },
  actions: { flexDirection: 'row' },
  actionBtn: { paddingHorizontal: 18, paddingVertical: 12, borderRadius: 10, marginLeft: 12 },
  actionText: { color: '#fff', fontWeight: '700' },
  trash: { position: 'absolute', width: 24, height: 24, borderRadius: 6, borderWidth: 2, borderColor: '#fff' },
  bin: { position: 'absolute', width: 80, height: 60, borderRadius: 8, alignItems: 'center', justifyContent: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.3, shadowRadius: 3, elevation: 5 },
  binPlastic: { backgroundColor: '#63b3ed', borderWidth: 2, borderColor: '#2c5aa0' },
  binOrganic: { backgroundColor: '#48bb78', borderWidth: 2, borderColor: '#22543d' },
  binTrash: { backgroundColor: '#ed8936', borderWidth: 2, borderColor: '#7c2d12' },
  binLabel: { fontSize: 24 },
  carried: { position: 'absolute', width: 20, height: 20, borderRadius: 6, borderWidth: 2, borderColor: '#fff' }
});
