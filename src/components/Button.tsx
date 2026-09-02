import React from 'react';
import { Pressable, StyleSheet, ViewStyle, StyleProp, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Txt from './Txt';
import Icon, { IconName } from './Icon';
import { colors, gradients, radius, shadow } from '../theme';

type Props = {
  label: string;
  onPress?: () => void;
  variant?: 'primary' | 'ghost' | 'outline';
  icon?: IconName;
  full?: boolean;
  style?: StyleProp<ViewStyle>;
};

export default function Button({ label, onPress, variant = 'primary', icon, full = true, style }: Props) {
  const content = (
    <View style={styles.row}>
      {icon && <Icon name={icon} size={18} color={colors.text} />}
      <Txt size={15} weight="semibold" style={icon ? { marginLeft: 8 } : undefined}>
        {label}
      </Txt>
    </View>
  );

  if (variant === 'primary') {
    return (
      <Pressable onPress={onPress} style={[full && styles.full, shadow.glow, style]}>
        <LinearGradient colors={gradients.cta} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.base}>
          {content}
        </LinearGradient>
      </Pressable>
    );
  }

  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.base,
        full && styles.full,
        variant === 'outline' ? styles.outline : styles.ghost,
        style,
      ]}
    >
      {content}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: { height: 56, borderRadius: radius.md, alignItems: 'center', justifyContent: 'center' },
  full: { alignSelf: 'stretch' },
  row: { flexDirection: 'row', alignItems: 'center' },
  ghost: { backgroundColor: colors.surface },
  outline: { borderWidth: 1, borderColor: colors.glassBorder, backgroundColor: 'transparent' },
});
