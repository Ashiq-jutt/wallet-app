import React from 'react';
import { View, Pressable, StyleSheet, Platform } from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon, { IconName } from './Icon';
import { colors } from '../theme';

const ICONS: Record<string, IconName> = {
  Home: 'home',
  Wallet: 'card',
  Profile: 'user',
  Statistics: 'stats',
};

export default function TabBar({ state, navigation }: BottomTabBarProps) {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.wrap, { paddingBottom: Math.max(insets.bottom, 12) }]}>
      <LinearGradient
        colors={['rgba(70,86,180,0.55)', 'rgba(58,70,155,0.92)']}
        style={StyleSheet.absoluteFill}
      />
      <View style={styles.row}>
        {state.routes.map((route, i) => {
          const focused = state.index === i;
          return (
            <Pressable
              key={route.key}
              style={styles.item}
              hitSlop={8}
              onPress={() => {
                const event = navigation.emit({ type: 'tabPress', target: route.key, canPreventDefault: true });
                if (!focused && !event.defaultPrevented) navigation.navigate(route.name as never);
              }}
            >
              {focused && <View style={styles.glow} />}
              <Icon
                name={ICONS[route.name] ?? 'home'}
                size={24}
                color={focused ? colors.cyanSoft : 'rgba(255,255,255,0.55)'}
                strokeWidth={focused ? 2.1 : 1.7}
              />
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    overflow: 'hidden',
    borderTopWidth: 1,
    borderColor: 'rgba(255,255,255,0.10)',
  },
  row: { flexDirection: 'row', height: 66, alignItems: 'center' },
  item: { flex: 1, alignItems: 'center', justifyContent: 'center', height: '100%' },
  glow: {
    position: 'absolute',
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: 'rgba(90,216,247,0.18)',
    ...Platform.select({
      ios: { shadowColor: colors.cyan, shadowOpacity: 0.9, shadowRadius: 14, shadowOffset: { width: 0, height: 0 } },
      android: {},
    }),
  },
});
