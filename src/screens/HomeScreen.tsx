import React from 'react';
import { View, Pressable, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Screen from '../components/Screen';
import Txt from '../components/Txt';
import Icon from '../components/Icon';
import Avatar from '../components/Avatar';
import DonutChart from '../components/DonutChart';
import TransactionItem from '../components/TransactionItem';
import { colors } from '../theme';
import { user, transactions } from '../data/mock';

export default function HomeScreen() {
  const nav = useNavigation<any>();

  return (
    <Screen scroll tabPadding>
      {/* greeting */}
      <View style={styles.header}>
        <Pressable style={styles.headerLeft} onPress={() => nav.navigate('Profile')}>
          <Avatar uri={user.avatar} name={user.name} size={54} />
          <View style={{ marginLeft: 14 }}>
            <Txt size={17} weight="semibold">Welcome back!</Txt>
            <Txt size={13} color={colors.textMuted} style={{ marginTop: 1 }}>{user.name}</Txt>
          </View>
        </Pressable>

        <View style={styles.headerActions}>
          <Pressable hitSlop={10} onPress={() => nav.navigate('Notifications')}>
            <Icon name="bell" size={22} />
            <View style={styles.dot} />
          </Pressable>
          <Pressable hitSlop={10} style={{ marginLeft: 18 }} onPress={() => nav.navigate('Settings')}>
            <Icon name="more" size={20} />
          </Pressable>
        </View>
      </View>

      {/* balance ring */}
      <View style={styles.ringWrap}>
        <DonutChart
          size={228}
          thickness={30}
          amount={user.balance}
          caption="Available Balance"
          segments={[
            { value: 30, from: '#5FE3A1', to: '#3ED598' },
            { value: 22, from: '#3C8DF5', to: '#2F6BE8' },
            { value: 26, from: '#43C7F1', to: '#3AA9EE' },
            { value: 34, from: '#7A3BF6', to: '#4B2BD9' },
          ]}
        />
      </View>

      {/* transactions */}
      <View style={styles.sectionHead}>
        <Txt size={18} weight="semibold">My transaction</Txt>
        <Pressable hitSlop={8} onPress={() => nav.navigate('Transactions')}>
          <Txt size={13} color={colors.cyan} weight="medium">See all</Txt>
        </Pressable>
      </View>

      {transactions.slice(0, 5).map((tx) => (
        <TransactionItem
          key={tx.id}
          tx={tx}
          onPress={() => nav.navigate('TransactionDetail', { id: tx.id })}
        />
      ))}
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  headerLeft: { flexDirection: 'row', alignItems: 'center', flex: 1 },
  headerActions: { flexDirection: 'row', alignItems: 'center' },
  dot: {
    position: 'absolute',
    top: -1,
    right: 0,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.cyan,
    borderWidth: 1.5,
    borderColor: colors.bg,
  },
  ringWrap: { alignItems: 'center', marginTop: 26, marginBottom: 30 },
  sectionHead: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 18,
  },
});
