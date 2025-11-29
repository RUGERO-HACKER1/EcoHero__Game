import React from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import Svg, { Circle, Defs, RadialGradient, Stop } from 'react-native-svg';

type Props = {
  x: number;
  y: number;
  isDiscovered: boolean;
  isActive: boolean;
};

export default function PlantingZone({ x, y, isDiscovered, isActive }: Props) {
  const size = 60;
  
  // Always show zones, but with different styles based on discovery status
  const zoneColor = isDiscovered ? (isActive ? "#48bb78" : "#68d391") : "#94a3b8";
  const zoneOpacity = isDiscovered ? 0.6 : 0.3;

  return (
    <View style={[styles.zone, { left: x - size / 2, top: y - size / 2 }]}>
      <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <Defs>
          <RadialGradient id={`zoneGrad-${x}-${y}`} cx="50%" cy="50%">
            <Stop offset="0%" stopColor={zoneColor} stopOpacity={zoneOpacity} />
            <Stop offset="100%" stopColor={zoneColor} stopOpacity={zoneOpacity * 0.5} />
          </RadialGradient>
        </Defs>
        
        {/* Outer glow circle */}
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={size / 2 - 2}
          fill={`url(#zoneGrad-${x}-${y})`}
          stroke={zoneColor}
          strokeWidth={isDiscovered ? 2 : 1}
          strokeDasharray={isActive ? "0" : (isDiscovered ? "5,5" : "3,3")}
        />
        
        {/* Inner circle */}
        {isDiscovered && (
          <Circle
            cx={size / 2}
            cy={size / 2}
            r={size / 3}
            fill={zoneColor}
            opacity={0.2}
          />
        )}
        
        {/* Center indicator - tree icon or dot */}
        {isDiscovered ? (
          isActive ? (
            <Circle
              cx={size / 2}
              cy={size / 2}
              r={4}
              fill="#48bb78"
            />
          ) : (
            <Circle
              cx={size / 2}
              cy={size / 2}
              r={3}
              fill="#68d391"
              opacity={0.6}
            />
          )
        ) : (
          // Show a question mark or dot for undiscovered zones
          <Circle
            cx={size / 2}
            cy={size / 2}
            r={2}
            fill="#94a3b8"
            opacity={0.5}
          />
        )}
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create({
  zone: {
    position: 'absolute',
    pointerEvents: 'none'
  }
});

