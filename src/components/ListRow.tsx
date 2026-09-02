import React from 'react';
import { View, Pressable, StyleSheet } from 'react-native';
import Icon, { IconName } from './Icon';
import Txt from './Txt';
import { colors, radius } from '../theme';

type Props = {
  icon: IconName;
  title: string;
  subtitle?: string;
  right?: React.ReactNode;
  tint?: string;
  onPress?: () => void;
  danger?: boolean;
};

export default function ListRow({ icon, title, subtitle, right, tint, onPress, danger }: Props) {
  return (
    <Pressable onPress={onPress} style={({ pressed }) => [styles.row, pressed && { opacity: 0.75 }]}>
      <View style={[styles.iconBox, { backgroundColor: (tint ?? colors.cyan) + '22' }]}>
        <Icon name={icon} size={19} color={danger ? colors.red : tint ?? colors.cyan} />
      </View>
      <View style={styles.mid}>
        <Txt size={15} weight="medium" color={danger ? colors.red : colors.text}>{title}</Txt>
        {!!subtitle && (
          <Txt size={12} color={colors.textMuted} style={{ marginTop: 2 }}>{subtitle}</Txt>
        )}
      </View>
      {right ?? <Icon name="forward" size={16} color={colors.textDim} />}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 13,
    paddingHorizontal: 14,
    borderRadius: radius.md,
    backgroundColor: 'rgba(255,255,255,0.04)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.055)',
    marginBottom: 10,
  },
  iconBox: {
    width: 40,
    height: 40,
    borderRadius: 13,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 13,
  },
  mid: { flex: 1 },
});
