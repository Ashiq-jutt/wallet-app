import React, { useState } from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Screen from '../components/Screen';
import Header from '../components/Header';
import Txt from '../components/Txt';
import Button from '../components/Button';
import { colors, radius } from '../theme';

const CODE = ['4', '8', '1', '', '', ''];

export default function VerifyScreen() {
  const nav = useNavigation<any>();
  const [active] = useState(3);

  return (
    <Screen scroll>
      <Header right={null} />

      <Txt size={26} weight="bold" style={{ marginTop: 26 }}>Verification</Txt>
      <Txt size={14.5} color={colors.textMuted} style={{ marginTop: 8, marginBottom: 34, lineHeight: 22 }}>
        We sent a code to sandy.****@mail.com
      </Txt>

      <View style={styles.row}>
        {CODE.map((c, i) => (
          <View key={i} style={[styles.cell, i === active && styles.cellActive, !!c && styles.cellFilled]}>
            <Txt size={22} weight="semibold">{c}</Txt>
            {i === active && <View style={styles.caret} />}
          </View>
        ))}
      </View>

      <Pressable style={styles.resend}>
        <Txt size={13} color={colors.textMuted}>
          Didn't get it? <Txt size={13} color={colors.cyan} weight="semibold">Resend in 0:24</Txt>
        </Txt>
      </Pressable>

      <Button label="Verify" onPress={() => nav.replace('Main')} style={{ marginTop: 30 }} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', justifyContent: 'space-between' },
  cell: {
    width: 48, height: 58, borderRadius: radius.sm,
    alignItems: 'center', justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.09)',
  },
  cellFilled: { borderColor: 'rgba(255,255,255,0.2)' },
  cellActive: { borderColor: colors.cyan, backgroundColor: 'rgba(47,196,240,0.08)' },
  caret: { position: 'absolute', width: 1.5, height: 22, backgroundColor: colors.cyan },
  resend: { alignItems: 'center', marginTop: 22 },
});
