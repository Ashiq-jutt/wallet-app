import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Txt from './Txt';
import { colors } from '../theme';

type Props = { uri?: string; name?: string; size?: number; ring?: boolean };

/** Placeholder avatar — pass `uri` once you have the real photo. */
export default function Avatar({ uri, name = 'S C', size = 52, ring = true }: Props) {
  const initials = name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase();
  const inner = size - (ring ? 6 : 0);

  return (
    <View style={[styles.ring, { width: size, height: size, borderRadius: size / 2 }]}>
      {ring && (
        <LinearGradient
          colors={[colors.cyan, colors.purple]}
          style={[StyleSheet.absoluteFill, { borderRadius: size / 2 }]}
        />
      )}
      {uri ? (
        <Image source={{ uri }} style={{ width: inner, height: inner, borderRadius: inner / 2 }} />
      ) : (
        <View
          style={[
            styles.fallback,
            { width: inner, height: inner, borderRadius: inner / 2 },
          ]}
        >
          <Txt size={inner * 0.34} weight="semibold">{initials}</Txt>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  ring: { alignItems: 'center', justifyContent: 'center', overflow: 'hidden' },
  fallback: { alignItems: 'center', justifyContent: 'center', backgroundColor: '#3A3568' },
});
