import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, TextInput } from 'react-native';

const GSTINScreen: React.FC = () => {
  const [gstinNumber, setGstinNumber] = useState('');

  return (
    <SafeAreaView style={styles.container}>
      {/* Content */}
      <View style={styles.content}>
        <Text style={styles.sectionTitle}>Select GSTIN</Text>
        
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.inputField}
            placeholder="Enter GST number"
            placeholderTextColor="#9E9E9E"
            value={gstinNumber}
            onChangeText={setGstinNumber}
            autoFocus={true}
          />
        </View>
      </View>

      {/* Bottom Action Button */}
      <View style={styles.bottomContainer}>
        <TouchableOpacity style={styles.saveButton}>
          <Text style={styles.saveButtonText}>Save</Text>
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
  

  
  // Content Section
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#212121',
    marginBottom: 16,
  },
  inputContainer: {
    marginTop: 8,
  },
  inputField: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: '#212121',
    backgroundColor: '#FFFFFF',
    minHeight: 48,
  },
  
  // Bottom Action Button
  bottomContainer: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  saveButton: {
    backgroundColor: '#9E9E9E',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});

export default GSTINScreen; 