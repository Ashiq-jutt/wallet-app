import React, { useMemo, useState } from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Screen from '../components/Screen';
import Header from '../components/Header';
import Txt from '../components/Txt';
import Field from '../components/Field';
import TransactionItem from '../components/TransactionItem';
import GlassCard from '../components/GlassCard';
import { colors, radius } from '../theme';
import { transactions } from '../data/mock';

const FILTERS = ['All', 'Income', 'Outcome', 'Pending'];

export default function TransactionsScreen() {
  const nav = useNavigation<any>();
  const [filter, setFilter] = useState('All');
  const [q, setQ] = useState('');

  const list = useMemo(() => {
    return transactions.filter((t) => {
      const matchQ = t.title.toLowerCase().includes(q.toLowerCase());
      const matchF =
        filter === 'All' ||
        (filter === 'Income' && t.amount > 0) ||
        (filter === 'Outcome' && t.amount < 0) ||
        (filter === 'Pending' && t.status === 'Pending');
      return matchQ && matchF;
    });
  }, [filter, q]);

  const income = transactions.filter((t) => t.amount > 0).reduce((s, t) => s + t.amount, 0);
  const outcome = transactions.filter((t) => t.amount < 0).reduce((s, t) => s + Math.abs(t.amount), 0);

  return (
    <Screen scroll tabPadding>
      <Header title="Transactions" right="filter" onRight={() => {}} />

      <View style={styles.summary}>
        <GlassCard style={styles.sumCard}>
          <Txt size={12} color={colors.textMuted}>Income</Txt>
          <Txt size={19} weight="bold" color={colors.green} style={{ marginTop: 4 }}>
            +${income.toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </Txt>
        </GlassCard>
        <View style={{ width: 14 }} />
        <GlassCard style={styles.sumCard}>
          <Txt size={12} color={colors.textMuted}>Outcome</Txt>
          <Txt size={19} weight="bold" style={{ marginTop: 4 }}>
            -${outcome.toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </Txt>
        </GlassCard>
      </View>

      <View style={{ marginTop: 20 }}>
        <Field icon="search" placeholder="Search transactions" value={q} onChangeText={setQ} />
      </View>

      <View style={styles.chips}>
        {FILTERS.map((f) => {
          const on = f === filter;
          return (
            <Pressable key={f} onPress={() => setFilter(f)} style={[styles.chip, on && styles.chipOn]}>
              <Txt size={13} weight={on ? 'semibold' : 'regular'} color={on ? colors.bgDeep : colors.textMuted}>
                {f}
              </Txt>
            </Pressable>
          );
        })}
      </View>

      <Txt size={13} color={colors.textMuted} style={{ marginBottom: 14 }}>
        {list.length} transaction{list.length === 1 ? '' : 's'}
      </Txt>

      {list.map((tx) => (
        <TransactionItem key={tx.id} tx={tx} onPress={() => nav.navigate('TransactionDetail', { id: tx.id })} />
      ))}

      {list.length === 0 && (
        <View style={styles.empty}>
          <Txt size={14} color={colors.textDim}>No transactions match that.</Txt>
        </View>
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  summary: { flexDirection: 'row', marginTop: 16 },
  sumCard: { flex: 1, padding: 16 },
  chips: { flexDirection: 'row', flexWrap: 'wrap', marginTop: 4, marginBottom: 18 },
  chip: {
    paddingHorizontal: 16, paddingVertical: 9, borderRadius: radius.pill,
    marginRight: 9, marginBottom: 9,
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderWidth: 1, borderColor: colors.surfaceBorder,
  },
  chipOn: { backgroundColor: colors.cyan, borderColor: colors.cyan },
  empty: { alignItems: 'center', paddingVertical: 40 },
});
