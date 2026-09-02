import React from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Rect } from 'react-native-svg';
import Screen from '../components/Screen';
import Header from '../components/Header';
import Txt from '../components/Txt';
import Button from '../components/Button';
import GlassCard from '../components/GlassCard';
import ListRow from '../components/ListRow';
import { colors, radius } from '../theme';
import { user } from '../data/mock';

/** Decorative QR block — replace with a real QR renderer when wiring data. */
function FakeQR({ size = 168 }: { size?: number }) {
  const cells = 13;
  const s = size / cells;
  const on = (x: number, y: number) => ((x * 7 + y * 13 + ((x * y) % 5)) % 3 === 0);
  const finder = (x: number, y: number) =>
    (x < 4 && y < 4) || (x > cells - 5 && y < 4) || (x < 4 && y > cells - 5);

  return (
    <Svg width={size} height={size}>
      {Array.from({ length: cells }).map((_, y) =>
        Array.from({ length: cells }).map((__, x) =>
          on(x, y) && !finder(x, y) ? (
            <Rect key={`${x}-${y}`} x={x * s} y={y * s} width={s * 0.85} height={s * 0.85} rx={1.5} fill="#0E0C24" />
          ) : null
        )
      )}
      {[[0, 0], [cells - 4, 0], [0, cells - 4]].map(([fx, fy]) => (
        <React.Fragment key={`f-${fx}-${fy}`}>
          <Rect x={fx * s} y={fy * s} width={s * 3.7} height={s * 3.7} rx={6} fill="#0E0C24" />
          <Rect x={(fx + 0.8) * s} y={(fy + 0.8) * s} width={s * 2.1} height={s * 2.1} rx={3} fill="#FFFFFF" />
        </React.Fragment>
      ))}
    </Svg>
  );
}

export default function ReceiveScreen() {
  return (
    <Screen scroll>
      <Header title="Receive" right="share" onRight={() => {}} />

      <GlassCard style={styles.card}>
        <View style={styles.qrBox}>
          <FakeQR />
        </View>
        <Txt size={17} weight="semibold" style={{ marginTop: 20 }}>{user.name}</Txt>
        <Txt size={13} color={colors.textMuted} style={{ marginTop: 3 }}>{user.handle}</Txt>
        <Txt size={12.5} color={colors.textDim} center style={{ marginTop: 14, lineHeight: 19 }}>
          Show this code to receive money instantly, or share your link below.
        </Txt>
      </GlassCard>

      <Txt size={16} weight="semibold" style={{ marginTop: 26, marginBottom: 14 }}>Share details</Txt>
      <ListRow icon="copy" title="Payment link" subtitle="nova.app/pay/sandy" right={<Txt size={12.5} color={colors.cyan}>Copy</Txt>} />
      <ListRow icon="card" title="Account number" subtitle="•••• •••• 4471" tint={colors.purple} right={<Txt size={12.5} color={colors.cyan}>Copy</Txt>} />
      <ListRow icon="mail" title="Email" subtitle={user.email} tint={colors.green} right={<Txt size={12.5} color={colors.cyan}>Copy</Txt>} />

      <Button label="Share payment link" icon="share" style={{ marginTop: 20 }} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  card: { alignItems: 'center', padding: 24, marginTop: 20 },
  qrBox: { padding: 18, borderRadius: radius.lg, backgroundColor: '#FFFFFF' },
});
