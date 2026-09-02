import React from 'react';
import { View, Pressable, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon, { IconName } from './Icon';
import Txt from './Txt';
import { colors } from '../theme';

type Props = {
  title?: string;
  back?: boolean;
  right?: IconName | null;
  onRight?: () => void;
  align?: 'center' | 'left';
};

export default function Header({ title, back = true, right = 'more', onRight, align = 'center' }: Props) {
  const nav = useNavigation<any>();
  return (
    <View style={styles.row}>
      <View style={styles.side}>
        {back && (
          <Pressable hitSlop={12} onPress={() => nav.goBack()}>
            <Icon name="back" size={24} />
          </Pressable>
        )}
      </View>
      <View style={[styles.middle, align === 'left' && styles.middleLeft]}>
        {!!title && <Txt size={20} weight="bold">{title}</Txt>}
      </View>
      <View style={[styles.side, styles.sideRight]}>
        {right && (
          <Pressable hitSlop={12} onPress={onRight}>
            <Icon name={right} size={22} color={colors.text} />
          </Pressable>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', height: 48 },
  side: { width: 34, justifyContent: 'center' },
  sideRight: { alignItems: 'flex-end' },
  middle: { flex: 1, alignItems: 'center' },
  middleLeft: { alignItems: 'flex-start', paddingLeft: 4 },
});
