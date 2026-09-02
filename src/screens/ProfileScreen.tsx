import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Screen from '../components/Screen';
import Header from '../components/Header';
import Txt from '../components/Txt';
import Avatar from '../components/Avatar';
import GlassCard from '../components/GlassCard';
import ListRow from '../components/ListRow';
import { colors } from '../theme';
import { user } from '../data/mock';

const STATS = [
  { label: 'Cards', value: '3' },
  { label: 'Spent', value: '$3.6k' },
  { label: 'Points', value: '1,280' },
];

export default function ProfileScreen() {
  const nav = useNavigation<any>();

  return (
    <Screen scroll tabPadding>
      <Header title="Profile" back={false} right="settings" onRight={() => nav.navigate('Settings')} align="left" />

      <View style={styles.hero}>
        <Avatar uri={user.avatar} name={user.name} size={96} />
        <Txt size={20} weight="semibold" style={{ marginTop: 14 }}>{user.name}</Txt>
        <Txt size={13} color={colors.textMuted} style={{ marginTop: 3 }}>{user.email}</Txt>
      </View>

      <GlassCard style={styles.stats}>
        {STATS.map((s, i) => (
          <View key={s.label} style={[styles.statItem, i < STATS.length - 1 && styles.statDivider]}>
            <Txt size={18} weight="bold">{s.value}</Txt>
            <Txt size={12} color={colors.textMuted} style={{ marginTop: 3 }}>{s.label}</Txt>
          </View>
        ))}
      </GlassCard>

      <Txt size={16} weight="semibold" style={styles.sectionTitle}>Account</Txt>
      <ListRow icon="user" title="Personal information" subtitle="Name, email, phone" onPress={() => nav.navigate('EditProfile')} />
      <ListRow icon="card" title="My cards" subtitle="3 cards linked" tint={colors.purple} onPress={() => nav.navigate('Wallet')} />
      <ListRow icon="stats" title="Spending statistics" tint={colors.green} onPress={() => nav.navigate('Statistics')} />
      <ListRow icon="gift" title="Rewards & cashback" subtitle="1,280 points" tint={colors.amber} onPress={() => nav.navigate('Rewards')} />

      <Txt size={16} weight="semibold" style={styles.sectionTitle}>Preferences</Txt>
      <ListRow icon="bell" title="Notifications" tint={colors.blue} onPress={() => nav.navigate('Notifications')} />
      <ListRow icon="settings" title="Settings" onPress={() => nav.navigate('Settings')} />
      <ListRow icon="help" title="Help & support" tint={colors.amber} onPress={() => nav.navigate('Support')} />
      <ListRow icon="logout" title="Log out" danger right={<View />} onPress={() => nav.navigate('SignIn')} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  hero: { alignItems: 'center', marginTop: 18, marginBottom: 24 },
  stats: { flexDirection: 'row', paddingVertical: 20 },
  statItem: { flex: 1, alignItems: 'center' },
  statDivider: { borderRightWidth: 1, borderRightColor: 'rgba(255,255,255,0.08)' },
  sectionTitle: { marginTop: 26, marginBottom: 14 },
});
