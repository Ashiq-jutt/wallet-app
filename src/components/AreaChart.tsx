import React from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Path, Defs, LinearGradient as SvgGradient, Stop, Line, Circle } from 'react-native-svg';
import Txt from './Txt';
import { colors, radius } from '../theme';

type Props = {
  data: number[];
  labels: string[];
  width: number;
  height?: number;
  activeIndex?: number;
  tooltip?: string;
};

/** Smooth (Catmull-Rom → bezier) area chart like the Statistics screen. */
export default function AreaChart({ data, labels, width, height = 190, activeIndex = 5, tooltip }: Props) {
  const max = Math.max(...data) * 1.18;
  const min = Math.min(...data) * 0.6;
  const stepX = width / (data.length - 1);
  const y = (v: number) => height - ((v - min) / (max - min)) * height;

  const pts = data.map((v, i) => ({ x: i * stepX, y: y(v) }));

  let d = `M ${pts[0].x} ${pts[0].y}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] || pts[i];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[i + 2] || p2;
    const c1x = p1.x + (p2.x - p0.x) / 6;
    const c1y = p1.y + (p2.y - p0.y) / 6;
    const c2x = p2.x - (p3.x - p1.x) / 6;
    const c2y = p2.y - (p3.y - p1.y) / 6;
    d += ` C ${c1x} ${c1y}, ${c2x} ${c2y}, ${p2.x} ${p2.y}`;
  }
  const area = `${d} L ${width} ${height + 40} L 0 ${height + 40} Z`;
  const active = pts[Math.min(activeIndex, pts.length - 1)];

  return (
    <View>
      {!!tooltip && (
        <View
          style={[
            styles.tooltip,
            { left: Math.min(Math.max(active.x - 46, 0), width - 92) },
          ]}
        >
          <Txt size={13} weight="medium">{tooltip}</Txt>
        </View>
      )}

      <Svg width={width} height={height + 40}>
        <Defs>
          <SvgGradient id="areaFill" x1="0" y1="0" x2="0" y2="1">
            <Stop offset="0" stopColor={colors.cyan} stopOpacity="0.45" />
            <Stop offset="1" stopColor={colors.cyan} stopOpacity="0.02" />
          </SvgGradient>
          <SvgGradient id="areaLine" x1="0" y1="0" x2="1" y2="0">
            <Stop offset="0" stopColor="#5AD8F7" />
            <Stop offset="1" stopColor="#3FC6F2" />
          </SvgGradient>
        </Defs>

        {/* vertical guides */}
        {pts.map((p, i) => (
          <Line
            key={`gl-${i}`}
            x1={p.x}
            y1={0}
            x2={p.x}
            y2={height + 20}
            stroke="rgba(255,255,255,0.055)"
            strokeWidth={1}
            strokeDasharray="4 6"
          />
        ))}

        <Path d={area} fill="url(#areaFill)" />
        <Path d={d} stroke="url(#areaLine)" strokeWidth={2.5} fill="none" strokeLinecap="round" />
        <Circle cx={active.x} cy={active.y} r={5.5} fill="#FFF" />
        <Circle cx={active.x} cy={active.y} r={10} fill={colors.cyan} fillOpacity={0.25} />
      </Svg>

      <View style={[styles.labels, { width }]}>
        {labels.map((l, i) => (
          <Txt
            key={l}
            size={12.5}
            weight={i === activeIndex ? 'semibold' : 'regular'}
            color={i === activeIndex ? colors.cyan : colors.textMuted}
          >
            {l}
          </Txt>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  tooltip: {
    position: 'absolute',
    top: -16,
    zIndex: 5,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: radius.sm,
    backgroundColor: 'rgba(60,90,170,0.55)',
    borderWidth: 1,
    borderColor: 'rgba(140,200,255,0.35)',
  },
  labels: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 6 },
});
