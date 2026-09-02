import React, { useRef, useState } from 'react';
import {
  View, StyleSheet, ScrollView, Dimensions, NativeSyntheticEvent, NativeScrollEvent, Pressable,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import Screen from '../components/Screen';
import Header from '../components/Header';
import Txt from '../components/Txt';
import Icon from '../components/Icon';
import Segmented from '../components/Segmented';
import BankCard from '../components/BankCard';
import IconTile from '../components/IconTile';
import GlassCard from '../components/GlassCard';
import Field from '../components/Field';
import ListRow from '../components/ListRow';
import { colors, gradients, radius } from '../theme';
import { cards, user } from '../data/mock';

const { width } = Dimensions.get('window');
const H_PAD = 22;
const CARD_W = width - H_PAD * 2;

export default function WalletScreen() {
  const nav = useNavigation<any>();
  const insets = useSafeAreaInsets();
  const [tab, setTab] = useState('Cards');
  const [page, setPage] = useState(0);
  const scroller = useRef<ScrollView>(null);

  const onScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    setPage(Math.round(e.nativeEvent.contentOffset.x / CARD_W));
  };

  return (
    <Screen scroll tabPadding padded={false} contentStyle={{ paddingTop: insets.top + 8 }}>
      <View style={{ paddingHorizontal: H_PAD }}>
        <Header title="Wallet" back={false} right="more" onRight={() => nav.navigate('Settings')} />
        <View style={{ marginTop: 8 }}>
          <Segmented variant="underline" items={['Cards', 'Account']} value={tab} onChange={setTab} />
        </View>
      </View>

      {tab === 'Cards' ? (
        <>
          {/* stacked cards behind the active one */}
          <View style={styles.stackWrap}>
            <View style={[styles.ghostCard, styles.ghostBack]} />
            <View style={[styles.ghostCard, styles.ghostFront]} />

            <ScrollView
              ref={scroller}
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              onScroll={onScroll}
              scrollEventThrottle={16}
              contentContainerStyle={{ paddingHorizontal: H_PAD }}
              snapToInterval={CARD_W}
              decelerationRate="fast"
            >
              {cards.map((c) => (
                <Pressable
                  key={c.id}
                  style={{ width: CARD_W }}
                  onPress={() => nav.navigate('CardDetail', { id: c.id })}
                >
                  <BankCard card={c} height={216} />
                </Pressable>
              ))}
            </ScrollView>
          </View>

          <View style={styles.dots}>
            {cards.map((c, i) => (
              <View key={c.id} style={[styles.dot, i === page && styles.dotActive]} />
            ))}
          </View>

          {/* quick actions */}
          <View style={[styles.tiles, { paddingHorizontal: H_PAD }]}>
            <IconTile icon="send" gradient={gradients.tileSend} onPress={() => nav.navigate('SendMoney')} />
            <IconTile icon="wallet" gradient={gradients.tileWallet} onPress={() => nav.navigate('TopUp')} />
            <IconTile icon="receive" gradient={gradients.tileReceive} onPress={() => nav.navigate('Receive')} />
            <IconTile icon="stats" gradient={gradients.tileStats} onPress={() => nav.navigate('Statistics')} />
          </View>

          {/* add card panel */}
          <View style={{ paddingHorizontal: H_PAD, marginTop: 26 }}>
            <GlassCard bright style={styles.addPanel}>
              <Pressable style={styles.addHead} onPress={() => nav.navigate('AddCard')}>
                <Icon name="plus" size={24} />
                <View style={{ marginLeft: 12 }}>
                  <Txt size={19} weight="bold">Add Card</Txt>
                  <Txt size={13} color="rgba(255,255,255,0.72)" style={{ marginTop: 2 }}>
                    Add your debit/credit card
                  </Txt>
                </View>
              </Pressable>

              <View style={{ marginTop: 18 }}>
                <Field placeholder="Card number" keyboardType="number-pad" />
                <Field placeholder="Card holder name" />
                <View style={styles.pairRow}>
                  <View style={styles.pairItem}><Field placeholder="MM/YY" /></View>
                  <View style={styles.pairGap} />
                  <View style={styles.pairItem}><Field placeholder="CVV" password /></View>
                </View>
              </View>

              <Pressable style={styles.saveBtn} onPress={() => nav.navigate('AddCard')}>
                <LinearGradient
                  colors={gradients.cta}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={StyleSheet.absoluteFill}
                />
                <Txt size={15} weight="semibold">Save Card</Txt>
              </Pressable>
            </GlassCard>
          </View>
        </>
      ) : (
        <View style={{ paddingHorizontal: H_PAD, marginTop: 24 }}>
          <GlassCard style={styles.accountCard}>
            <Txt size={12.5} color={colors.textMuted}>Total balance</Txt>
            <Txt size={30} weight="bold" style={{ marginTop: 4 }}>{user.balance}</Txt>
            <View style={styles.accountRow}>
              <View>
                <Txt size={11.5} color={colors.textMuted}>Account number</Txt>
                <Txt size={14} weight="medium" style={{ marginTop: 2 }}>•••• •••• 4471</Txt>
              </View>
              <View>
                <Txt size={11.5} color={colors.textMuted}>Routing</Txt>
                <Txt size={14} weight="medium" style={{ marginTop: 2 }}>021 000 021</Txt>
              </View>
            </View>
          </GlassCard>

          <Txt size={16} weight="semibold" style={{ marginTop: 26, marginBottom: 14 }}>Account details</Txt>
          <ListRow icon="user" title="Account holder" subtitle={user.name} right={<View />} />
          <ListRow icon="mail" title="Email" subtitle={user.email} right={<View />} tint={colors.purple} />
          <ListRow icon="phone" title="Phone" subtitle={user.phone} right={<View />} tint={colors.green} />
          <ListRow icon="globe" title="Currency" subtitle="USD — US Dollar" tint={colors.amber} />
          <ListRow icon="download" title="Download statement" subtitle="Last 12 months" tint={colors.blue} />
        </View>
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  stackWrap: { marginTop: 26, justifyContent: 'center' },
  ghostCard: {
    position: 'absolute',
    top: -18,
    alignSelf: 'center',
    height: 60,
    borderRadius: radius.lg,
  },
  ghostBack: { width: CARD_W - 68, top: -22, backgroundColor: '#4FC3A5', opacity: 0.75 },
  ghostFront: { width: CARD_W - 34, top: -11, backgroundColor: '#3F8FD8', opacity: 0.85 },
  dots: { flexDirection: 'row', justifyContent: 'center', marginTop: 18 },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginHorizontal: 4,
    backgroundColor: 'rgba(255,255,255,0.25)',
  },
  dotActive: { backgroundColor: colors.cyan, width: 7, height: 7, borderRadius: 3.5 },
  tiles: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 24 },
  addPanel: { padding: 22, paddingBottom: 24 },
  addHead: { flexDirection: 'row', alignItems: 'center' },
  pairRow: { flexDirection: 'row' },
  pairItem: { flex: 1 },
  pairGap: { width: 14 },
  saveBtn: {
    height: 54,
    borderRadius: radius.md,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 6,
  },
  accountCard: { padding: 22 },
  accountRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 22 },
});
