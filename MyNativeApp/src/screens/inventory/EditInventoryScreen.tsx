import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Alert,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { theme } from '../../theme';
import { Input } from '../../components/common/Input';
import { Button } from '../../components/common/Button';
import { Card } from '../../components/common/Card';

const EditInventoryScreen: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { itemId } = route.params as { itemId: string };

  const [formData, setFormData] = useState({
    name: '',
    quantity: '',
    unit: '',
    category: '',
    description: '',
  });

  // Mock data - in real app, fetch from API
  const mockItem = {
    id: itemId,
    name: 'Tomatoes',
    quantity: '50',
    unit: 'kg',
    category: 'Vegetables',
    description: 'Fresh red tomatoes',
  };

  useEffect(() => {
    // Load item data
    setFormData({
      name: mockItem.name,
      quantity: mockItem.quantity,
      unit: mockItem.unit,
      category: mockItem.category,
      description: mockItem.description,
    });
  }, [itemId]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = () => {
    // Validate form
    if (!formData.name || !formData.quantity || !formData.unit || !formData.category) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    // Here you would typically update to your backend
    Alert.alert(
      'Success',
      'Inventory item updated successfully!',
      [
        {
          text: 'OK',
          onPress: () => navigation.goBack(),
        },
      ]
    );
  };

  const handleDelete = () => {
    Alert.alert(
      'Delete Item',
      'Are you sure you want to delete this item?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            // Here you would typically delete from your backend
            Alert.alert('Success', 'Item deleted successfully!', [
              {
                text: 'OK',
                onPress: () => navigation.goBack(),
              },
            ]);
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.content}>
        <Card style={styles.formCard}>
          <Text style={styles.sectionTitle}>Edit Item</Text>

          <Input
            label="Item Name *"
            value={formData.name}
            onChangeText={(text) => handleInputChange('name', text)}
            placeholder="Enter item name"
            required
          />

          <View style={styles.row}>
            <View style={styles.halfWidth}>
              <Input
                label="Quantity *"
                value={formData.quantity}
                onChangeText={(text) => handleInputChange('quantity', text)}
                placeholder="0"
                keyboardType="numeric"
                required
              />
            </View>
            <View style={styles.halfWidth}>
              <Input
                label="Unit *"
                value={formData.unit}
                onChangeText={(text) => handleInputChange('unit', text)}
                placeholder="kg"
                required
              />
            </View>
          </View>

          <Input
            label="Category *"
            value={formData.category}
            onChangeText={(text) => handleInputChange('category', text)}
            placeholder="Select category"
            required
          />

          <Input
            label="Description"
            value={formData.description}
            onChangeText={(text) => handleInputChange('description', text)}
            placeholder="Enter item description"
            multiline
            numberOfLines={3}
          />

          <View style={styles.buttonContainer}>
            <Button
              title="Cancel"
              onPress={() => navigation.goBack()}
              variant="outline"
              style={styles.cancelButton}
            />
            <Button
              title="Update Item"
              onPress={handleSubmit}
              style={styles.submitButton}
            />
          </View>

          <Button
            title="Delete Item"
            onPress={handleDelete}
            variant="outline"
            style={styles.deleteButton}
            textStyle={styles.deleteButtonText}
          />
        </Card>

        <Card style={styles.infoCard}>
          <Text style={styles.infoTitle}>Item Information</Text>
          <Text style={styles.infoText}>Item ID: {itemId}</Text>
          <Text style={styles.infoText}>Last Updated: 2 hours ago</Text>
          <Text style={styles.infoText}>Created: 3 days ago</Text>
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  formCard: {
    marginBottom: 20,
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: theme.colors.textPrimary,
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  halfWidth: {
    width: '48%',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    marginBottom: 15,
  },
  cancelButton: {
    flex: 1,
    marginRight: 10,
  },
  submitButton: {
    flex: 1,
    marginLeft: 10,
  },
  deleteButton: {
    borderColor: theme.colors.error,
  },
  deleteButtonText: {
    color: theme.colors.error,
  },
  infoCard: {
    padding: 15,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.textPrimary,
    marginBottom: 10,
  },
  infoText: {
    fontSize: 12,
    color: theme.colors.textSecondary,
    marginBottom: 5,
  },
});

export default EditInventoryScreen; 