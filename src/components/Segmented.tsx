import React from 'react';
import { View, Pressable, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Txt from './Txt';
import { colors, gradients, radius } from '../theme';

type Props = {
  items: string[];
  value: string;
  onChange: (v: string) => void;
  /** 'pill' = filled sliding pill (Statistics), 'underline' = tab underline (Wallet) */
  variant?: 'pill' | 'underline';
};

export default function Segmented({ items, value, onChange, variant = 'pill' }: Props) {
  if (variant === 'underline') {
    return (
      <View style={styles.underlineRow}>
        {items.map((it) => {
          const active = it === value;
          return (
            <Pressable key={it} style={styles.underlineItem} onPress={() => onChange(it)}>
              <Txt size={16} weight={active ? 'semibold' : 'regular'} color={active ? colors.text : colors.textMuted}>
                {it}
              </Txt>
              <View style={[styles.underline, active && styles.underlineActive]} />
            </Pressable>
          );
        })}
      </View>
    );
  }

  return (
    <View style={styles.pillWrap}>
      {items.map((it) => {
        const active = it === value;
        return (
          <Pressable key={it} style={styles.pillItem} onPress={() => onChange(it)}>
            {active && (
              <LinearGradient
                colors={gradients.pill}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={StyleSheet.absoluteFill}
              />
            )}
            <Txt size={14.5} weight={active ? 'semibold' : 'regular'} color={active ? colors.text : colors.textMuted}>
              {it}
            </Txt>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  pillWrap: {
    flexDirection: 'row',
    padding: 5,
    borderRadius: radius.md,
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderWidth: 1,
    borderColor: colors.surfaceBorder,
  },
  pillItem: {
    flex: 1,
    height: 44,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  underlineRow: { flexDirection: 'row' },
  underlineItem: { flex: 1, alignItems: 'center' },
  underline: {
    height: 2.5,
    width: '100%',
    marginTop: 12,
    borderRadius: 2,
    backgroundColor: 'rgba(255,255,255,0.10)',
  },
  underlineActive: { backgroundColor: colors.cyan },
});
