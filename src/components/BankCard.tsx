import React from 'react';
import { View, StyleSheet, ViewStyle, StyleProp } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Svg, { Rect, Path, Circle, G } from 'react-native-svg';
import Txt from './Txt';
import Icon from './Icon';
import { colors, radius, shadow } from '../theme';

export type CardScheme = 'mastercard' | 'visa' | 'generic';

export type CardData = {
  id: string;
  number: string;      // "5000 0000 0000 0000"
  holder: string;
  expiry: string;      // "00/00"
  scheme: CardScheme;
  gradient: readonly string[];
  balance?: string;
  label?: string;
};

type Props = {
  card: CardData;
  height?: number;
  style?: StyleProp<ViewStyle>;
  compact?: boolean;
};

export default function BankCard({ card, height = 216, style, compact }: Props) {
  return (
    <View style={[styles.wrap, { height, borderRadius: radius.lg }, shadow.card, style]}>
      <LinearGradient
        colors={card.gradient as any}
        start={{ x: 0.1, y: 0 }}
        end={{ x: 0.95, y: 1 }}
        style={StyleSheet.absoluteFill}
      />
      {/* subtle sheen */}
      <LinearGradient
        colors={['rgba(255,255,255,0.16)', 'rgba(255,255,255,0)']}
        start={{ x: 0, y: 0 }}
        end={{ x: 0.8, y: 0.9 }}
        style={StyleSheet.absoluteFill}
      />

      <View style={[styles.inner, compact && { padding: 18 }]}>
        <View style={styles.topRow}>
          <Chip />
          <View style={{ marginLeft: 10, marginTop: 2 }}>
            <Icon name="contactless" size={20} color="rgba(255,255,255,0.9)" />
          </View>
        </View>

        <Txt size={compact ? 17 : 20} weight="medium" style={styles.number}>
          {card.number}
        </Txt>

        <View style={styles.expiryRow}>
          <View style={styles.validThru}>
            <Txt size={6} weight="semibold" color="rgba(255,255,255,0.85)">VALID</Txt>
            <Txt size={6} weight="semibold" color="rgba(255,255,255,0.85)">THRU</Txt>
          </View>
          <Txt size={13} weight="medium">{card.expiry}</Txt>
        </View>

        <View style={styles.bottomRow}>
          <Txt size={15} weight="medium">{card.holder}</Txt>
          <SchemeMark scheme={card.scheme} />
        </View>
      </View>
    </View>
  );
}

function Chip() {
  return (
    <Svg width={40} height={31} viewBox="0 0 40 31">
      <Rect x="0.5" y="0.5" width="39" height="30" rx="6" fill="#E4E1D4" stroke="rgba(0,0,0,0.12)" />
      <G stroke="rgba(0,0,0,0.28)" strokeWidth="1.1" fill="none">
        <Path d="M13 0.5v30M27 0.5v30M0.5 10.5H13M27 10.5H39.5M0.5 20.5H13M27 20.5H39.5" />
        <Rect x="13" y="8" width="14" height="15" rx="3" />
      </G>
    </Svg>
  );
}

/** Generic scheme marks (placeholders — swap for licensed brand assets). */
function SchemeMark({ scheme }: { scheme: CardScheme }) {
  if (scheme === 'visa') {
    return <Txt size={20} weight="bold" style={{ letterSpacing: 1, fontStyle: 'italic' }}>VISA</Txt>;
  }
  if (scheme === 'generic') {
    return (
      <Svg width={48} height={30} viewBox="0 0 48 30">
        <Circle cx="18" cy="15" r="13" fill="rgba(255,255,255,0.55)" />
        <Circle cx="32" cy="15" r="13" fill="rgba(255,255,255,0.30)" />
      </Svg>
    );
  }
  return (
    <Svg width={56} height={34} viewBox="0 0 56 34">
      <Circle cx="21" cy="17" r="15" fill="#EB4B34" />
      <Circle cx="35" cy="17" r="15" fill="#F5A623" fillOpacity={0.95} />
      <Path
        d="M28 5.6a15 15 0 0 0 0 22.8 15 15 0 0 0 0-22.8z"
        fill="#F07B1D"
      />
    </Svg>
  );
}

const styles = StyleSheet.create({
  wrap: { overflow: 'hidden', backgroundColor: colors.purple },
  inner: { flex: 1, padding: 22, justifyContent: 'space-between' },
  topRow: { flexDirection: 'row', alignItems: 'center' },
  number: { letterSpacing: 2.2, marginTop: 4 },
  expiryRow: { flexDirection: 'row', alignItems: 'center', marginTop: -6 },
  validThru: { marginRight: 6 },
  bottomRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
});
