import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { theme } from '../../theme';

const HyperpureOrdersScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hyperpure Orders</Text>
      <Text style={styles.subtitle}>Manage Hyperpure orders</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background.default,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.colors.text.primary,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: theme.colors.text.secondary,
  },
});

export default HyperpureOrdersScreen; 