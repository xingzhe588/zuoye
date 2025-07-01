import { authApi } from '../authApi';
import { apiClient } from '../../../../shared/api/base';

// Mock the base API client
jest.mock('../../../../shared/api/base', () => ({
  apiClient: {
    post: jest.fn(),
    get: jest.fn(),
    put: jest.fn(),
    delete: jest.fn(),
  },
}));

const mockApiClient = apiClient as jest.Mocked<typeof apiClient>;

describe('authApi', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('login', () => {
    it('should call POST /auth/login with credentials', async () => {
      const mockResponse = {
        data: {
          user: { id: '1', username: 'testuser', email: 'test@example.com' },
          token: 'test-token',
        },
        _links: {},
      };

      mockApiClient.post.mockResolvedValue(mockResponse);

      const credentials = { username: 'testuser', password: 'password123' };
      const result = await authApi.login(credentials);

      expect(mockApiClient.post).toHaveBeenCalledWith('/auth/login', credentials);
      expect(result).toEqual(mockResponse);
    });

    it('should handle login errors', async () => {
      const mockError = new Error('Invalid credentials');
      mockApiClient.post.mockRejectedValue(mockError);

      const credentials = { username: 'testuser', password: 'wrongpassword' };

      await expect(authApi.login(credentials)).rejects.toThrow('Invalid credentials');
      expect(mockApiClient.post).toHaveBeenCalledWith('/auth/login', credentials);
    });
  });

  describe('register', () => {
    it('should call POST /auth/register with user data', async () => {
      const mockResponse = {
        data: {
          user: { id: '1', username: 'newuser', email: 'new@example.com' },
          token: 'new-token',
        },
        _links: {},
      };

      mockApiClient.post.mockResolvedValue(mockResponse);

      const userData = {
        username: 'newuser',
        email: 'new@example.com',
        password: 'password123',
        confirmPassword: 'password123',
        firstName: 'New',
        lastName: 'User',
      };

      const result = await authApi.register(userData);

      expect(mockApiClient.post).toHaveBeenCalledWith('/auth/register', userData);
      expect(result).toEqual(mockResponse);
    });

    it('should handle registration errors', async () => {
      const mockError = new Error('Username already exists');
      mockApiClient.post.mockRejectedValue(mockError);

      const userData = {
        username: 'existinguser',
        email: 'existing@example.com',
        password: 'password123',
        confirmPassword: 'password123',
        firstName: 'Existing',
        lastName: 'User',
      };

      await expect(authApi.register(userData)).rejects.toThrow('Username already exists');
      expect(mockApiClient.post).toHaveBeenCalledWith('/auth/register', userData);
    });
  });

  describe('logout', () => {
    it('should call POST /auth/logout', async () => {
      const mockResponse = { data: { message: 'Logged out successfully' }, _links: {} };
      mockApiClient.post.mockResolvedValue(mockResponse);

      const result = await authApi.logout();

      expect(mockApiClient.post).toHaveBeenCalledWith('/auth/logout');
      expect(result).toEqual(mockResponse);
    });

    it('should handle logout errors', async () => {
      const mockError = new Error('Logout failed');
      mockApiClient.post.mockRejectedValue(mockError);

      await expect(authApi.logout()).rejects.toThrow('Logout failed');
      expect(mockApiClient.post).toHaveBeenCalledWith('/auth/logout');
    });
  });

  describe('refreshToken', () => {
    it('should call POST /auth/refresh', async () => {
      const mockResponse = {
        data: { token: 'new-refresh-token' },
        _links: {},
      };

      mockApiClient.post.mockResolvedValue(mockResponse);

      const result = await authApi.refreshToken('test-refresh-token');

      expect(mockApiClient.post).toHaveBeenCalledWith('/auth/refresh');
      expect(result).toEqual(mockResponse);
    });

    it('should handle refresh token errors', async () => {
      const mockError = new Error('Token refresh failed');
      mockApiClient.post.mockRejectedValue(mockError);

      await expect(authApi.refreshToken('invalid-token')).rejects.toThrow('Token refresh failed');
      expect(mockApiClient.post).toHaveBeenCalledWith('/auth/refresh');
    });
  });

  describe('getCurrentUser', () => {
    it('should call GET /auth/me', async () => {
      const mockResponse = {
        data: {
          id: '1',
          username: 'testuser',
          email: 'test@example.com',
          firstName: 'Test',
          lastName: 'User',
        },
        _links: {},
      };

      mockApiClient.get.mockResolvedValue(mockResponse);

      const result = await authApi.getCurrentUser();

      expect(mockApiClient.get).toHaveBeenCalledWith('/auth/me');
      expect(result).toEqual(mockResponse);
    });

    it('should handle get current user errors', async () => {
      const mockError = new Error('Unauthorized');
      mockApiClient.get.mockRejectedValue(mockError);

      await expect(authApi.getCurrentUser()).rejects.toThrow('Unauthorized');
      expect(mockApiClient.get).toHaveBeenCalledWith('/auth/me');
    });
  });

  describe('API structure', () => {
    it('should have all required methods', () => {
      expect(typeof authApi.login).toBe('function');
      expect(typeof authApi.register).toBe('function');
      expect(typeof authApi.logout).toBe('function');
      expect(typeof authApi.refreshToken).toBe('function');
      expect(typeof authApi.getCurrentUser).toBe('function');
    });

    it('should export authApi object', () => {
      expect(authApi).toBeDefined();
      expect(typeof authApi).toBe('object');
    });
  });
});
