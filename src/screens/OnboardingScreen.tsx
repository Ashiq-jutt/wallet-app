import React, { useRef, useState } from 'react';
import {
  View, StyleSheet, ScrollView, Dimensions, Pressable,
  NativeSyntheticEvent, NativeScrollEvent,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import Screen from '../components/Screen';
import Txt from '../components/Txt';
import Icon, { IconName } from '../components/Icon';
import Button from '../components/Button';
import { colors, radius, shadow } from '../theme';

const { width } = Dimensions.get('window');
const PAGE_W = width - 44;

const SLIDES: { icon: IconName; grad: readonly string[]; title: string; body: string }[] = [
  {
    icon: 'card',
    grad: ['#9A3BF7', '#6A1FD6'],
    title: 'All your cards\nin one wallet',
    body: 'Add every debit and credit card you own and switch between them in a tap.',
  },
  {
    icon: 'stats',
    grad: ['#4FD4F5', '#2C9BD6'],
    title: 'See where your\nmoney goes',
    body: 'Weekly, monthly and yearly breakdowns so nothing takes you by surprise.',
  },
  {
    icon: 'send',
    grad: ['#4CE08B', '#22A867'],
    title: 'Send money\nin seconds',
    body: 'Instant transfers to anyone, anywhere — with no hidden fees.',
  },
];

export default function OnboardingScreen() {
  const nav = useNavigation<any>();
  const [page, setPage] = useState(0);
  const scroller = useRef<ScrollView>(null);

  const onScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) =>
    setPage(Math.round(e.nativeEvent.contentOffset.x / PAGE_W));

  const next = () => {
    if (page < SLIDES.length - 1) scroller.current?.scrollTo({ x: (page + 1) * PAGE_W, animated: true });
    else nav.replace('SignIn');
  };

  return (
    <Screen>
      <View style={styles.top}>
        <Pressable hitSlop={10} onPress={() => nav.replace('SignIn')}>
          <Txt size={13.5} color={colors.textMuted} weight="medium">Skip</Txt>
        </Pressable>
      </View>

      <ScrollView
        ref={scroller}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={onScroll}
        scrollEventThrottle={16}
        snapToInterval={PAGE_W}
        decelerationRate="fast"
        style={{ flexGrow: 0 }}
      >
        {SLIDES.map((s) => (
          <View key={s.title} style={{ width: PAGE_W, alignItems: 'center' }}>
            <View style={[styles.art, shadow.card]}>
              <LinearGradient colors={s.grad as any} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={StyleSheet.absoluteFill} />
              <Icon name={s.icon} size={72} color="#FFF" strokeWidth={1.4} />
            </View>
            <Txt size={26} weight="bold" center style={{ marginTop: 44, lineHeight: 34 }}>{s.title}</Txt>
            <Txt size={14.5} color={colors.textMuted} center style={styles.body}>{s.body}</Txt>
          </View>
        ))}
      </ScrollView>

      <View style={styles.dots}>
        {SLIDES.map((s, i) => (
          <View key={s.title} style={[styles.dot, i === page && styles.dotActive]} />
        ))}
      </View>

      <View style={styles.bottom}>
        <Button label={page === SLIDES.length - 1 ? 'Get started' : 'Next'} onPress={next} />
        <Pressable style={styles.signin} onPress={() => nav.replace('SignIn')}>
          <Txt size={13.5} color={colors.textMuted}>
            Already have an account?{' '}
            <Txt size={13.5} color={colors.cyan} weight="semibold">Sign in</Txt>
          </Txt>
        </Pressable>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  top: { alignItems: 'flex-end', height: 40, justifyContent: 'center' },
  art: {
    width: 200,
    height: 200,
    borderRadius: 66,
    marginTop: 30,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  body: { marginTop: 14, lineHeight: 22, paddingHorizontal: 14 },
  dots: { flexDirection: 'row', justifyContent: 'center', marginTop: 34 },
  dot: {
    width: 7, height: 7, borderRadius: 4, marginHorizontal: 4,
    backgroundColor: 'rgba(255,255,255,0.22)',
  },
  dotActive: { width: 22, backgroundColor: colors.cyan },
  bottom: { marginTop: 'auto', paddingBottom: 6 },
  signin: { alignItems: 'center', marginTop: 18 },
});
