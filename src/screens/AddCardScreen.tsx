import React, { useState } from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Screen from '../components/Screen';
import Header from '../components/Header';
import Txt from '../components/Txt';
import Field from '../components/Field';
import Button from '../components/Button';
import BankCard from '../components/BankCard';
import Icon from '../components/Icon';
import { colors, gradients, radius } from '../theme';

const THEMES = [
  { id: 'purple', grad: gradients.card },
  { id: 'blue', grad: gradients.cardBlue },
  { id: 'teal', grad: gradients.cardTeal },
  { id: 'night', grad: ['#3A3568', '#22203F'] as const },
];

export default function AddCardScreen() {
  const nav = useNavigation<any>();
  const [number, setNumber] = useState('');
  const [holder, setHolder] = useState('');
  const [expiry, setExpiry] = useState('');
  const [theme, setTheme] = useState(0);

  return (
    <Screen scroll>
      <Header title="Add Card" right={null} />

      <View style={{ marginTop: 18 }}>
        <BankCard
          card={{
            id: 'preview',
            number: number || '0000 0000 0000 0000',
            holder: holder || 'CARD HOLDER',
            expiry: expiry || 'MM/YY',
            scheme: 'mastercard',
            gradient: THEMES[theme].grad,
          }}
        />
      </View>

      <View style={styles.themes}>
        {THEMES.map((t, i) => (
          <Pressable key={t.id} onPress={() => setTheme(i)} style={[styles.swatch, i === theme && styles.swatchOn]}>
            <View style={[styles.swatchInner, { backgroundColor: t.grad[0] }]} />
          </Pressable>
        ))}
      </View>

      <Txt size={16} weight="semibold" style={{ marginTop: 26, marginBottom: 16 }}>Card details</Txt>

      <Field label="Card number" icon="card" placeholder="0000 0000 0000 0000" keyboardType="number-pad" value={number} onChangeText={setNumber} maxLength={19} />
      <Field label="Card holder name" icon="user" placeholder="Sandy Chungus" value={holder} onChangeText={setHolder} autoCapitalize="words" />

      <View style={styles.row}>
        <View style={styles.half}>
          <Field label="Expiry" icon="calendar" placeholder="MM/YY" value={expiry} onChangeText={setExpiry} maxLength={5} />
        </View>
        <View style={{ width: 14 }} />
        <View style={styles.half}>
          <Field label="CVV" icon="lock" placeholder="•••" password maxLength={4} keyboardType="number-pad" />
        </View>
      </View>

      <View style={styles.note}>
        <Icon name="shield" size={17} color={colors.green} />
        <Txt size={12.5} color={colors.textMuted} style={{ marginLeft: 10, flex: 1, lineHeight: 18 }}>
          Your card details are encrypted end-to-end and never stored on this device.
        </Txt>
      </View>

      <Button label="Add card" onPress={() => nav.navigate('Success', { kind: 'card' })} style={{ marginTop: 22 }} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  themes: { flexDirection: 'row', justifyContent: 'center', marginTop: 22 },
  swatch: {
    width: 40, height: 40, borderRadius: 14, marginHorizontal: 7,
    alignItems: 'center', justifyContent: 'center',
    borderWidth: 1.5, borderColor: 'transparent',
  },
  swatchOn: { borderColor: colors.cyan },
  swatchInner: { width: 26, height: 26, borderRadius: 9 },
  row: { flexDirection: 'row' },
  half: { flex: 1 },
  note: {
    flexDirection: 'row', alignItems: 'flex-start',
    padding: 14, borderRadius: radius.md, marginTop: 6,
    backgroundColor: 'rgba(62,213,152,0.08)',
    borderWidth: 1, borderColor: 'rgba(62,213,152,0.20)',
  },
});
