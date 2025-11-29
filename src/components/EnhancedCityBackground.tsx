import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Dimensions, Animated } from 'react-native';
import Svg, { Rect, Circle, Path, Line, Defs, LinearGradient, Stop, Ellipse } from 'react-native-svg';

const { width, height } = Dimensions.get('window');

// Car component
function AnimatedCar({ xValue, yPos }: { xValue: Animated.Value; yPos: number }) {
  return (
    <Animated.View
      style={{
        position: 'absolute',
        width: 80,
        height: 35,
        top: yPos,
        left: xValue
      }}
    >
      <Svg width={80} height={35} viewBox="0 0 80 35">
        {/* Car body */}
        <Rect x={10} y={15} width={60} height={12} rx={2} fill="#e74c3c" />
        {/* Cabin */}
        <Rect x={20} y={8} width={40} height={10} rx={2} fill="#c0392b" />
        {/* Windows */}
        <Rect x={22} y={9} width={14} height={8} fill="#87ceeb" opacity={0.6} />
        <Rect x={44} y={9} width={14} height={8} fill="#87ceeb" opacity={0.6} />
        {/* Wheels */}
        <Circle cx={20} cy={28} r={4} fill="#333" />
        <Circle cx={60} cy={28} r={4} fill="#333" />
        {/* Wheel shine */}
        <Circle cx={19} cy={27} r={1.5} fill="#666" />
        <Circle cx={59} cy={27} r={1.5} fill="#666" />
      </Svg>
    </Animated.View>
  );
}

// Person component
function Person({ x, y, shirt }: { x: number; y: number; shirt: string }) {
  return (
    <View style={{ position: 'absolute', left: x, top: y }}>
      <Svg width={18} height={28} viewBox="0 0 18 28">
        {/* Head */}
        <Circle cx={9} cy={4} r={3.5} fill="#fdbf6e" />
        {/* Eyes */}
        <Circle cx={7.5} cy={3.5} r={0.8} fill="#333" />
        <Circle cx={10.5} cy={3.5} r={0.8} fill="#333" />
        {/* Smile */}
        <Path d="M 7.5 4.5 Q 9 5.2 10.5 4.5" stroke="#333" strokeWidth={0.5} fill="none" />
        {/* Body */}
        <Rect x={6} y={8} width={6} height={7} fill={shirt} rx={1} />
        {/* Arms */}
        <Rect x={4} y={9} width={2} height={6} fill="#fdbf6e" rx={1} />
        <Rect x={12} y={9} width={2} height={6} fill="#fdbf6e" rx={1} />
        {/* Legs */}
        <Rect x={7} y={15} width={1.5} height={8} fill="#333" />
        <Rect x={9.5} y={15} width={1.5} height={8} fill="#333" />
        {/* Shoes */}
        <Rect x={6.5} y={22.5} width={2.5} height={2} fill="#1a1a1a" rx={0.5} />
        <Rect x={9} y={22.5} width={2.5} height={2} fill="#1a1a1a" rx={0.5} />
      </Svg>
    </View>
  );
}

// Construction worker
function ConstructionWorker({ x, y }: { x: number; y: number }) {
  return (
    <View style={{ position: 'absolute', left: x, top: y }}>
      <Svg width={20} height={32} viewBox="0 0 20 32">
        {/* Hard hat */}
        <Ellipse cx={10} cy={4} rx={5} ry={4} fill="#ff6b6b" />
        <Path d="M 5.5 4 Q 5 6 10 6 Q 15 6 14.5 4" fill="#333" />
        {/* Head */}
        <Circle cx={10} cy={5.5} r={3} fill="#fdbf6e" />
        {/* Body */}
        <Rect x={6.5} y={9} width={7} height={9} fill="#ff9800" rx={1} />
        {/* Pants */}
        <Rect x={7} y={18} width={3} height={8} fill="#666" />
        <Rect x={10} y={18} width={3} height={8} fill="#666" />
        {/* Tool - wrench */}
        <Path d="M 4 12 L 4 14 Q 4 16 6 16" stroke="#666" strokeWidth={1.5} fill="none" />
      </Svg>
    </View>
  );
}

