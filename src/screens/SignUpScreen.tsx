import React, { useState } from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Screen from '../components/Screen';
import Header from '../components/Header';
import Txt from '../components/Txt';
import Field from '../components/Field';
import Button from '../components/Button';
import Icon from '../components/Icon';
import { colors, radius } from '../theme';

export default function SignUpScreen() {
  const nav = useNavigation<any>();
  const [agree, setAgree] = useState(true);

  return (
    <Screen scroll>
      <Header right={null} />
      <Txt size={30} weight="bold" style={{ marginTop: 18 }}>Create account</Txt>
      <Txt size={14.5} color={colors.textMuted} style={{ marginTop: 8, marginBottom: 30 }}>
        A few details and your wallet is ready.
      </Txt>

      <Field label="Full name" icon="user" placeholder="Sandy Chungus" />
      <Field label="Email" icon="mail" placeholder="you@example.com" keyboardType="email-address" autoCapitalize="none" />
      <Field label="Phone" icon="phone" placeholder="+1 (000) 000-0000" keyboardType="phone-pad" />
      <Field label="Password" icon="lock" placeholder="At least 8 characters" password />

      <Pressable style={styles.agreeRow} onPress={() => setAgree((a) => !a)}>
        <View style={[styles.box, agree && styles.boxOn]}>
          {agree && <Icon name="check" size={13} color="#FFF" strokeWidth={2.6} />}
        </View>
        <Txt size={12.5} color={colors.textMuted} style={{ flex: 1, lineHeight: 19 }}>
          I agree to the{' '}
          <Txt size={12.5} color={colors.cyan} weight="medium">Terms of Service</Txt> and{' '}
          <Txt size={12.5} color={colors.cyan} weight="medium">Privacy Policy</Txt>.
        </Txt>
      </Pressable>

      <Button label="Create account" onPress={() => nav.replace('Main')} style={{ marginTop: 22 }} />

      <Pressable style={styles.footer} onPress={() => nav.navigate('SignIn')}>
        <Txt size={13.5} color={colors.textMuted}>
          Already registered?{' '}
          <Txt size={13.5} color={colors.cyan} weight="semibold">Sign in</Txt>
        </Txt>
      </Pressable>
    </Screen>
  );
}

const styles = StyleSheet.create({
  agreeRow: { flexDirection: 'row', alignItems: 'flex-start', marginTop: 6 },
  box: {
    width: 20, height: 20, borderRadius: 6, marginRight: 12, marginTop: 1,
    borderWidth: 1.4, borderColor: 'rgba(255,255,255,0.28)',
    alignItems: 'center', justifyContent: 'center',
  },
  boxOn: { backgroundColor: colors.cyan, borderColor: colors.cyan },
  footer: { alignItems: 'center', marginTop: 28 },
});
