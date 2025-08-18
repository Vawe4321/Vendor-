import React from 'react';
import {
  View,
  ActivityIndicator,
  Text,
  StyleSheet,
  ViewStyle,
} from 'react-native';
import { theme } from '../../../theme';

interface LoadingSpinnerProps {
  size?: 'small' | 'large';
  color?: string;
  text?: string;
  style?: ViewStyle;
  overlay?: boolean;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'large',
  color = theme.colors.primary,
  text,
  style,
  overlay = false,
}) => {
  const containerStyle = [
    styles.container,
    overlay && styles.overlay,
    style,
  ];

  return (
    <View style={containerStyle}>
      <ActivityIndicator
        size={size}
        color={color}
        style={styles.spinner}
      />
      {text && (
        <Text style={styles.text}>{text}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing.lg,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: theme.colors.overlay,
    zIndex: theme.zIndex.overlay,
  },
  spinner: {
    marginBottom: theme.spacing.md,
  },
  text: {
    fontSize: theme.fontSizes.md,
    color: theme.colors.text.secondary,
    textAlign: 'center',
  },
});

export default LoadingSpinner;