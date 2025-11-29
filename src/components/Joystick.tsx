import React, { useRef } from 'react';
import { View, StyleSheet, PanResponder, GestureResponderEvent, PanResponderGestureState } from 'react-native';

type Props = {
  size?: number;
  onMove?: (dx: number, dy: number) => void;
  onRelease?: () => void;
};

export default function Joystick({ size = 120, onMove, onRelease }: Props) {
  const stickRadius = size / 2 - 20;
  const center = useRef({ x: 0, y: 0 });

  const pan = useRef(PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: () => true,
    onPanResponderGrant: (e: GestureResponderEvent) => {
      const { locationX, locationY } = e.nativeEvent;
      center.current = { x: locationX, y: locationY };
    },
    onPanResponderMove: (e: GestureResponderEvent, gs: PanResponderGestureState) => {
      const dx = gs.dx;
      const dy = gs.dy;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const mx = dist > stickRadius ? (dx / dist) * stickRadius : dx;
      const my = dist > stickRadius ? (dy / dist) * stickRadius : dy;
      const nx = mx / stickRadius; // normalized -1..1
      const ny = my / stickRadius;
      onMove && onMove(nx, ny);
    },
    onPanResponderRelease: () => {
      onRelease && onRelease();
    },
    onPanResponderTerminate: () => {
      onRelease && onRelease();
    }
  })).current;

  return (
    <View style={[styles.base, { width: size, height: size, borderRadius: size / 2 }]} {...pan.panHandlers}>
      <View style={[styles.bgCircle, { width: size - 8, height: size - 8, borderRadius: (size - 8) / 2 }]} />
      <View style={[styles.centerDot]} />
    </View>
  );
}

const styles = StyleSheet.create({
  base: { backgroundColor: 'transparent', alignItems: 'center', justifyContent: 'center' },
  bgCircle: { backgroundColor: '#e2e8f0', opacity: 0.9, alignItems: 'center', justifyContent: 'center' },
  centerDot: { width: 18, height: 18, borderRadius: 9, backgroundColor: '#fff', borderWidth: 2, borderColor: '#cbd5e1' }
});
