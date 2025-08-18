import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { theme } from '../../theme';
import { InventoryStackParamList } from '../../navigation/InventoryNavigator';

type EditInventoryScreenNavigationProp = StackNavigationProp<
  InventoryStackParamList,
  'EditInventory'
>;

type EditInventoryScreenRouteProp = RouteProp<
  InventoryStackParamList,
  'EditInventory'
>;

const EditInventoryScreen: React.FC = () => {
  const navigation = useNavigation<EditInventoryScreenNavigationProp>();
  const route = useRoute<EditInventoryScreenRouteProp>();
  const { itemId } = route.params;

  const [itemName, setItemName] = useState('Chicken Biryani');
  const [quantity, setQuantity] = useState('25');
  const [category, setCategory] = useState('Main Course');
  const [price, setPrice] = useState('299');
  const [description, setDescription] = useState('Delicious chicken biryani with aromatic spices');

  const handleSave = () => {
    if (!itemName.trim() || !quantity.trim() || !category.trim()) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    Alert.alert('Success', 'Item updated successfully!', [
      {
        text: 'OK',
        onPress: () => navigation.goBack(),
      },
    ]);
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
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Edit Item</Text>
        <Text style={styles.subtitle}>Update item details</Text>
      </View>

      <View style={styles.form}>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Item Name *</Text>
          <TextInput
            style={styles.input}
            value={itemName}
            onChangeText={setItemName}
            placeholder="Enter item name"
            placeholderTextColor={theme.colors.textSecondary}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Category *</Text>
          <TextInput
            style={styles.input}
            value={category}
            onChangeText={setCategory}
            placeholder="Enter category"
            placeholderTextColor={theme.colors.textSecondary}
          />
        </View>

        <View style={styles.row}>
          <View style={[styles.inputGroup, { flex: 1, marginRight: 10 }]}>
            <Text style={styles.label}>Quantity *</Text>
            <TextInput
              style={styles.input}
              value={quantity}
              onChangeText={setQuantity}
              placeholder="0"
              keyboardType="numeric"
              placeholderTextColor={theme.colors.textSecondary}
            />
          </View>

          <View style={[styles.inputGroup, { flex: 1, marginLeft: 10 }]}>
            <Text style={styles.label}>Price</Text>
            <TextInput
              style={styles.input}
              value={price}
              onChangeText={setPrice}
              placeholder="₹0.00"
              keyboardType="numeric"
              placeholderTextColor={theme.colors.textSecondary}
            />
          </View>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Description</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            value={description}
            onChangeText={setDescription}
            placeholder="Enter item description"
            multiline
            numberOfLines={4}
            textAlignVertical="top"
            placeholderTextColor={theme.colors.textSecondary}
          />
        </View>
      </View>

      <View style={styles.actions}>
        <TouchableOpacity
          style={[styles.button, styles.deleteButton]}
          onPress={handleDelete}
        >
          <Text style={styles.deleteButtonText}>Delete</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.cancelButton]}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.cancelButtonText}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.saveButton]}
          onPress={handleSave}
        >
          <Text style={styles.saveButtonText}>Save Changes</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background.default,
  },
  header: {
    padding: 20,
    backgroundColor: theme.colors.primary,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.colors.text.inverse,
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: theme.colors.text.inverse,
    opacity: 0.8,
  },
  form: {
    padding: 20,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.text.primary,
    marginBottom: 8,
  },
  input: {
    backgroundColor: theme.colors.background.paper,
    borderWidth: 1,
    borderColor: theme.colors.border.light,
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
    color: theme.colors.text.primary,
  },
  textArea: {
    height: 100,
    paddingTop: 12,
  },
  row: {
    flexDirection: 'row',
  },
  actions: {
    flexDirection: 'row',
    padding: 20,
    gap: 10,
  },
  button: {
    flex: 1,
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  deleteButton: {
    backgroundColor: theme.colors.error.main,
  },
  deleteButtonText: {
    color: theme.colors.text.inverse,
    fontSize: 16,
    fontWeight: '600',
  },
  cancelButton: {
    backgroundColor: theme.colors.background.default,
    borderWidth: 1,
    borderColor: theme.colors.border.light,
  },
  cancelButtonText: {
    color: theme.colors.text.primary,
    fontSize: 16,
    fontWeight: '600',
  },
  saveButton: {
    backgroundColor: theme.colors.primary,
  },
  saveButtonText: {
    color: theme.colors.text.inverse,
    fontSize: 16,
    fontWeight: '600',
  },
});

export default EditInventoryScreen; 