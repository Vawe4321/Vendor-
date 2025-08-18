import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';

const RestaurantOwnershipScreen: React.FC = () => {
  return (
    <SafeAreaView style={styles.container}>


      {/* Content */}
      <View style={styles.content}>
        <Text style={styles.mainQuestion}>
          Looking to transfer your restaurant ownership?
        </Text>
        
        <Text style={styles.instructionText}>
          Click below to initiate ownership transfer process by providing all the relevant details/documents of the new legal owner.
        </Text>

        <TouchableOpacity style={styles.transferButton}>
          <Text style={styles.transferButtonText}>Transfer ownership</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  

  
  // Content
  content: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  mainQuestion: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000000',
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 28,
  },
  instructionText: {
    fontSize: 16,
    color: '#666666',
    textAlign: 'center',
    marginBottom: 40,
    lineHeight: 24,
  },
  transferButton: {
    backgroundColor: '#1E90FF',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 20,
  },
  transferButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default RestaurantOwnershipScreen; 