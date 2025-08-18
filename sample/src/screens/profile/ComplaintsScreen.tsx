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

const ComplaintsScreen: React.FC = () => {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');

  const handleBackPress = () => {
    navigation.goBack();
  };

  const handleSearchPress = () => {
    console.log('Search pressed');
  };

  const complaints = [
    {
      id: 'COMP001',
      title: 'Order delayed',
      customer: 'John Doe',
      date: '31 July 2024',
      status: 'Resolved',
      priority: 'High'
    },
    {
      id: 'COMP002',
      title: 'Wrong item delivered',
      customer: 'Jane Smith',
      date: '30 July 2024',
      status: 'In Progress',
      priority: 'Medium'
    },
    {
      id: 'COMP003',
      title: 'Food quality issue',
      customer: 'Mike Johnson',
      date: '29 July 2024',
      status: 'Resolved',
      priority: 'Low'
    },
    {
      id: 'COMP004',
      title: 'Delivery person rude',
      customer: 'Sarah Wilson',
      date: '28 July 2024',
      status: 'Pending',
      priority: 'High'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Resolved':
        return '#4CAF50';
      case 'In Progress':
        return '#FF9800';
      case 'Pending':
        return '#F44336';
      default:
        return '#666';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High':
        return '#F44336';
      case 'Medium':
        return '#FF9800';
      case 'Low':
        return '#4CAF50';
      default:
        return '#666';
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
          <Icon name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Complaints</Text>
        <TouchableOpacity style={styles.searchButton} onPress={handleSearchPress}>
          <Icon name="search" size={24} color="#000" />
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <Icon name="search" size={20} color="#666" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search complaints..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>

      {/* Stats Cards */}
      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>12</Text>
          <Text style={styles.statLabel}>Total</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>3</Text>
          <Text style={styles.statLabel}>Pending</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>8</Text>
          <Text style={styles.statLabel}>Resolved</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>1</Text>
          <Text style={styles.statLabel}>In Progress</Text>
        </View>
      </View>

      {/* Complaints List */}
      <ScrollView style={styles.complaintsList} showsVerticalScrollIndicator={false}>
        {complaints.map((complaint) => (
          <TouchableOpacity key={complaint.id} style={styles.complaintCard}>
            <View style={styles.complaintHeader}>
              <View style={styles.complaintInfo}>
                <Text style={styles.complaintId}>#{complaint.id}</Text>
                <Text style={styles.complaintTitle}>{complaint.title}</Text>
              </View>
              <View style={[styles.statusBadge, { backgroundColor: getStatusColor(complaint.status) }]}>
                <Text style={styles.statusText}>{complaint.status}</Text>
              </View>
            </View>
            
            <View style={styles.complaintDetails}>
              <View style={styles.detailRow}>
                <Icon name="person" size={16} color="#666" />
                <Text style={styles.detailText}>{complaint.customer}</Text>
              </View>
              <View style={styles.detailRow}>
                <Icon name="calendar-today" size={16} color="#666" />
                <Text style={styles.detailText}>{complaint.date}</Text>
              </View>
              <View style={styles.detailRow}>
                <Icon name="priority-high" size={16} color={getPriorityColor(complaint.priority)} />
                <Text style={[styles.detailText, { color: getPriorityColor(complaint.priority) }]}>
                  {complaint.priority} Priority
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  backButton: {
    padding: 5,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    flex: 1,
    textAlign: 'center',
  },
  searchButton: {
    padding: 5,
  },
  searchContainer: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#FFFFFF',
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    paddingHorizontal: 12,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 16,
    color: '#000',
  },
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  statCard: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
  },
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  complaintsList: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 15,
  },
  complaintCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 1,
    shadowRadius: 2,
    elevation: 2,
  },
  complaintHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  complaintInfo: {
    flex: 1,
  },
  complaintId: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  complaintTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  complaintDetails: {
    gap: 8,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 8,
  },
});

export default ComplaintsScreen;
