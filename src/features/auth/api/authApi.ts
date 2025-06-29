// Authentication API
import { apiClient, HATEOASResponse } from '../../../shared/api/base';

export interface User {
  id: number;
  username: string;
  email: string;
  firstName?: string;
  lastName?: string;
  avatar?: string;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  firstName?: string;
  lastName?: string;
}

export interface AuthResponse {
  user: User;
  token: string;
  refreshToken: string;
}

export const authApi = {
  async login(credentials: LoginRequest): Promise<HATEOASResponse<AuthResponse>> {
    return apiClient.post<AuthResponse>('/api/auth/login/', credentials);
  },

  async register(userData: RegisterRequest): Promise<HATEOASResponse<AuthResponse>> {
    // Map frontend field names to backend field names
    const backendData = {
      username: userData.username,
      email: userData.email,
      password: userData.password,
      confirm_password: userData.confirmPassword,
      first_name: userData.firstName,
      last_name: userData.lastName,
    };
    return apiClient.post<AuthResponse>('/api/auth/register/', backendData);
  },

  async logout(): Promise<HATEOASResponse<void>> {
    return apiClient.post<void>('/api/auth/logout/', {});
  },

  async refreshToken(refreshToken: string): Promise<HATEOASResponse<AuthResponse>> {
    return apiClient.post<AuthResponse>('/api/auth/refresh/', { refreshToken });
  },

  async getCurrentUser(): Promise<HATEOASResponse<User>> {
    return apiClient.get<User>('/api/auth/profile/');
  },
};
