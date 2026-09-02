import React from 'react';
import { View, StyleSheet, ViewStyle, StyleProp } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, radius } from '../theme';

type Props = {
  children?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  /** brighter frosted look used by the "Add Card" panel */
  bright?: boolean;
  radiusSize?: number;
};

export default function GlassCard({ children, style, bright, radiusSize = radius.lg }: Props) {
  return (
    <View style={[styles.wrap, { borderRadius: radiusSize }, style]}>
      <LinearGradient
        colors={
          bright
            ? ['rgba(120,190,255,0.20)', 'rgba(90,140,255,0.06)']
            : ['rgba(255,255,255,0.075)', 'rgba(255,255,255,0.025)']
        }
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[StyleSheet.absoluteFill, { borderRadius: radiusSize }]}
      />
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.surfaceBorder,
    backgroundColor: 'rgba(255,255,255,0.02)',
  },
});
