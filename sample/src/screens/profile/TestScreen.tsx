import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { theme } from '../../theme';
import { SPACING, FONT_SIZES } from '../../utils/responsive';

const TestScreen: React.FC = () => {
  const navigation = useNavigation();

  console.log('TestScreen rendered');

  const handleBackPress = () => {
    navigation.navigate('Hub', { screen: 'Settings' });
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
          <Icon name="arrow-back" size={24} color={theme.colors.text.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Test Screen</Text>
        <View style={styles.headerRight} />
      </View>

      <View style={styles.content}>
        <Text style={styles.text}>This is a test screen!</Text>
        <Text style={styles.text}>If you can see this, navigation is working.</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background.default,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
    backgroundColor: theme.colors.background.paper,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border.light,
  },
  backButton: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: FONT_SIZES.lg,
    fontWeight: '600',
    color: theme.colors.text.primary,
  },
  headerRight: {
    width: 44,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: SPACING.lg,
  },
  text: {
    fontSize: FONT_SIZES.lg,
    color: theme.colors.text.primary,
    textAlign: 'center',
    marginBottom: SPACING.md,
  },
});

export default TestScreen;
