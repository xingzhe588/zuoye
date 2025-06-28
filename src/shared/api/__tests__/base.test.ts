import { apiClient } from '../base';

// Mock fetch globally
const mockFetch = jest.fn();
global.fetch = mockFetch;

// Mock localStorage
const mockLocalStorage = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};
Object.defineProperty(window, 'localStorage', {
  value: mockLocalStorage,
});

describe('API Client', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockLocalStorage.getItem.mockReturnValue(null);
  });

  describe('request method', () => {
    it('should make GET request successfully', async () => {
      const mockResponse = {
        ok: true,
        json: jest.fn().mockResolvedValue({
          data: { message: 'success' },
          _links: {},
          _meta: {},
        }),
      };
      mockFetch.mockResolvedValue(mockResponse);

      const result = await apiClient.get('/test');

      expect(mockFetch).toHaveBeenCalledWith(
        'http://localhost:8000/test',
        expect.objectContaining({
          method: 'GET',
          headers: expect.objectContaining({
            'Content-Type': 'application/json',
          }),
        })
      );
      expect(result.data).toEqual({ message: 'success' });
    });

    it('should include authorization header when token exists', async () => {
      mockLocalStorage.getItem.mockReturnValue('test-token');
      
      const mockResponse = {
        ok: true,
        json: jest.fn().mockResolvedValue({
          data: { message: 'success' },
          _links: {},
          _meta: {},
        }),
      };
      mockFetch.mockResolvedValue(mockResponse);

      await apiClient.get('/test');

      expect(mockFetch).toHaveBeenCalledWith(
        'http://localhost:8000/test',
        expect.objectContaining({
          headers: expect.objectContaining({
            'Content-Type': 'application/json',
            'Authorization': 'Token test-token',
          }),
        })
      );
    });

    it('should make POST request with data', async () => {
      const mockResponse = {
        ok: true,
        json: jest.fn().mockResolvedValue({
          data: { id: 1 },
          _links: {},
          _meta: {},
        }),
      };
      mockFetch.mockResolvedValue(mockResponse);

      const testData = { name: 'test' };
      await apiClient.post('/test', testData);

      expect(mockFetch).toHaveBeenCalledWith(
        'http://localhost:8000/test',
        expect.objectContaining({
          method: 'POST',
          body: JSON.stringify(testData),
          headers: expect.objectContaining({
            'Content-Type': 'application/json',
          }),
        })
      );
    });

    it('should handle API errors', async () => {
      const mockResponse = {
        ok: false,
        status: 400,
        text: jest.fn().mockResolvedValue('Bad Request'),
      };
      mockFetch.mockResolvedValue(mockResponse);

      await expect(apiClient.get('/test')).rejects.toThrow(
        'API request failed: 400 - Bad Request'
      );
    });

    it('should handle network errors', async () => {
      mockFetch.mockRejectedValue(new Error('Network error'));

      await expect(apiClient.get('/test')).rejects.toThrow('Network error');
    });

    it('should make PUT request', async () => {
      const mockResponse = {
        ok: true,
        json: jest.fn().mockResolvedValue({
          data: { updated: true },
          _links: {},
          _meta: {},
        }),
      };
      mockFetch.mockResolvedValue(mockResponse);

      const testData = { name: 'updated' };
      await apiClient.put('/test/1', testData);

      expect(mockFetch).toHaveBeenCalledWith(
        'http://localhost:8000/test/1',
        expect.objectContaining({
          method: 'PUT',
          body: JSON.stringify(testData),
        })
      );
    });

    it('should make DELETE request', async () => {
      const mockResponse = {
        ok: true,
        json: jest.fn().mockResolvedValue({
          data: null,
          _links: {},
          _meta: {},
        }),
      };
      mockFetch.mockResolvedValue(mockResponse);

      await apiClient.delete('/test/1');

      expect(mockFetch).toHaveBeenCalledWith(
        'http://localhost:8000/test/1',
        expect.objectContaining({
          method: 'DELETE',
        })
      );
    });

    it('should handle custom headers', async () => {
      const mockResponse = {
        ok: true,
        json: jest.fn().mockResolvedValue({
          data: { message: 'success' },
          _links: {},
          _meta: {},
        }),
      };
      mockFetch.mockResolvedValue(mockResponse);

      await apiClient.request('/test', {
        method: 'GET',
        headers: {
          'Custom-Header': 'custom-value',
        },
      });

      expect(mockFetch).toHaveBeenCalledWith(
        'http://localhost:8000/test',
        expect.objectContaining({
          method: 'GET',
          headers: expect.objectContaining({
            'Custom-Header': 'custom-value',
          }),
        })
      );
    });
  });
});
