import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import {Ionicons} from '@react-native-vector-icons/ionicons';

interface Offer {
  id: string;
  title: string;
  description: string;
  discount: string;
  image: string;
  validUntil: string;
}

const mockOffers: Offer[] = [
  {
    id: '1',
    title: 'Summer Beauty Sale',
    description: 'Get amazing discounts on all summer beauty essentials',
    discount: '50% OFF',
    image:
      'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=300&h=200&fit=crop',
    validUntil: 'Valid until July 31st',
  },
  {
    id: '2',
    title: 'New Customer Special',
    description: 'First time shopping? Enjoy exclusive savings',
    discount: '30% OFF',
    image:
      'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=300&h=200&fit=crop',
    validUntil: 'Valid for new customers',
  },
  {
    id: '3',
    title: 'Mascara Monday',
    description: 'Special deals on all mascara products',
    discount: '25% OFF',
    image:
      'https://images.unsplash.com/photo-1631214540347-0fa4e7b17ba7?w=300&h=200&fit=crop',
    validUntil: 'Every Monday',
  },
];

export default function OffersScreen() {
  const renderOffer = (offer: Offer) => (
    <TouchableOpacity
      key={offer.id}
      style={styles.offerCard}
      activeOpacity={0.8}>
      <Image source={{uri: offer.image}} style={styles.offerImage} />
      <View style={styles.offerContent}>
        <View style={styles.discountBadge}>
          <Text style={styles.discountText}>{offer.discount}</Text>
        </View>
        <Text style={styles.offerTitle}>{offer.title}</Text>
        <Text style={styles.offerDescription}>{offer.description}</Text>
        <Text style={styles.validUntil}>{offer.validUntil}</Text>
        <TouchableOpacity style={styles.claimButton}>
          <Text style={styles.claimButtonText}>Claim Offer</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Special Offers</Text>
        <TouchableOpacity style={styles.notificationButton}>
          <Ionicons name="notifications-outline" size={24} color="#333" />
          <View style={styles.notificationDot} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Featured Offer */}
        <View style={styles.featuredSection}>
          <Text style={styles.sectionTitle}>Featured Deals</Text>
          <TouchableOpacity style={styles.featuredOffer} activeOpacity={0.8}>
            <Image
              source={{
                uri: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=400&h=200&fit=crop',
              }}
              style={styles.featuredImage}
            />
            <View style={styles.featuredOverlay}>
              <Text style={styles.featuredTitle}>Beauty Week</Text>
              <Text style={styles.featuredSubtitle}>
                Up to 70% off on selected items
              </Text>
              <View style={styles.featuredBadge}>
                <Text style={styles.featuredBadgeText}>Limited Time</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>

        {/* All Offers */}
        <View style={styles.offersSection}>
          <Text style={styles.sectionTitle}>All Offers</Text>
          {mockOffers.map(renderOffer)}
        </View>

        {/* Bottom Spacing */}
        <View style={styles.bottomSpacing} />
      </ScrollView>
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
  notificationButton: {
    position: 'relative',
    padding: 5,
  },
  notificationDot: {
    position: 'absolute',
    top: 5,
    right: 5,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#B85450',
  },
  content: {
    flex: 1,
  },
  featuredSection: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  featuredOffer: {
    position: 'relative',
    borderRadius: 15,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  featuredImage: {
    width: '100%',
    height: 180,
  },
  featuredOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    // Removed invalid 'background' property. Use a View with a gradient background instead if needed.
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 20,
  },
  featuredTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 5,
  },
  featuredSubtitle: {
    fontSize: 16,
    color: '#FFFFFF',
    opacity: 0.9,
    marginBottom: 10,
  },
  featuredBadge: {
    backgroundColor: '#B85450',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
    alignSelf: 'flex-start',
  },
  featuredBadgeText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  offersSection: {
    paddingHorizontal: 20,
  },
  offerCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    marginBottom: 15,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  offerImage: {
    width: '100%',
    height: 120,
  },
  offerContent: {
    padding: 15,
  },
  discountBadge: {
    position: 'absolute',
    top: -60,
    right: 15,
    backgroundColor: '#B85450',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
    zIndex: 1,
  },
  discountText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  offerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  offerDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
    lineHeight: 18,
  },
  validUntil: {
    fontSize: 12,
    color: '#999',
    marginBottom: 15,
  },
  claimButton: {
    backgroundColor: '#B85450',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  claimButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  bottomSpacing: {
    height: 30,
  },
});
