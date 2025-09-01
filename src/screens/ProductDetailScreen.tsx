import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
  ActivityIndicator,
  Alert,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Colors, Spacing, FontSize, BorderRadius } from '../constants';
import { ItalianaText, InterText, PlayfairText } from '../components';
import { Product } from '../types';
import apiService from '../services/api';

const { width, height } = Dimensions.get('window');

const ProductDetailScreen = ({ navigation, route }: any) => {
  const { productId } = route.params;
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    loadProduct();
  }, [productId]);

  const loadProduct = async () => {
    try {
      setIsLoading(true);
      const productData = await apiService.getProductById(productId);
      setProduct(productData);
    } catch (error) {
      console.error('Error loading product:', error);
      Alert.alert('Error', 'Failed to load product details');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddToCart = () => {
    Alert.alert('Success', 'Product added to cart!');
  };

  const handleBuyNow = () => {
    Alert.alert('Buy Now', 'Proceeding to checkout...');
  };

  const handleQuantityChange = (increment: boolean) => {
    if (increment) {
      setQuantity(prev => Math.min(prev + 1, product?.stock || 1));
    } else {
      setQuantity(prev => Math.max(prev - 1, 1));
    }
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  if (!product) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Product not found</Text>
      </View>
    );
  }

  const discountedPrice = product.price - (product.price * product.discountPercentage) / 100;

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.shareButton}>
          <Text style={styles.shareIcon}>📤</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Product Images */}
        <View style={styles.imageSection}>
          <Image
            source={{ uri: product.images[selectedImageIndex] }}
            style={styles.mainImage}
            resizeMode="cover"
          />
          
          {/* Image Thumbnails */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.thumbnailContainer}
          >
            {product.images.map((image, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => setSelectedImageIndex(index)}
                style={[
                  styles.thumbnail,
                  index === selectedImageIndex && styles.selectedThumbnail,
                ]}
              >
                <Image source={{ uri: image }} style={styles.thumbnailImage} />
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Product Info */}
        <View style={styles.productInfo}>
          <View style={styles.categoryContainer}>
            <Text style={styles.category}>{product.category}</Text>
            {product.discountPercentage > 0 && (
              <View style={styles.discountBadge}>
                <Text style={styles.discountText}>
                  -{Math.round(product.discountPercentage)}% OFF
                </Text>
              </View>
            )}
          </View>

          <PlayfairText style={styles.title}>{product.title}</PlayfairText>
          
          <View style={styles.brandContainer}>
            <Text style={styles.brandLabel}>Brand:</Text>
            <Text style={styles.brandName}>{product.brand}</Text>
          </View>

          <View style={styles.ratingContainer}>
            <Text style={styles.ratingIcon}>⭐</Text>
            <Text style={styles.rating}>{product.rating.toFixed(1)}</Text>
            <Text style={styles.ratingCount}>({Math.floor(Math.random() * 1000) + 100} reviews)</Text>
          </View>

          <View style={styles.priceContainer}>
            <Text style={styles.currentPrice}>${discountedPrice.toFixed(2)}</Text>
            {product.discountPercentage > 0 && (
              <Text style={styles.originalPrice}>${product.price.toFixed(2)}</Text>
            )}
          </View>

          <View style={styles.stockContainer}>
            <Text style={styles.stockLabel}>Stock:</Text>
            <Text style={styles.stockValue}>
              {product.stock > 0 ? `${product.stock} available` : 'Out of stock'}
            </Text>
          </View>
        </View>

        {/* Description */}
        <View style={styles.descriptionSection}>
          <PlayfairText style={styles.sectionTitle}>Description</PlayfairText>
          <InterText style={styles.description}>{product.description}</InterText>
        </View>

        {/* Quantity Selector */}
        <View style={styles.quantitySection}>
          <InterText style={styles.quantityLabel}>Quantity:</InterText>
          <View style={styles.quantitySelector}>
            <TouchableOpacity
              style={styles.quantityButton}
              onPress={() => handleQuantityChange(false)}
              disabled={quantity <= 1}
            >
              <Text style={styles.quantityButtonText}>-</Text>
            </TouchableOpacity>
            <Text style={styles.quantityValue}>{quantity}</Text>
            <TouchableOpacity
              style={styles.quantityButton}
              onPress={() => handleQuantityChange(true)}
              disabled={quantity >= product.stock}
            >
              <Text style={styles.quantityButtonText}>+</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Actions */}
      <View style={styles.bottomActions}>
        <TouchableOpacity style={styles.addToCartButton} onPress={handleAddToCart}>
          <Text style={styles.addToCartText}>Add to Cart</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buyNowButton} onPress={handleBuyNow}>
          <LinearGradient
            colors={[Colors.primary, '#A03D46']}
            style={styles.buyNowGradient}
          >
            <Text style={styles.buyNowText}>Buy Now</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: FontSize.lg,
    color: Colors.textLight,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.xl,
    paddingBottom: Spacing.md,
    backgroundColor: Colors.white,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: BorderRadius.round,
    backgroundColor: Colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backIcon: {
    fontSize: FontSize.xl,
    color: Colors.text,
  },
  shareButton: {
    width: 40,
    height: 40,
    borderRadius: BorderRadius.round,
    backgroundColor: Colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
  },
  shareIcon: {
    fontSize: FontSize.lg,
  },
  content: {
    flex: 1,
  },
  imageSection: {
    backgroundColor: Colors.white,
    paddingBottom: Spacing.lg,
  },
  mainImage: {
    width: width,
    height: width * 0.8,
  },
  thumbnailContainer: {
    paddingHorizontal: Spacing.lg,
    marginTop: Spacing.md,
  },
  thumbnail: {
    width: 60,
    height: 60,
    borderRadius: BorderRadius.md,
    marginRight: Spacing.sm,
    borderWidth: 2,
    borderColor: Colors.transparent,
  },
  selectedThumbnail: {
    borderColor: Colors.primary,
  },
  thumbnailImage: {
    width: '100%',
    height: '100%',
    borderRadius: BorderRadius.md,
  },
  productInfo: {
    backgroundColor: Colors.white,
    padding: Spacing.lg,
    marginTop: Spacing.sm,
  },
  categoryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  category: {
    fontSize: FontSize.sm,
    color: Colors.textLight,
    textTransform: 'uppercase',
  },
  discountBadge: {
    backgroundColor: Colors.error,
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.sm,
  },
  discountText: {
    color: Colors.white,
    fontSize: FontSize.xs,
    fontWeight: '600',
  },
  title: {
    fontSize: FontSize.xl,
    color: Colors.text,
    marginBottom: Spacing.md,
    lineHeight: 28,
  },
  brandContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  brandLabel: {
    fontSize: FontSize.sm,
    color: Colors.textLight,
    marginRight: Spacing.xs,
  },
  brandName: {
    fontSize: FontSize.sm,
    color: Colors.text,
    fontWeight: '500',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  ratingIcon: {
    fontSize: FontSize.sm,
    marginRight: Spacing.xs,
  },
  rating: {
    fontSize: FontSize.md,
    color: Colors.text,
    fontWeight: '600',
    marginRight: Spacing.xs,
  },
  ratingCount: {
    fontSize: FontSize.sm,
    color: Colors.textLight,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  currentPrice: {
    fontSize: FontSize.xxxl,
    color: Colors.primary,
    fontWeight: '700',
    marginRight: Spacing.md,
  },
  originalPrice: {
    fontSize: FontSize.lg,
    color: Colors.textLight,
    textDecorationLine: 'line-through',
  },
  stockContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  stockLabel: {
    fontSize: FontSize.sm,
    color: Colors.textLight,
    marginRight: Spacing.xs,
  },
  stockValue: {
    fontSize: FontSize.sm,
    color: Colors.text,
    fontWeight: '500',
  },
  descriptionSection: {
    backgroundColor: Colors.white,
    padding: Spacing.lg,
    marginTop: Spacing.sm,
  },
  sectionTitle: {
    fontSize: FontSize.lg,
    color: Colors.text,
    marginBottom: Spacing.md,
  },
  description: {
    fontSize: FontSize.md,
    color: Colors.textSecondary,
    lineHeight: 24,
  },
  quantitySection: {
    backgroundColor: Colors.white,
    padding: Spacing.lg,
    marginTop: Spacing.sm,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  quantityLabel: {
    fontSize: FontSize.md,
    color: Colors.text,
    fontWeight: '500',
  },
  quantitySelector: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    width: 36,
    height: 36,
    borderRadius: BorderRadius.md,
    backgroundColor: Colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  quantityButtonText: {
    fontSize: FontSize.lg,
    color: Colors.text,
    fontWeight: '600',
  },
  quantityValue: {
    fontSize: FontSize.md,
    color: Colors.text,
    fontWeight: '600',
    marginHorizontal: Spacing.lg,
    minWidth: 30,
    textAlign: 'center',
  },
  bottomActions: {
    flexDirection: 'row',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.lg,
    backgroundColor: Colors.white,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    gap: Spacing.md,
  },
  addToCartButton: {
    flex: 1,
    paddingVertical: Spacing.lg,
    borderRadius: BorderRadius.lg,
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
    alignItems: 'center',
  },
  addToCartText: {
    fontSize: FontSize.md,
    color: Colors.text,
    fontWeight: '600',
  },
  buyNowButton: {
    flex: 2,
    borderRadius: BorderRadius.lg,
    overflow: 'hidden',
  },
  buyNowGradient: {
    paddingVertical: Spacing.lg,
    alignItems: 'center',
  },
  buyNowText: {
    fontSize: FontSize.md,
    color: Colors.white,
    fontWeight: '600',
  },
});

export default ProductDetailScreen; 