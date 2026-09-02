import React from 'react';
import { View, Pressable, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Icon, { IconName } from './Icon';
import Txt from './Txt';
import { colors, radius } from '../theme';

type Props = {
  icon: IconName;
  gradient: readonly string[];
  label?: string;
  onPress?: () => void;
  size?: number;
};

/**
 * Quick-action tile. Stands in for the 3D gradient icons in the mock —
 * swap the inner <Icon> for an <Image> once the real renders are exported.
 */
export default function IconTile({ icon, gradient, label, onPress, size = 68 }: Props) {
  return (
    <View style={styles.wrap}>
      <Pressable onPress={onPress} style={({ pressed }) => [pressed && { transform: [{ scale: 0.96 }] }]}>
        <View style={[styles.tile, { width: size, height: size, borderRadius: radius.md }]}>
          <LinearGradient
            colors={['rgba(255,255,255,0.10)', 'rgba(255,255,255,0.02)']}
            style={StyleSheet.absoluteFill}
          />
          <View style={styles.glyphWrap}>
            <LinearGradient
              colors={gradient as any}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.glyphBg}
            />
            <Icon name={icon} size={22} color="#FFFFFF" strokeWidth={2} />
          </View>
        </View>
      </Pressable>
      {!!label && (
        <Txt size={11.5} color={colors.textMuted} style={{ marginTop: 8 }}>{label}</Txt>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { alignItems: 'center' },
  tile: {
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.surfaceBorder,
  },
  glyphWrap: {
    width: 40,
    height: 40,
    borderRadius: 13,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  glyphBg: { position: "absolute", top: 0, left: 0, right: 0, bottom: 0, borderRadius: 13 },
});
