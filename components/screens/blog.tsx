import React from 'react';
import { View, StyleSheet, Animated } from 'react-native';

function Blog() {
  // Type the animation variables as Animated.Value
  const animation1 = new Animated.Value(0);
  const animation2 = new Animated.Value(0.5);
  const animation3 = new Animated.Value(1);

  const startAnimation = (animation: Animated.Value) => {
    return Animated.loop(
      Animated.sequence([
        Animated.timing(animation, {
          toValue: 1.5,
          duration: 750,
          useNativeDriver: true,
        }),
        Animated.timing(animation, {
          toValue: 1,
          duration: 750,
          useNativeDriver: true,
        }),
      ])
    );
  };

  React.useEffect(() => {
    startAnimation(animation1).start();
    startAnimation(animation2).start();
    startAnimation(animation3).start();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.loadingContainer}>
        <Animated.View
          style={[styles.loadingThumb, { transform: [{ scale: animation1 }] }]}
        />
        <Animated.View
          style={[styles.loadingThumb, { transform: [{ scale: animation2 }] }]}
        />
        <Animated.View
          style={[styles.loadingThumb, { transform: [{ scale: animation3 }] }]}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  loadingContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  loadingThumb: {
    width: 10,
    height: 40,
    backgroundColor: '#41f3fd',
    margin: 4,
    borderRadius: 4,
    shadowColor: '#0882ff',
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 3,
    shadowOpacity: 0.7,
  },
});

export default Blog;
