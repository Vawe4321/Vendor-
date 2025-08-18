import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { theme } from '../../theme';
import { FeedbackStackParamList } from '../../navigation/FeedbackNavigator';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';

type FeedbackResponseScreenNavigationProp = StackNavigationProp<
  FeedbackStackParamList,
  'FeedbackResponse'
>;

type FeedbackResponseScreenRouteProp = RouteProp<
  FeedbackStackParamList,
  'FeedbackResponse'
>;

const FeedbackResponseScreen: React.FC = () => {
  const navigation = useNavigation<FeedbackResponseScreenNavigationProp>();
  const route = useRoute<FeedbackResponseScreenRouteProp>();
  const { feedbackId } = route.params;

  const [response, setResponse] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Mock feedback data - in real app, this would come from API
  const feedbackData = {
    id: feedbackId,
    customerName: 'Rahul Sharma',
    rating: 5,
    comment: 'Excellent food quality and quick delivery! The biryani was perfectly cooked and the packaging was great. However, the delivery time was a bit longer than expected.',
    date: '2024-01-15',
    orderId: 'ORD-2024-001',
    orderItems: ['Chicken Biryani', 'Raita', 'Pickle'],
    responded: false,
    previousResponse: '',
  };

  const handleSubmitResponse = async () => {
    if (!response.trim()) {
      Alert.alert('Error', 'Please enter a response before submitting.');
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      Alert.alert(
        'Success',
        'Your response has been submitted successfully!',
        [
          {
            text: 'OK',
            onPress: () => navigation.goBack(),
          },
        ]
      );
    } catch (error) {
      Alert.alert('Error', 'Failed to submit response. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSaveDraft = () => {
    // In real app, this would save to local storage or backend
    Alert.alert('Draft Saved', 'Your response has been saved as a draft.');
  };

  return (
    <ScrollView style={styles.container}>
      {/* Original Feedback */}
      <Card style={styles.feedbackCard}>
        <Text style={styles.sectionTitle}>Customer Feedback</Text>
        
        <View style={styles.customerInfo}>
          <Text style={styles.customerName}>{feedbackData.customerName}</Text>
          <View style={styles.ratingContainer}>
            <Text style={styles.ratingText}>{feedbackData.rating}/5</Text>
            <Text style={styles.ratingStars}>
              {'★'.repeat(feedbackData.rating)}
              {'☆'.repeat(5 - feedbackData.rating)}
            </Text>
          </View>
        </View>

        <Text style={styles.feedbackComment}>{feedbackData.comment}</Text>

        <View style={styles.orderInfo}>
          <Text style={styles.orderLabel}>Order ID: {feedbackData.orderId}</Text>
          <Text style={styles.orderItems}>
            Items: {feedbackData.orderItems.join(', ')}
          </Text>
          <Text style={styles.feedbackDate}>Date: {feedbackData.date}</Text>
        </View>
      </Card>

      {/* Response Form */}
      <Card style={styles.responseCard}>
        <Text style={styles.sectionTitle}>Your Response</Text>
        
        <Text style={styles.responseLabel}>
          Write a professional and helpful response to the customer:
        </Text>

        <TextInput
          style={styles.responseInput}
          placeholder="Type your response here..."
          value={response}
          onChangeText={setResponse}
          multiline
          numberOfLines={6}
          textAlignVertical="top"
          placeholderTextColor={theme.colors.textSecondary}
        />

        <Text style={styles.characterCount}>
          {response.length}/500 characters
        </Text>

        {/* Response Templates */}
        <View style={styles.templatesContainer}>
          <Text style={styles.templatesTitle}>Quick Response Templates:</Text>
          
          <TouchableOpacity
            style={styles.templateButton}
            onPress={() => setResponse('Thank you for your feedback! We appreciate your input and will use it to improve our service.')}
          >
            <Text style={styles.templateText}>Thank you for your feedback!</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.templateButton}
            onPress={() => setResponse('We apologize for any inconvenience caused. We are working to improve our service and appreciate your patience.')}
          >
            <Text style={styles.templateText}>Apology for inconvenience</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.templateButton}
            onPress={() => setResponse('Thank you for your positive feedback! We are glad you enjoyed our food and service. We look forward to serving you again!')}
          >
            <Text style={styles.templateText}>Thank you for positive feedback</Text>
          </TouchableOpacity>
        </View>
      </Card>

      {/* Action Buttons */}
      <View style={styles.actionsContainer}>
        <Button
          title="Save Draft"
          onPress={handleSaveDraft}
          style={[styles.actionButton, styles.draftButton]}
          textStyle={styles.draftButtonText}
        />
        
        <Button
          title={isSubmitting ? "Submitting..." : "Submit Response"}
          onPress={handleSubmitResponse}
          disabled={isSubmitting || !response.trim()}
          style={[
            styles.actionButton,
            styles.submitButton,
            (!response.trim() || isSubmitting) && styles.disabledButton
          ]}
        />
      </View>

      {/* Guidelines */}
      <Card style={styles.guidelinesCard}>
        <Text style={styles.guidelinesTitle}>Response Guidelines:</Text>
        <Text style={styles.guidelineText}>• Be professional and courteous</Text>
        <Text style={styles.guidelineText}>• Address specific concerns mentioned</Text>
        <Text style={styles.guidelineText}>• Keep responses under 500 characters</Text>
        <Text style={styles.guidelineText}>• Respond within 24 hours</Text>
        <Text style={styles.guidelineText}>• Thank customers for their feedback</Text>
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  feedbackCard: {
    margin: 20,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginBottom: 15,
  },
  customerInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  customerName: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.text,
  },
  ratingContainer: {
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 14,
    fontWeight: '500',
    color: theme.colors.textSecondary,
    marginBottom: 2,
  },
  ratingStars: {
    fontSize: 12,
    color: theme.colors.warning,
  },
  feedbackComment: {
    fontSize: 14,
    color: theme.colors.textSecondary,
    lineHeight: 20,
    marginBottom: 15,
  },
  orderInfo: {
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
    paddingTop: 10,
  },
  orderLabel: {
    fontSize: 12,
    color: theme.colors.textSecondary,
    marginBottom: 2,
  },
  orderItems: {
    fontSize: 12,
    color: theme.colors.textSecondary,
    marginBottom: 2,
  },
  feedbackDate: {
    fontSize: 12,
    color: theme.colors.textSecondary,
  },
  responseCard: {
    margin: 20,
    marginTop: 10,
  },
  responseLabel: {
    fontSize: 14,
    color: theme.colors.textSecondary,
    marginBottom: 10,
  },
  responseInput: {
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: 8,
    padding: 15,
    fontSize: 14,
    color: theme.colors.text,
    backgroundColor: theme.colors.white,
    minHeight: 120,
  },
  characterCount: {
    fontSize: 12,
    color: theme.colors.textSecondary,
    textAlign: 'right',
    marginTop: 5,
  },
  templatesContainer: {
    marginTop: 20,
  },
  templatesTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: theme.colors.text,
    marginBottom: 10,
  },
  templateButton: {
    backgroundColor: theme.colors.background,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: 6,
    padding: 10,
    marginBottom: 8,
  },
  templateText: {
    fontSize: 12,
    color: theme.colors.primary,
  },
  actionsContainer: {
    flexDirection: 'row',
    padding: 20,
    gap: 15,
  },
  actionButton: {
    flex: 1,
    paddingVertical: 15,
  },
  draftButton: {
    backgroundColor: theme.colors.background,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  draftButtonText: {
    color: theme.colors.text,
  },
  submitButton: {
    backgroundColor: theme.colors.primary,
  },
  disabledButton: {
    backgroundColor: theme.colors.textSecondary,
  },
  guidelinesCard: {
    margin: 20,
    marginTop: 10,
  },
  guidelinesTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginBottom: 10,
  },
  guidelineText: {
    fontSize: 12,
    color: theme.colors.textSecondary,
    marginBottom: 5,
  },
});

export default FeedbackResponseScreen; 