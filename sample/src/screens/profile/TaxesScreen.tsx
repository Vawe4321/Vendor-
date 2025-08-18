import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { theme } from '../../theme';
import { SPACING, FONT_SIZES, BORDER_RADIUS, SHADOWS } from '../../utils/responsive';
import { mockAccountingData } from '../../utils/mockData';

const TaxesScreen: React.FC = () => {
  const navigation = useNavigation();
  const [selectedPeriod, setSelectedPeriod] = useState('currentYear');

  const handleBackPress = () => {
    console.log('TaxesScreen: Back button pressed');
    navigation.navigate('Hub', { screen: 'ExploreMore' });
  };

  const currentYear = mockAccountingData.taxes.currentYear;
  const quarterlyData = mockAccountingData.taxes.quarterlyBreakdown;
  const taxDocuments = mockAccountingData.taxes.taxDocuments;

  const renderTaxCard = (title: string, amount: string, subtitle?: string, color?: string) => (
    <View style={styles.taxCard}>
      <Text style={styles.taxCardTitle}>{title}</Text>
      <Text style={[styles.taxCardAmount, color && { color }]}>{amount}</Text>
      {subtitle && <Text style={styles.taxCardSubtitle}>{subtitle}</Text>}
    </View>
  );

  const renderQuarterlyItem = ({ item }: { item: any }) => (
    <View style={styles.quarterlyItem}>
      <View style={styles.quarterlyHeader}>
        <Text style={styles.quarterlyTitle}>{item.quarter}</Text>
        <Text style={styles.quarterlyRevenue}>{item.revenue}</Text>
      </View>
      <View style={styles.quarterlyDetails}>
        <View style={styles.quarterlyDetail}>
          <Text style={styles.quarterlyLabel}>Tax Liability</Text>
          <Text style={styles.quarterlyValue}>{item.taxLiability}</Text>
        </View>
        <View style={styles.quarterlyDetail}>
          <Text style={styles.quarterlyLabel}>Tax Paid</Text>
          <Text style={styles.quarterlyValue}>{item.taxPaid}</Text>
        </View>
        <View style={styles.quarterlyDetail}>
          <Text style={styles.quarterlyLabel}>Pending Tax</Text>
          <Text style={[styles.quarterlyValue, styles.pendingValue]}>{item.pendingTax}</Text>
        </View>
      </View>
    </View>
  );

  const renderTaxDocument = ({ item }: { item: any }) => (
    <View style={styles.documentItem}>
      <View style={styles.documentLeft}>
        <View style={styles.documentIcon}>
          <Icon name="description" size={20} color={theme.colors.primary} />
        </View>
        <View style={styles.documentContent}>
          <Text style={styles.documentTitle}>{item.documentType}</Text>
          <Text style={styles.documentPeriod}>{item.period}</Text>
        </View>
      </View>
      <View style={styles.documentRight}>
        <View style={[styles.statusBadge, item.status === 'FILED' ? styles.filedBadge : styles.pendingBadge]}>
          <Text style={[styles.statusText, item.status === 'FILED' ? styles.filedText : styles.pendingText]}>
            {item.status}
          </Text>
        </View>
        <Text style={styles.documentAmount}>{item.amount}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
          <Icon name="arrow-back" size={24} color={theme.colors.text.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Taxes</Text>
        <View style={styles.headerRight} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Current Year Summary */}
        <View style={styles.summarySection}>
          <Text style={styles.sectionTitle}>Current Year Summary</Text>
          <View style={styles.summaryGrid}>
            {renderTaxCard('Total Revenue', currentYear.totalRevenue)}
            {renderTaxCard('Total Tax Liability', currentYear.totalTaxLiability, '15% of revenue')}
            {renderTaxCard('Tax Paid', currentYear.taxPaid, 'Paid amount')}
            {renderTaxCard('Pending Tax', currentYear.pendingTax, 'Due amount', theme.colors.error.main)}
          </View>
        </View>

        {/* GST Summary */}
        <View style={styles.gstSection}>
          <Text style={styles.sectionTitle}>GST Summary</Text>
          <View style={styles.gstGrid}>
            {renderTaxCard('GST Collected', currentYear.gstCollected, '18% of revenue')}
            {renderTaxCard('GST Paid', currentYear.gstPaid, 'Paid amount')}
            {renderTaxCard('GST Pending', currentYear.gstPending, 'Due amount', theme.colors.error.main)}
          </View>
        </View>

        {/* Quarterly Breakdown */}
        <View style={styles.quarterlySection}>
          <Text style={styles.sectionTitle}>Quarterly Breakdown</Text>
          <FlatList
            data={quarterlyData}
            renderItem={renderQuarterlyItem}
            keyExtractor={(item) => item.quarter}
            scrollEnabled={false}
          />
        </View>

        {/* Tax Documents */}
        <View style={styles.documentsSection}>
          <Text style={styles.sectionTitle}>Tax Documents</Text>
          <FlatList
            data={taxDocuments}
            renderItem={renderTaxDocument}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
          />
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
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border.light,
  },
  backButton: {
    padding: SPACING.xs,
  },
  headerTitle: {
    fontSize: FONT_SIZES.lg,
    fontWeight: 'bold',
    color: theme.colors.text.primary,
  },
  headerRight: {
    width: 40,
  },
  content: {
    flex: 1,
    paddingHorizontal: SPACING.md,
  },
  summarySection: {
    marginTop: SPACING.lg,
    marginBottom: SPACING.xl,
  },
  sectionTitle: {
    fontSize: FONT_SIZES.lg,
    fontWeight: 'bold',
    color: theme.colors.text.primary,
    marginBottom: SPACING.md,
  },
  summaryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  taxCard: {
    backgroundColor: theme.colors.background.paper,
    borderRadius: BORDER_RADIUS.md,
    padding: SPACING.md,
    marginBottom: SPACING.sm,
    width: '48%',
    ...SHADOWS.light,
  },
  taxCardTitle: {
    fontSize: FONT_SIZES.sm,
    color: theme.colors.text.secondary,
    marginBottom: SPACING.xs,
  },
  taxCardAmount: {
    fontSize: FONT_SIZES.lg,
    fontWeight: 'bold',
    color: theme.colors.text.primary,
  },
  taxCardSubtitle: {
    fontSize: FONT_SIZES.xs,
    color: theme.colors.text.secondary,
    marginTop: SPACING.xs,
  },
  gstSection: {
    marginBottom: SPACING.xl,
  },
  gstGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  quarterlySection: {
    marginBottom: SPACING.xl,
  },
  quarterlyItem: {
    backgroundColor: theme.colors.background.paper,
    borderRadius: BORDER_RADIUS.md,
    padding: SPACING.md,
    marginBottom: SPACING.sm,
    ...SHADOWS.light,
  },
  quarterlyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  quarterlyTitle: {
    fontSize: FONT_SIZES.md,
    fontWeight: '600',
    color: theme.colors.text.primary,
  },
  quarterlyRevenue: {
    fontSize: FONT_SIZES.md,
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
  quarterlyDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  quarterlyDetail: {
    alignItems: 'center',
    flex: 1,
  },
  quarterlyLabel: {
    fontSize: FONT_SIZES.xs,
    color: theme.colors.text.secondary,
    marginBottom: SPACING.xs,
  },
  quarterlyValue: {
    fontSize: FONT_SIZES.sm,
    fontWeight: '600',
    color: theme.colors.text.primary,
  },
  pendingValue: {
    color: theme.colors.error.main,
  },
  documentsSection: {
    marginBottom: SPACING.xl,
  },
  documentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: theme.colors.background.paper,
    borderRadius: BORDER_RADIUS.md,
    padding: SPACING.md,
    marginBottom: SPACING.sm,
    ...SHADOWS.light,
  },
  documentLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  documentIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: theme.colors.primary + '20',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: SPACING.md,
  },
  documentContent: {
    flex: 1,
  },
  documentTitle: {
    fontSize: FONT_SIZES.md,
    fontWeight: '600',
    color: theme.colors.text.primary,
    marginBottom: SPACING.xs,
  },
  documentPeriod: {
    fontSize: FONT_SIZES.sm,
    color: theme.colors.text.secondary,
  },
  documentRight: {
    alignItems: 'flex-end',
  },
  statusBadge: {
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
    borderRadius: BORDER_RADIUS.sm,
    marginBottom: SPACING.xs,
  },
  filedBadge: {
    backgroundColor: theme.colors.success.main + '20',
  },
  pendingBadge: {
    backgroundColor: theme.colors.warning.main + '20',
  },
  statusText: {
    fontSize: FONT_SIZES.xs,
    fontWeight: '600',
  },
  filedText: {
    color: theme.colors.success.main,
  },
  pendingText: {
    color: theme.colors.warning.main,
  },
  documentAmount: {
    fontSize: FONT_SIZES.sm,
    fontWeight: '600',
    color: theme.colors.text.primary,
  },
});

export default TaxesScreen;
