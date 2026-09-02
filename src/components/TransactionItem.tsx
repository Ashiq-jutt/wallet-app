import React from 'react';
import { View, Pressable, StyleSheet } from 'react-native';
import BrandLogo, { Brand } from './BrandLogo';
import Txt from './Txt';
import { colors, radius } from '../theme';

export type Tx = {
  id: string;
  brand: Brand;
  title: string;
  date: string;
  amount: number;
  category?: string;
  status?: 'Completed' | 'Pending' | 'Failed';
};

type Props = { tx: Tx; onPress?: () => void };

export default function TransactionItem({ tx, onPress }: Props) {
  const negative = tx.amount < 0;
  const value = `${negative ? '- ' : '+ '}$${Math.abs(tx.amount).toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;

  return (
    <Pressable onPress={onPress} style={({ pressed }) => [styles.row, pressed && { opacity: 0.75 }]}>
      <BrandLogo brand={tx.brand} />
      <View style={styles.mid}>
        <Txt size={15.5} weight="medium">{tx.title}</Txt>
        <Txt size={12.5} color={colors.textMuted} style={{ marginTop: 2 }}>{tx.date}</Txt>
      </View>
      <View style={styles.amount}>
        <Txt size={14} weight="medium" color={negative ? colors.text : colors.green}>
          {value}
        </Txt>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 14,
    borderRadius: radius.xl,
    backgroundColor: 'rgba(255,255,255,0.045)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.06)',
    marginBottom: 14,
  },
  mid: { flex: 1, marginLeft: 14 },
  amount: {
    paddingHorizontal: 16,
    paddingVertical: 9,
    borderRadius: radius.pill,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.14)',
  },
});
