import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Screen from '../components/Screen';
import Header from '../components/Header';
import Txt from '../components/Txt';
import BrandLogo from '../components/BrandLogo';
import GlassCard from '../components/GlassCard';
import Button from '../components/Button';
import { colors } from '../theme';
import { transactions } from '../data/mock';

export default function TransactionDetailScreen() {
  const nav = useNavigation<any>();
  const route = useRoute<any>();
  const tx = transactions.find((t) => t.id === route.params?.id) ?? transactions[0];
  const negative = tx.amount < 0;

  const rows = [
    ['Status', tx.status ?? 'Completed'],
    ['Category', tx.category ?? '—'],
    ['Date', tx.date],
    ['Time', '14:32'],
    ['Card', 'Mastercard •••• 0000'],
    ['Reference', 'TRX-8842-01947'],
  ];

  return (
    <Screen scroll>
      <Header title="Transaction" onRight={() => {}} right="share" />

      <View style={styles.hero}>
        <BrandLogo brand={tx.brand} size={74} />
        <Txt size={19} weight="semibold" style={{ marginTop: 16 }}>{tx.title}</Txt>
        <Txt
          size={34}
          weight="bold"
          color={negative ? colors.text : colors.green}
          style={{ marginTop: 8 }}
        >
          {negative ? '-' : '+'}${Math.abs(tx.amount).toLocaleString('en-US', { minimumFractionDigits: 2 })}
        </Txt>
        <View style={[styles.badge, !negative && styles.badgeIn]}>
          <Txt size={11.5} weight="medium" color={negative ? colors.textMuted : colors.green}>
            {tx.status ?? 'Completed'}
          </Txt>
        </View>
      </View>

      <GlassCard style={styles.detail}>
        {rows.map(([k, v], i) => (
          <View key={k} style={[styles.row, i < rows.length - 1 && styles.rowDivider]}>
            <Txt size={13.5} color={colors.textMuted}>{k}</Txt>
            <Txt size={13.5} weight="medium">{v}</Txt>
          </View>
        ))}
      </GlassCard>

      <View style={styles.actions}>
        <Button label="Download receipt" variant="outline" icon="download" />
        <View style={{ height: 12 }} />
        <Button label="Report a problem" variant="ghost" icon="help" onPress={() => nav.navigate('Support')} />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  hero: { alignItems: 'center', marginTop: 24, marginBottom: 28 },
  badge: {
    marginTop: 14, paddingHorizontal: 14, paddingVertical: 7, borderRadius: 999,
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.11)',
  },
  badgeIn: { backgroundColor: 'rgba(62,213,152,0.12)', borderColor: 'rgba(62,213,152,0.3)' },
  detail: { paddingHorizontal: 18 },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 15 },
  rowDivider: { borderBottomWidth: 1, borderBottomColor: 'rgba(255,255,255,0.06)' },
  actions: { marginTop: 26 },
});
