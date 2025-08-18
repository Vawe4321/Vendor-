import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';

const ContactAccountManagerScreen = () => {
  const navigation = useNavigation();
  
  const handleBackPress = () => {
    navigation.goBack();
  };

  const handlePhonePress = () => {
    // Phone call logic here
    console.log('Phone pressed: 8179658229');
  };

  const handleEmailPress = () => {
    // Email logic here
    console.log('Email pressed: l.haran@zomato.com');
  };

  const handleConcernsPress = () => {
    // Concerns navigation logic here
    console.log('Concerns pressed');
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
          <Icon name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Contact account manager</Text>
        <View style={styles.headerSpacer} />
      </View>

      {/* Main Content */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Account Manager Details Card */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>ACCOUNT MANAGER</Text>
          
          <View style={styles.contactItem}>
            <Icon name="person" size={20} color="#666" style={styles.contactIcon} />
            <Text style={styles.contactText}>L Haran</Text>
          </View>
          
          <TouchableOpacity style={styles.contactItem} onPress={handlePhonePress}>
            <Icon name="phone" size={20} color="#666" style={styles.contactIcon} />
            <Text style={styles.contactLink}>8179658229</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.contactItem} onPress={handleEmailPress}>
            <Icon name="email" size={20} color="#666" style={styles.contactIcon} />
            <Text style={styles.contactLink}>l.haran@zomato.com</Text>
          </TouchableOpacity>
        </View>

        {/* Concerns Card */}
        <TouchableOpacity style={styles.card} onPress={handleConcernsPress}>
          <View style={styles.concernsContent}>
            <Text style={styles.concernsText}>
              Have any long-pending unresolved concerns? Let us know
            </Text>
            <Icon name="chevron-right" size={24} color="#666" />
          </View>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  backButton: {
    padding: 5,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    flex: 1,
    textAlign: 'center',
  },
  headerSpacer: {
    width: 34, // Same width as back button for centering
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    marginBottom: 15,
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: '#666',
    marginBottom: 15,
    textTransform: 'uppercase',
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  contactIcon: {
    marginRight: 12,
  },
  contactText: {
    fontSize: 16,
    color: '#000',
    fontWeight: '500',
  },
  contactLink: {
    fontSize: 16,
    color: '#2196F3',
    fontWeight: '500',
  },
  concernsContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  concernsText: {
    fontSize: 16,
    color: '#000',
    flex: 1,
    marginRight: 10,
  },
});

export default ContactAccountManagerScreen; 