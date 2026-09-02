import React from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Screen from '../components/Screen';
import Txt from '../components/Txt';
import Field from '../components/Field';
import Button from '../components/Button';
import Icon from '../components/Icon';
import { colors, radius } from '../theme';

export default function SignInScreen() {
  const nav = useNavigation<any>();

  return (
    <Screen scroll>
      <Txt size={30} weight="bold" style={{ marginTop: 40 }}>Welcome back</Txt>
      <Txt size={14.5} color={colors.textMuted} style={{ marginTop: 8, marginBottom: 34 }}>
        Sign in to continue managing your money.
      </Txt>

      <Field label="Email" icon="mail" placeholder="you@example.com" keyboardType="email-address" autoCapitalize="none" />
      <Field label="Password" icon="lock" placeholder="••••••••" password />

      <Pressable style={styles.forgot} onPress={() => nav.navigate('ForgotPassword')}>
        <Txt size={13} color={colors.cyan} weight="medium">Forgot password?</Txt>
      </Pressable>

      <Button label="Sign in" onPress={() => nav.replace('Main')} style={{ marginTop: 22 }} />

      <View style={styles.bioRow}>
        <Pressable style={styles.bio} onPress={() => nav.replace('Main')}>
          <Icon name="fingerprint" size={26} color={colors.cyan} />
        </Pressable>
        <Txt size={12.5} color={colors.textMuted} style={{ marginTop: 10 }}>Use biometrics</Txt>
      </View>

      <View style={styles.dividerRow}>
        <View style={styles.line} />
        <Txt size={12} color={colors.textDim} style={{ marginHorizontal: 12 }}>or continue with</Txt>
        <View style={styles.line} />
      </View>

      <View style={styles.socials}>
        {['globe', 'user', 'phone'].map((n) => (
          <Pressable key={n} style={styles.social}>
            <Icon name={n as any} size={20} color={colors.text} />
          </Pressable>
        ))}
      </View>

      <Pressable style={styles.footer} onPress={() => nav.navigate('SignUp')}>
        <Txt size={13.5} color={colors.textMuted}>
          Don't have an account?{' '}
          <Txt size={13.5} color={colors.cyan} weight="semibold">Sign up</Txt>
        </Txt>
      </Pressable>
    </Screen>
  );
}

const styles = StyleSheet.create({
  forgot: { alignSelf: 'flex-end', marginTop: 2 },
  bioRow: { alignItems: 'center', marginTop: 26 },
  bio: {
    width: 58, height: 58, borderRadius: 20,
    alignItems: 'center', justifyContent: 'center',
    borderWidth: 1, borderColor: colors.glassBorder,
    backgroundColor: 'rgba(47,196,240,0.08)',
  },
  dividerRow: { flexDirection: 'row', alignItems: 'center', marginTop: 30 },
  line: { flex: 1, height: 1, backgroundColor: 'rgba(255,255,255,0.09)' },
  socials: { flexDirection: 'row', justifyContent: 'center', marginTop: 20 },
  social: {
    width: 62, height: 52, borderRadius: radius.md, marginHorizontal: 7,
    alignItems: 'center', justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderWidth: 1, borderColor: colors.surfaceBorder,
  },
  footer: { alignItems: 'center', marginTop: 34 },
});
