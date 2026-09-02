import React, { useState } from 'react';
import { View, StyleSheet, Switch } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Screen from '../components/Screen';
import Header from '../components/Header';
import Txt from '../components/Txt';
import BankCard from '../components/BankCard';
import IconTile from '../components/IconTile';
import GlassCard from '../components/GlassCard';
import ListRow from '../components/ListRow';
import TransactionItem from '../components/TransactionItem';
import { colors, gradients } from '../theme';
import { cards, transactions } from '../data/mock';

export default function CardDetailScreen() {
  const nav = useNavigation<any>();
  const route = useRoute<any>();
  const card = cards.find((c) => c.id === route.params?.id) ?? cards[0];
  const [frozen, setFrozen] = useState(false);

  return (
    <Screen scroll>
      <Header title="Card Details" onRight={() => {}} />

      <View style={{ marginTop: 18, opacity: frozen ? 0.45 : 1 }}>
        <BankCard card={card} />
      </View>

      <View style={styles.tiles}>
        <IconTile icon="send" gradient={gradients.tileSend} label="Send" onPress={() => nav.navigate('SendMoney')} />
        <IconTile icon="arrow-down" gradient={gradients.tileWallet} label="Top up" onPress={() => nav.navigate('TopUp')} />
        <IconTile icon="lock" gradient={gradients.tileReceive} label="Freeze" onPress={() => setFrozen((f) => !f)} />
        <IconTile icon="stats" gradient={gradients.tileStats} label="Stats" onPress={() => nav.navigate('Statistics')} />
      </View>

      <GlassCard style={styles.balance}>
        <View>
          <Txt size={12.5} color={colors.textMuted}>Card balance</Txt>
          <Txt size={26} weight="bold" style={{ marginTop: 4 }}>{card.balance}</Txt>
        </View>
        <View style={styles.badge}>
          <Txt size={11.5} weight="medium" color={frozen ? colors.amber : colors.green}>
            {frozen ? 'Frozen' : 'Active'}
          </Txt>
        </View>
      </GlassCard>

      <Txt size={16} weight="semibold" style={styles.section}>Card settings</Txt>
      <ListRow
        icon="lock" title="Freeze card" subtitle="Temporarily block all payments" tint={colors.amber}
        right={<Switch value={frozen} onValueChange={setFrozen} trackColor={{ true: colors.cyan, false: '#3A3568' }} thumbColor="#FFF" />}
      />
      <ListRow icon="globe" title="Online payments" subtitle="Allowed" />
      <ListRow icon="shield" title="Spending limit" subtitle="$5,000 / month" tint={colors.green} />
      <ListRow icon="trash" title="Remove card" danger right={<View />} />

      <Txt size={16} weight="semibold" style={styles.section}>Recent on this card</Txt>
      {transactions.slice(0, 4).map((tx) => (
        <TransactionItem key={tx.id} tx={tx} onPress={() => nav.navigate('TransactionDetail', { id: tx.id })} />
      ))}
    </Screen>
  );
}

const styles = StyleSheet.create({
  tiles: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 24 },
  balance: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    padding: 20, marginTop: 24,
  },
  badge: {
    paddingHorizontal: 14, paddingVertical: 7, borderRadius: 999,
    backgroundColor: 'rgba(255,255,255,0.07)',
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.12)',
  },
  section: { marginTop: 26, marginBottom: 14 },
});
