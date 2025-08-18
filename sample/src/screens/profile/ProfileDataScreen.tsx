import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { mockProfileData } from '../../utils/mockData';
import { logout } from '../../store/slices/authSlice';

const ProfileDataScreen: React.FC = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const handleBackPress = () => {
    navigation.goBack();
  };

  const handleEditProfile = () => {
    Alert.alert('Edit Profile', 'Edit profile functionality would be implemented here');
  };

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout? You will be redirected to the login page.',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: () => {
            console.log('Logging out user from profile screen');
            dispatch(logout());
          },
        },
      ]
    );
  };

  const handleAchievementPress = (achievement: any) => {
    Alert.alert(
      achievement.title,
      `${achievement.description}\n\nEarned on: ${new Date(achievement.earnedDate).toLocaleDateString()}`,
      [{ text: 'OK' }]
    );
  };

  const handleActivityPress = (activity: any) => {
    Alert.alert(
      activity.title,
      `${activity.description}\n\nTime: ${new Date(activity.timestamp).toLocaleString()}`,
      [{ text: 'OK' }]
    );
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    if (diffInHours < 168) return `${Math.floor(diffInHours / 24)}d ago`;
    return date.toLocaleDateString();
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
          <Icon name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Profile</Text>
        <TouchableOpacity style={styles.editButton} onPress={handleEditProfile}>
          <Icon name="edit" size={24} color="#007AFF" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Profile Card */}
        <View style={styles.profileCard}>
          <View style={styles.profileImageContainer}>
            <Icon name="person" size={60} color="#666" />
          </View>
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>{mockProfileData.userInfo.name}</Text>
            <Text style={styles.profileRole}>{mockProfileData.userInfo.role}</Text>
            <Text style={styles.profileRestaurant}>{mockProfileData.userInfo.restaurantName}</Text>
            <Text style={styles.profileLocation}>{mockProfileData.userInfo.location}</Text>
          </View>
        </View>

        {/* Statistics */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Statistics</Text>
          <View style={styles.statsGrid}>
            <View style={styles.statCard}>
              <Icon name="receipt" size={24} color="#007AFF" />
              <Text style={styles.statValue}>{mockProfileData.statistics.totalOrders}</Text>
              <Text style={styles.statLabel}>Total Orders</Text>
            </View>
            <View style={styles.statCard}>
              <Icon name="account-balance-wallet" size={24} color="#4CAF50" />
              <Text style={styles.statValue}>{mockProfileData.statistics.totalRevenue}</Text>
              <Text style={styles.statLabel}>Total Revenue</Text>
            </View>
            <View style={styles.statCard}>
              <Icon name="star" size={24} color="#FF9800" />
              <Text style={styles.statValue}>{mockProfileData.statistics.averageRating}</Text>
              <Text style={styles.statLabel}>Avg Rating</Text>
            </View>
            <View style={styles.statCard}>
              <Icon name="chat-bubble" size={24} color="#9C27B0" />
              <Text style={styles.statValue}>{mockProfileData.statistics.totalReviews}</Text>
              <Text style={styles.statLabel}>Reviews</Text>
            </View>
          </View>
        </View>

        {/* Achievements */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Achievements</Text>
          {mockProfileData.achievements.map((achievement) => (
            <TouchableOpacity
              key={achievement.id}
              style={styles.achievementCard}
              onPress={() => handleAchievementPress(achievement)}
            >
              <View style={styles.achievementIcon}>
                <Icon name={achievement.icon as any} size={24} color="#FFD700" />
              </View>
              <View style={styles.achievementInfo}>
                <Text style={styles.achievementTitle}>{achievement.title}</Text>
                <Text style={styles.achievementDescription}>{achievement.description}</Text>
                <Text style={styles.achievementDate}>
                  Earned on {new Date(achievement.earnedDate).toLocaleDateString()}
                </Text>
              </View>
              <Icon name="chevron-right" size={20} color="#666" />
            </TouchableOpacity>
          ))}
        </View>

        {/* Recent Activity */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Activity</Text>
          {mockProfileData.recentActivity.map((activity) => (
            <TouchableOpacity
              key={activity.id}
              style={styles.activityCard}
              onPress={() => handleActivityPress(activity)}
            >
              <View style={styles.activityIcon}>
                <Icon name={activity.icon as any} size={20} color="#007AFF" />
              </View>
              <View style={styles.activityInfo}>
                <Text style={styles.activityTitle}>{activity.title}</Text>
                <Text style={styles.activityDescription}>{activity.description}</Text>
                <Text style={styles.activityTime}>{formatDate(activity.timestamp)}</Text>
              </View>
              <Icon name="chevron-right" size={16} color="#666" />
            </TouchableOpacity>
          ))}
        </View>

        {/* Contact Information */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Contact Information</Text>
          <View style={styles.contactCard}>
            <View style={styles.contactRow}>
              <Icon name="email" size={20} color="#666" />
              <Text style={styles.contactText}>{mockProfileData.userInfo.email}</Text>
            </View>
            <View style={styles.contactRow}>
              <Icon name="phone" size={20} color="#666" />
              <Text style={styles.contactText}>{mockProfileData.userInfo.phone}</Text>
            </View>
            <View style={styles.contactRow}>
              <Icon name="schedule" size={20} color="#666" />
              <Text style={styles.contactText}>
                Member since {new Date(mockProfileData.userInfo.joinDate).toLocaleDateString()}
              </Text>
            </View>
          </View>
        </View>

        {/* Preferences */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Preferences</Text>
          <View style={styles.preferencesCard}>
            <View style={styles.preferenceRow}>
              <Text style={styles.preferenceLabel}>Language</Text>
              <Text style={styles.preferenceValue}>{mockProfileData.preferences.language}</Text>
            </View>
            <View style={styles.preferenceRow}>
              <Text style={styles.preferenceLabel}>Timezone</Text>
              <Text style={styles.preferenceValue}>{mockProfileData.preferences.timezone}</Text>
            </View>
            <View style={styles.preferenceRow}>
              <Text style={styles.preferenceLabel}>Currency</Text>
              <Text style={styles.preferenceValue}>{mockProfileData.preferences.currency}</Text>
            </View>
          </View>
        </View>

        {/* Logout Section */}
        <View style={styles.section}>
          <TouchableOpacity 
            style={styles.logoutButton}
            onPress={handleLogout}
          >
            <Icon name="logout" size={20} color="#F44336" />
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  backButton: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  editButton: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  profileCard: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    marginTop: 16,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  profileImageContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  profileRole: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  profileRestaurant: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 2,
  },
  profileLocation: {
    fontSize: 14,
    color: '#666',
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  statCard: {
    backgroundColor: '#fff',
    width: '48%',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 8,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  achievementCard: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  achievementIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#FFF8E1',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  achievementInfo: {
    flex: 1,
  },
  achievementTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  achievementDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  achievementDate: {
    fontSize: 12,
    color: '#999',
  },
  activityCard: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  activityIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#E3F2FD',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  activityInfo: {
    flex: 1,
  },
  activityTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  activityDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  activityTime: {
    fontSize: 12,
    color: '#999',
  },
  contactCard: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  contactRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  contactText: {
    fontSize: 14,
    color: '#333',
    marginLeft: 12,
  },
  preferencesCard: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  preferenceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  preferenceLabel: {
    fontSize: 14,
    color: '#333',
  },
  preferenceValue: {
    fontSize: 14,
    color: '#666',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingVertical: 16,
    paddingHorizontal: 16,
    marginTop: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#F44336',
    marginLeft: 8,
  },
});

export default ProfileDataScreen;
