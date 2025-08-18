import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { theme } from '../../theme';
import { FeedbackStackParamList } from '../../navigation/FeedbackNavigator';
import Card from '../../components/common/Card';
import MetricCard from '../../components/business/MetricCard';

type FeedbackOverviewScreenNavigationProp = StackNavigationProp<
  FeedbackStackParamList,
  'FeedbackOverview'
>;

const FeedbackOverviewScreen: React.FC = () => {
  const navigation = useNavigation<FeedbackOverviewScreenNavigationProp>();

  const feedbackStats = {
    totalFeedback: 45,
    positiveFeedback: 32,
    negativeFeedback: 8,
    neutralFeedback: 5,
    averageRating: 4.2,
    responseRate: 89,
  };

  const recentFeedback = [
    {
      id: '1',
      customerName: 'Rahul Sharma',
      rating: 5,
      comment: 'Excellent food quality and quick delivery!',
      date: '2024-01-15',
      responded: true,
    },
    {
      id: '2',
      customerName: 'Priya Patel',
      rating: 4,
      comment: 'Good food but delivery was a bit slow',
      date: '2024-01-14',
      responded: false,
    },
    {
      id: '3',
      customerName: 'Amit Kumar',
      rating: 3,
      comment: 'Food was okay, but packaging could be better',
      date: '2024-01-13',
      responded: false,
    },
  ];

  const handleViewAllFeedback = () => {
    navigation.navigate('CustomerFeedback');
  };

  const handleRespondToFeedback = (feedbackId: string) => {
    navigation.navigate('FeedbackResponse', { feedbackId });
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Feedback Overview</Text>
        <Text style={styles.subtitle}>
          Manage customer feedback and ratings
        </Text>
      </View>

      {/* Statistics Cards */}
      <View style={styles.statsContainer}>
        <MetricCard
          title="Total Feedback"
          value={feedbackStats.totalFeedback.toString()}
          icon="rate-review"
          color={theme.colors.primary}
        />
        <MetricCard
          title="Avg Rating"
          value={feedbackStats.averageRating.toString()}
          icon="star"
          color={theme.colors.success}
        />
        <MetricCard
          title="Response Rate"
          value={`${feedbackStats.responseRate}%`}
          icon="reply"
          color={theme.colors.warning}
        />
      </View>

      {/* Feedback Distribution */}
      <Card style={styles.distributionCard}>
        <Text style={styles.cardTitle}>Feedback Distribution</Text>
        <View style={styles.distributionRow}>
          <View style={styles.distributionItem}>
            <Text style={[styles.distributionValue, { color: theme.colors.success }]}>
              {feedbackStats.positiveFeedback}
            </Text>
            <Text style={styles.distributionLabel}>Positive</Text>
          </View>
          <View style={styles.distributionItem}>
            <Text style={[styles.distributionValue, { color: theme.colors.warning }]}>
              {feedbackStats.neutralFeedback}
            </Text>
            <Text style={styles.distributionLabel}>Neutral</Text>
          </View>
          <View style={styles.distributionItem}>
            <Text style={[styles.distributionValue, { color: theme.colors.error }]}>
              {feedbackStats.negativeFeedback}
            </Text>
            <Text style={styles.distributionLabel}>Negative</Text>
          </View>
        </View>
      </Card>

      {/* Recent Feedback */}
      <Card style={styles.recentCard}>
        <View style={styles.recentHeader}>
          <Text style={styles.cardTitle}>Recent Feedback</Text>
          <TouchableOpacity onPress={handleViewAllFeedback}>
            <Text style={styles.viewAllText}>View All</Text>
          </TouchableOpacity>
        </View>

        {recentFeedback.map((feedback) => (
          <TouchableOpacity
            key={feedback.id}
            style={styles.feedbackItem}
            onPress={() => handleRespondToFeedback(feedback.id)}
          >
            <View style={styles.feedbackHeader}>
              <Text style={styles.customerName}>{feedback.customerName}</Text>
              <View style={styles.ratingContainer}>
                <Text style={styles.ratingText}>{feedback.rating}/5</Text>
                <Text style={styles.ratingStars}>
                  {'★'.repeat(feedback.rating)}
                  {'☆'.repeat(5 - feedback.rating)}
                </Text>
              </View>
            </View>
            <Text style={styles.feedbackComment} numberOfLines={2}>
              {feedback.comment}
            </Text>
            <View style={styles.feedbackFooter}>
              <Text style={styles.feedbackDate}>{feedback.date}</Text>
              {feedback.responded ? (
                <Text style={[styles.responseStatus, { color: theme.colors.success }]}>
                  Responded
                </Text>
              ) : (
                <Text style={[styles.responseStatus, { color: theme.colors.warning }]}>
                  Pending Response
                </Text>
              )}
            </View>
          </TouchableOpacity>
        ))}
      </Card>

      {/* Quick Actions */}
      <View style={styles.actionsContainer}>
        <TouchableOpacity
          style={[styles.actionButton, { backgroundColor: theme.colors.primary }]}
          onPress={handleViewAllFeedback}
        >
          <Text style={styles.actionButtonText}>View All Feedback</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.actionButton, { backgroundColor: theme.colors.secondary }]}
          onPress={() => Alert.alert('Coming Soon', 'Analytics feature will be available soon!')}
        >
          <Text style={styles.actionButtonText}>Feedback Analytics</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  header: {
    padding: 20,
    backgroundColor: theme.colors.primary,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.colors.white,
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: theme.colors.white,
    opacity: 0.8,
  },
  statsContainer: {
    flexDirection: 'row',
    padding: 20,
    gap: 10,
  },
  distributionCard: {
    margin: 20,
    marginTop: 0,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginBottom: 15,
  },
  distributionRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  distributionItem: {
    alignItems: 'center',
  },
  distributionValue: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  distributionLabel: {
    fontSize: 14,
    color: theme.colors.textSecondary,
    marginTop: 5,
  },
  recentCard: {
    margin: 20,
    marginTop: 0,
  },
  recentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  viewAllText: {
    color: theme.colors.primary,
    fontSize: 16,
    fontWeight: '500',
  },
  feedbackItem: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  feedbackHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
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
  },
  ratingStars: {
    fontSize: 12,
    color: theme.colors.warning,
  },
  feedbackComment: {
    fontSize: 14,
    color: theme.colors.textSecondary,
    lineHeight: 20,
    marginBottom: 8,
  },
  feedbackFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  feedbackDate: {
    fontSize: 12,
    color: theme.colors.textSecondary,
  },
  responseStatus: {
    fontSize: 12,
    fontWeight: '500',
  },
  actionsContainer: {
    padding: 20,
    gap: 15,
  },
  actionButton: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
  },
  actionButtonText: {
    color: theme.colors.white,
    fontSize: 16,
    fontWeight: '600',
  },
});

export default FeedbackOverviewScreen; 