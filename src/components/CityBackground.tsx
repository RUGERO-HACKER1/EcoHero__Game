import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Svg, { Rect, Circle, Line } from 'react-native-svg';

const { width, height } = Dimensions.get('window');

export default function CityBackground() {
  return (
    <View style={styles.container}>
      <Svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
        {/* Sky */}
        <Rect width={width} height={height * 0.6} fill="#87ceeb" />

        {/* Clouds */}
        <Circle cx={width * 0.2} cy={60} r={20} fill="#fff" opacity={0.8} />
        <Circle cx={width * 0.25} cy={65} r={18} fill="#fff" opacity={0.8} />
        <Circle cx={width * 0.8} cy={80} r={22} fill="#fff" opacity={0.7} />
        <Circle cx={width * 0.75} cy={75} r={20} fill="#fff" opacity={0.7} />

        {/* Buildings (background) */}
        <Rect x={10} y={height * 0.45} width={width * 0.25} height={height * 0.3} fill="#d4735f" />
        <Rect x={width * 0.28} y={height * 0.42} width={width * 0.22} height={height * 0.33} fill="#c85a54" />
        <Rect x={width * 0.52} y={height * 0.48} width={width * 0.26} height={height * 0.27} fill="#b85a47" />
        <Rect x={width * 0.8} y={height * 0.50} width={width * 0.2} height={height * 0.25} fill="#a84f3d" />

        {/* Building windows */}
        {[0, 1, 2].map((row) =>
          [0, 1, 2, 3].map((col) => (
            <Rect key={`w-${row}-${col}`} x={30 + col * 30} y={height * 0.5 + row * 30} width={20} height={20} fill="#ffeb3b" opacity={0.7} />
          ))
        )}
        {[0, 1, 2].map((row) =>
          [0, 1, 2].map((col) => (
            <Rect key={`w2-${row}-${col}`} x={width * 0.3 + col * 32} y={height * 0.45 + row * 30} width={20} height={20} fill="#fff" opacity={0.6} />
          ))
        )}

        {/* Street */}
        <Rect x={0} y={height * 0.75} width={width} height={height * 0.25} fill="#555" />
        {/* Road markings */}
        <Line x1={0} y1={height * 0.82} x2={width} y2={height * 0.82} stroke="#ffeb3b" strokeWidth={3} strokeDasharray="10,10" />
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { position: 'absolute', width, height }
});
