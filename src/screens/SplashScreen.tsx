import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, Easing } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import Screen from '../components/Screen';
import Txt from '../components/Txt';
import Icon from '../components/Icon';
import { colors, gradients, shadow } from '../theme';

export default function SplashScreen() {
  const nav = useNavigation<any>();
  const scale = useRef(new Animated.Value(0.8)).current;
  const fade = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(scale, { toValue: 1, duration: 700, easing: Easing.out(Easing.back(1.4)), useNativeDriver: true }),
      Animated.timing(fade, { toValue: 1, duration: 600, useNativeDriver: true }),
    ]).start();
    const t = setTimeout(() => nav.replace('Onboarding'), 1800);
    return () => clearTimeout(t);
  }, []);

  return (
    <Screen>
      <View style={styles.center}>
        <Animated.View style={[styles.markWrap, shadow.glow, { transform: [{ scale }] }]}>
          <LinearGradient colors={gradients.cta} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={StyleSheet.absoluteFill} />
          <Icon name="wallet" size={44} color="#FFF" strokeWidth={1.9} />
        </Animated.View>

        <Animated.View style={{ opacity: fade, alignItems: 'center' }}>
          <Txt size={30} weight="bold" style={{ marginTop: 26 }}>Nova</Txt>
          <Txt size={14} color={colors.textMuted} style={{ marginTop: 6 }}>Your money, beautifully simple</Txt>
        </Animated.View>
      </View>

      <Txt size={12} color={colors.textDim} center style={styles.footer}>v1.0.0</Txt>
    </Screen>
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  markWrap: {
    width: 104,
    height: 104,
    borderRadius: 34,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  footer: { paddingBottom: 10 },
});
