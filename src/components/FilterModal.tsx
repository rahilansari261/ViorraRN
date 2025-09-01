import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Modal,
  Dimensions,
} from 'react-native';
import { Colors, Spacing, FontSize, BorderRadius } from '../constants';
import { InterText, PlayfairText } from './';
import { FilterOptions } from '../types';
import { CATEGORIES } from '../constants/Api';

const { height } = Dimensions.get('window');

interface FilterModalProps {
  visible: boolean;
  filters: FilterOptions;
  onClose: () => void;
  onApply: (filters: FilterOptions) => void;
}

const FilterModal: React.FC<FilterModalProps> = ({
  visible,
  filters,
  onClose,
  onApply,
}) => {
  const [localFilters, setLocalFilters] = useState<FilterOptions>(filters);

  const handleApply = () => {
    onApply(localFilters);
  };

  const handleReset = () => {
    const resetFilters: FilterOptions = {
      category: '',
      minPrice: 0,
      maxPrice: 10000,
      sortBy: 'title',
      sortOrder: 'asc',
    };
    setLocalFilters(resetFilters);
  };

  const updateFilter = (key: keyof FilterOptions, value: any) => {
    setLocalFilters(prev => ({ ...prev, [key]: value }));
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modal}>
          {/* Header */}
          <View style={styles.header}>
            <PlayfairText style={styles.title}>Filters & Sort</PlayfairText>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Text style={styles.closeIcon}>✕</Text>
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
            {/* Category Filter */}
            <View style={styles.section}>
              <InterText style={styles.sectionTitle}>Category</InterText>
              <View style={styles.categoryGrid}>
                {CATEGORIES.map((category) => (
                  <TouchableOpacity
                    key={category}
                    style={[
                      styles.categoryChip,
                      localFilters.category === category && styles.categoryChipActive,
                    ]}
                    onPress={() => updateFilter('category', category)}
                  >
                    <Text
                      style={[
                        styles.categoryChipText,
                        localFilters.category === category && styles.categoryChipTextActive,
                      ]}
                    >
                      {category}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Price Range */}
            <View style={styles.section}>
              <InterText style={styles.sectionTitle}>Price Range</InterText>
              <View style={styles.priceContainer}>
                <View style={styles.priceInput}>
                  <Text style={styles.priceLabel}>Min</Text>
                  <Text style={styles.priceValue}>${localFilters.minPrice}</Text>
                </View>
                <View style={styles.priceInput}>
                  <Text style={styles.priceLabel}>Max</Text>
                  <Text style={styles.priceValue}>${localFilters.maxPrice}</Text>
                </View>
              </View>
              {/* Price slider would go here */}
            </View>

            {/* Sort Options */}
            <View style={styles.section}>
              <InterText style={styles.sectionTitle}>Sort By</InterText>
              <View style={styles.sortContainer}>
                {['title', 'price', 'rating'].map((sortOption) => (
                  <TouchableOpacity
                    key={sortOption}
                    style={[
                      styles.sortChip,
                      localFilters.sortBy === sortOption && styles.sortChipActive,
                    ]}
                    onPress={() => updateFilter('sortBy', sortOption)}
                  >
                    <Text
                      style={[
                        styles.sortChipText,
                        localFilters.sortBy === sortOption && styles.sortChipTextActive,
                      ]}
                    >
                      {sortOption.charAt(0).toUpperCase() + sortOption.slice(1)}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Sort Order */}
            <View style={styles.section}>
              <InterText style={styles.sectionTitle}>Sort Order</InterText>
              <View style={styles.orderContainer}>
                {['asc', 'desc'].map((order) => (
                  <TouchableOpacity
                    key={order}
                    style={[
                      styles.orderChip,
                      localFilters.sortOrder === order && styles.orderChipActive,
                    ]}
                    onPress={() => updateFilter('sortOrder', order)}
                  >
                    <Text
                      style={[
                        styles.orderChipText,
                        localFilters.sortOrder === order && styles.orderChipTextActive,
                      ]}
                    >
                      {order === 'asc' ? 'Low to High' : 'High to Low'}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </ScrollView>

          {/* Footer */}
          <View style={styles.footer}>
            <TouchableOpacity style={styles.resetButton} onPress={handleReset}>
              <Text style={styles.resetButtonText}>Reset</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.applyButton} onPress={handleApply}>
              <Text style={styles.applyButtonText}>Apply Filters</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: Colors.overlay,
    justifyContent: 'flex-end',
  },
  modal: {
    backgroundColor: Colors.white,
    borderTopLeftRadius: BorderRadius.xl,
    borderTopRightRadius: BorderRadius.xl,
    maxHeight: height * 0.8,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  title: {
    fontSize: FontSize.xl,
    color: Colors.text,
  },
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: BorderRadius.round,
    backgroundColor: Colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeIcon: {
    fontSize: FontSize.md,
    color: Colors.text,
  },
  content: {
    paddingHorizontal: Spacing.lg,
  },
  section: {
    marginVertical: Spacing.lg,
  },
  sectionTitle: {
    fontSize: FontSize.lg,
    color: Colors.text,
    fontWeight: '600',
    marginBottom: Spacing.md,
  },
  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.sm,
  },
  categoryChip: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.md,
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  categoryChipActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  categoryChipText: {
    fontSize: FontSize.sm,
    color: Colors.text,
  },
  categoryChipTextActive: {
    color: Colors.white,
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  priceInput: {
    alignItems: 'center',
    flex: 1,
  },
  priceLabel: {
    fontSize: FontSize.sm,
    color: Colors.textLight,
    marginBottom: Spacing.xs,
  },
  priceValue: {
    fontSize: FontSize.md,
    color: Colors.primary,
    fontWeight: '600',
  },
  sortContainer: {
    flexDirection: 'row',
    gap: Spacing.sm,
  },
  sortChip: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.md,
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  sortChipActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  sortChipText: {
    fontSize: FontSize.sm,
    color: Colors.text,
  },
  sortChipTextActive: {
    color: Colors.white,
  },
  orderContainer: {
    flexDirection: 'row',
    gap: Spacing.sm,
  },
  orderChip: {
    flex: 1,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.md,
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
    alignItems: 'center',
  },
  orderChipActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  orderChipText: {
    fontSize: FontSize.sm,
    color: Colors.text,
  },
  orderChipTextActive: {
    color: Colors.white,
  },
  footer: {
    flexDirection: 'row',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.lg,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    gap: Spacing.md,
  },
  resetButton: {
    flex: 1,
    paddingVertical: Spacing.md,
    borderRadius: BorderRadius.md,
    backgroundColor: Colors.surface,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  resetButtonText: {
    fontSize: FontSize.md,
    color: Colors.text,
    fontWeight: '500',
  },
  applyButton: {
    flex: 2,
    paddingVertical: Spacing.md,
    borderRadius: BorderRadius.md,
    backgroundColor: Colors.primary,
    alignItems: 'center',
  },
  applyButtonText: {
    fontSize: FontSize.md,
    color: Colors.white,
    fontWeight: '600',
  },
});

export default FilterModal; 