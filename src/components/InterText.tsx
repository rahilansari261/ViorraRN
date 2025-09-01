import React from 'react';
import { Platform, StyleSheet, Text, type TextProps } from 'react-native';

export type InterTextProps = TextProps & {
  variant?: 'light' | 'medium' | 'large';
  color?: string;
};

export function InterText({
  style,
  variant = 'light',
  color = '#1A1A1A',
  ...rest
}: InterTextProps) {
  return (
    <Text
      style={[
        styles.base,
        variant === 'medium' && styles.medium,
        variant === 'large' && styles.large,
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
      ios: 'Inter-Light',
      android: 'Inter-Light',
      default: 'sans-serif',
    }),
    fontWeight: '300',
    fontSize: 14,
    lineHeight: 20,
    letterSpacing: -0.32,
  },
  medium: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '400',
  },
  large: {
    fontSize: 18,
    lineHeight: 26,
    fontWeight: '400',
  },
});
