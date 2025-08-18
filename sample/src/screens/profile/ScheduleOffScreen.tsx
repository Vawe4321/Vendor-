import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Modal,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { theme } from '../../theme';
import { SPACING, FONT_SIZES, BORDER_RADIUS, SHADOWS } from '../../utils/responsive';

interface ReasonOption {
  id: string;
  title: string;
  icon: string;
}

const ScheduleOffScreen: React.FC = () => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(true);
  const [selectedReason, setSelectedReason] = useState('permanently-shut');

  const reasons: ReasonOption[] = [
    { id: 'renovation', title: 'Renovation or relocation of restaurant', icon: 'location-on' },
    { id: 'festival', title: 'Closed due to festival', icon: 'star' },
    { id: 'permanently-shut', title: 'Permanently shut', icon: 'lock' },
    { id: 'staff-issues', title: 'Staff availablility issues', icon: 'people' },
    { id: 'out-of-station', title: 'Going out of station', icon: 'directions-bus' },
    { id: 'other', title: 'Other', icon: 'warning' },
  ];

  const handleBackPress = () => {
    navigation.navigate('Hub', { screen: 'ExploreMore' });
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    handleBackPress();
  };

  const handleContinue = () => {
    // Handle the continue action
    console.log('Selected reason:', selectedReason);
    setModalVisible(false);
    handleBackPress();
  };

  const handleBack = () => {
    setModalVisible(false);
    handleBackPress();
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={handleCloseModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {/* Close Button */}
            <TouchableOpacity
              style={styles.closeButton}
              onPress={handleCloseModal}
            >
              <Icon name="close" size={20} color={theme.colors.text.primary} />
            </TouchableOpacity>

            {/* Title */}
            <Text style={styles.modalTitle}>Reason for scheduling time off</Text>

            {/* Reasons List */}
            <ScrollView style={styles.reasonsList} showsVerticalScrollIndicator={false}>
              {reasons.map((reason) => (
                <TouchableOpacity
                  key={reason.id}
                  style={styles.reasonItem}
                  onPress={() => setSelectedReason(reason.id)}
                >
                  <View style={styles.reasonContent}>
                    <Icon 
                      name={reason.icon} 
                      size={24} 
                      color={theme.colors.text.secondary} 
                    />
                    <Text style={styles.reasonText}>{reason.title}</Text>
                  </View>
                  <View style={styles.radioContainer}>
                    <View style={[
                      styles.radioButton,
                      selectedReason === reason.id && styles.radioButtonSelected
                    ]}>
                      {selectedReason === reason.id && (
                        <View style={styles.radioButtonInner} />
                      )}
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>

            {/* Action Buttons */}
            <View style={styles.actionButtons}>
              <TouchableOpacity
                style={styles.backButton}
                onPress={handleBack}
              >
                <Text style={styles.backButtonText}>Back</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.continueButton}
                onPress={handleContinue}
              >
                <Text style={styles.continueButtonText}>Continue</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: SPACING.lg,
  },
  modalContent: {
    backgroundColor: theme.colors.background.paper,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.xl,
    width: '100%',
    maxWidth: 400,
    maxHeight: '80%',
    ...SHADOWS.heavy,
  },
  closeButton: {
    position: 'absolute',
    top: SPACING.md,
    right: SPACING.md,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: theme.colors.background.default,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  modalTitle: {
    fontSize: FONT_SIZES.lg,
    fontWeight: '600',
    color: theme.colors.text.primary,
    textAlign: 'center',
    marginBottom: SPACING.xl,
    marginTop: SPACING.md,
  },
  reasonsList: {
    marginBottom: SPACING.xl,
  },
  reasonItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border.light,
  },
  reasonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  reasonText: {
    fontSize: FONT_SIZES.md,
    color: theme.colors.text.primary,
    marginLeft: SPACING.md,
    flex: 1,
  },
  radioContainer: {
    marginLeft: SPACING.md,
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: theme.colors.border.medium,
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioButtonSelected: {
    borderColor: theme.colors.primary,
  },
  radioButtonInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: theme.colors.primary,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: SPACING.md,
  },
  backButton: {
    flex: 1,
    backgroundColor: theme.colors.background.default,
    borderWidth: 1,
    borderColor: theme.colors.border.medium,
    borderRadius: BORDER_RADIUS.md,
    paddingVertical: SPACING.md,
    alignItems: 'center',
  },
  backButtonText: {
    fontSize: FONT_SIZES.md,
    fontWeight: '500',
    color: theme.colors.text.primary,
  },
  continueButton: {
    flex: 1,
    backgroundColor: theme.colors.primary,
    borderRadius: BORDER_RADIUS.md,
    paddingVertical: SPACING.md,
    alignItems: 'center',
  },
  continueButtonText: {
    fontSize: FONT_SIZES.md,
    fontWeight: '500',
    color: theme.colors.text.inverse,
  },
});

export default ScheduleOffScreen;
