import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, Easing } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import Screen from '../components/Screen';
import Txt from '../components/Txt';
import Icon from '../components/Icon';
import Button from '../components/Button';
import GlassCard from '../components/GlassCard';
import { colors, gradients, shadow } from '../theme';

export default function SuccessScreen() {
  const nav = useNavigation<any>();
  const route = useRoute<any>();
  const kind = route.params?.kind ?? 'send';
  const amount = route.params?.amount ?? '120';

  const scale = useRef(new Animated.Value(0.5)).current;
  useEffect(() => {
    Animated.spring(scale, { toValue: 1, friction: 5, tension: 80, useNativeDriver: true }).start();
  }, []);

  const copy = {
    send: { title: 'Money sent!', body: `$${amount} is on its way to Alicia.` },
    topup: { title: 'Top up complete', body: `$${amount} was added to your card.` },
    card: { title: 'Card added', body: 'Your new card is ready to use.' },
  }[kind as 'send' | 'topup' | 'card'];

  return (
    <Screen>
      <View style={styles.center}>
        <Animated.View style={[styles.mark, shadow.glow, { transform: [{ scale }] }]}>
          <LinearGradient colors={gradients.tileReceive as any} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={StyleSheet.absoluteFill} />
          <Icon name="check" size={46} color="#FFF" strokeWidth={2.6} />
        </Animated.View>

        <Txt size={26} weight="bold" style={{ marginTop: 30 }}>{copy.title}</Txt>
        <Txt size={14.5} color={colors.textMuted} center style={{ marginTop: 10, lineHeight: 22 }}>{copy.body}</Txt>

        <GlassCard style={styles.receipt}>
          {[['Reference', 'TRX-8842-01947'], ['Date', 'Aug 30, 2026'], ['Fee', '$0.00']].map(([k, v], i) => (
            <View key={k} style={[styles.row, i < 2 && styles.divider]}>
              <Txt size={13.5} color={colors.textMuted}>{k}</Txt>
              <Txt size={13.5} weight="medium">{v}</Txt>
            </View>
          ))}
        </GlassCard>
      </View>

      <View style={{ paddingBottom: 8 }}>
        <Button label="Done" onPress={() => nav.navigate('Main')} />
        <Button label="Share receipt" variant="ghost" icon="share" style={{ marginTop: 12 }} />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  mark: {
    width: 108, height: 108, borderRadius: 54,
    alignItems: 'center', justifyContent: 'center', overflow: 'hidden',
  },
  receipt: { alignSelf: 'stretch', paddingHorizontal: 18, marginTop: 34 },
  row: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 14 },
  divider: { borderBottomWidth: 1, borderBottomColor: 'rgba(255,255,255,0.06)' },
});
