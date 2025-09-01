  import { ItalianaText } from '../components/ItalianaText';
import { Ionicons } from '@react-native-vector-icons/ionicons';
import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  RefreshControl,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

interface Product {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  thumbnail: string;
  liked: boolean;
}

interface ApiResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

export default function HomeScreen({
  navigation,
}: {
  navigation: any;
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [totalProducts, setTotalProducts] = useState(0);
  const [isSearching, setIsSearching] = useState(false);
  const [searchTimeout, setSearchTimeout] = useState<ReturnType<
    typeof setTimeout
  > | null>(null);
  const [, setShowFilterModal] = useState(false);
  const limit = 10;

  const fetchProducts = useCallback(
    async (
      page: number = 0,
      isRefresh: boolean = false,
      searchTerm?: string
    ) => {
      try {
        setLoading(true);
        setError(null);

        const skip = page * limit;
        let url = `https://dummyjson.com/products?limit=${limit}&skip=${skip}`;

        // If searching, use the search endpoint
        if (searchTerm && searchTerm.trim()) {
          url = `https://dummyjson.com/products/search?q=${encodeURIComponent(
            searchTerm.trim()
          )}&limit=${limit}&skip=${skip}`;
        }

        const response = await fetch(url);

        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }

        const data: ApiResponse = await response.json();

        if (isRefresh) {
          setProducts(
            data.products.map((product) => ({ ...product, liked: false }))
          );
        } else {
          setProducts((prev) => [
            ...prev,
            ...data.products.map((product) => ({ ...product, liked: false })),
          ]);
        }

        setTotalProducts(data.total);
        setHasMore(skip + limit < data.total);
        setCurrentPage(page);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Something went wrong");
      } finally {
        setLoading(false);
        setRefreshing(false);
      }
    },
    [limit]
  );

  const handleSearch = useCallback(
    (query: string) => {
      setSearchQuery(query);

      // Clear existing timeout
      if (searchTimeout) {
        clearTimeout(searchTimeout);
      }

      // Set new timeout for debounced search
      const timeout = setTimeout(() => {
        if (query.trim()) {
          setIsSearching(true);
          setCurrentPage(0);
          setHasMore(true);
          fetchProducts(0, true, query.trim());
        } else {
          // If search is empty, fetch all products
          setIsSearching(false);
          setCurrentPage(0);
          setHasMore(true);
          fetchProducts(0, true);
        }
      }, 500); // 500ms debounce

      setSearchTimeout(timeout);
    },
    [searchTimeout, fetchProducts]
  );

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setCurrentPage(0);
    setHasMore(true);
    if (searchQuery.trim()) {
      fetchProducts(0, true, searchQuery.trim());
    } else {
      fetchProducts(0, true);
    }
  }, [fetchProducts, searchQuery]);

  const loadMore = useCallback(() => {
    if (!loading && hasMore) {
      if (searchQuery.trim()) {
        fetchProducts(currentPage + 1, false, searchQuery.trim());
      } else {
        fetchProducts(currentPage + 1);
      }
    }
  }, [loading, hasMore, currentPage, fetchProducts, searchQuery]);

  useEffect(() => {
    fetchProducts(0, true);
  }, [fetchProducts]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (searchTimeout) {
        clearTimeout(searchTimeout);
      }
    };
  }, [searchTimeout]);

  const toggleLike = (productId: number) => {
    setProducts(
      products.map((product) =>
        product.id === productId
          ? { ...product, liked: !product.liked }
          : product
      )
    );
  };

  const clearSearch = useCallback(() => {
    setSearchQuery("");
    setIsSearching(false);
    setCurrentPage(0);
    setHasMore(true);
    setProducts([]); // Clear existing products
    setTotalProducts(0); // Reset total count
    fetchProducts(0, true); // Fetch fresh data from API
  }, [fetchProducts]);

  const renderProduct = ({ item }: { item: Product }) => (
    <TouchableOpacity
      style={styles.productCard}
      onPress={() => navigation.navigate('Product', { id: item.id })}
      activeOpacity={0.8}
    >
      <Image source={{ uri: item.thumbnail }} style={styles.productImage} />
      <View style={styles.productInfo}>
        <Text style={styles.productName} numberOfLines={2}>
          {item.title}
        </Text>
        <Text style={styles.productPrice}>${item.price.toFixed(2)}</Text>
        <Text style={styles.productCategory}>{item.category}</Text>
      </View>
      <TouchableOpacity
        style={styles.likeButton}
        onPress={() => toggleLike(item.id)}
      >
        <Ionicons
          name={item.liked ? "heart" : "heart-outline"}
          size={20}
          color="#000000"
        />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  const renderFooter = () => {
    if (!hasMore) {
      return (
        <View style={styles.footerContainer}>
          <Text style={styles.footerText}>
            {isSearching
              ? "No more search results"
              : "No more products to load"}
          </Text>
        </View>
      );
    }

    // Only show loading footer when loading more products (not initial load)
    if (loading && products.length > 0) {
      return (
        <View style={styles.footerContainer}>
          <ActivityIndicator size="small" color="#B84953" />
          <Text style={styles.footerText}>
            {isSearching
              ? "Loading more search results..."
              : "Loading more products..."}
          </Text>
        </View>
      );
    }

    return null;
  };

  const renderEmpty = () => {
    // Show loading state only for initial load (when no products exist yet)
    if (loading && products.length === 0) {
      return (
        <View style={styles.emptyContainer}>
          <ActivityIndicator size="large" color="#B84953" />
          <Text style={styles.emptyText}>Loading products...</Text>
        </View>
      );
    }

    if (error) {
      return (
        <View style={styles.emptyContainer}>
          <Ionicons name="alert-circle-outline" size={48} color="#B84953" />
          <Text style={styles.emptyText}>{error}</Text>
          <TouchableOpacity style={styles.retryButton} onPress={onRefresh}>
            <Text style={styles.retryButtonText}>Retry</Text>
          </TouchableOpacity>
        </View>
      );
    }

    if (isSearching && products.length === 0) {
      return (
        <View style={styles.emptyContainer}>
          <Ionicons name="search-outline" size={48} color="#B84953" />
          <Text style={styles.emptyText}>
            No products found for &quot;{searchQuery}&quot;
          </Text>
          <TouchableOpacity style={styles.retryButton} onPress={clearSearch}>
            <Text style={styles.retryButtonText}>Clear Search</Text>
          </TouchableOpacity>
        </View>
      );
    }

    return (
      <View style={styles.emptyContainer}>
        <Ionicons name="search-outline" size={48} color="#B84953" />
        <Text style={styles.emptyText}>No products found</Text>
      </View>
    );
  };

  const searchResultsText = useMemo(() => {
    if (isSearching) {
      return `${totalProducts} search results for "${searchQuery}"`;
    }
    return `${totalProducts} products`;
  }, [isSearching, totalProducts, searchQuery]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FCEDEA" />

      {/* Header */}
      <View style={styles.header}>
        <ItalianaText style={styles.brandName}>Viorra</ItalianaText>
        <View style={styles.headerIcons}>
          <TouchableOpacity style={styles.iconButton}>
            <Ionicons name="notifications-outline" size={24} color="#333" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <Ionicons name="bag-outline" size={24} color="#333" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Ionicons
            name="search-outline"
            size={20}
            color="#999"
            style={styles.searchIcon}
          />
          <TextInput
            style={styles.searchInput}
            placeholder="Search for product name or desc."
            placeholderTextColor="#999"
            value={searchQuery}
            onChangeText={handleSearch}
            returnKeyType="search"
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={clearSearch} style={styles.clearButton}>
              <Ionicons name="close-circle" size={20} color="#999" />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Best Products Section */}
      <View style={styles.sectionHeader}>
        <View style={styles.sectionTitleContainer}>
          <Text style={styles.sectionTitle}>
            {isSearching ? "Search Results" : "Best Products"}
          </Text>
          <Text style={styles.productCount}>{searchResultsText}</Text>
        </View>
        {!isSearching && (
          <TouchableOpacity
            style={styles.filterButton}
            onPress={() => setShowFilterModal(true)}
          >
            <Text style={styles.filterText}>Apply Filter</Text>
            <Ionicons name="chevron-down" size={16} color="#666" />
          </TouchableOpacity>
        )}
      </View>

      {/* Products Grid */}
      <FlatList
        data={products}
        renderItem={renderProduct}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        columnWrapperStyle={styles.productRow}
        contentContainerStyle={styles.productsContainer}
        showsVerticalScrollIndicator={false}
        onEndReached={loadMore}
        onEndReachedThreshold={0.1}
        ListFooterComponent={renderFooter}
        ListEmptyComponent={renderEmpty}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={["#B84953"]}
            tintColor="#B84953"
          />
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FCEDEA",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: "#FCEDEA",
  },
  brandName: {
    fontSize: 30,
    fontWeight: "400",
    color: "#B84953",
    lineHeight: 21,
    letterSpacing: -0.32,
  },
  headerIcons: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconButton: {
    marginLeft: 15,
  },
  searchContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
    borderRadius: 25,
    paddingHorizontal: 15,
    paddingVertical: 12,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: "#333",
  },
  clearButton: {
    marginLeft: 10,
    padding: 2,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingBottom: 15,
    backgroundColor: "#FCEDEA",
    paddingTop: 15,
  },
  sectionTitleContainer: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 2,
  },
  productCount: {
    fontSize: 14,
    color: "#666",
  },
  filterButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#E5E5E5",
  },
  filterText: {
    fontSize: 14,
    color: "#666",
    marginRight: 5,
  },
  productsContainer: {
    backgroundColor: "#FCEDEA",
    paddingHorizontal: 10,
    paddingBottom: 20,
    minHeight: 400,
  },
  productRow: {
    justifyContent: "space-between",
    paddingHorizontal: 10,
  },
  productCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 12,
    marginBottom: 15,
    width: "47%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 1,
  },
  productImage: {
    width: "100%",
    height: 120,
    borderRadius: 8,
    marginBottom: 12,
  },
  productInfo: {
    marginBottom: 8,
  },
  productName: {
    fontSize: 14,
    fontWeight: "600",
    color: "#000000",
    marginBottom: 4,
    lineHeight: 18,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000000",
    marginBottom: 2,
  },
  productCategory: {
    fontSize: 12,
    color: "#666",
    textTransform: "capitalize",
  },
  likeButton: {
    position: "absolute",
    bottom: 12,
    right: 12,
    padding: 4,
  },
  footerContainer: {
    paddingVertical: 20,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
  },
  footerText: {
    marginLeft: 10,
    color: "#666",
    fontSize: 14,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 16,
    color: "#666",
    marginTop: 16,
    textAlign: "center",
    paddingHorizontal: 20,
  },
  retryButton: {
    backgroundColor: "#B84953",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    marginTop: 16,
  },
  retryButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "600",
  },
});