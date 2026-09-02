import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Screen from '../components/Screen';
import Header from '../components/Header';
import Txt from '../components/Txt';
import Field from '../components/Field';
import Button from '../components/Button';
import Icon from '../components/Icon';
import { colors } from '../theme';

export default function ForgotPasswordScreen() {
  const nav = useNavigation<any>();

  return (
    <Screen scroll>
      <Header right={null} />

      <View style={styles.badge}>
        <Icon name="lock" size={30} color={colors.cyan} />
      </View>

      <Txt size={26} weight="bold" style={{ marginTop: 26 }}>Reset password</Txt>
      <Txt size={14.5} color={colors.textMuted} style={{ marginTop: 8, marginBottom: 30, lineHeight: 22 }}>
        Enter the email tied to your account and we'll send you a 6-digit code.
      </Txt>

      <Field label="Email" icon="mail" placeholder="you@example.com" keyboardType="email-address" autoCapitalize="none" />
      <Button label="Send code" onPress={() => nav.navigate('Verify')} style={{ marginTop: 14 }} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  badge: {
    width: 66, height: 66, borderRadius: 22, marginTop: 20,
    alignItems: 'center', justifyContent: 'center',
    backgroundColor: 'rgba(47,196,240,0.10)',
    borderWidth: 1, borderColor: 'rgba(47,196,240,0.28)',
  },
});
