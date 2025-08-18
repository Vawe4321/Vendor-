import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, TextInput, ScrollView } from 'react-native';

const UpdateOutletNameScreen: React.FC = () => {
  const [outletName, setOutletName] = useState('Grooso\'s Kitchen');

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Progress Indicator */}
        <View style={styles.progressContainer}>
          {/* Step 1 - Active */}
          <View style={styles.stepContainer}>
            <View style={styles.activeStepCircle}>
              <Text style={styles.activeStepNumber}>1</Text>
            </View>
            <Text style={styles.activeStepText}>Edit outlet details</Text>
          </View>
          
          {/* Step 1-2 Connector */}
          <View style={styles.stepConnector} />
          
          {/* Step 2 - Inactive */}
          <View style={styles.stepContainer}>
            <View style={styles.inactiveStepCircle}>
              <Text style={styles.inactiveStepNumber}>2</Text>
            </View>
            <Text style={styles.inactiveStepText}>Upload documents</Text>
          </View>
          
          {/* Step 2-3 Connector */}
          <View style={styles.stepConnector} />
          
          {/* Step 3 - Inactive */}
          <View style={styles.stepContainer}>
            <View style={styles.inactiveStepCircle}>
              <Text style={styles.inactiveStepNumber}>3</Text>
            </View>
            <Text style={styles.inactiveStepText}>Verification under process</Text>
          </View>
        </View>

        {/* Input Section */}
        <View style={styles.inputSection}>
          <Text style={styles.inputLabel}>Outlet name</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.inputField}
              value={outletName}
              onChangeText={setOutletName}
              placeholder="Enter outlet name"
              placeholderTextColor="#9E9E9E"
            />
          </View>
        </View>
      </ScrollView>

      {/* Bottom Action Button */}
      <View style={styles.bottomButtonContainer}>
        <TouchableOpacity style={styles.nextButton}>
          <Text style={styles.nextButtonText}>Next</Text>
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
  
  // Progress Indicator
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 32,
    paddingHorizontal: 10,
  },
  stepContainer: {
    alignItems: 'center',
    flex: 1,
  },
  activeStepCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  activeStepNumber: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  activeStepText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#212121',
    textAlign: 'center',
  },
  inactiveStepCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#E0E0E0',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  inactiveStepNumber: {
    fontSize: 14,
    fontWeight: '700',
    color: '#757575',
  },
  inactiveStepText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#757575',
    textAlign: 'center',
  },
  stepConnector: {
    height: 2,
    backgroundColor: '#E0E0E0',
    flex: 1,
    marginHorizontal: 8,
    marginBottom: 20,
  },
  
  // Input Section
  inputSection: {
    marginBottom: 24,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#757575',
    marginBottom: 8,
  },
  inputContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  inputField: {
    fontSize: 16,
    fontWeight: '600',
    color: '#212121',
    padding: 0,
  },
  
  // Bottom Button
  bottomButtonContainer: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  nextButton: {
    backgroundColor: '#9E9E9E',
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  nextButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});

export default UpdateOutletNameScreen; 