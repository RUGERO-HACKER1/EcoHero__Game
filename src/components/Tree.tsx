import React from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Circle, Rect, Path, Defs, LinearGradient, Stop } from 'react-native-svg';

type Props = {
  x: number;
  y: number;
  size?: number;
};

export default function Tree({ x, y, size = 50 }: Props) {
  const trunkHeight = size * 0.4;
  const trunkWidth = size * 0.15;
  const crownRadius = size * 0.35;

  return (
    <View style={[styles.tree, { left: x - size / 2, top: y - size / 2 }]}>
      <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <Defs>
          <LinearGradient id="trunkGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <Stop offset="0%" stopColor="#8b4513" stopOpacity={1} />
            <Stop offset="100%" stopColor="#654321" stopOpacity={1} />
          </LinearGradient>
          <LinearGradient id="leafGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <Stop offset="0%" stopColor="#2d5016" stopOpacity={1} />
            <Stop offset="50%" stopColor="#3d7a1f" stopOpacity={1} />
            <Stop offset="100%" stopColor="#2d5016" stopOpacity={1} />
          </LinearGradient>
        </Defs>

        {/* Trunk */}
        <Rect
          x={(size - trunkWidth) / 2}
          y={size - trunkHeight}
          width={trunkWidth}
          height={trunkHeight}
          fill="url(#trunkGrad)"
          rx={2}
        />

        {/* Crown - main circle */}
        <Circle
          cx={size / 2}
          cy={size - trunkHeight - crownRadius * 0.3}
          r={crownRadius}
          fill="url(#leafGrad)"
        />

        {/* Additional crown layers for depth */}
        <Circle
          cx={size / 2 - crownRadius * 0.3}
          cy={size - trunkHeight - crownRadius * 0.5}
          r={crownRadius * 0.7}
          fill="#2d5016"
          opacity={0.6}
        />
        <Circle
          cx={size / 2 + crownRadius * 0.3}
          cy={size - trunkHeight - crownRadius * 0.5}
          r={crownRadius * 0.7}
          fill="#2d5016"
          opacity={0.6}
        />

        {/* Small decorative leaves */}
        <Circle
          cx={size / 2 - crownRadius * 0.5}
          cy={size - trunkHeight - crownRadius * 0.8}
          r={crownRadius * 0.4}
          fill="#3d7a1f"
          opacity={0.8}
        />
        <Circle
          cx={size / 2 + crownRadius * 0.5}
          cy={size - trunkHeight - crownRadius * 0.8}
          r={crownRadius * 0.4}
          fill="#3d7a1f"
          opacity={0.8}
        />
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create({
  tree: {
    position: 'absolute',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5
  }
});

