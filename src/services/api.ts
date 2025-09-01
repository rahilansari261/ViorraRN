import { API_CONFIG, API_ENDPOINTS, API_PARAMS } from '../constants/Api';
import { Product, ProductResponse, SearchResponse } from '../types';

class ApiService {
  private baseUrl: string;
  private timeout: number;

  constructor() {
    this.baseUrl = API_CONFIG.BASE_URL;
    this.timeout = API_CONFIG.TIMEOUT;
  }

  private async fetchWithTimeout(url: string, options: RequestInit = {}): Promise<Response> {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.timeout);

    try {
      const response = await fetch(url, {
        ...options,
        signal: controller.signal,
      });
      clearTimeout(timeoutId);
      return response;
    } catch (error) {
      clearTimeout(timeoutId);
      throw error;
    }
  }

  private async handleResponse<T>(response: Response): Promise<T> {
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  }

  async getProducts(limit: number = API_PARAMS.DEFAULT_LIMIT, skip: number = API_PARAMS.DEFAULT_SKIP): Promise<ProductResponse> {
    try {
      const url = `${this.baseUrl}${API_ENDPOINTS.PRODUCTS}?limit=${limit}&skip=${skip}`;
      const response = await this.fetchWithTimeout(url);
      return this.handleResponse<ProductResponse>(response);
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  }

  async searchProducts(query: string, limit: number = API_PARAMS.DEFAULT_LIMIT, skip: number = API_PARAMS.DEFAULT_SKIP): Promise<SearchResponse> {
    try {
      const url = `${this.baseUrl}${API_ENDPOINTS.PRODUCT_SEARCH}?q=${encodeURIComponent(query)}&limit=${limit}&skip=${skip}`;
      const response = await this.fetchWithTimeout(url);
      return this.handleResponse<SearchResponse>(response);
    } catch (error) {
      console.error('Error searching products:', error);
      throw error;
    }
  }

  async getProductsByCategory(category: string, limit: number = API_PARAMS.DEFAULT_LIMIT, skip: number = API_PARAMS.DEFAULT_SKIP): Promise<ProductResponse> {
    try {
      const url = `${this.baseUrl}${API_ENDPOINTS.PRODUCT_BY_CATEGORY}/${encodeURIComponent(category)}?limit=${limit}&skip=${skip}`;
      const response = await this.fetchWithTimeout(url);
      return this.handleResponse<ProductResponse>(response);
    } catch (error) {
      console.error('Error fetching products by category:', error);
      throw error;
    }
  }

  async getProductById(id: number): Promise<Product> {
    try {
      const url = `${this.baseUrl}${API_ENDPOINTS.PRODUCT_BY_ID}/${id}`;
      const response = await this.fetchWithTimeout(url);
      return this.handleResponse<Product>(response);
    } catch (error) {
      console.error('Error fetching product by ID:', error);
      throw error;
    }
  }

  async getCategories(): Promise<string[]> {
    try {
      const url = `${this.baseUrl}${API_ENDPOINTS.PRODUCT_CATEGORIES}`;
      const response = await this.fetchWithTimeout(url);
      return this.handleResponse<string[]>(response);
    } catch (error) {
      console.error('Error fetching categories:', error);
      throw error;
    }
  }
}

export const apiService = new ApiService();
export default apiService;