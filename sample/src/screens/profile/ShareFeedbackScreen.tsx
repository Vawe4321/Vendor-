import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { mockFeedbackSubmissionData } from '../../utils/mockData';

const ShareFeedbackScreen: React.FC = () => {
  const navigation = useNavigation();
  const [feedback, setFeedback] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleSubmit = () => {
    // Handle feedback submission
    console.log('Feedback submitted:', { feedback, phoneNumber });
    Alert.alert(
      'Feedback Submitted',
      'Thank you for your feedback! We will review it and get back to you soon.',
      [{ text: 'OK', onPress: () => navigation.goBack() }]
    );
  };

  const handleInfoPress = () => {
    Alert.alert(
      'Feedback Information',
      `Total Submissions: ${mockFeedbackSubmissionData.feedbackStats.totalSubmissions}\n` +
      `Responded To: ${mockFeedbackSubmissionData.feedbackStats.respondedTo}\n` +
      `Average Response Time: ${mockFeedbackSubmissionData.feedbackStats.averageResponseTime}\n` +
      `Satisfaction Rate: ${mockFeedbackSubmissionData.feedbackStats.satisfactionRate}/5`,
      [{ text: 'OK' }]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Icon name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Share your feedback</Text>
        <TouchableOpacity 
          style={styles.infoButton}
          onPress={handleInfoPress}
        >
          <Icon name="info" size={24} color="#007AFF" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Prompt Text */}
        <Text style={styles.promptText}>
          Tell us what you love about the app, or what we could be doing better
        </Text>

        {/* Information Box */}
        <View style={styles.infoBox}>
          <Icon name="lightbulb" size={20} color="#666" style={styles.infoIcon} />
          <Text style={styles.infoText}>
            Issues related to timings, orders, menu etc. can be best raised and resolved at the earliest by using the{' '}
            <Text style={styles.helpCentreLink}>Help Centre</Text>
          </Text>
        </View>

        {/* Feedback Input */}
        <View style={styles.inputSection}>
          <Text style={styles.inputLabel}>Enter feedback</Text>
          <TextInput
            style={styles.feedbackInput}
            placeholder=""
            value={feedback}
            onChangeText={setFeedback}
            multiline
            numberOfLines={4}
            placeholderTextColor="#999"
          />
        </View>

        {/* Phone Number Input */}
        <View style={styles.inputSection}>
          <Text style={styles.phonePrompt}>
            Please provide your phone number for us to call you back
          </Text>
          <Text style={styles.inputLabel}>Phone number</Text>
          <TextInput
            style={styles.phoneInput}
            placeholder=""
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            keyboardType="phone-pad"
            placeholderTextColor="#999"
          />
        </View>

        {/* Submit Button */}
        <TouchableOpacity 
          style={[styles.submitButton, (!feedback.trim() || !phoneNumber.trim()) && styles.submitButtonDisabled]}
          onPress={handleSubmit}
          disabled={!feedback.trim() || !phoneNumber.trim()}
        >
          <Text style={[styles.submitButtonText, (!feedback.trim() || !phoneNumber.trim()) && styles.submitButtonTextDisabled]}>
            Submit
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  backButton: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    flex: 1,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#000',
  },
  infoButton: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  promptText: {
    fontSize: 16,
    color: '#333',
    lineHeight: 24,
    marginBottom: 20,
  },
  infoBox: {
    flexDirection: 'row',
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    padding: 16,
    marginBottom: 24,
  },
  infoIcon: {
    marginRight: 12,
    marginTop: 2,
  },
  infoText: {
    flex: 1,
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  helpCentreLink: {
    color: '#007AFF',
    fontWeight: '500',
  },
  inputSection: {
    marginBottom: 24,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginBottom: 8,
  },
  phonePrompt: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
  },
  feedbackInput: {
    borderBottomWidth: 1,
    borderBottomColor: '#007AFF',
    paddingVertical: 12,
    fontSize: 16,
    color: '#333',
    minHeight: 80,
  },
  phoneInput: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingVertical: 12,
    fontSize: 16,
    color: '#333',
  },
  submitButton: {
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 40,
  },
  submitButtonDisabled: {
    backgroundColor: '#f5f5f5',
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#666',
  },
  submitButtonTextDisabled: {
    color: '#999',
  },
});

export default ShareFeedbackScreen; 