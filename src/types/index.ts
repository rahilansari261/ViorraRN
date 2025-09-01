export interface Product {
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
}

export interface ProductResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

export interface SearchResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

export interface FilterOptions {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  sortBy?: 'title' | 'price' | 'rating';
  sortOrder?: 'asc' | 'desc';
}

export interface User {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
  token: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface ProductState {
  products: Product[];
  filteredProducts: Product[];
  isLoading: boolean;
  error: string | null;
  total: number;
  skip: number;
  limit: number;
  hasMore: boolean;
  filters: FilterOptions;
  searchQuery: string;
}

export interface RootState {
  auth: AuthState;
  products: ProductState;
}

export interface NavigationProps {
  navigation: any;
  route: any;
}

export interface TabBarIconProps {
  focused: boolean;
  color: string;
  size: number;
} 