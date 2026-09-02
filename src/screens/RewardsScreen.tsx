import React from 'react';
import { View, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Screen from '../components/Screen';
import Header from '../components/Header';
import Txt from '../components/Txt';
import Icon from '../components/Icon';
import GlassCard from '../components/GlassCard';
import ListRow from '../components/ListRow';
import { colors, gradients, radius, shadow } from '../theme';

const OFFERS = [
  { id: 'o1', title: '5% back on groceries', sub: 'Until Sep 30', icon: 'gift' as const, tint: '#3ED598' },
  { id: 'o2', title: 'Free transfers abroad', sub: 'First 3 each month', icon: 'globe' as const, tint: '#2FC4F0' },
  { id: 'o3', title: '$20 for every referral', sub: 'Unlimited', icon: 'user' as const, tint: '#8A3BF6' },
  { id: 'o4', title: 'Double points weekends', sub: 'Sat & Sun', icon: 'star' as const, tint: '#F5A623' },
];

export default function RewardsScreen() {
  return (
    <Screen scroll>
      <Header title="Rewards" right="help" onRight={() => {}} />

      <View style={[styles.hero, shadow.card]}>
        <LinearGradient colors={gradients.card as any} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={StyleSheet.absoluteFill} />
        <Txt size={12.5} color="rgba(255,255,255,0.8)">Your points</Txt>
        <Txt size={38} weight="bold" style={{ marginTop: 4 }}>1,280</Txt>
        <View style={styles.track}>
          <View style={styles.fill} />
        </View>
        <Txt size={12} color="rgba(255,255,255,0.85)" style={{ marginTop: 10 }}>
          720 points to Gold tier
        </Txt>
      </View>

      <View style={styles.tiers}>
        {['Bronze', 'Silver', 'Gold'].map((t, i) => (
          <GlassCard key={t} style={styles.tier}>
            <Icon name="star" size={18} color={i === 1 ? colors.cyan : colors.textDim} />
            <Txt size={12.5} weight={i === 1 ? 'semibold' : 'regular'} color={i === 1 ? colors.text : colors.textMuted} style={{ marginTop: 7 }}>
              {t}
            </Txt>
          </GlassCard>
        ))}
      </View>

      <Txt size={16} weight="semibold" style={{ marginTop: 26, marginBottom: 14 }}>Active offers</Txt>
      {OFFERS.map((o) => (
        <ListRow key={o.id} icon={o.icon} title={o.title} subtitle={o.sub} tint={o.tint} />
      ))}
    </Screen>
  );
}

const styles = StyleSheet.create({
  hero: {
    marginTop: 20, padding: 24, borderRadius: radius.lg, overflow: 'hidden',
  },
  track: {
    height: 8, borderRadius: 4, marginTop: 18,
    backgroundColor: 'rgba(255,255,255,0.22)', overflow: 'hidden',
  },
  fill: { width: '64%', height: '100%', borderRadius: 4, backgroundColor: '#FFFFFF' },
  tiers: { flexDirection: 'row', marginTop: 16 },
  tier: { flex: 1, alignItems: 'center', paddingVertical: 16, marginHorizontal: 5 },
});
