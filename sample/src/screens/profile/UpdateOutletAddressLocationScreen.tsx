import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView, Image } from 'react-native';

const UpdateOutletAddressLocationScreen: React.FC = () => {
  return (
    <SafeAreaView style={styles.container}>
      {/* Map Section */}
      <View style={styles.mapContainer}>
        {/* Real Map */}
        <View style={styles.mapPlaceholder}>
          {/* Real Map Image */}
          <Image 
            source={{ uri: 'https://staticmap.openstreetmap.de/staticmap.php?center=17.3850,78.4867&zoom=13&size=600x400&markers=17.3850,78.4867,red' }}
            style={styles.mapImage}
            resizeMode="cover"
          />
        </View>
        
        {/* Location Pin */}
        <View style={styles.locationPin}>
          <View style={styles.pinCircle} />
          <View style={styles.pinShadow} />
        </View>
        
        {/* Location Info Bubble */}
        <View style={styles.locationBubble}>
          <Text style={styles.bubbleTitle}>Your outlet location</Text>
          <Text style={styles.bubbleSubtitle}>Orders will be picked up from here</Text>
        </View>
      </View>

      {/* Outlet Address Card */}
      <View style={styles.addressCard}>
        <Text style={styles.addressCardTitle}>Outlet address</Text>
        <Text style={styles.addressCardDescription}>
          Customers and Zomato delivery partners will use this to locate your outlet
        </Text>
        <Text style={styles.addressText}>
          21326933, Hyderabad, Hyderabad, Telangana - 500001, Hyderabad, Telangana
        </Text>
      </View>

      {/* Bottom Action Button */}
      <View style={styles.bottomButtonContainer}>
        <TouchableOpacity style={styles.updateButton}>
          <Text style={styles.updateButtonText}>Update</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  
  // Map Section
  mapContainer: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    position: 'relative',
  },
  mapPlaceholder: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  mapImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  locationPin: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginLeft: -8,
    marginTop: -20,
  },
  pinCircle: {
    width: 16,
    height: 16,
    backgroundColor: '#FF0000',
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#FFFFFF',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  pinShadow: {
    position: 'absolute',
    top: 18,
    left: 4,
    width: 8,
    height: 4,
    backgroundColor: '#000000',
    borderRadius: 4,
    opacity: 0.2,
  },
  locationBubble: {
    position: 'absolute',
    top: '45%',
    left: '50%',
    marginLeft: -80,
    backgroundColor: '#000000',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    maxWidth: 160,
  },
  bubbleTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  bubbleSubtitle: {
    fontSize: 10,
    color: '#FFFFFF',
    textAlign: 'center',
    opacity: 0.8,
  },
  
  // Address Card
  addressCard: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  addressCardTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#212121',
    marginBottom: 8,
  },
  addressCardDescription: {
    fontSize: 14,
    color: '#757575',
    marginBottom: 16,
    lineHeight: 20,
  },
  addressText: {
    fontSize: 14,
    color: '#212121',
    lineHeight: 20,
  },
  
  // Bottom Button
  bottomButtonContainer: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  updateButton: {
    backgroundColor: '#000000',
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  updateButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});

export default UpdateOutletAddressLocationScreen; 