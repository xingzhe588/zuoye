import { userApi, UserProfile, UpdateProfileRequest, ChangePasswordRequest } from '../userApi';
import { apiClient } from '../../../../shared/api/base';

// Mock the apiClient
jest.mock('../../../../shared/api/base', () => ({
  apiClient: {
    get: jest.fn(),
    put: jest.fn(),
    post: jest.fn(),
    delete: jest.fn(),
    request: jest.fn(),
  },
}));

const mockApiClient = apiClient as jest.Mocked<typeof apiClient>;

describe('userApi', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getProfile', () => {
    it('successfully retrieves user profile', async () => {
      const mockProfile: UserProfile = {
        id: 1,
        username: 'testuser',
        email: 'test@example.com',
        firstName: 'Test',
        lastName: 'User',
        bio: 'Test bio',
        location: 'Test City',
        website: 'https://test.com',
        preferences: {
          theme: 'light',
          language: 'en',
          notifications: true,
        },
      };

      const mockResponse = {
        data: mockProfile,
        _links: {},
      };

      mockApiClient.get.mockResolvedValue(mockResponse);

      const result = await userApi.getProfile();

      expect(mockApiClient.get).toHaveBeenCalledWith('/api/auth/profile/');
      expect(result).toEqual(mockResponse);
    });

    it('handles error when retrieving profile', async () => {
      mockApiClient.get.mockRejectedValue(new Error('Network error'));

      await expect(userApi.getProfile()).rejects.toThrow('Network error');
    });
  });

  describe('updateProfile', () => {
    it('successfully updates user profile', async () => {
      const updateData: UpdateProfileRequest = {
        firstName: 'Updated',
        lastName: 'Name',
        bio: 'Updated bio',
        location: 'New City',
      };

      const mockUpdatedProfile: UserProfile = {
        id: 1,
        username: 'testuser',
        email: 'test@example.com',
        firstName: 'Updated',
        lastName: 'Name',
        bio: 'Updated bio',
        location: 'New City',
      };

      const mockResponse = {
        data: mockUpdatedProfile,
        _links: {},
      };

      mockApiClient.put.mockResolvedValue(mockResponse);

      const result = await userApi.updateProfile(updateData);

      expect(mockApiClient.put).toHaveBeenCalledWith('/api/auth/profile/', updateData);
      expect(result).toEqual(mockResponse);
    });

    it('handles partial profile updates', async () => {
      const partialUpdate: UpdateProfileRequest = {
        bio: 'Only bio update',
      };

      const mockResponse = {
        data: { bio: 'Only bio update' },
        _links: {},
      };

      mockApiClient.put.mockResolvedValue(mockResponse);

      await userApi.updateProfile(partialUpdate);

      expect(mockApiClient.put).toHaveBeenCalledWith('/api/auth/profile/', partialUpdate);
    });
  });

  describe('uploadAvatar', () => {
    it('successfully uploads avatar', async () => {
      const mockFile = new File(['test'], 'avatar.jpg', { type: 'image/jpeg' });
      const mockResponse = {
        data: { avatar: 'https://example.com/avatar.jpg' },
        _links: {},
      };

      mockApiClient.request.mockResolvedValue(mockResponse);

      const result = await userApi.uploadAvatar(mockFile);

      expect(mockApiClient.request).toHaveBeenCalledWith('/api/auth/avatar/', {
        method: 'POST',
        body: expect.any(FormData),
        headers: {},
      });
      expect(result).toEqual(mockResponse);
    });

    it('creates FormData with correct file', async () => {
      const mockFile = new File(['test'], 'avatar.jpg', { type: 'image/jpeg' });
      const mockResponse = {
        data: { avatar: 'https://example.com/avatar.jpg' },
        _links: {},
      };

      mockApiClient.request.mockResolvedValue(mockResponse);

      await userApi.uploadAvatar(mockFile);

      const callArgs = mockApiClient.request.mock.calls[0];
      const formData = callArgs[1]?.body as FormData;
      
      expect(formData).toBeInstanceOf(FormData);
      expect(formData.get('avatar')).toBe(mockFile);
    });
  });

  describe('changePassword', () => {
    it('successfully changes password', async () => {
      const passwordData: ChangePasswordRequest = {
        currentPassword: 'oldpassword',
        newPassword: 'newpassword',
      };

      const mockResponse = {
        data: undefined,
        _links: {},
      };

      mockApiClient.post.mockResolvedValue(mockResponse);

      const result = await userApi.changePassword(passwordData);

      expect(mockApiClient.post).toHaveBeenCalledWith('/api/auth/change-password/', passwordData);
      expect(result).toEqual(mockResponse);
    });

    it('handles password change error', async () => {
      const passwordData: ChangePasswordRequest = {
        currentPassword: 'wrongpassword',
        newPassword: 'newpassword',
      };

      mockApiClient.post.mockRejectedValue(new Error('Invalid current password'));

      await expect(userApi.changePassword(passwordData)).rejects.toThrow('Invalid current password');
    });
  });

  describe('updatePreferences', () => {
    it('successfully updates user preferences', async () => {
      const preferences = {
        theme: 'dark' as const,
        language: 'ru',
        notifications: false,
      };

      const mockResponse = {
        data: { preferences },
        _links: {},
      };

      mockApiClient.put.mockResolvedValue(mockResponse);

      const result = await userApi.updatePreferences(preferences);

      expect(mockApiClient.put).toHaveBeenCalledWith('/user/preferences/', { preferences });
      expect(result).toEqual(mockResponse);
    });

    it('handles undefined preferences', async () => {
      const mockResponse = {
        data: { preferences: undefined },
        _links: {},
      };

      mockApiClient.put.mockResolvedValue(mockResponse);

      await userApi.updatePreferences(undefined);

      expect(mockApiClient.put).toHaveBeenCalledWith('/user/preferences/', { preferences: undefined });
    });
  });

  describe('deleteAccount', () => {
    it('successfully deletes user account', async () => {
      const mockResponse = {
        data: undefined,
        _links: {},
      };

      mockApiClient.delete.mockResolvedValue(mockResponse);

      const result = await userApi.deleteAccount();

      expect(mockApiClient.delete).toHaveBeenCalledWith('/user/account/');
      expect(result).toEqual(mockResponse);
    });

    it('handles account deletion error', async () => {
      mockApiClient.delete.mockRejectedValue(new Error('Cannot delete account'));

      await expect(userApi.deleteAccount()).rejects.toThrow('Cannot delete account');
    });
  });

  describe('API error handling', () => {
    it('handles network errors consistently', async () => {
      const networkError = new Error('Network error');
      
      mockApiClient.get.mockRejectedValue(networkError);
      mockApiClient.put.mockRejectedValue(networkError);
      mockApiClient.post.mockRejectedValue(networkError);
      mockApiClient.delete.mockRejectedValue(networkError);
      mockApiClient.request.mockRejectedValue(networkError);

      await expect(userApi.getProfile()).rejects.toThrow('Network error');
      await expect(userApi.updateProfile({})).rejects.toThrow('Network error');
      await expect(userApi.changePassword({ currentPassword: 'a', newPassword: 'b' })).rejects.toThrow('Network error');
      await expect(userApi.deleteAccount()).rejects.toThrow('Network error');
      await expect(userApi.uploadAvatar(new File([''], 'test.jpg'))).rejects.toThrow('Network error');
    });
  });
});
