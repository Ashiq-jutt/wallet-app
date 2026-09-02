import React from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Screen from '../components/Screen';
import Header from '../components/Header';
import Txt from '../components/Txt';
import Avatar from '../components/Avatar';
import Field from '../components/Field';
import Button from '../components/Button';
import Icon from '../components/Icon';
import { colors } from '../theme';
import { user } from '../data/mock';

export default function EditProfileScreen() {
  const nav = useNavigation<any>();

  return (
    <Screen scroll>
      <Header title="Edit Profile" right={null} />

      <View style={styles.hero}>
        <View>
          <Avatar uri={user.avatar} name={user.name} size={104} />
          <Pressable style={styles.camera}>
            <Icon name="edit" size={15} color="#FFF" />
          </Pressable>
        </View>
        <Txt size={13} color={colors.cyan} weight="medium" style={{ marginTop: 14 }}>Change photo</Txt>
      </View>

      <Field label="Full name" icon="user" defaultValue={user.name} />
      <Field label="Email" icon="mail" defaultValue={user.email} keyboardType="email-address" autoCapitalize="none" />
      <Field label="Phone" icon="phone" defaultValue={user.phone} keyboardType="phone-pad" />
      <Field label="Username" icon="star" defaultValue={user.handle} autoCapitalize="none" />
      <Field label="Address" icon="globe" defaultValue="742 Market St, San Francisco, CA" />

      <Button label="Save changes" onPress={() => nav.goBack()} style={{ marginTop: 12 }} />
      <Button label="Cancel" variant="ghost" onPress={() => nav.goBack()} style={{ marginTop: 12 }} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  hero: { alignItems: 'center', marginTop: 16, marginBottom: 28 },
  camera: {
    position: 'absolute', right: -2, bottom: -2,
    width: 32, height: 32, borderRadius: 16,
    alignItems: 'center', justifyContent: 'center',
    backgroundColor: colors.cyan,
    borderWidth: 3, borderColor: colors.bg,
  },
});
