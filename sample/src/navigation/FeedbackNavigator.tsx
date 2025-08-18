import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { theme } from '../theme';
import FeedbackOverviewScreen from '../screens/feedback/FeedbackOverviewScreen';
import ReviewsScreen from '../screens/feedback/ReviewsScreen';
import CustomerFeedbackScreen from '../screens/feedback/CustomerFeedbackScreen';
import FeedbackResponseScreen from '../screens/feedback/FeedbackResponseScreen';

export type FeedbackStackParamList = {
  FeedbackOverview: {
    initialTab?: string;
  };
  Reviews: undefined;
  CustomerFeedback: undefined;
  FeedbackResponse: {
    feedbackId: string;
  };
};

const Stack = createStackNavigator<FeedbackStackParamList>();

const FeedbackNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#FFFFFF', // background.paper
          shadowColor: 'rgba(0, 0, 0, 0.08)',
          shadowOffset: { width: 0, height: 3 },
          shadowOpacity: 1,
          shadowRadius: 8,
          elevation: 4,
        },
        headerTintColor: '#212121', // text.primary
        headerTitleStyle: {
          fontWeight: '700', // Bold
          fontSize: 18, // FONT_SIZES.xl
        },
      }}
    >
      <Stack.Screen
        name="FeedbackOverview"
        component={FeedbackOverviewScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Reviews"
        component={ReviewsScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="CustomerFeedback"
        component={CustomerFeedbackScreen}
        options={{ title: 'Customer Feedback' }}
      />
      <Stack.Screen
        name="FeedbackResponse"
        component={FeedbackResponseScreen}
        options={{ title: 'Respond to Feedback' }}
      />
    </Stack.Navigator>
  );
};

export default FeedbackNavigator; 