import React from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Circle, Rect } from 'react-native-svg';

type Props = {
  x: number;
  y: number;
  size?: number;
};

export default function Player({ x, y, size = 40 }: Props) {
  const headSize = size * 0.4;
  const bodyWidth = size * 0.5;
  const bodyHeight = size * 0.45;

  return (
    <View style={[styles.player, { left: x - size / 2, top: y - size / 2, width: size, height: size }]}>
      <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {/* Head */}
        <Circle cx={size / 2} cy={headSize / 2 + 2} r={headSize / 2} fill="#fdbf6e" />
        {/* Eyes */}
        <Circle cx={size / 2 - 4} cy={headSize / 2} r={2} fill="#333" />
        <Circle cx={size / 2 + 4} cy={headSize / 2} r={2} fill="#333" />
        {/* Body */}
        <Rect x={(size - bodyWidth) / 2} y={headSize + 4} width={bodyWidth} height={bodyHeight} fill="#2b6cb0" rx={3} />
        {/* Arms */}
        <Rect x={(size - bodyWidth) / 2 - 6} y={headSize + 6} width={6} height={bodyHeight * 0.6} fill="#fdbf6e" rx={2} />
        <Rect x={(size - bodyWidth) / 2 + bodyWidth} y={headSize + 6} width={6} height={bodyHeight * 0.6} fill="#fdbf6e" rx={2} />
        {/* Legs */}
        <Rect x={(size - bodyWidth) / 2 + 4} y={headSize + bodyHeight + 4} width={bodyWidth * 0.35} height={6} fill="#333" rx={2} />
        <Rect x={(size - bodyWidth) / 2 + bodyWidth * 0.65} y={headSize + bodyHeight + 4} width={bodyWidth * 0.35} height={6} fill="#333" rx={2} />
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create({
  player: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5
  }
});
