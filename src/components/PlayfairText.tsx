import React from 'react';
import { Platform, StyleSheet, Text, type TextProps } from 'react-native';

export type PlayfairTextProps = TextProps & {
  variant?: 'heading' | 'regular';
  color?: string;
};

export function PlayfairText({
  style,
  variant = 'regular',
  color = '#1A1A1A',
  ...rest
}: PlayfairTextProps) {
  return (
    <Text
      style={[
        styles.base,
        variant === 'heading' && styles.heading,
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
      ios: 'PlayfairDisplay-ExtraBold',
      android: 'PlayfairDisplay-ExtraBold',
      default: 'serif',
    }),
    fontWeight: '800',
    fontSize: 16,
    lineHeight: 22,
    letterSpacing: -0.32,
  },
  heading: {
    fontSize: 28,
    lineHeight: 36,
    letterSpacing: -0.5,
  },
});
