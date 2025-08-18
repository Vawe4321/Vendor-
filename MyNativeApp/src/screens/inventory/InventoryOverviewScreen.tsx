import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import { theme } from '../../theme';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';

const InventoryOverviewScreen: React.FC = () => {
  const navigation = useNavigation();

  const mockInventoryItems = [
    {
      id: '1',
      name: 'Tomatoes',
      quantity: 50,
      unit: 'kg',
      category: 'Vegetables',
      lastUpdated: '2 hours ago',
      status: 'in-stock',
    },
    {
      id: '2',
      name: 'Onions',
      quantity: 25,
      unit: 'kg',
      category: 'Vegetables',
      lastUpdated: '1 day ago',
      status: 'low-stock',
    },
    {
      id: '3',
      name: 'Rice',
      quantity: 100,
      unit: 'kg',
      category: 'Grains',
      lastUpdated: '3 days ago',
      status: 'in-stock',
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'in-stock':
        return theme.colors.success;
      case 'low-stock':
        return theme.colors.warning;
      case 'out-of-stock':
        return theme.colors.error;
      default:
        return theme.colors.textSecondary;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'in-stock':
        return 'In Stock';
      case 'low-stock':
        return 'Low Stock';
      case 'out-of-stock':
        return 'Out of Stock';
      default:
        return 'Unknown';
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Inventory</Text>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigation.navigate('AddInventory' as never)}
        >
          <Icon name="add" size={24} color={theme.colors.white} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.statsContainer}>
          <Card style={styles.statCard}>
            <Text style={styles.statNumber}>150</Text>
            <Text style={styles.statLabel}>Total Items</Text>
          </Card>
          <Card style={styles.statCard}>
            <Text style={styles.statNumber}>25</Text>
            <Text style={styles.statLabel}>Low Stock</Text>
          </Card>
          <Card style={styles.statCard}>
            <Text style={styles.statNumber}>5</Text>
            <Text style={styles.statLabel}>Out of Stock</Text>
          </Card>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Items</Text>
          {mockInventoryItems.map((item) => (
            <Card key={item.id} style={styles.itemCard}>
              <View style={styles.itemHeader}>
                <Text style={styles.itemName}>{item.name}</Text>
                <View
                  style={[
                    styles.statusBadge,
                    { backgroundColor: getStatusColor(item.status) },
                  ]}
                >
                  <Text style={styles.statusText}>
                    {getStatusText(item.status)}
                  </Text>
                </View>
              </View>
              <View style={styles.itemDetails}>
                <Text style={styles.itemQuantity}>
                  {item.quantity} {item.unit}
                </Text>
                <Text style={styles.itemCategory}>{item.category}</Text>
                <Text style={styles.itemUpdated}>
                  Updated: {item.lastUpdated}
                </Text>
              </View>
              <TouchableOpacity
                style={styles.editButton}
                onPress={() =>
                  navigation.navigate('EditInventory' as never, {
                    itemId: item.id,
                  } as never)
                }
              >
                <Icon name="edit" size={16} color={theme.colors.primary} />
                <Text style={styles.editText}>Edit</Text>
              </TouchableOpacity>
            </Card>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: theme.colors.white,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.colors.textPrimary,
  },
  addButton: {
    backgroundColor: theme.colors.primary,
    borderRadius: 25,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  statCard: {
    flex: 1,
    marginHorizontal: 5,
    padding: 15,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
  statLabel: {
    fontSize: 12,
    color: theme.colors.textSecondary,
    marginTop: 5,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.colors.textPrimary,
    marginBottom: 15,
  },
  itemCard: {
    marginBottom: 15,
    padding: 15,
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  itemName: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.textPrimary,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 10,
    color: theme.colors.white,
    fontWeight: '500',
  },
  itemDetails: {
    marginBottom: 10,
  },
  itemQuantity: {
    fontSize: 14,
    color: theme.colors.textPrimary,
    marginBottom: 5,
  },
  itemCategory: {
    fontSize: 12,
    color: theme.colors.textSecondary,
    marginBottom: 5,
  },
  itemUpdated: {
    fontSize: 11,
    color: theme.colors.textSecondary,
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-end',
  },
  editText: {
    fontSize: 12,
    color: theme.colors.primary,
    marginLeft: 5,
  },
});

export default InventoryOverviewScreen; 