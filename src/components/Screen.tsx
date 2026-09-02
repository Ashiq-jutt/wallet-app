import React from 'react';
import { View, StyleSheet, StatusBar, ScrollView, ViewStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, gradients } from '../theme';

type Props = {
  children: React.ReactNode;
  scroll?: boolean;
  padded?: boolean;
  /** extra bottom padding so content clears the floating tab bar */
  tabPadding?: boolean;
  contentStyle?: ViewStyle;
};

export default function Screen({ children, scroll, padded = true, tabPadding, contentStyle }: Props) {
  const insets = useSafeAreaInsets();
  const pad = {
    paddingTop: insets.top + 8,
    paddingHorizontal: padded ? 22 : 0,
    paddingBottom: (tabPadding ? 110 : 24) + insets.bottom,
  };

  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      <LinearGradient colors={gradients.screen} locations={[0, 0.55, 1]} style={StyleSheet.absoluteFill} />
      {/* soft blue bloom at the bottom, as in the mock */}
      <LinearGradient
        colors={gradients.screenBottom}
        style={[StyleSheet.absoluteFill, { top: '55%' }]}
        pointerEvents="none"
      />
      {scroll ? (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[pad, contentStyle]}
          keyboardShouldPersistTaps="handled"
        >
          {children}
        </ScrollView>
      ) : (
        <View style={[styles.flex, pad, contentStyle]}>{children}</View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bg },
  flex: { flex: 1 },
});
