import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Switch,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { theme } from '../../theme';
import { SPACING, FONT_SIZES, BORDER_RADIUS, SHADOWS } from '../../utils/responsive';

const TimingsScreen: React.FC = () => {
  const navigation = useNavigation();
  const [activeMode, setActiveMode] = useState('delivery');
  const [expandedDay, setExpandedDay] = useState('Thursday');

  const dailyTimings = [
    { day: 'Monday', isOpen: true, slots: [{ time: '12:00 PM to 10:00 PM', duration: '10 hrs' }] },
    { day: 'Tuesday', isOpen: true, slots: [{ time: '12:00 PM to 10:00 PM', duration: '10 hrs' }] },
    { day: 'Wednesday', isOpen: true, slots: [{ time: '12:00 PM to 10:00 PM', duration: '10 hrs' }] },
    { day: 'Thursday', isOpen: true, slots: [{ time: '12:00 PM to 10:00 PM', duration: '10 hrs' }] },
    { day: 'Friday', isOpen: true, slots: [{ time: '12:00 PM to 10:00 PM', duration: '10 hrs' }] },
    { day: 'Saturday', isOpen: true, slots: [{ time: '12:00 PM to 10:00 PM', duration: '10 hrs' }] },
    { day: 'Sunday', isOpen: true, slots: [{ time: '12:00 PM to 10:00 PM', duration: '10 hrs' }] },
  ];

  const toggleDay = (day: string) => {
    setExpandedDay(expandedDay === day ? '' : day);
  };

  const handleModeChange = (mode: string) => {
    setActiveMode(mode);
  };

  const handleAddEditTime = () => {
    // Handle add/edit time functionality
    console.log('Add/Edit time pressed');
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Custom Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.navigate('Hub', { screen: 'ExploreMore' })}
        >
          <Icon name="arrow-back" size={24} color={theme.colors.text.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Update timings</Text>
        <View style={styles.headerRight} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Video Tutorial Section */}
        <View style={styles.videoSection}>
          <View style={styles.videoCard}>
            <View style={styles.videoLeft}>
              <Text style={styles.videoTitle}>HOW TO update restaurant operational timings</Text>
              <View style={styles.brandContainer}>
                <Text style={styles.brandText}>grow with grooso</Text>
              </View>
            </View>
            <View style={styles.videoRight}>
              <View style={styles.videoThumbnail}>
                <View style={styles.playButton}>
                  <Icon name="play-arrow" size={24} color="#fff" />
                </View>
                <Text style={styles.videoDuration}>01:57</Text>
              </View>
              <View style={styles.videoInfo}>
                <Text style={styles.videoInfoTitle}>How to update Online Ordering Operational Ti...</Text>
                <Text style={styles.videoInfoDescription}>
                  Want to change the operational timings for online ...
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Delivery Mode Selector */}
        <View style={styles.modeSelector}>
          <TouchableOpacity 
            style={[styles.modeButton, styles.activeModeButton]}
          >
            <Text style={[styles.modeText, styles.activeModeText]}>
              Grooso delivery
            </Text>
          </TouchableOpacity>
        </View>

        {/* Daily Timings List */}
        <View style={styles.timingsSection}>
          {dailyTimings.map((item, index) => (
            <View key={index} style={styles.dayItem}>
              <View style={styles.dayHeader}>
                <TouchableOpacity 
                  style={styles.dayToggle}
                  onPress={() => toggleDay(item.day)}
                >
                  <Icon 
                    name={expandedDay === item.day ? "keyboard-arrow-up" : "keyboard-arrow-down"} 
                    size={20} 
                    color={theme.colors.text.secondary} 
                  />
                  <Text style={styles.dayText}>{item.day}</Text>
                </TouchableOpacity>
                <View style={styles.dayStatus}>
                  <Text style={styles.openText}>Open</Text>
                  <Switch
                    value={item.isOpen}
                    onValueChange={() => {}}
                    trackColor={{ false: theme.colors.border.light, true: theme.colors.success.main }}
                    thumbColor={theme.colors.background.paper}
                  />
                </View>
              </View>
              
              {expandedDay === item.day && (
                <View style={styles.slotDetails}>
                  {item.slots.map((slot, slotIndex) => (
                    <View key={slotIndex} style={styles.slotItem}>
                      <View style={styles.slotInfo}>
                        <Text style={styles.slotLabel}>Slot 1</Text>
                        <View style={styles.slotTime}>
                          <Text style={styles.timeText}>{slot.time}</Text>
                          <View style={styles.durationContainer}>
                            <Icon name="schedule" size={14} color={theme.colors.text.secondary} />
                            <Text style={styles.durationText}>{slot.duration}</Text>
                          </View>
                        </View>
                      </View>
                      <TouchableOpacity style={styles.addEditButton} onPress={handleAddEditTime}>
                        <Text style={styles.addEditText}>+ Add / Edit time</Text>
                      </TouchableOpacity>
                    </View>
                  ))}
                </View>
              )}
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background.default,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
    backgroundColor: theme.colors.background.paper,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border.light,
  },
  backButton: {
    padding: SPACING.sm,
  },
  headerTitle: {
    fontSize: FONT_SIZES.lg,
    fontWeight: '600',
    color: theme.colors.text.primary,
    flex: 1,
    textAlign: 'center',
  },
  headerRight: {
    width: 40, // Adjust as needed for spacing
  },
  content: {
    flex: 1,
  },
  videoSection: {
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.lg,
  },
  videoCard: {
    backgroundColor: theme.colors.background.paper,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.lg,
    flexDirection: 'row',
    ...SHADOWS.medium,
  },
  videoLeft: {
    flex: 1,
    marginRight: SPACING.lg,
  },
  videoTitle: {
    fontSize: FONT_SIZES.md,
    fontWeight: '600',
    color: theme.colors.text.primary,
    marginBottom: SPACING.md,
  },
  brandContainer: {
    alignSelf: 'flex-start',
  },
  brandText: {
    fontSize: FONT_SIZES.sm,
    color: theme.colors.primary,
    fontWeight: '500',
  },
  videoRight: {
    flex: 1,
  },
  videoThumbnail: {
    width: 120,
    height: 80,
    backgroundColor: '#F44336',
    borderRadius: BORDER_RADIUS.sm,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    marginBottom: SPACING.sm,
  },
  playButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  videoDuration: {
    position: 'absolute',
    bottom: SPACING.xs,
    right: SPACING.xs,
    fontSize: FONT_SIZES.xs,
    color: theme.colors.text.inverse,
    fontWeight: '500',
  },
  videoInfo: {
    flex: 1,
  },
  videoInfoTitle: {
    fontSize: FONT_SIZES.sm,
    fontWeight: '600',
    color: theme.colors.text.primary,
    marginBottom: SPACING.xs,
  },
  videoInfoDescription: {
    fontSize: FONT_SIZES.xs,
    color: theme.colors.text.secondary,
  },
  modeSelector: {
    flexDirection: 'row',
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.lg,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border.light,
  },
  modeButton: {
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.sm,
    marginRight: SPACING.lg,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeModeButton: {
    borderBottomColor: theme.colors.primary,
  },
  modeText: {
    fontSize: FONT_SIZES.md,
    color: theme.colors.text.secondary,
    fontWeight: '500',
  },
  activeModeText: {
    color: theme.colors.primary,
    fontWeight: '600',
  },
  timingsSection: {
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.lg,
  },
  dayItem: {
    backgroundColor: theme.colors.background.paper,
    borderRadius: BORDER_RADIUS.md,
    marginBottom: SPACING.sm,
    overflow: 'hidden',
    ...SHADOWS.light,
  },
  dayHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: SPACING.lg,
  },
  dayToggle: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  dayText: {
    fontSize: FONT_SIZES.md,
    fontWeight: '500',
    color: theme.colors.text.primary,
    marginLeft: SPACING.sm,
  },
  dayStatus: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  openText: {
    fontSize: FONT_SIZES.sm,
    color: theme.colors.text.secondary,
    marginRight: SPACING.sm,
  },
  slotDetails: {
    paddingHorizontal: SPACING.lg,
    paddingBottom: SPACING.lg,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border.light,
  },
  slotItem: {
    marginTop: SPACING.md,
  },
  slotInfo: {
    marginBottom: SPACING.sm,
  },
  slotLabel: {
    fontSize: FONT_SIZES.sm,
    color: theme.colors.text.secondary,
    marginBottom: SPACING.xs,
  },
  slotTime: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  timeText: {
    fontSize: FONT_SIZES.md,
    fontWeight: '500',
    color: theme.colors.text.primary,
  },
  durationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  durationText: {
    fontSize: FONT_SIZES.sm,
    color: theme.colors.text.secondary,
    marginLeft: SPACING.xs,
  },
  addEditButton: {
    alignSelf: 'flex-start',
  },
  addEditText: {
    fontSize: FONT_SIZES.sm,
    color: theme.colors.primary,
    fontWeight: '500',
  },
});

export default TimingsScreen; 