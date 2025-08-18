import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { theme } from '../../theme';

const FeedbackResponseScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Respond to Feedback</Text>
      <Text style={styles.subtitle}>Write a response to customer feedback</Text>
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

export default FeedbackResponseScreen; 