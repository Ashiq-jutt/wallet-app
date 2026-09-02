import React from 'react';
import { View, StyleSheet } from 'react-native';
import Screen from '../components/Screen';
import Header from '../components/Header';
import Txt from '../components/Txt';
import Field from '../components/Field';
import Button from '../components/Button';
import ListRow from '../components/ListRow';
import GlassCard from '../components/GlassCard';
import { colors } from '../theme';

const FAQ = [
  'How do I add a new card?',
  'Why is my transfer pending?',
  'How do I freeze a card?',
  'Can I change my daily limit?',
];

export default function SupportScreen() {
  return (
    <Screen scroll>
      <Header title="Help & Support" right={null} />

      <Field icon="search" placeholder="Search help articles" style={{ marginTop: 10 }} />

      <Txt size={16} weight="semibold" style={styles.section}>Get in touch</Txt>
      <ListRow icon="phone" title="Call support" subtitle="24/7 · Free" tint={colors.green} />
      <ListRow icon="mail" title="Email us" subtitle="support@nova.app" tint={colors.blue} />
      <ListRow icon="help" title="Live chat" subtitle="Average reply 2 min" tint={colors.purple} />

      <Txt size={16} weight="semibold" style={styles.section}>Popular questions</Txt>
      {FAQ.map((q) => (
        <ListRow key={q} icon="help" title={q} tint={colors.amber} />
      ))}

      <Txt size={16} weight="semibold" style={styles.section}>Send a message</Txt>
      <GlassCard style={styles.box}>
        <Field placeholder="Subject" />
        <Field placeholder="Describe your issue…" multiline numberOfLines={4} style={{ height: 90, textAlignVertical: 'top' }} />
        <Button label="Submit ticket" icon="send" />
      </GlassCard>
    </Screen>
  );
}

const styles = StyleSheet.create({
  section: { marginTop: 24, marginBottom: 14 },
  box: { padding: 18 },
});
