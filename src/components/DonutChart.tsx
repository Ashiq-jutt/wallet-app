import React from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Circle, Defs, LinearGradient as SvgGradient, Stop, G } from 'react-native-svg';
import Txt from './Txt';
import { colors } from '../theme';

export type Segment = { value: number; from: string; to: string };

type Props = {
  size?: number;
  thickness?: number;
  segments: Segment[];
  amount: string;
  caption?: string;
  /** total gap (deg) distributed between segments */
  gap?: number;
};

/**
 * Multi-segment gradient ring, matching the balance ring on the Home screen.
 * Each segment is a stroked arc drawn with its own gradient + rotation.
 */
export default function DonutChart({
  size = 200,
  thickness = 26,
  segments,
  amount,
  caption = 'Available Balance',
  gap = 3,
}: Props) {
  const r = (size - thickness) / 2;
  const c = 2 * Math.PI * r;
  const total = segments.reduce((s, x) => s + x.value, 0) || 1;

  let cursor = 0;
  const arcs = segments.map((seg, i) => {
    const frac = seg.value / total;
    const len = Math.max(c * frac - (gap / 360) * c, 1);
    const rotation = (cursor / total) * 360 - 90;
    cursor += seg.value;
    return { ...seg, len, rotation, key: `seg-${i}` };
  });

  return (
    <View style={{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }}>
      <Svg width={size} height={size} style={StyleSheet.absoluteFill}>
        <Defs>
          {arcs.map((a) => (
            <SvgGradient key={`g-${a.key}`} id={a.key} x1="0" y1="0" x2="1" y2="1">
              <Stop offset="0" stopColor={a.from} />
              <Stop offset="1" stopColor={a.to} />
            </SvgGradient>
          ))}
        </Defs>

        {/* track */}
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          stroke="rgba(255,255,255,0.055)"
          strokeWidth={thickness}
          fill="none"
        />

        {arcs.map((a) => (
          <G key={a.key} rotation={a.rotation} origin={`${size / 2}, ${size / 2}`}>
            <Circle
              cx={size / 2}
              cy={size / 2}
              r={r}
              stroke={`url(#${a.key})`}
              strokeWidth={thickness}
              strokeDasharray={`${a.len} ${c}`}
              strokeLinecap="round"
              fill="none"
            />
          </G>
        ))}
      </Svg>

      <Txt size={26} weight="bold">{amount}</Txt>
      <Txt size={12.5} color={colors.textMuted} style={{ marginTop: 2 }}>{caption}</Txt>
    </View>
  );
}
