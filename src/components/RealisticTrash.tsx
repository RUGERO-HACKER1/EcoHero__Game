import React from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Rect, Circle, Path, Polygon, Defs, LinearGradient, Stop } from 'react-native-svg';

type TrashType = 'plastic' | 'organic' | 'nonrecyclable';

type Props = {
  type: TrashType;
  x: number;
  y: number;
};

export default function RealisticTrash({ type, x, y }: Props) {
  const size = 28;

  const renderTrash = () => {
    switch (type) {
      case 'plastic':
        return (
          <Svg width={size} height={size} viewBox="0 0 28 28">
            <Defs>
              <LinearGradient id="plasticGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <Stop offset="0%" stopColor="#87ceeb" stopOpacity={1} />
                <Stop offset="100%" stopColor="#4a90e2" stopOpacity={1} />
              </LinearGradient>
            </Defs>
            {/* Bottle */}
            <Rect x={9} y={4} width={10} height={16} fill="url(#plasticGrad)" rx={2} />
            {/* Cap */}
            <Rect x={8} y={2} width={12} height={3} fill="#333" rx={1} />
            {/* Water inside */}
            <Rect x={10} y={14} width={8} height={5} fill="#87ceeb" opacity={0.7} />
            {/* Shine */}
            <Rect x={10} y={5} width={2} height={8} fill="#fff" opacity={0.4} />
            {/* Bottom */}
            <Circle cx={14} cy={20} r={3} fill="#1e5a8e" opacity={0.3} />
          </Svg>
        );
      case 'organic':
        return (
          <Svg width={size} height={size} viewBox="0 0 28 28">
            <Defs>
              <LinearGradient id="appleGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <Stop offset="0%" stopColor="#ff6b6b" stopOpacity={1} />
                <Stop offset="100%" stopColor="#c92a2a" stopOpacity={1} />
              </LinearGradient>
            </Defs>
            {/* Apple */}
            <Circle cx={14} cy={14} r={9} fill="url(#appleGrad)" />
            {/* Stem */}
            <Rect x={12.5} y={3} width={3} height={8} fill="#8B4513" rx={1} />
            {/* Leaf */}
            <Path d="M 16 8 Q 20 7 22 10 Q 20 9 16 10" fill="#28a745" />
            {/* Shine */}
            <Circle cx={11} cy={10} r={2.5} fill="#fff" opacity={0.5} />
          </Svg>
        );
      case 'nonrecyclable':
        return (
          <Svg width={size} height={size} viewBox="0 0 28 28">
            <Defs>
              <LinearGradient id="brinGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <Stop offset="0%" stopColor="#d4a574" stopOpacity={1} />
                <Stop offset="100%" stopColor="#a0826d" stopOpacity={1} />
              </LinearGradient>
            </Defs>
            {/* Bag */}
            <Path d="M 6 8 L 8 20 Q 14 22 20 20 L 22 8 Z" fill="url(#brinGrad)" />
            {/* Crumples */}
            <Path d="M 10 10 L 12 18" stroke="#8B7355" strokeWidth={0.5} />
            <Path d="M 14 9 L 14 19" stroke="#8B7355" strokeWidth={0.5} />
            <Path d="M 18 10 L 16 18" stroke="#8B7355" strokeWidth={0.5} />
            {/* Handle */}
            <Path d="M 9 8 Q 14 4 19 8" stroke="#8B7355" strokeWidth={1.5} fill="none" />
          </Svg>
        );
    }
  };

  return (
    <View style={[styles.trash, { left: x - size / 2, top: y - size / 2 }]}>
      {renderTrash()}
    </View>
  );
}

const styles = StyleSheet.create({
  trash: {
    position: 'absolute',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 4
  }
});