// Animated walking person
function AnimatedPerson({ xValue, y, shirt, delay = 0 }: { xValue: Animated.Value; y: number; shirt: string; delay?: number }) {
  return (
    <Animated.View
      style={{
        position: 'absolute',
        top: y,
        left: xValue
      }}
    >
      <Person x={0} y={0} shirt={shirt} />
    </Animated.View>
  );
}

// Dog component
function Dog({ x, y }: { x: number; y: number }) {
  return (
    <View style={{ position: 'absolute', left: x, top: y }}>
      <Svg width={20} height={16} viewBox="0 0 20 16">
        {/* Body */}
        <Ellipse cx={10} cy={8} rx={6} ry={4} fill="#8b4513" />
        {/* Head */}
        <Circle cx={10} cy={4} r={3.5} fill="#8b4513" />
        {/* Ears */}
        <Path d="M 7 3 Q 6 1 8 2" fill="#654321" />
        <Path d="M 13 3 Q 14 1 12 2" fill="#654321" />
        {/* Snout */}
        <Ellipse cx={10} cy={5} rx={1.5} ry={1} fill="#654321" />
        {/* Eyes */}
        <Circle cx={8.5} cy={3.5} r={0.8} fill="#333" />
        <Circle cx={11.5} cy={3.5} r={0.8} fill="#333" />
        {/* Tail */}
        <Path d="M 16 8 Q 18 6 18 10" stroke="#8b4513" strokeWidth={2} fill="none" />
        {/* Legs */}
        <Rect x={7} y={11} width={1.5} height={4} fill="#654321" />
        <Rect x={11.5} y={11} width={1.5} height={4} fill="#654321" />
      </Svg>
    </View>
  );
}

// Cat component
function Cat({ x, y }: { x: number; y: number }) {
  return (
    <View style={{ position: 'absolute', left: x, top: y }}>
      <Svg width={18} height={18} viewBox="0 0 18 18">
        {/* Body */}
        <Ellipse cx={9} cy={10} rx={5} ry={4} fill="#ffa500" />
        {/* Head */}
        <Circle cx={9} cy={5} r={4} fill="#ffa500" />
        {/* Ears */}
        <Path d="M 6 3 L 7 1 L 8 3" fill="#ff8c00" />
        <Path d="M 10 3 L 11 1 L 12 3" fill="#ff8c00" />
        {/* Eyes */}
        <Circle cx={7.5} cy={5} r={1} fill="#333" />
        <Circle cx={10.5} cy={5} r={1} fill="#333" />
        {/* Nose */}
        <Path d="M 8.5 6.5 L 9 7.5 L 9.5 6.5 Z" fill="#ff69b4" />
        {/* Tail */}
        <Path d="M 14 10 Q 16 8 17 12" stroke="#ffa500" strokeWidth={2} fill="none" />
        {/* Legs */}
        <Rect x={6.5} y={13} width={1.5} height={4} fill="#ff8c00" />
        <Rect x={10} y={13} width={1.5} height={4} fill="#ff8c00" />
      </Svg>
    </View>
  );
}

// Bird component
function Bird({ x, y }: { x: number; y: number }) {
  return (
    <View style={{ position: 'absolute', left: x, top: y }}>
      <Svg width={16} height={12} viewBox="0 0 16 12">
        {/* Body */}
        <Ellipse cx={8} cy={6} rx={3} ry={2.5} fill="#4169e1" />
        {/* Head */}
        <Circle cx={8} cy={3} r={2} fill="#4169e1" />
        {/* Beak */}
        <Path d="M 6 3 L 4 2.5 L 6 4 Z" fill="#ffa500" />
        {/* Eye */}
        <Circle cx={8.5} cy={2.5} r={0.5} fill="#333" />
        {/* Wings */}
        <Ellipse cx={7} cy={6} rx={2} ry={1.5} fill="#1e90ff" opacity={0.7} />
        {/* Tail */}
        <Path d="M 11 6 L 13 5 L 13 7 Z" fill="#4169e1" />
      </Svg>
    </View>
  );
}

