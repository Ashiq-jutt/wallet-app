import React from 'react';
import { Text, TextProps, StyleSheet } from 'react-native';
import { colors, font } from '../theme';

type Weight = 'regular' | 'medium' | 'semibold' | 'bold';

type Props = TextProps & {
  size?: number;
  weight?: Weight;
  color?: string;
  center?: boolean;
  opacity?: number;
};

export default function Txt({
  size = 14,
  weight = 'regular',
  color = colors.text,
  center,
  opacity,
  style,
  ...rest
}: Props) {
  return (
    <Text
      {...rest}
      style={[
        { fontFamily: font[weight], fontSize: size, color, opacity },
        center && styles.center,
        style,
      ]}
    />
  );
}

const styles = StyleSheet.create({ center: { textAlign: 'center' } });
