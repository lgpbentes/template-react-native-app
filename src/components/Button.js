import React, { memo } from 'react';
import { StyleSheet, Text } from 'react-native';
import { Button as PaperButton, ActivityIndicator, Colors } from 'react-native-paper';
import { theme } from '../core/theme';

const Button = ({ mode, isLoading, style, children, ...props }) => (
  <PaperButton
    style={[
      styles.button,
      mode === 'outlined' && { backgroundColor: theme.colors.surface },
      style,
    ]}
    labelStyle={styles.text}
    mode={mode}
    loading={isLoading}
    {...props}
  >
    {children}
  </PaperButton>
);

const styles = StyleSheet.create({
  button: {
    width: '100%',
    marginVertical: 10,
  },
  text: {
    fontWeight: 'bold',
    fontSize: 15,
    lineHeight: 26,
  },
});

export default memo(Button);
