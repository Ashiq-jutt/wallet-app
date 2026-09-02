import React, { useState } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Screen from '../components/Screen';
import Header from '../components/Header';
import Txt from '../components/Txt';
import Segmented from '../components/Segmented';
import AreaChart from '../components/AreaChart';
import GlassCard from '../components/GlassCard';
import { colors, radius } from '../theme';
import { weekSeries, monthSeries, yearSeries, categories } from '../data/mock';

const { width } = Dimensions.get('window');
const CHART_W = width - 44 - 24;

export default function StatisticsScreen() {
  const nav = useNavigation<any>();
  const [range, setRange] = useState('Week');
  const [flow, setFlow] = useState('Outcome');

  const series = range === 'Week' ? weekSeries : range === 'Month' ? monthSeries : yearSeries;
  const peak = series.data.indexOf(Math.max(...series.data));

  return (
    <Screen scroll tabPadding>
      <Header title="Statistics" back={false} right={null} align="left" />

      <View style={{ marginTop: 10 }}>
        <Segmented items={['Week', 'Month', 'Year']} value={range} onChange={setRange} />
      </View>

      <View style={styles.totalWrap}>
        <Txt size={14} color={colors.textMuted}>Total Spendings</Txt>
        <Txt size={28} weight="bold" style={{ marginTop: 6 }}>$3,660.00</Txt>
      </View>

      <GlassCard style={styles.panel}>
        <Segmented variant="underline" items={['Income', 'Outcome']} value={flow} onChange={setFlow} />

        <Txt size={17} weight="semibold" style={{ marginTop: 22, marginBottom: 8 }}>Overview</Txt>

        <AreaChart
          width={CHART_W}
          height={175}
          data={series.data}
          labels={series.labels}
          activeIndex={peak}
          tooltip={flow === 'Outcome' ? '-$1,234.45' : '+$4,200.00'}
        />

        <View style={styles.insight}>
          <Txt size={14.5} style={{ lineHeight: 21 }}>
            Your spending decreased from 5% the last week. Good job!
          </Txt>
        </View>
      </GlassCard>

      <Txt size={17} weight="semibold" style={{ marginTop: 26, marginBottom: 14 }}>By category</Txt>
      {categories.map((c) => (
        <View key={c.id} style={styles.catRow}>
          <View style={styles.catHead}>
            <View style={styles.catLabel}>
              <View style={[styles.swatch, { backgroundColor: c.color }]} />
              <Txt size={14.5} weight="medium">{c.label}</Txt>
            </View>
            <Txt size={14} weight="medium" color={colors.textMuted}>
              ${c.amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </Txt>
          </View>
          <View style={styles.track}>
            <View style={[styles.fill, { width: `${c.pct}%`, backgroundColor: c.color }]} />
          </View>
        </View>
      ))}
    </Screen>
  );
}

const styles = StyleSheet.create({
  totalWrap: { alignItems: 'center', marginTop: 26, marginBottom: 20 },
  panel: { padding: 20, paddingBottom: 24 },
  insight: {
    marginTop: 18,
    padding: 18,
    borderRadius: radius.lg,
    backgroundColor: 'rgba(70,140,220,0.20)',
    borderWidth: 1,
    borderColor: 'rgba(120,200,255,0.28)',
  },
  catRow: { marginBottom: 18 },
  catHead: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 9 },
  catLabel: { flexDirection: 'row', alignItems: 'center' },
  swatch: { width: 10, height: 10, borderRadius: 3, marginRight: 10 },
  track: { height: 7, borderRadius: 4, backgroundColor: 'rgba(255,255,255,0.07)', overflow: 'hidden' },
  fill: { height: '100%', borderRadius: 4 },
});
