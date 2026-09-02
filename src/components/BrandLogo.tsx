import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import Txt from './Txt';

export type Brand = {
  name: string;
  /** placeholder colours — replace `uri` with a real asset when you have one */
  bg: string;
  fg: string;
  uri?: string;
};

type Props = { brand: Brand; size?: number };

/**
 * Placeholder merchant logo.
 * Drop a PNG/SVG into assets/ and set `uri` on the brand to use the real mark.
 */
export default function BrandLogo({ brand, size = 46 }: Props) {
  if (brand.uri) {
    return (
      <Image
        source={{ uri: brand.uri }}
        style={{ width: size, height: size, borderRadius: size / 2 }}
        resizeMode="cover"
      />
    );
  }
  return (
    <View
      style={[
        styles.circle,
        { width: size, height: size, borderRadius: size / 2, backgroundColor: brand.bg },
      ]}
    >
      <Txt size={size * 0.42} weight="bold" color={brand.fg}>
        {brand.name.charAt(0).toUpperCase()}
      </Txt>
    </View>
  );
}

const styles = StyleSheet.create({
  circle: { alignItems: 'center', justifyContent: 'center' },
});
