import React from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Rect, Circle, Path, Defs, LinearGradient, Stop, Polygon } from 'react-native-svg';

type BinType = 'plastic' | 'organic' | 'nonrecyclable';

type Props = {
  type: BinType;
  x: number;
  y: number;
};

export default function RealisticBin({ type, x, y }: Props) {
  const width = 70;
  const height = 60;

  const getBinColor = () => {
    switch (type) {
      case 'plastic':
        return { main: '#4a90e2', dark: '#1e5a8e', icon: '♻️' };
      case 'organic':
        return { main: '#28a745', dark: '#145633', icon: '🌱' };
      case 'nonrecyclable':
        return { main: '#ff6b6b', dark: '#c92a2a', icon: '🗑️' };
    }
  };

  const color = getBinColor();

  return (
    <View style={[styles.bin, { left: x - width / 2, top: y - height / 2 }]}>
      <Svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
        <Defs>
          <LinearGradient id={`binGrad${type}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <Stop offset="0%" stopColor={color.main} stopOpacity={1} />
            <Stop offset="100%" stopColor={color.dark} stopOpacity={1} />
          </LinearGradient>
        </Defs>

        {/* Main bin body */}
        <Path d={`M 8 12 L 5 55 Q 5 58 8 58 L 62 58 Q 65 58 65 55 L 62 12 Z`} fill={`url(#binGrad${type})`} />

        {/* Lid */}
        <Rect x={8} y={8} width={54} height={6} fill={color.dark} rx={2} />

        {/* Lid shine */}
        <Rect x={10} y={9} width={50} height={2} fill="#fff" opacity={0.3} rx={1} />

        {/* Handle */}
        <Path d="M 20 8 Q 35 2 50 8" stroke={color.dark} strokeWidth={2} fill="none" />

        {/* Front label area */}
        <Rect x={15} y={20} width={40} height={25} fill="#fff" opacity={0.15} rx={3} />

        {/* Shadow at bottom */}
        <Circle cx={35} cy={58} r={28} fill="#000" opacity={0.15} />
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create({
  bin: {
    position: 'absolute',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 5,
    elevation: 7
  }
});
