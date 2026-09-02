import React, { useState } from 'react';
import { View, StyleSheet, Pressable, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Screen from '../components/Screen';
import Header from '../components/Header';
import Txt from '../components/Txt';
import Icon from '../components/Icon';
import Button from '../components/Button';
import BrandLogo from '../components/BrandLogo';
import GlassCard from '../components/GlassCard';
import Field from '../components/Field';
import { colors, radius } from '../theme';
import { contacts, cards } from '../data/mock';

const KEYS = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '0', 'del'];

export default function SendMoneyScreen() {
  const nav = useNavigation<any>();
  const [amount, setAmount] = useState('120');
  const [to, setTo] = useState(contacts[0].id);

  const press = (k: string) => {
    if (k === 'del') setAmount((a) => a.slice(0, -1));
    else if (k === '.' && amount.includes('.')) return;
    else setAmount((a) => (a === '0' ? k : a + k));
  };

  return (
    <Screen scroll>
      <Header title="Send Money" right={null} />

      <Txt size={13} color={colors.textMuted} style={{ marginTop: 20, marginBottom: 14 }}>Send to</Txt>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginHorizontal: -22 }} contentContainerStyle={{ paddingHorizontal: 22 }}>
        <Pressable style={styles.person}>
          <View style={styles.addPerson}><Icon name="plus" size={22} color={colors.cyan} /></View>
          <Txt size={12} color={colors.textMuted} style={{ marginTop: 8 }}>New</Txt>
        </Pressable>
        {contacts.map((c) => {
          const on = c.id === to;
          return (
            <Pressable key={c.id} style={styles.person} onPress={() => setTo(c.id)}>
              <View style={[styles.personRing, on && styles.personRingOn]}>
                <BrandLogo brand={c.brand} size={52} />
              </View>
              <Txt size={12} color={on ? colors.text : colors.textMuted} style={{ marginTop: 8 }}>{c.name}</Txt>
            </Pressable>
          );
        })}
      </ScrollView>

      <GlassCard style={styles.amountCard}>
        <Txt size={12.5} color={colors.textMuted}>Amount</Txt>
        <View style={styles.amountRow}>
          <Txt size={34} weight="bold" color={colors.textMuted}>$</Txt>
          <Txt size={44} weight="bold" style={{ marginLeft: 4 }}>{amount || '0'}</Txt>
        </View>
        <Txt size={12.5} color={colors.textMuted}>Available {cards[0].balance}</Txt>
      </GlassCard>

      <View style={{ marginTop: 18 }}>
        <Field icon="edit" placeholder="What's it for? (optional)" />
      </View>

      <View style={styles.pad}>
        {KEYS.map((k) => (
          <Pressable key={k} style={styles.key} onPress={() => press(k)}>
            {k === 'del' ? (
              <Icon name="back" size={22} color={colors.textMuted} />
            ) : (
              <Txt size={23} weight="medium">{k}</Txt>
            )}
          </Pressable>
        ))}
      </View>

      <Button label="Send now" icon="send" onPress={() => nav.navigate('Success', { kind: 'send', amount })} style={{ marginTop: 18 }} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  person: { alignItems: 'center', marginRight: 18 },
  addPerson: {
    width: 52, height: 52, borderRadius: 26,
    alignItems: 'center', justifyContent: 'center',
    borderWidth: 1.4, borderStyle: 'dashed', borderColor: 'rgba(47,196,240,0.5)',
  },
  personRing: { padding: 2, borderRadius: 30, borderWidth: 2, borderColor: 'transparent' },
  personRingOn: { borderColor: colors.cyan },
  amountCard: { padding: 22, marginTop: 24, alignItems: 'center' },
  amountRow: { flexDirection: 'row', alignItems: 'baseline', marginVertical: 6 },
  pad: { flexDirection: 'row', flexWrap: 'wrap', marginTop: 6 },
  key: { width: '33.33%', height: 58, alignItems: 'center', justifyContent: 'center' },
});
