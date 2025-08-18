import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const TestApp: React.FC = () => {
  console.log('🧪 TestApp component rendering...');
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>MyNativeApp Test</Text>
      <Text style={styles.subtitle}>React Native is working!</Text>
      <Text style={styles.info}>✅ App registration fixed</Text>
      <Text style={styles.info}>✅ Metro bundler connected</Text>
      <Text style={styles.info}>✅ Basic rendering successful</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: '#666',
    marginBottom: 20,
  },
  info: {
    fontSize: 16,
    color: '#2563EB',
    marginBottom: 8,
  },
});

export default TestApp;