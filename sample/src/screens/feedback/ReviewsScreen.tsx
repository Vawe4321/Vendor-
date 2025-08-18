import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  FlatList,
  TextInput,
  Dimensions,
  Modal,
  Image
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { FeedbackStackParamList } from '../../navigation/types';

type ReviewsScreenNavigationProp = StackNavigationProp<
  FeedbackStackParamList,
  'Reviews'
>;

const ReviewsScreen: React.FC = () => {
  const navigation = useNavigation<ReviewsScreenNavigationProp>();
  const [activeTab, setActiveTab] = useState('Reviews');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedReviews, setExpandedReviews] = useState<Set<string>>(new Set());
  const [showDishRatingsModal, setShowDishRatingsModal] = useState(false);
  const [imageLoadErrors, setImageLoadErrors] = useState<Set<string>>(new Set());

  // Mock dish ratings data
  const dishRatings = [
    {
      id: '1',
      name: 'Chicken Biryani',
      image: 'https://images.unsplash.com/photo-1563379091339-03246963d4a9?w=200&h=200&fit=crop&crop=center',
      rating: 4.2,
      totalRatings: 45,
      positiveReviews: 38,
      negativeReviews: 7,
      category: 'Biryani'
    },
    {
      id: '2',
      name: 'Butter Chicken',
      image: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=200&h=200&fit=crop&crop=center',
      rating: 4.5,
      totalRatings: 32,
      positiveReviews: 29,
      negativeReviews: 3,
      category: 'Main Course'
    },
    {
      id: '3',
      name: 'Paneer Tikka',
      image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=200&h=200&fit=crop&crop=center',
      rating: 4.0,
      totalRatings: 28,
      positiveReviews: 24,
      negativeReviews: 4,
      category: 'Starters'
    },
    {
      id: '4',
      name: 'Butter Naan',
      image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=200&h=200&fit=crop&crop=center',
      rating: 4.3,
      totalRatings: 56,
      positiveReviews: 48,
      negativeReviews: 8,
      category: 'Breads'
    },
    {
      id: '5',
      name: 'Dal Makhani',
      image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=200&h=200&fit=crop&crop=center',
      rating: 3.8,
      totalRatings: 22,
      positiveReviews: 18,
      negativeReviews: 4,
      category: 'Main Course'
    },
    {
      id: '6',
      name: 'Veg Fried Rice',
      image: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=200&h=200&fit=crop&crop=center',
      rating: 3.9,
      totalRatings: 19,
      positiveReviews: 16,
      negativeReviews: 3,
      category: 'Rice'
    },
    {
      id: '7',
      name: 'Gulab Jamun',
      image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=200&h=200&fit=crop&crop=center',
      rating: 4.4,
      totalRatings: 25,
      positiveReviews: 22,
      negativeReviews: 3,
      category: 'Desserts'
    },
    {
      id: '8',
      name: 'Masala Dosa',
      image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=200&h=200&fit=crop&crop=center',
      rating: 4.1,
      totalRatings: 31,
      positiveReviews: 27,
      negativeReviews: 4,
      category: 'South Indian'
    }
  ];

  // Mock reviews data
  const reviews = [
    {
      id: '1',
      orderId: '1234',
      customerName: 'Bhagath',
      ordersCount: 1,
      rating: 1,
      date: '27 Jul, 2025 9:04 AM',
      review: 'Actually they have to send the khatta or gravy for The order which I ordered, and also I Informed them through the call, but they didn\'t send, and the food was not good at all. Very disappointed with the service and quality.',
      isExpanded: false
    },
    {
      id: '2',
      orderId: '1235',
      customerName: 'Priya Sharma',
      ordersCount: 3,
      rating: 4,
      date: '26 Jul, 2025 7:30 PM',
      review: 'Great food quality and timely delivery. The biryani was delicious and the packaging was good. Will order again!',
      isExpanded: false
    },
    {
      id: '3',
      orderId: '1236',
      customerName: 'Rahul Kumar',
      ordersCount: 2,
      rating: 5,
      date: '25 Jul, 2025 2:15 PM',
      review: 'Excellent service! The food was hot and fresh. Loved the butter chicken and naan. Delivery was on time.',
      isExpanded: false
    },
    {
      id: '4',
      orderId: '1237',
      customerName: 'Anjali Patel',
      ordersCount: 1,
      rating: 3,
      date: '24 Jul, 2025 8:45 AM',
      review: 'Food was okay but delivery was a bit late. The curry was not as spicy as expected.',
      isExpanded: false
    },
    {
      id: '5',
      orderId: '1238',
      customerName: 'Vikram Singh',
      ordersCount: 5,
      rating: 5,
      date: '23 Jul, 2025 6:20 PM',
      review: 'Best restaurant in the area! Consistent quality and great taste. The family pack is perfect for us.',
      isExpanded: false
    }
  ];

  const renderReviewCard = ({ item }: { item: any }) => (
    <View style={styles.reviewCard}>
      <View style={styles.reviewHeader}>
        <Text style={styles.orderInfo}>Order #{item.orderId} • Grooso's Kitchen, Hyderabad</Text>
      </View>
      
      <View style={styles.customerSection}>
        <View style={styles.customerInfo}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{item.customerName.charAt(0)}</Text>
          </View>
          <View style={styles.customerDetails}>
            <Text style={styles.customerName}>{item.customerName}</Text>
            <Text style={styles.ordersCount}>{item.ordersCount} orders with you</Text>
          </View>
        </View>
        
        <View style={styles.ratingSection}>
          <View style={[styles.ratingBadge, item.rating <= 2 ? styles.lowRatingBadge : styles.highRatingBadge]}>
            <Text style={[styles.ratingText, item.rating <= 2 ? styles.lowRatingText : styles.highRatingText]}>
              {item.rating}★
            </Text>
          </View>
          <Text style={styles.reviewDate}>{item.date}</Text>
        </View>
      </View>
      
      <View style={styles.reviewContent}>
        <Text style={styles.reviewText} numberOfLines={expandedReviews.has(item.id) ? undefined : 3}>
          {item.review}
        </Text>
        {item.review.length > 100 && (
          <TouchableOpacity 
            style={styles.seeMoreButton}
            onPress={() => {
              const newExpanded = new Set(expandedReviews);
              if (newExpanded.has(item.id)) {
                newExpanded.delete(item.id);
              } else {
                newExpanded.add(item.id);
              }
              setExpandedReviews(newExpanded);
            }}
          >
            <Text style={styles.seeMoreText}>
              {expandedReviews.has(item.id) ? 'See less' : 'See more'}
            </Text>
          </TouchableOpacity>
        )}
      </View>
      
      <View style={styles.reviewActions}>
        <TouchableOpacity 
          style={styles.replyButton}
          onPress={() => {
            // Navigate to reply screen or show reply modal
            console.log('Reply to review:', item.id);
            // You can add navigation logic here
          }}
        >
          <Text style={styles.replyText}>Reply →</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Text style={styles.backIcon}>←</Text>
          </TouchableOpacity>
          
          <View style={styles.headerTitle}>
            <Text style={styles.headerSubtitle}>SHOWING DATA FOR</Text>
            <Text style={styles.headerMainTitle}>Grooso's Kitchen</Text>
          </View>
          
          <View style={styles.headerActions}>
            <TouchableOpacity style={styles.notificationButton}>
              <Text style={styles.notificationIcon}>🔔</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.helpButton}>
              <Text style={styles.helpIcon}>?</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuButton}>
              <Text style={styles.menuIcon}>≡</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Tab Navigation */}
      <View style={styles.tabContainer}>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'Complaints' && styles.activeTab]}
          onPress={() => navigation.goBack()}
        >
          <Text style={[styles.tabText, activeTab === 'Complaints' && styles.activeTabText]}>
            Complaints
          </Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'Reviews' && styles.activeTab]}
          onPress={() => setActiveTab('Reviews')}
        >
          <Text style={[styles.tabText, activeTab === 'Reviews' && styles.activeTabText]}>
            Reviews
          </Text>
        </TouchableOpacity>
      </View>

      {/* Rating Summary */}
      <View style={styles.ratingSummary}>
        <View style={styles.ratingBox}>
          <Text style={styles.ratingNumber}>3.7</Text>
          <Text style={styles.ratingStar}>⭐</Text>
        </View>
        <View style={styles.ratingInfo}>
          <Text style={styles.ratingStats}>71 ratings • 12 reviews</Text>
          <TouchableOpacity 
            style={styles.dishRatingsLink}
            onPress={() => setShowDishRatingsModal(true)}
          >
            <Text style={styles.dishRatingsText}>View dish ratings →</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Scrollable Content */}
      <ScrollView 
        style={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Search and Filter Bar */}
        <View style={styles.searchContainer}>
          <View style={styles.searchBar}>
            <Text style={styles.searchIcon}>🔍</Text>
            <TextInput
              style={styles.searchInput}
              placeholder="Search reviews..."
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholderTextColor="#9CA3AF"
            />
          </View>
          <TouchableOpacity style={styles.filterButton}>
            <Text style={styles.filterIcon}>⚙️</Text>
          </TouchableOpacity>
        </View>

        {/* Reviews List */}
        <View style={styles.reviewsContainer}>
          <Text style={styles.reviewsTitle}>Reviews (11)</Text>
          {reviews.map((item) => renderReviewCard({ item }))}
        </View>
      </ScrollView>

      {/* Dish Ratings Modal */}
      <Modal
        visible={showDishRatingsModal}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={() => setShowDishRatingsModal(false)}
      >
        <SafeAreaView style={styles.modalContainer}>
          {/* Modal Header */}
          <View style={styles.modalHeader}>
            <TouchableOpacity 
              style={styles.modalCloseButton}
              onPress={() => setShowDishRatingsModal(false)}
            >
              <Text style={styles.modalCloseIcon}>✕</Text>
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Dish Ratings</Text>
            <View style={styles.modalSpacer} />
          </View>

          {/* Modal Content */}
          <ScrollView 
            style={styles.modalScrollContainer}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.modalScrollContent}
          >
            {/* Overall Summary */}
            <View style={styles.modalSummary}>
              <View style={styles.modalRatingBox}>
                <Text style={styles.modalRatingNumber}>4.1</Text>
                <Text style={styles.modalRatingStar}>⭐</Text>
              </View>
              <View style={styles.modalSummaryInfo}>
                <Text style={styles.modalSummaryTitle}>Average Dish Rating</Text>
                <Text style={styles.modalSummarySubtitle}>Based on 258 ratings across 8 dishes</Text>
              </View>
            </View>

            {/* Dish Ratings List */}
            <View style={styles.dishRatingsList}>
              <Text style={styles.dishRatingsTitle}>Individual Dish Ratings</Text>
              {dishRatings.map((dish) => (
                                 <View key={dish.id} style={styles.dishCard}>
                   <View style={styles.dishInfo}>
                     <View style={styles.dishImageContainer}>
                       {imageLoadErrors.has(dish.id) ? (
                         <View style={styles.dishImageFallback}>
                           <Text style={styles.dishImageFallbackText}>{dish.name.charAt(0)}</Text>
                         </View>
                       ) : (
                         <Image 
                           source={{ uri: dish.image }}
                           style={styles.dishImage}
                           resizeMode="cover"
                           onError={() => {
                             const newErrors = new Set(imageLoadErrors);
                             newErrors.add(dish.id);
                             setImageLoadErrors(newErrors);
                           }}
                         />
                       )}
                     </View>
                    <View style={styles.dishDetails}>
                      <Text style={styles.dishName}>{dish.name}</Text>
                      <Text style={styles.dishCategory}>{dish.category}</Text>
                    </View>
                  </View>
                  
                  <View style={styles.dishRatingInfo}>
                    <View style={[
                      styles.dishRatingBadge,
                      dish.rating >= 4.5 ? styles.excellentRatingBadge :
                      dish.rating >= 4.0 ? styles.goodRatingBadge :
                      dish.rating >= 3.5 ? styles.averageRatingBadge :
                      styles.poorRatingBadge
                    ]}>
                      <Text style={[
                        styles.dishRatingText,
                        dish.rating >= 4.5 ? styles.excellentRatingText :
                        dish.rating >= 4.0 ? styles.goodRatingText :
                        dish.rating >= 3.5 ? styles.averageRatingText :
                        styles.poorRatingText
                      ]}>{dish.rating}★</Text>
                    </View>
                    <Text style={styles.dishRatingCount}>{dish.totalRatings} ratings</Text>
                    <View style={styles.dishRatingBreakdown}>
                      <Text style={styles.positiveReviews}>👍 {dish.positiveReviews}</Text>
                      <Text style={styles.negativeReviews}>👎 {dish.negativeReviews}</Text>
                    </View>
                  </View>
                </View>
              ))}
            </View>
          </ScrollView>
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backIcon: {
    fontSize: 20,
    color: '#374151',
  },
  headerTitle: {
    flex: 1,
    alignItems: 'center',
  },
  headerSubtitle: {
    fontSize: 12,
    color: '#6B7280',
    fontWeight: '500',
  },
  headerMainTitle: {
    fontSize: 16,
    color: '#111827',
    fontWeight: '700',
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  notificationButton: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  notificationIcon: {
    fontSize: 18,
  },
  helpButton: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  helpIcon: {
    fontSize: 18,
    color: '#DC2626',
  },
  menuButton: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuIcon: {
    fontSize: 18,
    color: '#374151',
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 12,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
  },
  activeTab: {
    backgroundColor: '#10B981',
  },
  tabText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
  },
  activeTabText: {
    color: '#FFFFFF',
  },
  ratingSummary: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    padding: 16,
    alignItems: 'center',
    gap: 16,
  },
  ratingBox: {
    width: 80,
    height: 80,
    backgroundColor: '#10B981',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ratingNumber: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  ratingStar: {
    fontSize: 16,
  },
  ratingInfo: {
    flex: 1,
  },
  ratingStats: {
    fontSize: 16,
    color: '#374151',
    marginBottom: 4,
  },
  dishRatingsLink: {
    alignSelf: 'flex-start',
  },
  dishRatingsText: {
    fontSize: 14,
    color: '#2563EB',
    fontWeight: '500',
  },
  searchContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    padding: 16,
    gap: 12,
    alignItems: 'center',
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  searchIcon: {
    fontSize: 16,
    marginRight: 8,
    color: '#9CA3AF',
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#374151',
  },
  filterButton: {
    width: 40,
    height: 40,
    backgroundColor: '#F3F4F6',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  filterIcon: {
    fontSize: 18,
  },
  scrollContainer: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  reviewsContainer: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
  },
  reviewsTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    padding: 16,
    paddingBottom: 8,
  },
  reviewCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    marginHorizontal: 0,
  },
  reviewHeader: {
    marginBottom: 12,
  },
  orderInfo: {
    fontSize: 14,
    color: '#6B7280',
  },
  customerSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  customerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#3B82F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  avatarText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  customerDetails: {
    flex: 1,
  },
  customerName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 2,
  },
  ordersCount: {
    fontSize: 14,
    color: '#6B7280',
  },
  ratingSection: {
    alignItems: 'flex-end',
  },
  ratingBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginBottom: 4,
  },
  lowRatingBadge: {
    backgroundColor: '#FEE2E2',
  },
  highRatingBadge: {
    backgroundColor: '#D1FAE5',
  },
  ratingText: {
    fontSize: 12,
    fontWeight: '700',
  },
  lowRatingText: {
    color: '#DC2626',
  },
  highRatingText: {
    color: '#065F46',
  },
  reviewDate: {
    fontSize: 12,
    color: '#6B7280',
  },
  reviewContent: {
    marginBottom: 12,
  },
  reviewText: {
    fontSize: 14,
    color: '#374151',
    lineHeight: 20,
  },
  seeMoreButton: {
    marginTop: 4,
  },
  seeMoreText: {
    fontSize: 14,
    color: '#2563EB',
    fontWeight: '500',
  },
  reviewActions: {
    alignItems: 'flex-end',
  },
  replyButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  replyText: {
    fontSize: 14,
    color: '#2563EB',
    fontWeight: '500',
  },
  // Modal Styles
  modalContainer: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  modalCloseButton: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 16,
    backgroundColor: '#F3F4F6',
  },
  modalCloseIcon: {
    fontSize: 16,
    color: '#374151',
    fontWeight: '600',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
  },
  modalSpacer: {
    width: 32,
  },
  modalScrollContainer: {
    flex: 1,
  },
  modalScrollContent: {
    paddingBottom: 20,
  },
  modalSummary: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    margin: 16,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    gap: 16,
  },
  modalRatingBox: {
    width: 60,
    height: 60,
    backgroundColor: '#10B981',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalRatingNumber: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  modalRatingStar: {
    fontSize: 14,
  },
  modalSummaryInfo: {
    flex: 1,
  },
  modalSummaryTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  modalSummarySubtitle: {
    fontSize: 14,
    color: '#6B7280',
  },
  dishRatingsList: {
    backgroundColor: '#FFFFFF',
    margin: 16,
    borderRadius: 12,
    padding: 16,
  },
  dishRatingsTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 16,
  },
  dishCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  dishInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  dishImageContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 12,
    overflow: 'hidden',
  },
  dishImage: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  dishImageFallback: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#3B82F6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dishImageFallbackText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  dishDetails: {
    flex: 1,
  },
  dishName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 2,
  },
  dishCategory: {
    fontSize: 14,
    color: '#6B7280',
  },
  dishRatingInfo: {
    alignItems: 'flex-end',
  },
  dishRatingBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginBottom: 4,
  },
  excellentRatingBadge: {
    backgroundColor: '#D1FAE5',
  },
  goodRatingBadge: {
    backgroundColor: '#DBEAFE',
  },
  averageRatingBadge: {
    backgroundColor: '#FEF3C7',
  },
  poorRatingBadge: {
    backgroundColor: '#FEE2E2',
  },
  dishRatingText: {
    fontSize: 12,
    fontWeight: '700',
  },
  excellentRatingText: {
    color: '#065F46',
  },
  goodRatingText: {
    color: '#1E40AF',
  },
  averageRatingText: {
    color: '#92400E',
  },
  poorRatingText: {
    color: '#DC2626',
  },
  dishRatingCount: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 4,
  },
  dishRatingBreakdown: {
    flexDirection: 'row',
    gap: 8,
  },
  positiveReviews: {
    fontSize: 12,
    color: '#059669',
    fontWeight: '500',
  },
  negativeReviews: {
    fontSize: 12,
    color: '#DC2626',
    fontWeight: '500',
  },
});

export default ReviewsScreen;
