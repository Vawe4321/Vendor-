import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  TextInput,
} from 'react-native';

const DishRatingsScreen: React.FC = () => {
  const [selectedSort, setSelectedSort] = useState('Best rated first');
  const [showSortModal, setShowSortModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

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
    {
      id: '5',
      name: 'Veg Biryani',
      rating: 4.0,
      ratingsCount: 12,
    },
    {
      id: '6',
      name: 'Mutton Biryani',
      rating: 4.2,
      ratingsCount: 15,
    },
  ];

  const sortOptions = [
    'Best rated first',
    'Most rated first',
    'Alphabetical',
    'Price: Low to High',
    'Price: High to Low',
  ];

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push('★');
      } else if (i === fullStars && hasHalfStar) {
        stars.push('☆');
      } else {
        stars.push('☆');
      }
    }
    return stars.join('');
  };

  const filteredDishes = dishesData.filter(dish =>
    dish.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderDishItem = ({ item }: { item: any }) => (
    <View style={styles.dishItem}>
      <View style={styles.dishInfo}>
        <Text style={styles.dishName}>{item.name}</Text>
        <View style={styles.ratingContainer}>
          <Text style={styles.stars}>{renderStars(item.rating)}</Text>
          <Text style={styles.ratingsCount}>{item.ratingsCount} ratings</Text>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}>
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>
        <View style={styles.headerContent}>
          <Text style={styles.restaurantName}>Grooso's Kitchen</Text>
          <Text style={styles.restaurantChevron}>▼</Text>
        </View>
        <View style={styles.headerInfo}>
          <Text style={styles.restaurantId}>ID: 21781923 • Hyderabad</Text>
        </View>
      </View>

      {/* Title */}
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Dish level ratings</Text>
      </View>

             {/* Search Bar */}
       <View style={styles.searchContainer}>
         <View style={styles.searchInputContainer}>
           <TouchableOpacity 
             style={styles.searchIconContainer}
             onPress={() => {
               // Focus the search input
               console.log('Search icon pressed');
             }}
           >
             <Text style={styles.searchIcon}>🔍</Text>
           </TouchableOpacity>
           <TextInput
             style={styles.searchInput}
             placeholder="Search dishes..."
             placeholderTextColor="#9CA3AF"
             value={searchQuery}
             onChangeText={setSearchQuery}
           />
         </View>
       </View>

             {/* Sort Filter */}
       <View style={styles.sortContainer}>
         <TouchableOpacity 
           style={styles.sortButton}
           onPress={() => setShowSortModal(true)}
           activeOpacity={0.7}
         >
           <Text style={styles.sortIcon}>☰</Text>
           <Text style={styles.sortText}>{selectedSort}</Text>
           <Text style={styles.sortChevron}>▼</Text>
         </TouchableOpacity>
       </View>

      {/* Dishes List */}
      <FlatList
        data={filteredDishes}
        keyExtractor={(item) => item.id}
        renderItem={renderDishItem}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.dishesList}
      />

      {/* Sort Modal */}
      {showSortModal && (
        <View style={styles.modalOverlay}>
          <View style={styles.sortModal}>
            <Text style={styles.sortModalTitle}>Sort by</Text>
            <View style={styles.sortOptions}>
              {sortOptions.map((option) => (
                <TouchableOpacity
                  key={option}
                  style={[
                    styles.sortOption,
                    selectedSort === option && styles.selectedSortOption
                  ]}
                  onPress={() => {
                    setSelectedSort(option);
                    setShowSortModal(false);
                  }}
                >
                  <Text style={[
                    styles.sortOptionText,
                    selectedSort === option && styles.selectedSortOptionText
                  ]}>
                    {option}
                  </Text>
                  {selectedSort === option && (
                    <Text style={styles.checkmark}>✓</Text>
                  )}
                </TouchableOpacity>
              ))}
            </View>
            <TouchableOpacity 
              style={styles.cancelButton}
              onPress={() => setShowSortModal(false)}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  backArrow: {
    fontSize: 20,
    color: '#111827',
    fontWeight: '600',
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
  },
  restaurantName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
    marginRight: 8,
  },
  restaurantChevron: {
    fontSize: 12,
    color: '#6B7280',
  },
  headerInfo: {
    alignItems: 'center',
  },
  restaurantId: {
    fontSize: 12,
    color: '#6B7280',
  },
  titleContainer: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#111827',
  },
  searchContainer: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
     searchInputContainer: {
     flexDirection: 'row',
     alignItems: 'center',
     backgroundColor: '#F9FAFB',
     borderRadius: 8,
     paddingHorizontal: 12,
     paddingVertical: 10,
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
    fontSize: 14,
    color: '#111827',
  },
  sortContainer: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
  },
     sortButton: {
     flexDirection: 'row',
     alignItems: 'center',
     backgroundColor: '#FFFFFF',
     borderRadius: 8,
     paddingHorizontal: 12,
     paddingVertical: 10,
     borderWidth: 1,
     borderColor: '#E5E7EB',
     shadowColor: '#000',
     shadowOffset: { width: 0, height: 1 },
     shadowOpacity: 0.05,
     shadowRadius: 2,
     elevation: 1,
   },
  sortIcon: {
    fontSize: 16,
    color: '#6B7280',
    marginRight: 8,
  },
  sortText: {
    flex: 1,
    fontSize: 14,
    color: '#111827',
    fontWeight: '500',
  },
  sortChevron: {
    fontSize: 12,
    color: '#6B7280',
  },
  dishesList: {
    paddingHorizontal: 20,
    paddingTop: 8,
  },
  dishItem: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  dishInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dishName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    flex: 1,
  },
  ratingContainer: {
    alignItems: 'flex-end',
  },
  stars: {
    fontSize: 16,
    color: '#F59E0B',
    marginBottom: 2,
  },
  ratingsCount: {
    fontSize: 12,
    color: '#6B7280',
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
  sortModal: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 20,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  sortModalTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
    textAlign: 'center',
    marginBottom: 20,
  },
  sortOptions: {
    marginBottom: 20,
  },
  sortOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  selectedSortOption: {
    backgroundColor: '#F3F4F6',
  },
  sortOptionText: {
    fontSize: 16,
    color: '#111827',
    fontWeight: '500',
  },
  selectedSortOptionText: {
    color: '#2563EB',
    fontWeight: '600',
  },
  checkmark: {
    fontSize: 16,
    color: '#2563EB',
    fontWeight: 'bold',
  },
  cancelButton: {
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#D1D5DB',
    backgroundColor: '#FFFFFF',
  },
  cancelButtonText: {
    color: '#111827',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default DishRatingsScreen; 