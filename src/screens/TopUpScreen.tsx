import React, { useState } from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Screen from '../components/Screen';
import Header from '../components/Header';
import Txt from '../components/Txt';
import Field from '../components/Field';
import Button from '../components/Button';
import BankCard from '../components/BankCard';
import ListRow from '../components/ListRow';
import { colors, radius } from '../theme';
import { cards } from '../data/mock';

const PRESETS = [50, 100, 250, 500];

export default function TopUpScreen() {
  const nav = useNavigation<any>();
  const [amount, setAmount] = useState('100');
  const [card, setCard] = useState(0);

  return (
    <Screen scroll>
      <Header title="Top Up" right={null} />

      <Txt size={13} color={colors.textMuted} style={{ marginTop: 20, marginBottom: 12 }}>To card</Txt>
      <BankCard card={cards[card]} height={180} compact />

      <View style={styles.dots}>
        {cards.map((c, i) => (
          <Pressable key={c.id} onPress={() => setCard(i)} style={[styles.dot, i === card && styles.dotOn]} />
        ))}
      </View>

      <Txt size={16} weight="semibold" style={{ marginTop: 24, marginBottom: 14 }}>Amount</Txt>
      <Field icon="wallet" placeholder="0.00" keyboardType="decimal-pad" value={amount} onChangeText={setAmount} />

      <View style={styles.presets}>
        {PRESETS.map((p) => {
          const on = String(p) === amount;
          return (
            <Pressable key={p} onPress={() => setAmount(String(p))} style={[styles.preset, on && styles.presetOn]}>
              <Txt size={13.5} weight={on ? 'semibold' : 'regular'} color={on ? colors.bgDeep : colors.text}>
                ${p}
              </Txt>
            </Pressable>
          );
        })}
      </View>

      <Txt size={16} weight="semibold" style={{ marginTop: 26, marginBottom: 14 }}>Pay with</Txt>
      <ListRow icon="card" title="Linked bank" subtitle="Chase •••• 8891" right={<View style={styles.radioOn} />} />
      <ListRow icon="wallet" title="Apple Pay" tint={colors.purple} right={<View style={styles.radio} />} />
      <ListRow icon="globe" title="Bank transfer" subtitle="1–3 business days" tint={colors.green} right={<View style={styles.radio} />} />

      <Button label={`Top up $${amount || '0'}`} onPress={() => nav.navigate('Success', { kind: 'topup', amount })} style={{ marginTop: 22 }} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  dots: { flexDirection: 'row', justifyContent: 'center', marginTop: 16 },
  dot: { width: 7, height: 7, borderRadius: 4, marginHorizontal: 4, backgroundColor: 'rgba(255,255,255,0.25)' },
  dotOn: { backgroundColor: colors.cyan, width: 20 },
  presets: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 4 },
  preset: {
    flex: 1, height: 44, marginHorizontal: 4, borderRadius: radius.sm,
    alignItems: 'center', justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderWidth: 1, borderColor: colors.surfaceBorder,
  },
  presetOn: { backgroundColor: colors.cyan, borderColor: colors.cyan },
  radio: { width: 20, height: 20, borderRadius: 10, borderWidth: 1.6, borderColor: 'rgba(255,255,255,0.25)' },
  radioOn: { width: 20, height: 20, borderRadius: 10, borderWidth: 6, borderColor: colors.cyan },
});
