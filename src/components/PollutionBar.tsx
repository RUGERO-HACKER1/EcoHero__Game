import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

type Props = { value: number };

export default function PollutionBar({ value }: Props) {
  const pct = Math.max(0, Math.min(100, value));
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Pollution</Text>
      <View style={styles.barBackground}>
        <View style={[styles.barFill, { width: `${pct}%`, backgroundColor: pct > 75 ? '#d53f3f' : pct > 40 ? '#f6ad55' : '#48bb78' }]} />
      </View>
      <Text style={styles.value}>{pct}%</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  label: { color: '#333', fontWeight: '600' },
  barBackground: { flex: 1, height: 12, backgroundColor: '#e2e8f0', borderRadius: 6, overflow: 'hidden', marginHorizontal: 8 },
  barFill: { height: 12 },
  value: { width: 48, textAlign: 'right', color: '#333', fontWeight: '700' }
});
