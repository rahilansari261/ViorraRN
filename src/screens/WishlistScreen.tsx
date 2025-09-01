import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';
import {Ionicons} from '@react-native-vector-icons/ionicons';

interface WishlistItem {
  id: string;
  name: string;
  price: string;
  originalPrice?: string;
  image: string;
  inStock: boolean;
}

const mockWishlistItems: WishlistItem[] = [
  {
    id: '1',
    name: 'Essence Mascara Lash Princess',
    price: '$9.99',
    originalPrice: '$19.48',
    image:
      'https://images.unsplash.com/photo-1631214540347-0fa4e7b17ba7?w=200&h=200&fit=crop',
    inStock: true,
  },
  {
    id: '2',
    name: 'Eyeshadow Palette',
    price: '$19.99',
    image:
      'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=200&h=200&fit=crop',
    inStock: true,
  },
  {
    id: '3',
    name: 'Matte Lipstick Set',
    price: '$24.99',
    image:
      'https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=200&h=200&fit=crop',
    inStock: false,
  },
  {
    id: '4',
    name: 'Foundation',
    price: '$29.99',
    image:
      'https://images.unsplash.com/photo-1609081219090-a6d81d3085bf?w=200&h=200&fit=crop',
    inStock: true,
  },
];

export default function WishlistScreen({navigation}: {navigation: any}) {
  const [wishlistItems, setWishlistItems] = useState(mockWishlistItems);

  const removeFromWishlist = (itemId: string) => {
    setWishlistItems(items => items.filter(item => item.id !== itemId));
  };

  const renderWishlistItem = ({item}: {item: WishlistItem}) => (
    <View style={styles.wishlistCard}>
      <TouchableOpacity
        style={styles.productSection}
        onPress={() => navigation.navigate('Product', {id: item.id})}
        activeOpacity={0.8}>
        <Image source={{uri: item.image}} style={styles.productImage} />
        <View style={styles.productInfo}>
          <Text style={styles.productName}>{item.name}</Text>
          <View style={styles.priceContainer}>
            <Text style={styles.currentPrice}>{item.price}</Text>
            {item.originalPrice && (
              <Text style={styles.originalPrice}>{item.originalPrice}</Text>
            )}
          </View>
          <Text
            style={[
              styles.stockStatus,
              // eslint-disable-next-line react-native/no-inline-styles
              {color: item.inStock ? '#4CAF50' : '#F44336'},
            ]}>
            {item.inStock ? 'In Stock' : 'Out of Stock'}
          </Text>
        </View>
      </TouchableOpacity>
      <View style={styles.actionButtons}>
        <TouchableOpacity
          style={[
            styles.addToBagButton,
            !item.inStock && styles.disabledButton,
          ]}
          disabled={!item.inStock}
          activeOpacity={0.8}>
          <Text
            style={[
              styles.addToBagText,
              !item.inStock && styles.disabledButtonText,
            ]}>
            {item.inStock ? 'Add to Bag' : 'Notify Me'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.removeButton}
          onPress={() => removeFromWishlist(item.id)}
          activeOpacity={0.8}>
          <Ionicons name="heart" size={20} color="#B85450" />
        </TouchableOpacity>
      </View>
    </View>
  );

  // eslint-disable-next-line react/no-unstable-nested-components
  const EmptyWishlist = () => (
    <View style={styles.emptyContainer}>
      <Ionicons name="heart-outline" size={80} color="#DDD" />
      <Text style={styles.emptyTitle}>Your Wishlist is Empty</Text>
      <Text style={styles.emptySubtitle}>
        Add some products to your wishlist to see them here
      </Text>
      <TouchableOpacity
        style={styles.shopNowButton}
        onPress={() => navigation.navigate('Home')}
        activeOpacity={0.8}>
        <Text style={styles.shopNowText}>Shop Now</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Wishlist</Text>
        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.shareButton}>
            <Ionicons name="share-outline" size={24} color="#333" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.searchButton}>
            <Ionicons name="search-outline" size={24} color="#333" />
          </TouchableOpacity>
        </View>
      </View>

      {wishlistItems.length === 0 ? (
        <EmptyWishlist />
      ) : (
        <View style={styles.content}>
          {/* Wishlist Count */}
          <View style={styles.countContainer}>
            <Text style={styles.countText}>
              {wishlistItems.length}{' '}
              {wishlistItems.length === 1 ? 'item' : 'items'} in your wishlist
            </Text>
          </View>

          {/* Wishlist Items */}
          <FlatList
            data={wishlistItems}
            renderItem={renderWishlistItem}
            keyExtractor={item => item.id}
            contentContainerStyle={styles.listContainer}
            showsVerticalScrollIndicator={false}
          />
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  shareButton: {
    marginRight: 15,
    padding: 5,
  },
  searchButton: {
    padding: 5,
  },
  content: {
    flex: 1,
  },
  countContainer: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  countText: {
    fontSize: 16,
    color: '#666',
    fontWeight: '500',
  },
  listContainer: {
    padding: 20,
  },
  wishlistCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  productSection: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  productImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 15,
  },
  productInfo: {
    flex: 1,
    justifyContent: 'space-between',
  },
  productName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 5,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  currentPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#B85450',
    marginRight: 8,
  },
  originalPrice: {
    fontSize: 14,
    color: '#999',
    textDecorationLine: 'line-through',
  },
  stockStatus: {
    fontSize: 14,
    fontWeight: '500',
  },
  actionButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  addToBagButton: {
    backgroundColor: '#B85450',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    flex: 1,
    marginRight: 10,
  },
  addToBagText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
  disabledButton: {
    backgroundColor: '#DDD',
  },
  disabledButtonText: {
    color: '#999',
  },
  removeButton: {
    padding: 10,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 20,
    marginBottom: 10,
    textAlign: 'center',
  },
  emptySubtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 30,
  },
  shopNowButton: {
    backgroundColor: '#B85450',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
  },
  shopNowText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});
