// Base API configuration and utilities
import { getConfigValue } from '@brojs/cli';

export const API_BASE_URL = getConfigValue('project-monday.api');

// HATEOAS link interface
export interface HATEOASLink {
  href: string;
  rel: string;
  method?: string;
  title?: string;
}

// Base API response with HATEOAS links
export interface HATEOASResponse<T = any> {
  data: T;
  _links: Record<string, HATEOASLink>;
  _meta?: {
    features?: Record<string, boolean>;
    navigation?: Record<string, boolean>;
  };
}

// API client with HATEOAS support
export class APIClient {
  private baseURL: string;

  constructor(baseURL: string = API_BASE_URL) {
    this.baseURL = baseURL;
  }

  async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<HATEOASResponse<T>> {
    const url = `${this.baseURL}${endpoint}`;

    // Get auth token from localStorage
    const token = localStorage.getItem('token');
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...options.headers as Record<string, string>,
    };

    // Add authorization header if token exists
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(url, {
      headers,
      ...options,
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`API request failed: ${response.status}`, errorText);
      throw new Error(`API request failed: ${response.status} - ${errorText}`);
    }

    return response.json();
  }

  async get<T>(endpoint: string): Promise<HATEOASResponse<T>> {
    return this.request<T>(endpoint, { method: 'GET' });
  }

  async post<T>(endpoint: string, data: any): Promise<HATEOASResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async put<T>(endpoint: string, data: any): Promise<HATEOASResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async delete<T>(endpoint: string): Promise<HATEOASResponse<T>> {
    return this.request<T>(endpoint, { method: 'DELETE' });
  }
}

export const apiClient = new APIClient();
