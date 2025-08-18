import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { theme } from '../../theme';
import { SPACING, FONT_SIZES, BORDER_RADIUS, SHADOWS } from '../../utils/responsive';

const ReviewsScreen: React.FC = () => {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');

  const handleBackPress = () => {
    navigation.goBack();
  };

  const handleSearchPress = () => {
    console.log('Search pressed');
  };

  const reviews = [
    {
      id: 'REV001',
      customer: 'Sarah Johnson',
      rating: 5,
      date: '31 July 2024',
      comment: 'Amazing food! The biryani was perfectly cooked and the service was excellent.',
      orderId: 'ORD123456',
    },
    {
      id: 'REV002',
      customer: 'Mike Chen',
      rating: 4,
      date: '30 July 2024',
      comment: 'Good food, but delivery was a bit slow. Overall satisfied with the quality.',
      orderId: 'ORD123455',
    },
    {
      id: 'REV003',
      customer: 'Emily Davis',
      rating: 5,
      date: '29 July 2024',
      comment: 'Best biryani in town! Will definitely order again. Fast delivery too.',
      orderId: 'ORD123454',
    },
  ];

  const renderStars = (rating: number) => {
    return (
      <View style={styles.starsContainer}>
        {[1, 2, 3, 4, 5].map((star) => (
          <Icon
            key={star}
            name={star <= rating ? 'star' : 'star-border'}
            size={16}
            color={star <= rating ? '#FFD700' : '#D3D3D3'}
          />
        ))}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={handleBackPress}
        >
          <Icon name="arrow-back" size={24} color={theme.colors.text.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Reviews</Text>
        <TouchableOpacity
          style={styles.searchButton}
          onPress={handleSearchPress}
        >
          <Icon name="search" size={24} color={theme.colors.text.primary} />
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <Icon name="search" size={20} color={theme.colors.text.secondary} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search reviews..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor={theme.colors.text.secondary}
          />
        </View>
      </View>

      {/* Stats Cards */}
      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>156</Text>
          <Text style={styles.statLabel}>Total Reviews</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>4.8</Text>
          <Text style={styles.statLabel}>Average Rating</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>98%</Text>
          <Text style={styles.statLabel}>Positive</Text>
        </View>
      </View>

      {/* Reviews List */}
      <ScrollView style={styles.reviewsContainer} showsVerticalScrollIndicator={false}>
        <Text style={styles.sectionTitle}>Recent Reviews</Text>
        {reviews.map((review) => (
          <View key={review.id} style={styles.reviewCard}>
            <View style={styles.reviewHeader}>
              <View style={styles.customerInfo}>
                <Text style={styles.customerName}>{review.customer}</Text>
                <Text style={styles.orderId}>Order #{review.orderId}</Text>
              </View>
              <Text style={styles.reviewDate}>{review.date}</Text>
            </View>
            {renderStars(review.rating)}
            <Text style={styles.reviewComment}>{review.comment}</Text>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background.default,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
    backgroundColor: theme.colors.background.paper,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border.light,
    ...SHADOWS.light,
  },
  backButton: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: FONT_SIZES.lg,
    fontWeight: '600',
    color: theme.colors.text.primary,
  },
  searchButton: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchContainer: {
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.background.paper,
    borderRadius: BORDER_RADIUS.md,
    paddingHorizontal: SPACING.md,
    borderWidth: 1,
    borderColor: theme.colors.border.light,
  },
  searchInput: {
    flex: 1,
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.sm,
    fontSize: FONT_SIZES.md,
    color: theme.colors.text.primary,
  },
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: SPACING.lg,
    paddingBottom: SPACING.md,
  },
  statCard: {
    flex: 1,
    backgroundColor: theme.colors.background.paper,
    borderRadius: BORDER_RADIUS.md,
    padding: SPACING.md,
    marginHorizontal: SPACING.xs,
    alignItems: 'center',
    ...SHADOWS.light,
  },
  statNumber: {
    fontSize: FONT_SIZES.xl,
    fontWeight: 'bold',
    color: theme.colors.primary,
    marginBottom: SPACING.xs,
  },
  statLabel: {
    fontSize: FONT_SIZES.sm,
    color: theme.colors.text.secondary,
    textAlign: 'center',
  },
  reviewsContainer: {
    flex: 1,
    paddingHorizontal: SPACING.lg,
  },
  sectionTitle: {
    fontSize: FONT_SIZES.lg,
    fontWeight: '600',
    color: theme.colors.text.primary,
    marginBottom: SPACING.md,
  },
  reviewCard: {
    backgroundColor: theme.colors.background.paper,
    borderRadius: BORDER_RADIUS.md,
    padding: SPACING.lg,
    marginBottom: SPACING.md,
    ...SHADOWS.light,
  },
  reviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: SPACING.sm,
  },
  customerInfo: {
    flex: 1,
  },
  customerName: {
    fontSize: FONT_SIZES.md,
    fontWeight: '600',
    color: theme.colors.text.primary,
    marginBottom: SPACING.xs,
  },
  orderId: {
    fontSize: FONT_SIZES.sm,
    color: theme.colors.text.secondary,
  },
  reviewDate: {
    fontSize: FONT_SIZES.sm,
    color: theme.colors.text.secondary,
  },
  starsContainer: {
    flexDirection: 'row',
    marginBottom: SPACING.sm,
  },
  reviewComment: {
    fontSize: FONT_SIZES.md,
    color: theme.colors.text.primary,
    lineHeight: 20,
  },
});

export default ReviewsScreen;
