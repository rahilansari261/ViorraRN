import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
  Alert,
} from 'react-native';
import {Ionicons} from '@react-native-vector-icons/ionicons';
import {useRoute} from '@react-navigation/native';

const {width} = Dimensions.get('window');

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
  dimensions: {
    width: number;
    height: number;
    depth: number;
  };
  warrantyInformation: string;
  shippingInformation: string;
  reviews: {
    rating: number;
    comment: string;
    reviewerName: string;
    reviewerEmail: string;
  }[];
}

export default function ProductScreen({navigation}: {navigation: any}) {
  const {id} = useRoute().params as {id: string};
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  // const [liked, setLiked] = useState(false);

  useEffect(() => {
    fetchProduct();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`https://dummyjson.com/products/${id}`);

      if (!response.ok) {
        throw new Error('Failed to fetch product');
      }

      const data = await response.json();
      setProduct(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
      Alert.alert('Error', 'Failed to load product details');
    } finally {
      setLoading(false);
    }
  };

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(<Ionicons key={i} name="star" size={16} color="#000" />);
      } else if (i === fullStars + 1 && hasHalfStar) {
        stars.push(
          <Ionicons key={i} name="star-half" size={16} color="#000" />,
        );
      } else {
        stars.push(
          <Ionicons key={i} name="star-outline" size={16} color="#000" />,
        );
      }
    }
    return stars;
  };

  const renderReview = (review: any, index: number) => (
    <View key={index} style={styles.reviewCard}>
      <View style={styles.reviewHeader}>
        <View style={styles.reviewAvatar}>
          <Image
            source={require('../../assets/images/user-2.jpg')}
            style={styles.avatarImage}
          />
        </View>
        <View style={styles.reviewInfo}>
          <Text style={styles.reviewerName}>{review.reviewerName}</Text>
          <Text style={styles.reviewerEmail}>{review.reviewerEmail}</Text>
        </View>
        <View style={styles.reviewRating}>{renderStars(review.rating)}</View>
      </View>
      <Text style={styles.reviewComment}>{review.comment}</Text>
    </View>
  );

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="#FCEDEA" />
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#B84953" />
          <Text style={styles.loadingText}>Loading product...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (error || !product) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="#FCEDEA" />
        <View style={styles.errorContainer}>
          <Ionicons name="alert-circle-outline" size={48} color="#B84953" />
          <Text style={styles.errorText}>{error || 'Product not found'}</Text>
          <TouchableOpacity style={styles.retryButton} onPress={fetchProduct}>
            <Text style={styles.retryButtonText}>Retry</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  const originalPrice =
    product.price + (product.price * product.discountPercentage) / 100;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FCEDEA" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.shareButton}>
          <Ionicons name="share-outline" size={24} color="#333" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Product Image */}
        <View style={styles.imageContainer}>
          <Image
            source={{uri: product.thumbnail}}
            style={styles.productImage}
            resizeMode="contain"
          />
          <TouchableOpacity style={styles.viewSimilarButton}>
            <Text style={styles.viewSimilarText}>View Similar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.shareIconButton}>
            <Ionicons name="share-outline" size={20} color="#666" />
          </TouchableOpacity>
        </View>

        {/* Product Info */}
        <View style={styles.productInfo}>
          <Text style={styles.productTitle}>{product.title}</Text>
          <Text style={styles.productDescription}>{product.description}</Text>

          {/* Rating */}
          <View style={styles.ratingContainer}>
            <View style={styles.stars}>{renderStars(product.rating)}</View>
            <Text style={styles.ratingText}>{product.rating.toFixed(2)}/5</Text>
          </View>

          {/* Brand */}
          <View style={styles.brandContainer}>
            <Text style={styles.brandLabel}>Sold by :</Text>
            <Text style={styles.brandName}>{product.brand}</Text>
          </View>

          {/* Price */}
          <View style={styles.priceContainer}>
            <View style={styles.priceInfo}>
              <Text style={styles.currentPrice}>
                ${product.price.toFixed(2)}
              </Text>
              {product.discountPercentage > 0 && (
                <Text style={styles.originalPrice}>
                  ${originalPrice.toFixed(2)}
                </Text>
              )}
            </View>
            <TouchableOpacity style={styles.addToBagButton} activeOpacity={0.8}>
              <Text style={styles.addToBagText}>Add to Bag</Text>
            </TouchableOpacity>
          </View>

          {/* Highlights */}
          <View style={styles.highlightsSection}>
            <Text style={styles.sectionTitle}>Highlights</Text>
            <View style={styles.highlightsGrid}>
              <View
                style={[
                  styles.highlightItem,
                  {borderRightWidth: 1, borderRightColor: '#E3C5C7'},
                ]}>
                <Text style={styles.highlightLabel}>Width</Text>
                <Text style={styles.highlightValue}>
                  {product.dimensions.width}
                </Text>
              </View>
              <View style={[styles.highlightItem]}>
                <Text style={styles.highlightLabel}>Height</Text>
                <Text style={styles.highlightValue}>
                  {product.dimensions.height}
                </Text>
              </View>
              <View
                style={[
                  styles.highlightItem,
                  {borderRightWidth: 1, borderRightColor: '#E3C5C7'},
                ]}>
                <Text style={styles.highlightLabel}>Warranty</Text>
                <Text style={styles.highlightValue}>
                  {product.warrantyInformation}
                </Text>
              </View>
              <View style={styles.highlightItem}>
                <Text style={styles.highlightLabel}>Shipping</Text>
                <Text style={styles.highlightValue}>
                  {product.shippingInformation}
                </Text>
              </View>
            </View>
          </View>

          {/* Reviews */}
          {product.reviews && product.reviews.length > 0 && (
            <View style={styles.reviewsSection}>
              <Text style={styles.sectionTitle}>Ratings & Reviews</Text>
              {product.reviews.map((review, index) =>
                renderReview(review, index),
              )}
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FCEDEA',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FCEDEA',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#666',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FCEDEA',
    padding: 20,
  },
  errorText: {
    marginTop: 16,
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
  retryButton: {
    backgroundColor: '#B84953',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  retryButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#FCEDEA',
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  shareButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  content: {
    flex: 1,
  },
  imageContainer: {
    position: 'relative',
    // backgroundColor: '#FFFFFF',
    paddingVertical: 20,
    alignItems: 'center',
    marginHorizontal: 20,
    marginTop: 10,
    borderRadius: 15,
    // shadowColor: '#000',
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.1,
    // shadowRadius: 4,
    // elevation: 3,
  },
  productImage: {
    width: width * 0.7,
    height: 250,
    borderRadius: 12,
  },
  viewSimilarButton: {
    position: 'absolute',
    bottom: 15,
    left: 15,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#B84953',
  },
  viewSimilarText: {
    fontSize: 12,
    color: '#B84953',
    fontWeight: '500',
  },
  shareIconButton: {
    position: 'absolute',
    bottom: 15,
    right: 15,
    backgroundColor: '#FFFFFF',
    padding: 8,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  productInfo: {
    // padding: 20,
    backgroundColor: '#FCEDEA',
    marginHorizontal: 20,
    marginTop: 15,
    // borderRadius: 15,
    // shadowColor: '#000',
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.1,
    // shadowRadius: 4,
    // elevation: 3,
  },
  productTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
    lineHeight: 28,
  },
  productDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 12,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E3C5C7',
    paddingBottom: 12,
  },
  stars: {
    flexDirection: 'row',
    marginRight: 10,
  },
  ratingText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '600',
  },
  brandContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    paddingBottom: 12,
  },
  brandLabel: {
    fontSize: 14,
    color: '#666',
    marginRight: 8,
  },
  brandName: {
    fontSize: 14,
    color: '#333',
    fontWeight: '600',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  priceInfo: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  currentPrice: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginRight: 12,
  },
  originalPrice: {
    fontSize: 16,
    color: '#999',
    textDecorationLine: 'line-through',
  },
  addToBagButton: {
    backgroundColor: '#B84953',
    paddingVertical: 16,
    borderRadius: 12,
    // marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
    width: '70%',
  },
  addToBagText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  highlightsSection: {
    marginBottom: 24,
    // backgroundColor: '#FFFFFF',
    // padding: 16,
    // borderRadius: 12,
    // shadowColor: '#000',
    // shadowOffset: { width: 0, height: 1 },
    // shadowOpacity: 0.08,
    // shadowRadius: 2,
    // elevation: 1,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  highlightsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  highlightItem: {
    width: '48%',
    paddingBottom: 12,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  highlightLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
    textTransform: 'capitalize',
  },
  highlightValue: {
    fontSize: 14,
    color: '#333',
    fontWeight: '600',
  },
  reviewsSection: {
    marginBottom: 20,
  },
  reviewCard: {
    backgroundColor: '#F8F8F8',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E3C5C7',
  },
  reviewHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  reviewAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#B84953',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  avatarImage: {
    width: 36,
    height: 36,
    borderRadius: 18,
  },
  avatarText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  reviewInfo: {
    flex: 1,
  },
  reviewerName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 2,
  },
  reviewerEmail: {
    fontSize: 12,
    color: '#666',
  },
  reviewRating: {
    flexDirection: 'row',
  },
  reviewComment: {
    fontSize: 14,
    color: '#666',
    lineHeight: 18,
  },
});