// Animated animal component
function AnimatedAnimal({ xValue, y, type }: { xValue: Animated.Value; y: number; type: 'dog' | 'cat' | 'bird' }) {
  return (
    <Animated.View
      style={{
        position: 'absolute',
        top: y,
        left: xValue
      }}
    >
      {type === 'dog' && <Dog x={0} y={0} />}
      {type === 'cat' && <Cat x={0} y={0} />}
      {type === 'bird' && <Bird x={0} y={0} />}
    </Animated.View>
  );
}

export default function EnhancedCityBackground() {
  const car1X = useRef(new Animated.Value(-80)).current;
  const car2X = useRef(new Animated.Value(width + 100)).current;
  const car3X = useRef(new Animated.Value(-100)).current;
  const car4X = useRef(new Animated.Value(width + 120)).current;
  const car5X = useRef(new Animated.Value(-90)).current;
  const car6X = useRef(new Animated.Value(width + 110)).current;
  
  // Walking people - many more characters
  const person1X = useRef(new Animated.Value(-20)).current;
  const person2X = useRef(new Animated.Value(width + 20)).current;
  const person3X = useRef(new Animated.Value(-20)).current;
  const person4X = useRef(new Animated.Value(width + 20)).current;
  const person5X = useRef(new Animated.Value(-20)).current;
  const person6X = useRef(new Animated.Value(width + 20)).current;
  const person7X = useRef(new Animated.Value(-20)).current;
  const person8X = useRef(new Animated.Value(width + 20)).current;
  
  // Animated animals
  const dog1X = useRef(new Animated.Value(-25)).current;
  const dog2X = useRef(new Animated.Value(width + 25)).current;
  const cat1X = useRef(new Animated.Value(-20)).current;
  const cat2X = useRef(new Animated.Value(width + 20)).current;
  const bird1X = useRef(new Animated.Value(-15)).current;
  const bird2X = useRef(new Animated.Value(width + 15)).current;
  const bird3X = useRef(new Animated.Value(-15)).current;

  useEffect(() => {
    // Car 1 - left to right (top lane)
    Animated.loop(
      Animated.sequence([
        Animated.delay(0),
        Animated.timing(car1X, {
          toValue: width + 80,
          duration: 10000,
          useNativeDriver: false
        }),
        Animated.timing(car1X, {
          toValue: -80,
          duration: 0,
          useNativeDriver: false
        })
      ])
    ).start();

    // Car 2 - right to left (top lane, opposite direction)
    Animated.loop(
      Animated.sequence([
        Animated.delay(2000),
        Animated.timing(car2X, {
          toValue: -80,
          duration: 12000,
          useNativeDriver: false
        }),
        Animated.timing(car2X, {
          toValue: width + 100,
          duration: 0,
          useNativeDriver: false
        })
      ])
    ).start();

    // Car 3 - left to right (bottom lane)
    Animated.loop(
      Animated.sequence([
        Animated.delay(1000),
        Animated.timing(car3X, {
          toValue: width + 100,
          duration: 11000,
          useNativeDriver: false
        }),
        Animated.timing(car3X, {
          toValue: -100,
          duration: 0,
          useNativeDriver: false
        })
      ])
    ).start();

    // Car 4 - right to left (bottom lane, opposite direction)
    Animated.loop(
      Animated.sequence([
        Animated.delay(3000),
        Animated.timing(car4X, {
          toValue: -100,
          duration: 13000,
          useNativeDriver: false
        }),
        Animated.timing(car4X, {
          toValue: width + 120,
          duration: 0,
          useNativeDriver: false
        })
      ])
    ).start();

    // Person 1 - walking left to right (sidewalk)
    Animated.loop(
      Animated.sequence([
        Animated.delay(0),
        Animated.timing(person1X, {
          toValue: width + 20,
          duration: 15000,
          useNativeDriver: false
        }),
        Animated.timing(person1X, {
          toValue: -20,
          duration: 0,
          useNativeDriver: false
        })
      ])
    ).start();

    // Person 2 - walking right to left (sidewalk)
    Animated.loop(
      Animated.sequence([
        Animated.delay(5000),
        Animated.timing(person2X, {
          toValue: -20,
          duration: 18000,
          useNativeDriver: false
        }),
        Animated.timing(person2X, {
          toValue: width + 20,
          duration: 0,
          useNativeDriver: false
        })
      ])
    ).start();

    // Person 3 - walking left to right (upper sidewalk)
    Animated.loop(
      Animated.sequence([
        Animated.delay(2000),
        Animated.timing(person3X, {
          toValue: width + 20,
          duration: 20000,
          useNativeDriver: false
        }),
        Animated.timing(person3X, {
          toValue: -20,
          duration: 0,
          useNativeDriver: false
        })
      ])
    ).start();

    // Person 4 - walking right to left (upper sidewalk)
    Animated.loop(
      Animated.sequence([
        Animated.delay(8000),
        Animated.timing(person4X, {
          toValue: -20,
          duration: 16000,
          useNativeDriver: false
        }),
        Animated.timing(person4X, {
          toValue: width + 20,
          duration: 0,
          useNativeDriver: false
        })
      ])
    ).start();

    // Car 5 - additional car
    Animated.loop(
      Animated.sequence([
        Animated.delay(4000),
        Animated.timing(car5X, {
          toValue: width + 90,
          duration: 9500,
          useNativeDriver: false
        }),
        Animated.timing(car5X, {
          toValue: -90,
          duration: 0,
          useNativeDriver: false
        })
      ])
    ).start();

    // Car 6 - additional car
    Animated.loop(
      Animated.sequence([
        Animated.delay(6000),
        Animated.timing(car6X, {
          toValue: -110,
          duration: 10500,
          useNativeDriver: false
        }),
        Animated.timing(car6X, {
          toValue: width + 110,
          duration: 0,
          useNativeDriver: false
        })
      ])
    ).start();

    // Person 5 - walking left to right
    Animated.loop(
      Animated.sequence([
        Animated.delay(3000),
        Animated.timing(person5X, {
          toValue: width + 20,
          duration: 17000,
          useNativeDriver: false
        }),
        Animated.timing(person5X, {
          toValue: -20,
          duration: 0,
          useNativeDriver: false
        })
      ])
    ).start();

    // Person 6 - walking right to left
    Animated.loop(
      Animated.sequence([
        Animated.delay(7000),
        Animated.timing(person6X, {
          toValue: -20,
          duration: 19000,
          useNativeDriver: false
        }),
        Animated.timing(person6X, {
          toValue: width + 20,
          duration: 0,
          useNativeDriver: false
        })
      ])
    ).start();

    // Person 7 - walking left to right
    Animated.loop(
      Animated.sequence([
        Animated.delay(4000),
        Animated.timing(person7X, {
          toValue: width + 20,
          duration: 22000,
          useNativeDriver: false
        }),
        Animated.timing(person7X, {
          toValue: -20,
          duration: 0,
          useNativeDriver: false
        })
      ])
    ).start();

    // Person 8 - walking right to left
    Animated.loop(
      Animated.sequence([
        Animated.delay(9000),
        Animated.timing(person8X, {
          toValue: -20,
          duration: 18000,
          useNativeDriver: false
        }),
        Animated.timing(person8X, {
          toValue: width + 20,
          duration: 0,
          useNativeDriver: false
        })
      ])
    ).start();

    // Dog 1 - running left to right (fast)
    Animated.loop(
      Animated.sequence([
        Animated.delay(1000),
        Animated.timing(dog1X, {
          toValue: width + 25,
          duration: 8000, // Fast movement
          useNativeDriver: false
        }),
        Animated.timing(dog1X, {
          toValue: -25,
          duration: 0,
          useNativeDriver: false
        })
      ])
    ).start();

    // Dog 2 - running right to left (fast)
    Animated.loop(
      Animated.sequence([
        Animated.delay(4000),
        Animated.timing(dog2X, {
          toValue: -25,
          duration: 9000,
          useNativeDriver: false
        }),
        Animated.timing(dog2X, {
          toValue: width + 25,
          duration: 0,
          useNativeDriver: false
        })
      ])
    ).start();

    // Cat 1 - walking left to right (slow)
    Animated.loop(
      Animated.sequence([
        Animated.delay(2000),
        Animated.timing(cat1X, {
          toValue: width + 20,
          duration: 20000, // Slow movement
          useNativeDriver: false
        }),
        Animated.timing(cat1X, {
          toValue: -20,
          duration: 0,
          useNativeDriver: false
        })
      ])
    ).start();

    // Cat 2 - walking right to left (slow)
    Animated.loop(
      Animated.sequence([
        Animated.delay(6000),
        Animated.timing(cat2X, {
          toValue: -20,
          duration: 22000,
          useNativeDriver: false
        }),
        Animated.timing(cat2X, {
          toValue: width + 20,
          duration: 0,
          useNativeDriver: false
        })
      ])
    ).start();

    // Bird 1 - flying left to right (very fast)
    Animated.loop(
      Animated.sequence([
        Animated.delay(0),
        Animated.timing(bird1X, {
          toValue: width + 15,
          duration: 6000, // Very fast
          useNativeDriver: false
        }),
        Animated.timing(bird1X, {
          toValue: -15,
          duration: 0,
          useNativeDriver: false
        })
      ])
    ).start();

    // Bird 2 - flying right to left (very fast)
    Animated.loop(
      Animated.sequence([
        Animated.delay(3000),
        Animated.timing(bird2X, {
          toValue: -15,
          duration: 7000,
          useNativeDriver: false
        }),
        Animated.timing(bird2X, {
          toValue: width + 15,
          duration: 0,
          useNativeDriver: false
        })
      ])
    ).start();

    // Bird 3 - flying left to right (medium speed)
    Animated.loop(
      Animated.sequence([
        Animated.delay(5000),
        Animated.timing(bird3X, {
          toValue: width + 15,
          duration: 10000,
          useNativeDriver: false
        }),
        Animated.timing(bird3X, {
          toValue: -15,
          duration: 0,
          useNativeDriver: false
        })
      ])
    ).start();
  }, []);

  return (
    <View style={styles.container}>
      <Svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
        <Defs>
          <LinearGradient id="skyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <Stop offset="0%" stopColor="#87ceeb" stopOpacity={1} />
            <Stop offset="100%" stopColor="#e0f6ff" stopOpacity={1} />
          </LinearGradient>
          <LinearGradient id="roadGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <Stop offset="0%" stopColor="#555" stopOpacity={1} />
            <Stop offset="100%" stopColor="#222" stopOpacity={1} />
          </LinearGradient>
        </Defs>

        {/* Sky */}
        <Rect width={width} height={height * 0.65} fill="url(#skyGrad)" />

        {/* Clouds - floating */}
        <Circle cx={width * 0.15} cy={50} r={22} fill="#fff" opacity={0.85} />
        <Circle cx={width * 0.22} cy={58} r={18} fill="#fff" opacity={0.85} />
        <Circle cx={width * 0.75} cy={85} r={26} fill="#fff" opacity={0.75} />
        <Circle cx={width * 0.68} cy={75} r={20} fill="#fff" opacity={0.75} />

        {/* Sun */}
        <Circle cx={width * 0.9} cy={45} r={25} fill="#ffeb3b" opacity={0.9} />

        {/* Background buildings */}
        <Rect x={5} y={height * 0.48} width={width * 0.25} height={height * 0.28} fill="#d4735f" />
        {[0, 1, 2, 3].map((i) => (
          <Rect key={`bw1-${i}`} x={15 + i * 40} y={height * 0.53 + 5} width={28} height={28} fill="#ffeb3b" opacity={0.65} />
        ))}

        {/* Middle background building */}
        <Rect x={width * 0.28} y={height * 0.45} width={width * 0.22} height={height * 0.31} fill="#c85a54" />
        {[0, 1, 2, 3].map((i) => (
          <Rect key={`bw2-${i}`} x={width * 0.33 + i * 35} y={height * 0.5 + 8} width={26} height={26} fill="#fff" opacity={0.6} />
        ))}

        {/* Right background building */}
        <Rect x={width * 0.53} y={height * 0.5} width={width * 0.26} height={height * 0.26} fill="#b85a47" />
        {[0, 1, 2, 3].map((i) => (
          <Rect key={`bw3-${i}`} x={width * 0.58 + i * 38} y={height * 0.55 + 8} width={30} height={30} fill="#ffeb3b" opacity={0.65} />
        ))}

        {/* Foreground building */}
        <Rect x={width * 0.8} y={height * 0.52} width={width * 0.2} height={height * 0.24} fill="#9d4c3d" />
        {[0, 1].map((i) => (
          <Rect key={`bw4-${i}`} x={width * 0.85 + i * 42} y={height * 0.57 + 8} width={32} height={32} fill="#fff" opacity={0.5} />
        ))}

        {/* Street/Road - Main road in the CENTER of screen */}
        <Rect x={0} y={height * 0.45} width={width} height={height * 0.10} fill="url(#roadGrad)" />

        {/* Sidewalk upper */}
        <Rect x={0} y={height * 0.45} width={width} height={6} fill="#bbb" />

        {/* Road lanes - top lane */}
        <Line x1={0} y1={height * 0.48} x2={width} y2={height * 0.48} stroke="#ffeb3b" strokeWidth={1.5} strokeDasharray="15,10" />
        
        {/* Road center line - double yellow */}
        <Line x1={0} y1={height * 0.50} x2={width} y2={height * 0.50} stroke="#ffeb3b" strokeWidth={3} />
        <Line x1={0} y1={height * 0.50 + 2} x2={width} y2={height * 0.50 + 2} stroke="#ffeb3b" strokeWidth={1.5} strokeDasharray="20,12" />
        
        {/* Road lanes - bottom lane */}
        <Line x1={0} y1={height * 0.52} x2={width} y2={height * 0.52} stroke="#ffeb3b" strokeWidth={1.5} strokeDasharray="15,10" />

        {/* Sidewalk lower */}
        <Rect x={0} y={height * 0.55 - 6} width={width} height={6} fill="#999" />
        
        {/* Road markings - crosswalk style */}
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <Rect key={`cross-${i}`} x={width * 0.1 + i * (width * 0.15)} y={height * 0.50 - 1} width={width * 0.05} height={2} fill="#fff" />
        ))}

        {/* Vendor stall on left */}
        <Rect x={width * 0.08} y={height * 0.71} width={65} height={45} fill="#d4735f" rx={3} />
        <Path d={`M ${width * 0.08} ${height * 0.71} L ${width * 0.08 + 32.5} ${height * 0.60} L ${width * 0.08 + 65} ${height * 0.71}`} fill="#ff6b6b" />
        <Rect x={width * 0.1} y={height * 0.77} width={18} height={15} fill="#fff" opacity={0.4} />
        <Rect x={width * 0.33} y={height * 0.77} width={18} height={15} fill="#fff" opacity={0.4} />

        {/* Street lamp */}
        <Line x1={width * 0.5} y1={height * 0.5} x2={width * 0.5} y2={height * 0.76} stroke="#333" strokeWidth={2} />
        <Circle cx={width * 0.5} cy={height * 0.5} r={10} fill="#ffeb3b" opacity={0.7} />
        <Circle cx={width * 0.5 - 8} cy={height * 0.52} r={7} fill="#ffeb3b" opacity={0.5} />

        {/* Trash bins on right */}
        <Rect x={width * 0.72} y={height * 0.82} width={25} height={35} fill="#555" rx={2} />
        <Rect x={width * 0.72} y={height * 0.78} width={25} height={4} fill="#333" rx={1} />
      </Svg>

      {/* Animated cars - top lane (centered road) */}
      <AnimatedCar xValue={car1X} yPos={height * 0.48} />

      {/* Car 2 moving opposite direction - top lane */}
      <Animated.View
        style={{
          position: 'absolute',
          width: 80,
          height: 35,
          top: height * 0.48,
          left: car2X,
          transform: [{ scaleX: -1 }]
        }}
      >
        <Svg width={80} height={35} viewBox="0 0 80 35">
          {/* Car body */}
          <Rect x={10} y={15} width={60} height={12} rx={2} fill="#2ecc71" />
          {/* Cabin */}
          <Rect x={20} y={8} width={40} height={10} rx={2} fill="#27ae60" />
          {/* Windows */}
          <Rect x={22} y={9} width={14} height={8} fill="#87ceeb" opacity={0.6} />
          <Rect x={44} y={9} width={14} height={8} fill="#87ceeb" opacity={0.6} />
          {/* Wheels */}
          <Circle cx={20} cy={28} r={4} fill="#333" />
          <Circle cx={60} cy={28} r={4} fill="#333" />
        </Svg>
      </Animated.View>

      {/* Car 3 - bottom lane left to right */}
      <Animated.View
        style={{
          position: 'absolute',
          width: 80,
          height: 35,
          top: height * 0.52,
          left: car3X
        }}
      >
        <Svg width={80} height={35} viewBox="0 0 80 35">
          {/* Car body */}
          <Rect x={10} y={15} width={60} height={12} rx={2} fill="#3498db" />
          {/* Cabin */}
          <Rect x={20} y={8} width={40} height={10} rx={2} fill="#2980b9" />
          {/* Windows */}
          <Rect x={22} y={9} width={14} height={8} fill="#87ceeb" opacity={0.6} />
          <Rect x={44} y={9} width={14} height={8} fill="#87ceeb" opacity={0.6} />
          {/* Wheels */}
          <Circle cx={20} cy={28} r={4} fill="#333" />
          <Circle cx={60} cy={28} r={4} fill="#333" />
        </Svg>
      </Animated.View>

      {/* Car 4 - bottom lane right to left */}
      <Animated.View
        style={{
          position: 'absolute',
          width: 80,
          height: 35,
          top: height * 0.52,
          left: car4X,
          transform: [{ scaleX: -1 }]
        }}
      >
        <Svg width={80} height={35} viewBox="0 0 80 35">
          {/* Car body */}
          <Rect x={10} y={15} width={60} height={12} rx={2} fill="#f39c12" />
          {/* Cabin */}
          <Rect x={20} y={8} width={40} height={10} rx={2} fill="#e67e22" />
          {/* Windows */}
          <Rect x={22} y={9} width={14} height={8} fill="#87ceeb" opacity={0.6} />
          <Rect x={44} y={9} width={14} height={8} fill="#87ceeb" opacity={0.6} />
          {/* Wheels */}
          <Circle cx={20} cy={28} r={4} fill="#333" />
          <Circle cx={60} cy={28} r={4} fill="#333" />
        </Svg>
      </Animated.View>

      {/* Car 5 - additional */}
      <Animated.View
        style={{
          position: 'absolute',
          width: 80,
          height: 35,
          top: height * 0.48,
          left: car5X
        }}
      >
        <Svg width={80} height={35} viewBox="0 0 80 35">
          <Rect x={10} y={15} width={60} height={12} rx={2} fill="#9b59b6" />
          <Rect x={20} y={8} width={40} height={10} rx={2} fill="#8e44ad" />
          <Rect x={22} y={9} width={14} height={8} fill="#87ceeb" opacity={0.6} />
          <Rect x={44} y={9} width={14} height={8} fill="#87ceeb" opacity={0.6} />
          <Circle cx={20} cy={28} r={4} fill="#333" />
          <Circle cx={60} cy={28} r={4} fill="#333" />
        </Svg>
      </Animated.View>

      {/* Car 6 - additional */}
      <Animated.View
        style={{
          position: 'absolute',
          width: 80,
          height: 35,
          top: height * 0.52,
          left: car6X,
          transform: [{ scaleX: -1 }]
        }}
      >
        <Svg width={80} height={35} viewBox="0 0 80 35">
          <Rect x={10} y={15} width={60} height={12} rx={2} fill="#e91e63" />
          <Rect x={20} y={8} width={40} height={10} rx={2} fill="#c2185b" />
          <Rect x={22} y={9} width={14} height={8} fill="#87ceeb" opacity={0.6} />
          <Rect x={44} y={9} width={14} height={8} fill="#87ceeb" opacity={0.6} />
          <Circle cx={20} cy={28} r={4} fill="#333" />
          <Circle cx={60} cy={28} r={4} fill="#333" />
        </Svg>
      </Animated.View>

      {/* Animated walking people - upper area (above road) */}
      <AnimatedPerson xValue={person3X} y={height * 0.30} shirt="#2b6cb0" />
      <AnimatedPerson xValue={person4X} y={height * 0.32} shirt="#f5a3ba" delay={2000} />
      <AnimatedPerson xValue={person5X} y={height * 0.28} shirt="#ff9800" />
      <AnimatedPerson xValue={person6X} y={height * 0.34} shirt="#00bcd4" />

      {/* Animated walking people - lower area (below road) */}
      <AnimatedPerson xValue={person1X} y={height * 0.70} shirt="#7cb342" />
      <AnimatedPerson xValue={person2X} y={height * 0.72} shirt="#9b59b6" delay={5000} />
      <AnimatedPerson xValue={person7X} y={height * 0.68} shirt="#ff5722" />
      <AnimatedPerson xValue={person8X} y={height * 0.74} shirt="#607d8b" />

      {/* Static city people (for variety) */}
      <ConstructionWorker x={width * 0.63} y={height * 0.35} />
      <Person x={width * 0.25} y={height * 0.30} shirt="#795548" />
      <Person x={width * 0.75} y={height * 0.70} shirt="#009688" />

      {/* Animated animals - dogs running */}
      <AnimatedAnimal xValue={dog1X} y={height * 0.35} type="dog" />
      <AnimatedAnimal xValue={dog2X} y={height * 0.38} type="dog" />

      {/* Animated animals - cats walking */}
      <AnimatedAnimal xValue={cat1X} y={height * 0.40} type="cat" />
      <AnimatedAnimal xValue={cat2X} y={height * 0.42} type="cat" />

      {/* Animated animals - birds flying */}
      <AnimatedAnimal xValue={bird1X} y={height * 0.15} type="bird" />
      <AnimatedAnimal xValue={bird2X} y={height * 0.20} type="bird" />
      <AnimatedAnimal xValue={bird3X} y={height * 0.18} type="bird" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width,
    height,
    overflow: 'hidden',
    backgroundColor: '#fff'
  }
});
