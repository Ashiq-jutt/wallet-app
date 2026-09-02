import React, { useState } from 'react';
import { View, StyleSheet, Switch } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Screen from '../components/Screen';
import Header from '../components/Header';
import Txt from '../components/Txt';
import ListRow from '../components/ListRow';
import { colors } from '../theme';

export default function SettingsScreen() {
  const nav = useNavigation<any>();
  const [push, setPush] = useState(true);
  const [biometrics, setBiometrics] = useState(true);
  const [dark, setDark] = useState(true);

  const toggle = (v: boolean, set: (b: boolean) => void) => (
    <Switch value={v} onValueChange={set} trackColor={{ true: colors.cyan, false: '#3A3568' }} thumbColor="#FFF" />
  );

  return (
    <Screen scroll>
      <Header title="Settings" right={null} />

      <Txt size={16} weight="semibold" style={styles.section}>Security</Txt>
      <ListRow icon="fingerprint" title="Biometric unlock" subtitle="Face ID / Touch ID" right={toggle(biometrics, setBiometrics)} />
      <ListRow icon="lock" title="Change password" tint={colors.purple} onPress={() => nav.navigate('ForgotPassword')} />
      <ListRow icon="shield" title="Two-factor authentication" subtitle="Enabled" tint={colors.green} />
      <ListRow icon="card" title="Trusted devices" subtitle="2 devices" tint={colors.blue} />

      <Txt size={16} weight="semibold" style={styles.section}>Preferences</Txt>
      <ListRow icon="bell" title="Push notifications" right={toggle(push, setPush)} tint={colors.amber} />
      <ListRow icon="moon" title="Dark appearance" right={toggle(dark, setDark)} tint={colors.purple} />
      <ListRow icon="globe" title="Language" subtitle="English (US)" />
      <ListRow icon="wallet" title="Default currency" subtitle="USD" tint={colors.green} />

      <Txt size={16} weight="semibold" style={styles.section}>About</Txt>
      <ListRow icon="help" title="Help & support" tint={colors.blue} onPress={() => nav.navigate('Support')} />
      <ListRow icon="star" title="Rate the app" tint={colors.amber} />
      <ListRow icon="edit" title="Terms & privacy" />
      <ListRow icon="logout" title="Log out" danger right={<View />} onPress={() => nav.navigate('SignIn')} />

      <Txt size={12} color={colors.textDim} center style={{ marginTop: 26 }}>Nova · Version 1.0.0</Txt>
    </Screen>
  );
}

const styles = StyleSheet.create({
  section: { marginTop: 24, marginBottom: 14 },
});
