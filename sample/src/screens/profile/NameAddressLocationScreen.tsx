import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { ProfileStackParamList } from '../../navigation/types';
import Icon from 'react-native-vector-icons/MaterialIcons';

type NameAddressLocationScreenNavigationProp = StackNavigationProp<ProfileStackParamList, 'NameAddressLocation'>;

const NameAddressLocationScreen: React.FC = () => {
  const navigation = useNavigation<NameAddressLocationScreenNavigationProp>();

  const handleUpdateOutletNamePress = () => {
    navigation.navigate('UpdateOutletName');
  };

  const handleUpdateOutletAddressLocationPress = () => {
    navigation.navigate('UpdateOutletAddressLocation');
  };

  const handleBackPress = () => {
    console.log('NameAddressLocationScreen: Back button pressed');
    navigation.navigate('Hub', { screen: 'HelpCentre' });
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
          <Icon name="arrow-back" size={24} color="#212121" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Name, Address & Location</Text>
        <View style={styles.headerRight} />
      </View>
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Options Card */}
        <View style={styles.optionsCard}>
          <Text style={styles.sectionTitle}>Select an option</Text>
          
                     {/* Option 1 */}
           <TouchableOpacity style={styles.optionItem} onPress={handleUpdateOutletNamePress}>
             <Text style={styles.optionText}>Update Outlet Name</Text>
             <Text style={styles.optionArrow}>›</Text>
           </TouchableOpacity>
          
          {/* Divider */}
          <View style={styles.divider} />
          
                     {/* Option 2 */}
           <TouchableOpacity style={styles.optionItem} onPress={handleUpdateOutletAddressLocationPress}>
             <Text style={styles.optionText}>Update Outlet Address & Location</Text>
             <Text style={styles.optionArrow}>›</Text>
           </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#212121',
  },
  headerRight: {
    width: 40,
  },
  
  // Content Section
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  
  // Options Card
  optionsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    shadowColor: 'rgba(0, 0, 0, 0.08)',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 6,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#212121',
    marginBottom: 16,
  },
  optionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    minHeight: 44,
  },
  optionText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#212121',
    flex: 1,
  },
  optionArrow: {
    fontSize: 18,
    color: '#9E9E9E',
    fontWeight: '600',
  },
  divider: {
    height: 1,
    backgroundColor: '#E0E0E0',
    marginVertical: 8,
  },
});

export default NameAddressLocationScreen; 