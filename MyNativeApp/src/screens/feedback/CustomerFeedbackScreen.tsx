import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { theme } from '../../theme';
import { FeedbackStackParamList } from '../../navigation/FeedbackNavigator';
import Card from '../../components/common/Card';

type CustomerFeedbackScreenNavigationProp = StackNavigationProp<
  FeedbackStackParamList,
  'CustomerFeedback'
>;

const CustomerFeedbackScreen: React.FC = () => {
  const navigation = useNavigation<CustomerFeedbackScreenNavigationProp>();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'positive' | 'negative' | 'neutral'>('all');

  const allFeedback = [
    {
      id: '1',
      customerName: 'Rahul Sharma',
      rating: 5,
      comment: 'Excellent food quality and quick delivery! The biryani was perfectly cooked and the packaging was great.',
      date: '2024-01-15',
      responded: true,
      type: 'positive' as const,
    },
    {
      id: '2',
      customerName: 'Priya Patel',
      rating: 4,
      comment: 'Good food but delivery was a bit slow. The taste was amazing though.',
      date: '2024-01-14',
      responded: false,
      type: 'positive' as const,
    },
    {
      id: '3',
      customerName: 'Amit Kumar',
      rating: 3,
      comment: 'Food was okay, but packaging could be better. Some items were spilled.',
      date: '2024-01-13',
      responded: false,
      type: 'neutral' as const,
    },
    {
      id: '4',
      customerName: 'Sneha Reddy',
      rating: 2,
      comment: 'Very disappointed with the order. Food was cold and tasteless.',
      date: '2024-01-12',
      responded: true,
      type: 'negative' as const,
    },
    {
      id: '5',
      customerName: 'Vikram Singh',
      rating: 5,
      comment: 'Amazing experience! The food was hot, fresh, and delicious. Will order again!',
      date: '2024-01-11',
      responded: false,
      type: 'positive' as const,
    },
    {
      id: '6',
      customerName: 'Anjali Desai',
      rating: 1,
      comment: 'Terrible service. Wrong order delivered and no response from customer care.',
      date: '2024-01-10',
      responded: false,
      type: 'negative' as const,
    },
  ];

  const filteredFeedback = allFeedback.filter((feedback) => {
    const matchesSearch = feedback.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         feedback.comment.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = selectedFilter === 'all' || feedback.type === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  const handleRespondToFeedback = (feedbackId: string) => {
    navigation.navigate('FeedbackResponse', { feedbackId });
  };

  const getFilterButtonStyle = (filter: typeof selectedFilter) => ({
    ...styles.filterButton,
    backgroundColor: selectedFilter === filter ? theme.colors.primary : theme.colors.background,
  });

  const getFilterTextStyle = (filter: typeof selectedFilter) => ({
    ...styles.filterButtonText,
    color: selectedFilter === filter ? theme.colors.white : theme.colors.text,
  });

  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search feedback..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholderTextColor={theme.colors.textSecondary}
        />
      </View>

      {/* Filter Buttons */}
      <View style={styles.filterContainer}>
        <TouchableOpacity
          style={getFilterButtonStyle('all')}
          onPress={() => setSelectedFilter('all')}
        >
          <Text style={getFilterTextStyle('all')}>All</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={getFilterButtonStyle('positive')}
          onPress={() => setSelectedFilter('positive')}
        >
          <Text style={getFilterTextStyle('positive')}>Positive</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={getFilterButtonStyle('neutral')}
          onPress={() => setSelectedFilter('neutral')}
        >
          <Text style={getFilterTextStyle('neutral')}>Neutral</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={getFilterButtonStyle('negative')}
          onPress={() => setSelectedFilter('negative')}
        >
          <Text style={getFilterTextStyle('negative')}>Negative</Text>
        </TouchableOpacity>
      </View>

      {/* Feedback List */}
      <ScrollView style={styles.feedbackList}>
        {filteredFeedback.length === 0 ? (
          <Card style={styles.emptyCard}>
            <Text style={styles.emptyText}>No feedback found</Text>
            <Text style={styles.emptySubtext}>
              Try adjusting your search or filter criteria
            </Text>
          </Card>
        ) : (
          filteredFeedback.map((feedback) => (
            <Card key={feedback.id} style={styles.feedbackCard}>
              <View style={styles.feedbackHeader}>
                <View style={styles.customerInfo}>
                  <Text style={styles.customerName}>{feedback.customerName}</Text>
                  <Text style={styles.feedbackDate}>{feedback.date}</Text>
                </View>
                <View style={styles.ratingContainer}>
                  <Text style={styles.ratingText}>{feedback.rating}/5</Text>
                  <Text style={styles.ratingStars}>
                    {'★'.repeat(feedback.rating)}
                    {'☆'.repeat(5 - feedback.rating)}
                  </Text>
                </View>
              </View>

              <Text style={styles.feedbackComment}>{feedback.comment}</Text>

              <View style={styles.feedbackFooter}>
                <View style={styles.feedbackType}>
                  <View style={[
                    styles.typeIndicator,
                    {
                      backgroundColor: feedback.type === 'positive' ? theme.colors.success :
                                     feedback.type === 'negative' ? theme.colors.error :
                                     theme.colors.warning
                    }
                  ]} />
                  <Text style={styles.typeText}>
                    {feedback.type.charAt(0).toUpperCase() + feedback.type.slice(1)}
                  </Text>
                </View>

                <TouchableOpacity
                  style={[
                    styles.responseButton,
                    { backgroundColor: feedback.responded ? theme.colors.success : theme.colors.primary }
                  ]}
                  onPress={() => handleRespondToFeedback(feedback.id)}
                >
                  <Text style={styles.responseButtonText}>
                    {feedback.responded ? 'View Response' : 'Respond'}
                  </Text>
                </TouchableOpacity>
              </View>
            </Card>
          ))
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  searchContainer: {
    padding: 20,
    paddingBottom: 10,
  },
  searchInput: {
    backgroundColor: theme.colors.white,
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  filterContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingBottom: 15,
    gap: 10,
  },
  filterButton: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  filterButtonText: {
    fontSize: 14,
    fontWeight: '500',
  },
  feedbackList: {
    flex: 1,
    paddingHorizontal: 20,
  },
  emptyCard: {
    alignItems: 'center',
    padding: 40,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.colors.textSecondary,
    marginBottom: 10,
  },
  emptySubtext: {
    fontSize: 14,
    color: theme.colors.textSecondary,
    textAlign: 'center',
  },
  feedbackCard: {
    marginBottom: 15,
  },
  feedbackHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  customerInfo: {
    flex: 1,
  },
  customerName: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.text,
    marginBottom: 2,
  },
  feedbackDate: {
    fontSize: 12,
    color: theme.colors.textSecondary,
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
  feedbackFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  feedbackType: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  typeIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  typeText: {
    fontSize: 12,
    fontWeight: '500',
    color: theme.colors.textSecondary,
  },
  responseButton: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 6,
  },
  responseButtonText: {
    color: theme.colors.white,
    fontSize: 12,
    fontWeight: '600',
  },
});

export default CustomerFeedbackScreen; 