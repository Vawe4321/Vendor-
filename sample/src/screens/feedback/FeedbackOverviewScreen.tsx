import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Image,
  TextInput,
  Modal,
  Dimensions
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { FeedbackStackParamList } from '../../navigation/types';

type FeedbackOverviewScreenNavigationProp = StackNavigationProp<
  FeedbackStackParamList,
  'FeedbackOverview'
>;

const FeedbackOverviewScreen: React.FC = () => {
  const route = useRoute();
  const navigation = useNavigation<FeedbackOverviewScreenNavigationProp>();
  const { initialTab } = (route.params as { initialTab?: string }) || {};
  const [activeTab, setActiveTab] = useState(initialTab || 'Complaints');
  
  // Debug logging
  console.log('FeedbackOverviewScreen - initialTab:', initialTab);
  console.log('FeedbackOverviewScreen - activeTab:', activeTab);
  const [showDateRangeModal, setShowDateRangeModal] = useState(false);
  const [showViewLevelModal, setShowViewLevelModal] = useState(false);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [showReplyModal, setShowReplyModal] = useState(false);
  const [selectedDateRange, setSelectedDateRange] = useState('Last 5 days');
  const [selectedViewLevel, setSelectedViewLevel] = useState('');
  const [activeFilterTab, setActiveFilterTab] = useState('Issue type');
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [selectedReview, setSelectedReview] = useState<any>(null);
  const [replyText, setReplyText] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [showDishRatingsModal, setShowDishRatingsModal] = useState(false);
  const [showSortModal, setShowSortModal] = useState(false);
  const [selectedSort, setSelectedSort] = useState('Best rated first');
  const [showReviewsFilterModal, setShowReviewsFilterModal] = useState(false);
  const [activeFilterCategory, setActiveFilterCategory] = useState('Duration');

  const dateRangeOptions = [
    {
      id: 'today',
      title: 'Today so far',
      date: 'Thu, 31 Jul 25',
      selected: false,
    },
    {
      id: 'yesterday',
      title: 'Yesterday',
      date: 'Wed, 30 Jul 25',
      selected: false,
    },
    {
      id: 'this-week',
      title: 'This week so far',
      date: 'Mon, 28 Jul 25 - Thu, 31 Jul 25',
      selected: false,
    },
    {
      id: 'last-week',
      title: 'Last week',
      date: 'Mon, 21 Jul 25 - Sun, 27 Jul 25',
      selected: false,
    },
    {
      id: 'this-month',
      title: 'This month so far',
      date: 'Tue, 01 Jul 25 - Thu, 31 Jul 25',
      selected: false,
    },
    {
      id: 'last-month',
      title: 'Last month',
      date: 'Sun, 01 Jun 25 - Mon, 30 Jun 25',
      selected: false,
    },
    {
      id: 'custom',
      title: 'Custom date',
      date: 'Select your own date range and aggregation',
      selected: false,
      isCustom: true,
    },
  ];

  const viewLevelOptions = [
    {
      id: 'day',
      title: 'Day level',
      subtitle: 'You can select up to 7 days',
      selected: false,
    },
    {
      id: 'week',
      title: 'Week level',
      subtitle: 'You can select up to 4 weeks',
      selected: false,
    },
    {
      id: 'month',
      title: 'Month level',
      subtitle: 'You can select up to 6 months',
      selected: false,
    },
  ];

  const filterTabs = [
    { id: 'issue-type', title: 'Issue type' },
    { id: 'reasons', title: 'Reasons' },
  ];

  const filterOptions = {
    'issue-type': [
      { id: 'winback', title: 'Winback' },
      { id: 'open', title: 'Open' },
      { id: 'resolved', title: 'Resolved' },
      { id: 'expired', title: 'Expired' },
      { id: 'dismissed', title: 'Dismissed' },
    ],
    'reasons': [
      { id: 'quality', title: 'Quality' },
      { id: 'service', title: 'Service' },
      { id: 'delivery', title: 'Delivery' },
      { id: 'pricing', title: 'Pricing' },
      { id: 'other', title: 'Other' },
    ],
  };

  const dishesData = [
    {
      id: '1',
      name: 'Single Dum Biryani',
      rating: 4.5,
      ratingsCount: 9,
    },
    {
      id: '2',
      name: 'Single Fry Biryani',
      rating: 3.5,
      ratingsCount: 23,
    },
    {
      id: '3',
      name: 'Chicken Fried Rice',
      rating: 3.5,
      ratingsCount: 8,
    },
    {
      id: '4',
      name: 'Chicken Dum Biryani',
      rating: 3.0,
      ratingsCount: 5,
    },
  ];

  const sortOptions = [
    { id: 'best', title: 'Best rated first', selected: true },
    { id: 'worst', title: 'Worst rated first', selected: false },
  ];

  const reviewsFilterCategories = [
    { id: 'duration', title: 'Duration' },
    { id: 'sort-by', title: 'Sort by' },
    { id: 'review-type', title: 'Review type' },
  ];

  const reviewsFilterOptions = {
    'duration': [
      { id: '7-days', title: 'Last 7 days', selected: false },
      { id: '30-days', title: 'Last 30 days', selected: false },
      { id: '90-days', title: 'Last 90 days', selected: false },
    ],
    'sort-by': [
      { id: 'newest', title: 'Newest first', selected: false },
      { id: 'oldest', title: 'Oldest first', selected: false },
      { id: 'rating-high', title: 'Highest rating', selected: false },
      { id: 'rating-low', title: 'Lowest rating', selected: false },
    ],
    'review-type': [
      { id: 'all', title: 'All reviews', selected: false },
      { id: 'positive', title: 'Positive reviews', selected: false },
      { id: 'negative', title: 'Negative reviews', selected: false },
    ],
  };

  const reviewsData = [
    {
      id: '1',
      orderNumber: 'Order #1234',
      restaurant: 'Grooso\'s Kitchen, Hyderabad',
      customerName: 'Bhagath',
      ordersCount: '1 orders with you',
      isPremium: false,
      rating: 1.0,
      date: '27 Jul, 2025 9:04 AM',
      reviewText: 'Actually they have to send the khatta or gravy for The order which I ordered, and also I Informed them through the call, but they didn\'t send, and...',
      hasMoreText: true,
      hasImages: false,
    },
    {
      id: '2',
      orderNumber: 'Order #1235',
      restaurant: 'Grooso\'s Kitchen, Hyderabad',
      customerName: 'Asmin khatoon',
      ordersCount: '3 orders with you',
      isPremium: true,
      rating: 5.0,
      date: '26 Jul, 2025 2:30 PM',
      reviewText: 'worst food ever',
      hasMoreText: false,
      hasImages: true,
      foodImage: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=150&h=150&fit=crop',
    },
    {
      id: '3',
      orderNumber: 'Order #1236',
      restaurant: 'Grooso\'s Kitchen, Hyderabad',
      customerName: 'Bharath Kumar Vallabhaneni',
      ordersCount: '2 orders with you',
      isPremium: false,
      rating: 2.0,
      date: '25 Jul, 2025 7:15 PM',
      reviewText: 'kaju was very less and with out gravy how can we eat rice',
      hasMoreText: false,
      hasImages: true,
      foodImage: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=150&h=150&fit=crop',
    },
    {
      id: '4',
      orderNumber: 'Order #1237',
      restaurant: 'Grooso\'s Kitchen, Hyderabad',
      customerName: 'Nithish',
      ordersCount: '1 orders with you',
      isPremium: false,
      rating: 1.0,
      date: '24 Jul, 2025 12:45 PM',
      reviewText: 'nothing well delivered',
      hasMoreText: false,
      hasImages: false,
    },
    {
      id: '5',
      orderNumber: 'Order #1238',
      restaurant: 'Grooso\'s Kitchen, Hyderabad',
      customerName: 'Kranthi',
      ordersCount: '5 orders with you',
      isPremium: true,
      rating: 4.0,
      date: '23 Jul, 2025 6:20 PM',
      reviewText: 'good teast',
      hasMoreText: false,
      hasImages: true,
      foodImage: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=150&h=150&fit=crop',
    },
    {
      id: '6',
      orderNumber: 'Order #1239',
      restaurant: 'Grooso\'s Kitchen, Hyderabad',
      customerName: 'JanakiramN jrgv',
      ordersCount: '2 orders with you',
      isPremium: false,
      rating: 1.0,
      date: '22 Jul, 2025 3:10 PM',
      reviewText: 'food is rotten and even hot. i think this is not fresh biryani',
      hasMoreText: false,
      hasImages: true,
      foodImage: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=150&h=150&fit=crop',
    },
    {
      id: '7',
      orderNumber: 'Order #1240',
      restaurant: 'Grooso\'s Kitchen, Hyderabad',
      customerName: 'Rahul Sharma',
      ordersCount: '1 orders with you',
      isPremium: false,
      rating: 3.0,
      date: '21 Jul, 2025 8:30 AM',
      reviewText: 'price is high and chicken quantity is only 4 Peace\'s but taste is good',
      hasMoreText: false,
      hasImages: true,
      foodImage: 'https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=150&h=150&fit=crop',
    },
    {
      id: '8',
      orderNumber: 'Order #1241',
      restaurant: 'Grooso\'s Kitchen, Hyderabad',
      customerName: 'Priya Patel',
      ordersCount: '1 orders with you',
      isPremium: false,
      rating: 1.0,
      date: '20 Jul, 2025 5:45 PM',
      reviewText: 'Too spicy food... lot loose motions',
      hasMoreText: false,
      hasImages: true,
      foodImage: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=150&h=150&fit=crop',
    },
    {
      id: '9',
      orderNumber: 'Order #1242',
      restaurant: 'Grooso\'s Kitchen, Hyderabad',
      customerName: 'Amit Kumar',
      ordersCount: '1 orders with you',
      isPremium: false,
      rating: 2.0,
      date: '19 Jul, 2025 1:20 PM',
      reviewText: 'rice not teasty',
      hasMoreText: false,
      hasImages: false,
    },
    {
      id: '10',
      orderNumber: 'Order #1243',
      restaurant: 'Grooso\'s Kitchen, Hyderabad',
      customerName: 'Neha Singh',
      ordersCount: '1 orders with you',
      isPremium: false,
      rating: 2.0,
      date: '18 Jul, 2025 4:15 PM',
      reviewText: 'food doesn\'t have any taste. it\'s just bland. packaging is good. Quality is ok',
      hasMoreText: false,
      hasImages: false,
    },
    {
      id: '11',
      orderNumber: 'Order #1244',
      restaurant: 'Grooso\'s Kitchen, Hyderabad',
      customerName: 'Vikram Reddy',
      ordersCount: '1 orders with you',
      isPremium: false,
      rating: 1.0,
      date: '17 Jul, 2025 11:30 AM',
      reviewText: 'waste',
      hasMoreText: false,
      hasImages: false,
    },
  ];

  // Filter reviews based on search query
  const filteredReviews = reviewsData.filter(review =>
    review.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    review.reviewText.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleHamburgerPress = () => {
    navigation.navigate('Hub', { screen: 'ExploreMore' });
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.backButtonText}>←</Text>
          </TouchableOpacity>
          <View style={styles.outletInfo}>
            <Text style={styles.dataLabel}>SHOWING DATA FOR</Text>
            <Text style={styles.outletName}>Grooso's Kitchen</Text>
          </View>
          <View style={styles.headerIcons}>
            <TouchableOpacity style={styles.iconButton}>
              <Text style={styles.iconText}>🔔</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton}>
              <Text style={styles.iconText}>❓</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.iconButton}
              onPress={handleHamburgerPress}
            >
              <Text style={styles.iconText}>☰</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Tabs */}
      <View style={styles.tabsContainer}>
        <TouchableOpacity
          style={[
            styles.tab,
            activeTab === 'Complaints' && styles.activeTab
          ]}
          onPress={() => setActiveTab('Complaints')}
        >
          <Text style={[
            styles.tabText,
            activeTab === 'Complaints' && styles.activeTabText
          ]}>
            Complaints
        </Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[
            styles.tab,
            activeTab === 'Reviews' && styles.activeTab
          ]}
          onPress={() => navigation.navigate('Reviews')}
        >
          <Text style={[
            styles.tabText,
            activeTab === 'Reviews' && styles.activeTabText
          ]}>
            Reviews
          </Text>
        </TouchableOpacity>
      </View>

      {/* Date Range Selector - Only for Complaints */}
      {activeTab === 'Complaints' && (
        <View style={styles.dateRangeContainer}>
          <View style={styles.dateRangeRow}>
            <TouchableOpacity 
              style={styles.dateRangeBox}
              onPress={() => setShowDateRangeModal(true)}
            >
              <View style={styles.dateRangeContent}>
                <Text style={styles.dateRangeTitle}>{selectedDateRange}</Text>
                <Text style={styles.dateRangeSubtitle}>Select your own date range</Text>
        </View>
              <View style={styles.dateRangeIcons}>
                <Text style={styles.dateIcon}>📅</Text>
                <Text style={styles.chevronIcon}>▼</Text>
        </View>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.filterBox}
              onPress={() => setShowFilterModal(true)}
            >
              <Text style={styles.filterIcon}>⚙️</Text>
            </TouchableOpacity>
        </View>
      </View>
      )}

      {/* Main Content */}
      <View style={styles.mainContent}>
        {activeTab === 'Complaints' ? (
          <View style={styles.emptyStateContainer}>
            <View style={styles.emptyStateCircle}>
              <View style={styles.chatBubble}>
                <View style={styles.chatLines}>
                  <View style={styles.chatLine} />
                  <View style={[styles.chatLine, styles.chatLineShort]} />
                  <View style={[styles.chatLine, styles.chatLineMedium]} />
                  <View style={[styles.chatLine, styles.chatLineShort]} />
          </View>
                <View style={styles.chatDots}>
                  <View style={styles.chatDot} />
                  <View style={styles.chatDot} />
                  <View style={styles.chatDot} />
                  <View style={styles.chatDot} />
          </View>
              </View>
            </View>
            <Text style={styles.emptyStateText}>No complaints found!</Text>
          </View>
        ) : (
          <View style={styles.reviewsContainer}>
            {/* Reviews Summary */}
            <View style={styles.reviewsSummary}>
              <View style={styles.ratingBox}>
                <Text style={styles.ratingText}>3.7</Text>
                <Text style={styles.starIcon}>⭐</Text>
              </View>
              <View style={styles.ratingInfo}>
                <Text style={styles.ratingCount}>71 ratings • 12 reviews</Text>
                <TouchableOpacity 
                  style={styles.viewDishRatings}
                  onPress={() => {
                    // Navigate to Dish Ratings Screen
                    console.log('Navigate to Dish Ratings Screen');
                    // You can add navigation logic here
                    // For now, we'll show the dish ratings in a modal
                    setShowDishRatingsModal(true);
                  }}
                >
                  <Text style={styles.viewDishText}>View dish ratings</Text>
                  <Text style={styles.arrowIcon}>→</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Search Bar and Filter Icon */}
            <View style={styles.reviewsSearchContainer}>
              <View style={styles.searchInputContainer}>
                <TouchableOpacity 
                  style={styles.searchIconContainer}
                  onPress={() => {
                    console.log('Search icon pressed');
                  }}
                >
                  <Text style={styles.searchIcon}>🔍</Text>
                </TouchableOpacity>
                <TextInput
                  style={styles.searchInput}
                  placeholder="Search reviews"
                  placeholderTextColor="#6B7280"
                  value={searchQuery}
                  onChangeText={(text) => {
                    console.log('Search text changed:', text);
                    setSearchQuery(text);
                  }}
                  autoCapitalize="none"
                  autoCorrect={false}
                  clearButtonMode="while-editing"
                  returnKeyType="search"
                  onSubmitEditing={() => {
                    console.log('Search submitted:', searchQuery);
                  }}
                />
                {searchQuery.length > 0 && (
                  <TouchableOpacity 
                    style={styles.clearButton}
                    onPress={() => setSearchQuery('')}
                  >
                    <Text style={styles.clearButtonText}>✕</Text>
                  </TouchableOpacity>
                )}
              </View>
              <TouchableOpacity 
                style={styles.filterButton}
                onPress={() => setShowReviewsFilterModal(true)}
                activeOpacity={0.7}
              >
                <Text style={styles.filterIcon}>⚙️</Text>
              </TouchableOpacity>
            </View>

            {/* Reviews List */}
            <View style={styles.reviewsListContainer}>
              <Text style={styles.reviewsListTitle}>Reviews ({filteredReviews.length})</Text>
              <FlatList
                data={filteredReviews}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                  <View style={styles.reviewCard}>
                    {/* Order Information */}
                    <TouchableOpacity style={styles.orderInfo}>
                      <Text style={styles.orderText}>{item.orderNumber} • {item.restaurant}</Text>
                      <Text style={styles.orderArrow}>→</Text>
                    </TouchableOpacity>

                    {/* Customer Profile */}
                    <View style={styles.customerProfile}>
                      <View style={styles.avatarContainer}>
                        <Text style={styles.avatarText}>👤</Text>
                      </View>
                      <View style={styles.customerInfo}>
                        <View style={styles.customerNameRow}>
                          <Text style={styles.customerName}>{item.customerName}</Text>
                          {item.isPremium && (
                            <View style={styles.premiumBadge}>
                              <Text style={styles.premiumText}>PREMIUM</Text>
                            </View>
                          )}
                        </View>
                        <Text style={styles.ordersCount}>{item.ordersCount}</Text>
                      </View>
                    </View>

                    {/* Rating and Date */}
                    <View style={styles.ratingDateRow}>
                      <View style={[
                        styles.ratingBadge,
                        item.rating >= 4 ? styles.ratingGood : 
                        item.rating >= 3 ? styles.ratingAverage : styles.ratingPoor
                      ]}>
                        <Text style={styles.ratingNumber}>{item.rating}</Text>
                        <Text style={styles.ratingStar}>⭐</Text>
                      </View>
                      <Text style={styles.reviewDate}>{item.date}</Text>
                    </View>

                    {/* Review Text */}
                    <View style={styles.reviewTextContainer}>
                      <Text style={styles.reviewText}>{item.reviewText}</Text>
                      {item.hasMoreText && (
                        <TouchableOpacity>
                          <Text style={styles.seeMoreText}>See more</Text>
                        </TouchableOpacity>
                      )}
                    </View>

                    {/* Customer Images */}
                    {item.hasImages && (
                      <View style={styles.customerImagesContainer}>
                        <Text style={styles.customerImagesTitle}>Customer submitted images</Text>
                        <View style={styles.imageThumbnail}>
                          <Image 
                            source={{ uri: item.foodImage }}
                            style={styles.foodImage}
                            resizeMode="cover"
                          />
                        </View>
                      </View>
                    )}

                    {/* Reply Button */}
                    <TouchableOpacity 
                      style={styles.replyButton}
                      onPress={() => {
                        setSelectedReview(item);
                        setShowReplyModal(true);
                      }}
                    >
                      <Text style={styles.replyButtonText}>Reply</Text>
                      <Text style={styles.replyArrow}>→</Text>
                    </TouchableOpacity>
                  </View>
                )}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.reviewsList}
              />
            </View>
          </View>
        )}
       </View>

       {/* Date Range Selection Modal */}
       {showDateRangeModal && (
         <View style={styles.modalOverlay}>
           <View style={styles.dateRangeModal}>
             {/* Modal Title */}
             <Text style={styles.modalTitle}>Date range selection</Text>
             
             {/* Date Range Options */}
             <View style={styles.dateRangeOptions}>
               {dateRangeOptions.map((option, index) => (
                 <TouchableOpacity 
                   key={option.id}
                   style={[
                     styles.dateRangeOption,
                     index < dateRangeOptions.length - 1 && styles.dateRangeOptionWithBorder
                   ]}
                   onPress={() => {
                     if (option.isCustom) {
                       // Handle custom date navigation
                       setShowDateRangeModal(false);
                       setShowViewLevelModal(true);
                     } else {
                       setSelectedDateRange(option.title);
                       setShowDateRangeModal(false);
                     }
                   }}
                 >
                   <View style={styles.optionContent}>
                     <Text style={styles.optionTitle}>{option.title}</Text>
                     <Text style={styles.optionDate}>{option.date}</Text>
                   </View>
                   {option.isCustom ? (
                     <Text style={styles.arrowIcon}>→</Text>
                   ) : (
                     <View style={styles.radioButton} />
                   )}
                 </TouchableOpacity>
               ))}
             </View>
             
             {/* Action Buttons */}
             <View style={styles.modalActions}>
               <TouchableOpacity 
                 style={styles.cancelButton}
                 onPress={() => setShowDateRangeModal(false)}
               >
                 <Text style={styles.cancelButtonText}>Cancel</Text>
               </TouchableOpacity>
               
               <TouchableOpacity 
                 style={styles.applyButton}
                 onPress={() => setShowDateRangeModal(false)}
               >
                 <Text style={styles.applyButtonText}>Apply</Text>
               </TouchableOpacity>
             </View>
           </View>
         </View>
       )}

       {/* View Level Selection Modal */}
       {showViewLevelModal && (
         <View style={styles.modalOverlay}>
           <View style={styles.viewLevelModal}>
             {/* Modal Header */}
             <View style={styles.viewLevelModalHeader}>
               <TouchableOpacity 
                 style={styles.backButton}
                 onPress={() => {
                   setShowViewLevelModal(false);
                   setShowDateRangeModal(true);
                 }}
               >
                 <Text style={styles.backArrow}>←</Text>
               </TouchableOpacity>
               <Text style={styles.viewLevelModalTitle}>How do you want to view?</Text>
             </View>
             
             {/* View Level Options */}
             <View style={styles.viewLevelOptions}>
               {viewLevelOptions.map((option, index) => (
                 <TouchableOpacity 
                   key={option.id}
                   style={[
                     styles.viewLevelOption,
                     index < viewLevelOptions.length - 1 && styles.viewLevelOptionWithBorder
                   ]}
                   onPress={() => {
                     setSelectedViewLevel(option.title);
                     setShowViewLevelModal(false);
                     // Here you can add navigation to the actual date selection screen
                   }}
                 >
                   <View style={styles.viewLevelContent}>
                     <Text style={styles.viewLevelTitle}>{option.title}</Text>
                     <Text style={styles.viewLevelSubtitle}>{option.subtitle}</Text>
                   </View>
                   <View style={styles.radioButton} />
                 </TouchableOpacity>
               ))}
             </View>
             
             {/* Action Buttons */}
             <View style={styles.modalActions}>
               <TouchableOpacity 
                 style={styles.cancelButton}
                 onPress={() => {
                   setShowViewLevelModal(false);
                   setShowDateRangeModal(true);
                 }}
               >
                 <Text style={styles.cancelButtonText}>Back</Text>
               </TouchableOpacity>
               
               <TouchableOpacity 
                 style={styles.applyButton}
                 onPress={() => {
                   setShowViewLevelModal(false);
                   // Here you can add navigation to the actual date selection screen
                 }}
               >
                 <Text style={styles.applyButtonText}>Select</Text>
               </TouchableOpacity>
             </View>
           </View>
         </View>
       )}

       {/* Filter Modal */}
       {showFilterModal && (
         <View style={styles.modalOverlay}>
           <View style={styles.filterModal}>
             {/* Modal Title */}
             <Text style={styles.filterModalTitle}>Filters</Text>
             
             {/* Filter Content */}
             <View style={styles.filterContent}>
               {/* Left Panel - Filter Tabs */}
               <View style={styles.filterTabsPanel}>
                 {filterTabs.map((tab) => (
                   <TouchableOpacity
                     key={tab.id}
                     style={[
                       styles.filterTab,
                       activeFilterTab === tab.title && styles.activeFilterTab
                     ]}
                     onPress={() => setActiveFilterTab(tab.title)}
                   >
                     <Text style={[
                       styles.filterTabText,
                       activeFilterTab === tab.title && styles.activeFilterTabText
                     ]}>
                       {tab.title}
            </Text>
                   </TouchableOpacity>
                 ))}
          </View>
               
               {/* Right Panel - Filter Options */}
               <View style={styles.filterOptionsPanel}>
                 {/* Filter Options */}
                 <View style={styles.filterOptionsList}>
                   {filterOptions[activeFilterTab === 'Issue type' ? 'issue-type' : 'reasons'].map((option) => (
                     <TouchableOpacity
                       key={option.id}
                       style={styles.filterOption}
                       onPress={() => {
                         if (selectedFilters.includes(option.id)) {
                           setSelectedFilters(selectedFilters.filter(id => id !== option.id));
                         } else {
                           setSelectedFilters([...selectedFilters, option.id]);
                         }
                       }}
                     >
                       <View style={[
                         styles.checkbox,
                         selectedFilters.includes(option.id) && styles.checkedCheckbox
                       ]}>
                         {selectedFilters.includes(option.id) && (
                           <Text style={styles.checkmark}>✓</Text>
                         )}
                       </View>
                       <Text style={styles.filterOptionText}>{option.title}</Text>
                     </TouchableOpacity>
                   ))}
                 </View>
        </View>
      </View>

             {/* Action Buttons */}
             <View style={styles.filterModalActions}>
               <TouchableOpacity 
                 style={styles.clearAllButton}
                 onPress={() => setSelectedFilters([])}
               >
                 <Text style={styles.clearAllButtonText}>Clear all</Text>
               </TouchableOpacity>
               
               <TouchableOpacity 
                 style={styles.applyFilterButton}
                 onPress={() => setShowFilterModal(false)}
               >
                 <Text style={styles.applyFilterButtonText}>Apply</Text>
          </TouchableOpacity>
        </View>
           </View>
         </View>
       )}

       {/* Reply Modal */}
       {showReplyModal && selectedReview && (
         <View style={styles.modalOverlay}>
           <View style={styles.replyModal}>
             {/* Modal Header */}
             <View style={styles.replyModalHeader}>
          <TouchableOpacity
                 style={styles.closeButton}
                 onPress={() => {
                   setShowReplyModal(false);
                   setSelectedReview(null);
                   setReplyText('');
                 }}
               >
                 <Text style={styles.closeButtonText}>✕</Text>
               </TouchableOpacity>
               <Text style={styles.replyModalTitle}>Reply to Review</Text>
             </View>
             
             {/* Review Info */}
             <View style={styles.reviewInfoContainer}>
               <View style={styles.reviewInfoHeader}>
                 <Text style={styles.reviewCustomerName}>{selectedReview.customerName}</Text>
                 <View style={[
                   styles.ratingBadge,
                   selectedReview.rating >= 4 ? styles.ratingGood : 
                   selectedReview.rating >= 3 ? styles.ratingAverage : styles.ratingPoor
                 ]}>
                   <Text style={styles.ratingNumber}>{selectedReview.rating}</Text>
                   <Text style={styles.ratingStar}>⭐</Text>
                 </View>
               </View>
               <Text style={styles.reviewText}>{selectedReview.reviewText}</Text>
             </View>
             
             {/* Reply Input */}
             <View style={styles.replyInputContainer}>
               <Text style={styles.replyLabel}>Your Reply</Text>
               <TextInput
                 style={styles.replyTextInput}
                 placeholder="Write your reply to this review..."
                 placeholderTextColor="#9CA3AF"
                 value={replyText}
                 onChangeText={setReplyText}
                 multiline
                 numberOfLines={4}
                 textAlignVertical="top"
               />
             </View>
             
             {/* Action Buttons */}
             <View style={styles.replyModalActions}>
               <TouchableOpacity 
                 style={styles.cancelReplyButton}
                 onPress={() => {
                   setShowReplyModal(false);
                   setSelectedReview(null);
                   setReplyText('');
                 }}
               >
                 <Text style={styles.cancelReplyButtonText}>Cancel</Text>
               </TouchableOpacity>
               
               <TouchableOpacity 
                 style={[
                   styles.sendReplyButton,
                   !replyText.trim() && styles.sendReplyButtonDisabled
                 ]}
                 onPress={() => {
                   if (replyText.trim()) {
                     // Here you can add the logic to send the reply
                     console.log('Reply sent:', replyText);
                     setShowReplyModal(false);
                     setSelectedReview(null);
                     setReplyText('');
                   }
                 }}
                 disabled={!replyText.trim()}
               >
                 <Text style={styles.sendReplyButtonText}>Send Reply</Text>
               </TouchableOpacity>
             </View>
           </View>
         </View>
       )}

       {/* Dish Ratings Modal */}
       {showDishRatingsModal && (
         <Modal
           visible={showDishRatingsModal}
           animationType="slide"
           presentationStyle="pageSheet"
         >
           <SafeAreaView style={styles.modalContainer}>
             {/* Header */}
             <View style={styles.modalHeader}>
               <TouchableOpacity
                 style={styles.backButton}
                 onPress={() => setShowDishRatingsModal(false)}
               >
                 <Text style={styles.backButtonText}>←</Text>
               </TouchableOpacity>
               <View style={styles.modalTitleContainer}>
                 <Text style={styles.modalTitle}>Grooso's Kitchen</Text>
                 <Text style={styles.modalSubtitle}>ID: 21781923 • Hyderabad</Text>
               </View>
             </View>

             {/* Content */}
             <View style={styles.modalContent}>
               <Text style={styles.dishRatingsTitle}>Dish level ratings</Text>
               
               {/* Sort Filter */}
               <View style={styles.sortContainer}>
                 <TouchableOpacity 
                   style={styles.sortButton}
                   onPress={() => setShowSortModal(true)}
                 >
                   <Text style={styles.sortIcon}>☰</Text>
                   <Text style={styles.sortText}>{selectedSort}</Text>
                   <Text style={styles.sortChevron}>▼</Text>
                 </TouchableOpacity>
               </View>

               {/* Dishes List */}
               <FlatList
                 data={dishesData}
                 keyExtractor={(item) => item.id}
                 renderItem={({ item }) => (
                   <View style={styles.dishItem}>
                     <View style={styles.dishInfo}>
                       <Text style={styles.dishName}>{item.name}</Text>
                       <View style={styles.dishRating}>
                         <View style={styles.starsContainer}>
                           {[1, 2, 3, 4, 5].map((star) => (
                             <Text key={star} style={styles.star}>
                               {star <= Math.floor(item.rating) ? '★' : 
                                star === Math.ceil(item.rating) && item.rating % 1 !== 0 ? '☆' : '☆'}
                </Text>
                           ))}
              </View>
                         <Text style={styles.ratingsCount}>{item.ratingsCount} ratings</Text>
            </View>
                     </View>
                   </View>
                 )}
                 ItemSeparatorComponent={() => <View style={styles.separator} />}
                 showsVerticalScrollIndicator={false}
                                />
               </View>

               {/* Sort Modal */}
               {showSortModal && (
                 <Modal
                   visible={showSortModal}
                   animationType="fade"
                   transparent={true}
                 >
                   <View style={styles.sortModalOverlay}>
                     <View style={styles.sortModalContainer}>
                       {/* Dismiss Button */}
                       <TouchableOpacity
                         style={styles.dismissButton}
                         onPress={() => setShowSortModal(false)}
                       >
                         <Text style={styles.dismissButtonText}>✕</Text>
                       </TouchableOpacity>

                       {/* Modal Content */}
                       <View style={styles.sortModalContent}>
                         <Text style={styles.sortModalTitle}>Sort dishes by</Text>
                         
                         {sortOptions.map((option) => (
                           <TouchableOpacity
                             key={option.id}
                             style={styles.sortOption}
                             onPress={() => {
                               setSelectedSort(option.title);
                               setShowSortModal(false);
                             }}
                           >
                             <Text style={styles.sortOptionText}>{option.title}</Text>
                             <View style={[
                               styles.radioButton,
                               selectedSort === option.title && styles.radioButtonSelected
                             ]}>
                               {selectedSort === option.title && (
                                 <View style={styles.radioButtonInner} />
                               )}
                             </View>
                           </TouchableOpacity>
                         ))}

                         <TouchableOpacity
                           style={styles.applyButton}
                           onPress={() => setShowSortModal(false)}
                         >
                           <Text style={styles.applyButtonText}>Apply</Text>
                         </TouchableOpacity>
                       </View>
                     </View>
                   </View>
                 </Modal>
               )}
             </SafeAreaView>
           </Modal>
         )}

       {/* Reviews Filter Modal */}
       {showReviewsFilterModal && (
         <Modal
           visible={showReviewsFilterModal}
           animationType="slide"
           presentationStyle="pageSheet"
         >
           <SafeAreaView style={styles.modalContainer}>
             {/* Header */}
             <View style={styles.modalHeader}>
               <TouchableOpacity
                 style={styles.backButton}
                 onPress={() => setShowReviewsFilterModal(false)}
               >
                 <Text style={styles.backButtonText}>←</Text>
               </TouchableOpacity>
               <View style={styles.modalTitleContainer}>
                 <Text style={styles.modalTitle}>Filters</Text>
               </View>
             </View>

             {/* Filter Content */}
             <View style={styles.filterModalContent}>
               <View style={styles.filterLayout}>
                 {/* Left Panel - Categories */}
                 <View style={styles.filterCategoriesPanel}>
                   {reviewsFilterCategories.map((category) => (
                     <TouchableOpacity
                       key={category.id}
                       style={[
                         styles.filterCategory,
                         activeFilterCategory === category.title && styles.filterCategoryActive
                       ]}
                       onPress={() => setActiveFilterCategory(category.title)}
                     >
                       <Text style={[
                         styles.filterCategoryText,
                         activeFilterCategory === category.title && styles.filterCategoryTextActive
                       ]}>
                         {category.title}
            </Text>
                     </TouchableOpacity>
                   ))}
                 </View>

                 {/* Right Panel - Options */}
                 <View style={styles.filterOptionsPanel}>
                   {reviewsFilterOptions[activeFilterCategory.toLowerCase().replace(' ', '-')]?.map((option) => (
                     <TouchableOpacity
                       key={option.id}
                       style={styles.filterOption}
                       onPress={() => {
                         // Toggle selection
                         console.log('Filter option selected:', option.title);
                       }}
                     >
                       <Text style={styles.filterOptionText}>{option.title}</Text>
                       <View style={[
                         styles.radioButton,
                         option.selected && styles.radioButtonSelected
                       ]}>
                         {option.selected && (
                           <View style={styles.radioButtonInner} />
              )}
            </View>
          </TouchableOpacity>
        ))}
                 </View>
      </View>

               {/* Action Buttons */}
               <View style={styles.filterActionButtons}>
        <TouchableOpacity
                   style={styles.resetButton}
                   onPress={() => {
                     console.log('Reset filters');
                     setShowReviewsFilterModal(false);
                   }}
                 >
                   <Text style={styles.resetButtonText}>Reset</Text>
        </TouchableOpacity>
        <TouchableOpacity
                   style={styles.applyFilterButton}
                   onPress={() => {
                     console.log('Apply filters');
                     setShowReviewsFilterModal(false);
                   }}
                 >
                   <Text style={styles.applyFilterButtonText}>Apply</Text>
        </TouchableOpacity>
      </View>
             </View>
           </SafeAreaView>
         </Modal>
       )}

     </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  // Design System Colors
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA', // gray.50
  },
  
  // Header Section - Following Design System
  header: {
    backgroundColor: '#FFFFFF', // background.paper
    paddingHorizontal: 20, // SPACING.xl
    paddingVertical: 15, // SPACING.lg
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0', // gray.300
    shadowColor: 'rgba(0, 0, 0, 0.08)',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 4,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    minHeight: 56, // HEADER_HEIGHTS.default
  },
  backButton: {
    width: 44, // TOUCH_TARGET.medium
    height: 44, // TOUCH_TARGET.medium
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8, // BORDER_RADIUS.md
    backgroundColor: '#F5F5F5', // gray.100
    marginRight: 12, // SPACING.md
  },
  backButtonText: {
    fontSize: 24, // FONT_SIZES.xl
    color: '#212121', // text.primary
    fontWeight: '500', // Medium
  },
  outletInfo: {
    flex: 1,
  },
  dataLabel: {
    fontSize: 12, // FONT_SIZES.sm
    color: '#9E9E9E', // gray.500
    fontWeight: '500', // Medium
    marginBottom: 4, // SPACING.xs
  },
  outletName: {
    fontSize: 20, // FONT_SIZES.xxl
    fontWeight: '700', // Bold
    color: '#212121', // text.primary
  },
  headerIcons: {
    flexDirection: 'row',
    gap: 12, // SPACING.md
  },
  iconButton: {
    width: 44, // TOUCH_TARGET.medium
    height: 44, // TOUCH_TARGET.medium
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8, // BORDER_RADIUS.md
    backgroundColor: '#F5F5F5', // gray.100
  },
  iconText: {
    fontSize: 20, // FONT_SIZES.lg
    color: '#212121', // text.primary
  },
  // Tabs Section - Following Design System
  tabsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20, // SPACING.xl
    paddingVertical: 12, // SPACING.md
    gap: 8, // SPACING.sm
    backgroundColor: '#FFFFFF', // background.paper
  },
  tab: {
    flex: 1,
    paddingVertical: 15, // SPACING.lg
    paddingHorizontal: 20, // SPACING.xl
    borderRadius: 8, // BORDER_RADIUS.md
    backgroundColor: '#F5F5F5', // gray.100
    alignItems: 'center',
    minHeight: 44, // BUTTON_HEIGHTS.medium
    shadowColor: 'rgba(0, 0, 0, 0.08)',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 2,
  },
  activeTab: {
    backgroundColor: '#699f38', // primary
    shadowColor: 'rgba(0, 0, 0, 0.12)',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 1,
    shadowRadius: 6,
    elevation: 4,
  },
  tabText: {
    fontSize: 16, // FONT_SIZES.lg
    fontWeight: '500', // Medium
    color: '#757575', // text.secondary
  },
  activeTabText: {
    color: '#FFFFFF', // text.inverse
    fontWeight: '600', // Semi-Bold
  },
  dateRangeContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
  },
  dateRangeRow: {
    flexDirection: 'row',
    gap: 12,
  },
  dateRangeBox: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 56,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  filterBox: {
    minWidth: 48,
    height: 56,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  dateRangeContent: {
    flex: 1,
  },
  dateRangeTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 2,
  },
  dateRangeSubtitle: {
    fontSize: 12,
    color: '#6B7280',
  },
  dateRangeIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  dateIcon: {
    fontSize: 16,
  },
  chevronIcon: {
    fontSize: 12,
    color: '#6B7280',
  },
  filterIcon: {
    fontSize: 18,
    color: '#6B7280',
  },
  mainContent: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  emptyStateContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  emptyStateCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#374151',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  chatBubble: {
    width: 60,
    height: 40,
    backgroundColor: '#4B5563',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  chatLines: {
    width: 40,
    gap: 2,
  },
  chatLine: {
    height: 2,
    backgroundColor: '#9CA3AF',
    borderRadius: 1,
  },
  chatLineShort: {
    width: 20,
  },
  chatLineMedium: {
    width: 30,
  },
  chatDots: {
    position: 'absolute',
    left: 4,
    top: 4,
    gap: 2,
  },
  chatDot: {
    width: 2,
    height: 2,
    backgroundColor: '#9CA3AF',
    borderRadius: 1,
  },
  starIcon: {
    fontSize: 48,
  },
  emptyStateText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    textAlign: 'center',
  },
  modalOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  dateRangeModal: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 20,
    paddingBottom: 20,
    paddingHorizontal: 20,
    height: 700,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
    textAlign: 'center',
    marginBottom: 15,
  },
  dateRangeOptions: {
    flex: 1,
    marginBottom: 30,
  },
  dateRangeOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
  },
  dateRangeOptionWithBorder: {
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  optionContent: {
    flex: 1,
  },
  optionTitle: {
    fontSize: 16,
    color: '#111827',
    fontWeight: '700',
    marginBottom: 4,
  },
  optionDate: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '400',
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#D1D5DB',
    backgroundColor: 'transparent',
  },
  arrowIcon: {
    fontSize: 18,
    color: '#6B7280',
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
    paddingTop: 20,
    paddingBottom: 15,
  },
  cancelButton: {
    flex: 1,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#D1D5DB',
    backgroundColor: '#FFFFFF',
    minHeight: 48,
  },
  cancelButtonText: {
    color: '#111827',
    fontSize: 16,
    fontWeight: '600',
  },
  applyButton: {
    flex: 1,
    backgroundColor: '#111827',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    minHeight: 48,
  },
  applyButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  // View Level Modal Styles
  viewLevelModal: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 20,
    paddingBottom: 20,
    paddingHorizontal: 20,
    height: 500,
  },
  viewLevelModalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },

  backArrow: {
    fontSize: 20,
    color: '#111827',
    fontWeight: '600',
  },
  viewLevelModalTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
    flex: 1,
    textAlign: 'center',
  },
  viewLevelOptions: {
    flex: 1,
    marginBottom: 30,
  },
  viewLevelOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
  },
  viewLevelOptionWithBorder: {
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  viewLevelContent: {
    flex: 1,
  },
  viewLevelTitle: {
    fontSize: 16,
    color: '#111827',
    fontWeight: '700',
    marginBottom: 4,
  },
  viewLevelSubtitle: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '400',
  },
  // Filter Modal Styles
  filterModal: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 20,
    paddingBottom: 20,
    paddingHorizontal: 20,
    height: 600,
  },
  filterModalTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
    textAlign: 'center',
    marginBottom: 20,
  },
  filterContent: {
    flex: 1,
    flexDirection: 'row',
  },
  filterTabsPanel: {
    width: 120,
    backgroundColor: '#F9FAFB',
    borderRightWidth: 1,
    borderRightColor: '#E5E7EB',
  },
  filterTab: {
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderLeftWidth: 3,
    borderLeftColor: 'transparent',
  },
  activeFilterTab: {
    backgroundColor: '#FFFFFF',
    borderLeftColor: '#111827',
  },
  filterTabText: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
  },
  activeFilterTabText: {
    color: '#111827',
    fontWeight: '600',
  },
  filterOptionsPanel: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  filterOptionsList: {
    flex: 1,
  },
  filterOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: '#D1D5DB',
    borderRadius: 4,
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkedCheckbox: {
    backgroundColor: '#111827',
    borderColor: '#111827',
  },
  checkmark: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  filterOptionText: {
    fontSize: 16,
    color: '#111827',
    fontWeight: '500',
  },
  filterModalActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
    paddingTop: 20,
    paddingBottom: 15,
  },
  clearAllButton: {
    flex: 1,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#D1D5DB',
    backgroundColor: 'transparent',
    minHeight: 48,
  },
  clearAllButtonText: {
    color: '#111827',
    fontSize: 16,
    fontWeight: '600',
  },
  applyFilterButton: {
    flex: 1,
    backgroundColor: '#111827',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    minHeight: 48,
  },
  applyFilterButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  // Reviews Screen Styles
  reviewsContainer: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  reviewsSummary: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  ratingBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#10B981',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    marginRight: 12,
  },
  ratingText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
    marginRight: 4,
  },
  ratingInfo: {
    flex: 1,
  },
  ratingCount: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 4,
  },
  viewDishRatings: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewDishText: {
    fontSize: 14,
    color: '#2563EB',
    fontWeight: '500',
  },
  arrowIcon: {
    fontSize: 14,
    color: '#2563EB',
    marginLeft: 4,
  },
  reviewsSearchContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    gap: 12,
  },
  searchInputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    height: 48,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  searchIconContainer: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
    borderRadius: 8,
  },
  searchIcon: {
    fontSize: 16,
    color: '#6B7280',
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#000000',
    fontWeight: '400',
    paddingVertical: 8,
    backgroundColor: 'transparent',
    minHeight: 20,
  },
  searchPlaceholder: {
    fontSize: 14,
    color: '#9CA3AF',
  },
  clearButton: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 16,
    backgroundColor: '#E5E7EB',
    marginLeft: 8,
  },
  clearButtonText: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '600',
  },
  debugContainer: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    backgroundColor: '#FEF3C7',
  },
  debugText: {
    fontSize: 12,
    color: '#92400E',
    fontWeight: '500',
  },
  // Dish Ratings Modal Styles
  modalContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },

  modalTitleContainer: {
    flex: 1,
    marginLeft: 12,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
  },
  modalSubtitle: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 2,
  },
  modalContent: {
    flex: 1,
    paddingHorizontal: 20,
  },
  dishRatingsTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#111827',
    marginTop: 20,
    marginBottom: 16,
  },
  sortContainer: {
    marginBottom: 20,
  },
  sortButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  sortIcon: {
    fontSize: 16,
    color: '#6B7280',
    marginRight: 8,
  },
  sortText: {
    flex: 1,
    fontSize: 16,
    color: '#111827',
    fontWeight: '500',
  },
  sortChevron: {
    fontSize: 12,
    color: '#6B7280',
  },
  dishItem: {
    paddingVertical: 16,
  },
  dishInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dishName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#111827',
    flex: 1,
  },
  dishRating: {
    alignItems: 'flex-end',
  },
  starsContainer: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  star: {
    fontSize: 16,
    color: '#F59E0B',
    marginRight: 2,
  },
  ratingsCount: {
    fontSize: 14,
    color: '#6B7280',
  },
  separator: {
    height: 1,
    backgroundColor: '#E5E7EB',
  },
  // Sort Modal Styles
  sortModalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  sortModalContainer: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingBottom: 40,
    position: 'relative',
  },
  dismissButton: {
    position: 'absolute',
    top: -20,
    left: '50%',
    marginLeft: -20,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
    zIndex: 1,
  },
  dismissButtonText: {
    fontSize: 18,
    color: '#000000',
    fontWeight: '600',
  },
  sortModalContent: {
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  sortModalTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#111827',
    textAlign: 'center',
    marginBottom: 24,
  },
  sortOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  sortOptionText: {
    fontSize: 16,
    color: '#111827',
    fontWeight: '500',
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#D1D5DB',
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioButtonSelected: {
    borderColor: '#000000',
  },
  radioButtonInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#000000',
  },
  applyButton: {
    backgroundColor: '#000000',
    borderRadius: 8,
    paddingVertical: 16,
    marginTop: 24,
    alignItems: 'center',
  },
  applyButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  // Reviews Filter Modal Styles
  filterModalContent: {
    flex: 1,
    paddingHorizontal: 20,
  },
  filterLayout: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 20,
  },
  filterCategoriesPanel: {
    width: '40%',
    borderRightWidth: 1,
    borderRightColor: '#E5E7EB',
  },
  filterCategory: {
    paddingVertical: 16,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  filterCategoryActive: {
    backgroundColor: '#F9FAFB',
    borderLeftWidth: 3,
    borderLeftColor: '#000000',
  },
  filterCategoryText: {
    fontSize: 16,
    color: '#6B7280',
    fontWeight: '500',
  },
  filterCategoryTextActive: {
    color: '#111827',
    fontWeight: '600',
  },
  filterOptionsPanel: {
    flex: 1,
    paddingLeft: 20,
  },
  filterOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  filterOptionText: {
    fontSize: 16,
    color: '#111827',
    fontWeight: '500',
  },
  filterActionButtons: {
    flexDirection: 'row',
    paddingVertical: 20,
    gap: 12,
  },
  resetButton: {
    flex: 1,
    paddingVertical: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    alignItems: 'center',
  },
  resetButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#6B7280',
  },
  applyFilterButton: {
    flex: 1,
    backgroundColor: '#000000',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  applyFilterButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  filterButton: {
    width: 48,
    height: 48,
    backgroundColor: '#F9FAFB',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  filterIcon: {
    fontSize: 18,
    color: '#6B7280',
  },
  reviewsListContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  reviewsListTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
    marginTop: 16,
    marginBottom: 12,
  },
  reviewsList: {
    paddingBottom: 20,
  },
  reviewCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  orderInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  orderText: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
  },
  orderArrow: {
    fontSize: 14,
    color: '#6B7280',
  },
  customerProfile: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  avatarContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  avatarText: {
    fontSize: 20,
  },
  customerInfo: {
    flex: 1,
  },
  customerNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
  },
  customerName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginRight: 8,
  },
  premiumBadge: {
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  premiumText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#92400E',
  },
  ordersCount: {
    fontSize: 12,
    color: '#6B7280',
  },
  ratingDateRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  ratingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  ratingGood: {
    backgroundColor: '#10B981',
  },
  ratingAverage: {
    backgroundColor: '#F59E0B',
  },
  ratingPoor: {
    backgroundColor: '#EF4444',
  },
  ratingNumber: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
    marginRight: 2,
  },
  ratingStar: {
    fontSize: 12,
    color: '#FFFFFF',
  },
  reviewDate: {
    fontSize: 12,
    color: '#6B7280',
  },
  reviewTextContainer: {
    marginBottom: 12,
  },
  reviewText: {
    fontSize: 14,
    color: '#111827',
    lineHeight: 20,
  },
  seeMoreText: {
    fontSize: 14,
    color: '#2563EB',
    fontWeight: '500',
    marginTop: 4,
  },
  customerImagesContainer: {
    marginBottom: 12,
  },
  customerImagesTitle: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 8,
  },
  imageThumbnail: {
    width: 60,
    height: 60,
    backgroundColor: '#F3F4F6',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imagePlaceholder: {
    fontSize: 24,
  },
  foodImage: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },
  replyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-end',
    backgroundColor: '#2563EB',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  replyButtonText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFFFFF',
    marginRight: 4,
  },
  replyArrow: {
    fontSize: 10,
    color: '#FFFFFF',
  },
  // Reply Modal Styles
  replyModal: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 20,
    paddingBottom: 20,
    paddingHorizontal: 20,
    height: 500,
  },
  replyModalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonText: {
    fontSize: 16,
    color: '#6B7280',
    fontWeight: '600',
  },
  replyModalTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
    flex: 1,
    textAlign: 'center',
  },
  reviewInfoContainer: {
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
  },
  reviewInfoHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  reviewCustomerName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  replyInputContainer: {
    marginBottom: 20,
  },
  replyLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 8,
  },
  replyTextInput: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    padding: 12,
    fontSize: 14,
    color: '#111827',
    minHeight: 100,
    backgroundColor: '#FFFFFF',
  },
  replyModalActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  cancelReplyButton: {
    flex: 1,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#D1D5DB',
    backgroundColor: '#FFFFFF',
    minHeight: 48,
  },
  cancelReplyButtonText: {
    color: '#111827',
    fontSize: 16,
    fontWeight: '600',
  },
  sendReplyButton: {
    flex: 1,
    backgroundColor: '#2563EB',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    minHeight: 48,
  },
  sendReplyButtonDisabled: {
    backgroundColor: '#9CA3AF',
    shadowOpacity: 0,
    elevation: 0,
  },
  sendReplyButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default FeedbackOverviewScreen; 