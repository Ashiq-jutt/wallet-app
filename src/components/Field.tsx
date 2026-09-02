import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Pressable, TextInputProps } from 'react-native';
import Txt from './Txt';
import Icon, { IconName } from './Icon';
import { colors, font, radius } from '../theme';

type Props = TextInputProps & {
  label?: string;
  icon?: IconName;
  password?: boolean;
};

export default function Field({ label, icon, password, style, ...rest }: Props) {
  const [hidden, setHidden] = useState(!!password);
  const [focused, setFocused] = useState(false);

  return (
    <View style={styles.wrap}>
      {!!label && (
        <Txt size={12} weight="medium" color={colors.textMuted} style={styles.label}>
          {label}
        </Txt>
      )}
      <View style={[styles.box, focused && styles.boxFocused]}>
        {icon && (
          <View style={styles.leading}>
            <Icon name={icon} size={18} color={colors.textMuted} />
          </View>
        )}
        <TextInput
          {...rest}
          secureTextEntry={hidden}
          placeholderTextColor={colors.textDim}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={[styles.input, style]}
        />
        {password && (
          <Pressable hitSlop={10} onPress={() => setHidden((h) => !h)} style={styles.trailing}>
            <Icon name={hidden ? 'eye-off' : 'eye'} size={18} color={colors.textMuted} />
          </Pressable>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { marginBottom: 14 },
  label: { marginBottom: 8, marginLeft: 4 },
  box: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 54,
    borderRadius: radius.md,
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.09)',
    paddingHorizontal: 16,
  },
  boxFocused: { borderColor: colors.cyan, backgroundColor: 'rgba(47,196,240,0.08)' },
  leading: { marginRight: 10 },
  trailing: { marginLeft: 10 },
  input: { flex: 1, color: colors.text, fontFamily: font.regular, fontSize: 14.5, padding: 0 },
});
