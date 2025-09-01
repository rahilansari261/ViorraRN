import React from 'react';
import { Platform, StyleSheet, Text, type TextProps } from 'react-native';

export type ItalianaTextProps = TextProps & {
  variant?: 'regular' | 'large' | 'title';
  color?: string;
};

export function ItalianaText({
  style,
  variant = 'regular',
  color = '#B84953',
  ...rest
}: ItalianaTextProps) {
  return (
    <Text
      style={[
        styles.base,
        variant === 'large' && styles.large,
        variant === 'title' && styles.title,
        { color },
        style,
      ]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  base: {
    fontFamily: Platform.select({
      ios: 'Italiana-Regular',
      android: 'Italiana-Regular',
      default: 'serif',
    }),
    fontWeight: '400',
    fontStyle: 'normal',
    fontSize: 16,
    lineHeight: 21,
    letterSpacing: -0.32,
    textAlign: 'center',
  },
  large: {
    fontSize: 24,
    lineHeight: 32,
  },
  title: {
    fontSize: 60,
    lineHeight: 80,
    letterSpacing: -0.32,
  },
});
