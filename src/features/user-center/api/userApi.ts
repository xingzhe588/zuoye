// User Center API
import { apiClient, HATEOASResponse } from '../../../shared/api/base';
import { User } from '../../auth/api/authApi';

export interface UserProfile extends User {
  bio?: string;
  location?: string;
  website?: string;
  birthDate?: string;
  preferences?: {
    theme: 'light' | 'dark';
    language: string;
    notifications: boolean;
  };
}

export interface UpdateProfileRequest {
  firstName?: string;
  lastName?: string;
  bio?: string;
  location?: string;
  website?: string;
  birthDate?: string;
}

export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
}

export const userApi = {
  async getProfile(): Promise<HATEOASResponse<UserProfile>> {
    return apiClient.get<UserProfile>('/api/auth/profile/');
  },

  async updateProfile(data: UpdateProfileRequest): Promise<HATEOASResponse<UserProfile>> {
    return apiClient.put<UserProfile>('/api/auth/profile/', data);
  },

  async uploadAvatar(file: File): Promise<HATEOASResponse<{ avatar: string }>> {
    const formData = new FormData();
    formData.append('avatar', file);

    return apiClient.request<{ avatar: string }>('/api/auth/avatar/', {
      method: 'POST',
      body: formData,
      headers: {}, // Let browser set Content-Type for FormData
    });
  },

  async changePassword(data: ChangePasswordRequest): Promise<HATEOASResponse<void>> {
    return apiClient.post<void>('/api/auth/change-password/', data);
  },

  async updatePreferences(preferences: UserProfile['preferences']): Promise<HATEOASResponse<UserProfile>> {
    return apiClient.put<UserProfile>('/user/preferences/', { preferences });
  },

  async deleteAccount(): Promise<HATEOASResponse<void>> {
    return apiClient.delete<void>('/user/account/');
  },
};
