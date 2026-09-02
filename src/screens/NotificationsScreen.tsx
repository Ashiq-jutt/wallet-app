import React, { useState } from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import Screen from '../components/Screen';
import Header from '../components/Header';
import Txt from '../components/Txt';
import Icon from '../components/Icon';
import { colors, radius } from '../theme';
import { notifications } from '../data/mock';

const TABS = ['All', 'Unread'];

export default function NotificationsScreen() {
  const [tab, setTab] = useState('All');
  const list = tab === 'Unread' ? notifications.filter((n) => n.unread) : notifications;

  return (
    <Screen scroll>
      <Header title="Notifications" right="settings" onRight={() => {}} />

      <View style={styles.tabs}>
        {TABS.map((t) => {
          const on = t === tab;
          return (
            <Pressable key={t} onPress={() => setTab(t)} style={[styles.tab, on && styles.tabOn]}>
              <Txt size={13} weight={on ? 'semibold' : 'regular'} color={on ? colors.bgDeep : colors.textMuted}>
                {t}
              </Txt>
            </Pressable>
          );
        })}
        <View style={{ flex: 1 }} />
        <Pressable hitSlop={8}>
          <Txt size={12.5} color={colors.cyan} weight="medium">Mark all read</Txt>
        </Pressable>
      </View>

      {list.map((n) => (
        <Pressable key={n.id} style={[styles.item, n.unread && styles.itemUnread]}>
          <View style={[styles.iconBox, { backgroundColor: n.tint + '22' }]}>
            <Icon name={n.icon} size={19} color={n.tint} />
          </View>
          <View style={{ flex: 1 }}>
            <View style={styles.titleRow}>
              <Txt size={14.5} weight="medium" style={{ flex: 1 }}>{n.title}</Txt>
              <Txt size={11.5} color={colors.textDim}>{n.time}</Txt>
            </View>
            <Txt size={12.5} color={colors.textMuted} style={{ marginTop: 3, lineHeight: 18 }}>{n.body}</Txt>
          </View>
          {n.unread && <View style={styles.unreadDot} />}
        </Pressable>
      ))}

      {list.length === 0 && (
        <View style={styles.empty}>
          <Icon name="bell" size={38} color={colors.textDim} />
          <Txt size={14} color={colors.textDim} style={{ marginTop: 14 }}>You're all caught up.</Txt>
        </View>
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  tabs: { flexDirection: 'row', alignItems: 'center', marginTop: 16, marginBottom: 18 },
  tab: {
    paddingHorizontal: 16, paddingVertical: 8, borderRadius: radius.pill, marginRight: 9,
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderWidth: 1, borderColor: colors.surfaceBorder,
  },
  tabOn: { backgroundColor: colors.cyan, borderColor: colors.cyan },
  item: {
    flexDirection: 'row', alignItems: 'flex-start',
    padding: 15, borderRadius: radius.md, marginBottom: 11,
    backgroundColor: 'rgba(255,255,255,0.04)',
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.055)',
  },
  itemUnread: { backgroundColor: 'rgba(47,196,240,0.06)', borderColor: 'rgba(47,196,240,0.18)' },
  iconBox: {
    width: 40, height: 40, borderRadius: 13, marginRight: 13,
    alignItems: 'center', justifyContent: 'center',
  },
  titleRow: { flexDirection: 'row', alignItems: 'center' },
  unreadDot: {
    width: 7, height: 7, borderRadius: 4, backgroundColor: colors.cyan,
    marginLeft: 10, marginTop: 6,
  },
  empty: { alignItems: 'center', paddingVertical: 60 },
});
