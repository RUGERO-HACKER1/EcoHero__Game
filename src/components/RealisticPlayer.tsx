import React from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Circle, Rect, Path, Polygon, Defs, RadialGradient, Stop } from 'react-native-svg';

type Props = {
  x: number;
  y: number;
};

export default function RealisticPlayer({ x, y }: Props) {
  const size = 50;
  return (
    <View style={[styles.player, { left: x - size / 2, top: y - size / 2 }]}>
      <Svg width={size} height={size} viewBox="0 0 50 50">
        <Defs>
          <RadialGradient id="skinGradient" cx="50%" cy="40%">
            <Stop offset="0%" stopColor="#fdbf6e" stopOpacity={1} />
            <Stop offset="100%" stopColor="#f5a856" stopOpacity={1} />
          </RadialGradient>
          <RadialGradient id="shirtGradient" cx="40%" cy="30%">
            <Stop offset="0%" stopColor="#4c9fd6" stopOpacity={1} />
            <Stop offset="100%" stopColor="#1e5a8e" stopOpacity={1} />
          </RadialGradient>
        </Defs>

        {/* Legs */}
        <Rect x={16} y={34} width={8} height={14} fill="#333" rx={2} />
        <Rect x={26} y={34} width={8} height={14} fill="#333" rx={2} />
        {/* Shoes */}
        <Rect x={15} y={47} width={10} height={3} fill="#000" rx={1} />
        <Rect x={25} y={47} width={10} height={3} fill="#000" rx={1} />

        {/* Body/Shirt */}
        <Rect x={12} y={20} width={26} height={16} fill="url(#shirtGradient)" rx={3} />

        {/* Arms */}
        <Rect x={6} y={22} width={6} height={14} fill="#fdbf6e" rx={2} />
        <Rect x={38} y={22} width={6} height={14} fill="#fdbf6e" rx={2} />

        {/* Neck */}
        <Rect x={21} y={18} width={8} height={4} fill="#fdbf6e" />

        {/* Head */}
        <Circle cx={25} cy={12} r={8} fill="url(#skinGradient)" />

        {/* Hair */}
        <Path d="M 17 10 Q 25 4 33 10" fill="#333" />

        {/* Eyes */}
        <Circle cx={22} cy={11} r={1.5} fill="#333" />
        <Circle cx={28} cy={11} r={1.5} fill="#333" />

        {/* Smile */}
        <Path d="M 22 14 Q 25 15 28 14" stroke="#333" strokeWidth={1} fill="none" />
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create({
  player: {
    position: 'absolute',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
    elevation: 6
  }
});
