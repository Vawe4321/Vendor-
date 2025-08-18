import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { theme } from '../../theme';
import { Input } from '../../components/common/Input';
import { Button } from '../../components/common/Button';
import { Card } from '../../components/common/Card';

const AddInventoryScreen: React.FC = () => {
  const navigation = useNavigation();
  const [formData, setFormData] = useState({
    name: '',
    quantity: '',
    unit: '',
    category: '',
    description: '',
  });

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

    // Here you would typically save to your backend
    Alert.alert(
      'Success',
      'Inventory item added successfully!',
      [
        {
          text: 'OK',
          onPress: () => navigation.goBack(),
        },
      ]
    );
  };

  const categories = [
    'Vegetables',
    'Fruits',
    'Grains',
    'Dairy',
    'Meat',
    'Spices',
    'Beverages',
    'Others',
  ];

  const units = [
    'kg',
    'g',
    'l',
    'ml',
    'pieces',
    'dozen',
    'pack',
    'bottle',
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.content}>
        <Card style={styles.formCard}>
          <Text style={styles.sectionTitle}>Add New Item</Text>

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
              title="Add Item"
              onPress={handleSubmit}
              style={styles.submitButton}
            />
          </View>
        </Card>

        <Card style={styles.helpCard}>
          <Text style={styles.helpTitle}>Quick Add Options</Text>
          <Text style={styles.helpText}>
            • Use common units like kg, g, l, ml, pieces
          </Text>
          <Text style={styles.helpText}>
            • Categories help organize your inventory
          </Text>
          <Text style={styles.helpText}>
            • Add descriptions for better tracking
          </Text>
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
  },
  cancelButton: {
    flex: 1,
    marginRight: 10,
  },
  submitButton: {
    flex: 1,
    marginLeft: 10,
  },
  helpCard: {
    padding: 15,
  },
  helpTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.textPrimary,
    marginBottom: 10,
  },
  helpText: {
    fontSize: 12,
    color: theme.colors.textSecondary,
    marginBottom: 5,
  },
});

export default AddInventoryScreen; 