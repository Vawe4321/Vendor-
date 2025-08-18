import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { theme } from '../theme';
import FeedbackOverviewScreen from '../screens/feedback/FeedbackOverviewScreen';
import CustomerFeedbackScreen from '../screens/feedback/CustomerFeedbackScreen';
import FeedbackResponseScreen from '../screens/feedback/FeedbackResponseScreen';

export type FeedbackStackParamList = {
  FeedbackOverview: undefined;
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
          backgroundColor: theme.colors.primary,
        },
        headerTintColor: theme.colors.white,
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Stack.Screen
        name="FeedbackOverview"
        component={FeedbackOverviewScreen}
        options={{ title: 'Feedback' }}
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