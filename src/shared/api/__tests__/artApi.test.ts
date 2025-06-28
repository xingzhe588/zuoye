import { generateArt, getUserArt, deleteArt } from '../artApi';
import { apiClient } from '../base';

// Mock the apiClient
jest.mock('../base', () => ({
  apiClient: {
    post: jest.fn(),
    get: jest.fn(),
    delete: jest.fn(),
  },
}));

const mockApiClient = apiClient as jest.Mocked<typeof apiClient>;

describe('artApi', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('generateArt', () => {
    it('successfully generates art', async () => {
      const mockRequest = {
        description: 'A beautiful sunset',
        style: 'realistic',
        size: '1024x1024'
      };

      const mockResponse = {
        data: {
          id: '123',
          imageUrl: 'https://example.com/image.jpg',
          description: 'A beautiful sunset',
          style: 'realistic',
          createdAt: '2023-01-01T00:00:00Z',
          userId: 'user123'
        },
        _links: {}
      };

      mockApiClient.post.mockResolvedValue(mockResponse);

      const result = await generateArt(mockRequest);

      expect(mockApiClient.post).toHaveBeenCalledWith('/api/art/generate/', mockRequest);
      expect(result).toEqual(mockResponse.data);
    });

    it('handles generation error', async () => {
      const mockRequest = {
        description: 'A beautiful sunset'
      };

      mockApiClient.post.mockRejectedValue(new Error('Network error'));

      await expect(generateArt(mockRequest)).rejects.toThrow('Ошибка при генерации арт-объекта');
    });

    it('works with minimal request data', async () => {
      const mockRequest = {
        description: 'Simple art'
      };

      const mockResponse = {
        data: {
          id: '456',
          imageUrl: 'https://example.com/simple.jpg',
          description: 'Simple art',
          createdAt: '2023-01-01T00:00:00Z'
        },
        _links: {}
      };

      mockApiClient.post.mockResolvedValue(mockResponse);

      const result = await generateArt(mockRequest);

      expect(result).toEqual(mockResponse.data);
    });
  });

  describe('getUserArt', () => {
    it('successfully retrieves user art', async () => {
      const mockUserId = 'user123';
      const mockResponse = {
        data: [
          {
            id: '1',
            imageUrl: 'https://example.com/art1.jpg',
            description: 'Art 1',
            createdAt: '2023-01-01T00:00:00Z'
          },
          {
            id: '2',
            imageUrl: 'https://example.com/art2.jpg',
            description: 'Art 2',
            createdAt: '2023-01-02T00:00:00Z'
          }
        ],
        _links: {}
      };

      mockApiClient.get.mockResolvedValue(mockResponse);

      const result = await getUserArt(mockUserId);

      expect(mockApiClient.get).toHaveBeenCalledWith(`/api/art/user/${mockUserId}/`);
      expect(result).toEqual(mockResponse.data);
    });

    it('handles error when retrieving user art', async () => {
      const mockUserId = 'user123';

      mockApiClient.get.mockRejectedValue(new Error('Network error'));

      await expect(getUserArt(mockUserId)).rejects.toThrow('Ошибка при получении арт-объектов пользователя');
    });

    it('handles empty user art list', async () => {
      const mockUserId = 'user123';
      const mockResponse = {
        data: [],
        _links: {}
      };

      mockApiClient.get.mockResolvedValue(mockResponse);

      const result = await getUserArt(mockUserId);

      expect(result).toEqual([]);
    });
  });

  describe('deleteArt', () => {
    it('successfully deletes art', async () => {
      const mockArtId = 'art123';

      mockApiClient.delete.mockResolvedValue({ data: null, _links: {} });

      await expect(deleteArt(mockArtId)).resolves.toBeUndefined();

      expect(mockApiClient.delete).toHaveBeenCalledWith(`/api/art/${mockArtId}/`);
    });

    it('handles error when deleting art', async () => {
      const mockArtId = 'art123';

      mockApiClient.delete.mockRejectedValue(new Error('Network error'));

      await expect(deleteArt(mockArtId)).rejects.toThrow('Ошибка при удалении арт-объекта');
    });

    it('handles deletion of non-existent art', async () => {
      const mockArtId = 'nonexistent';

      mockApiClient.delete.mockRejectedValue(new Error('Not found'));

      await expect(deleteArt(mockArtId)).rejects.toThrow('Ошибка при удалении арт-объекта');
    });
  });

  describe('API error handling', () => {
    it('handles network errors consistently', async () => {
      const networkError = new Error('Network error');
      
      mockApiClient.post.mockRejectedValue(networkError);
      mockApiClient.get.mockRejectedValue(networkError);
      mockApiClient.delete.mockRejectedValue(networkError);

      await expect(generateArt({ description: 'test' })).rejects.toThrow('Ошибка при генерации арт-объекта');
      await expect(getUserArt('user123')).rejects.toThrow('Ошибка при получении арт-объектов пользователя');
      await expect(deleteArt('art123')).rejects.toThrow('Ошибка при удалении арт-объекта');
    });

    it('handles API response errors', async () => {
      const apiError = new Error('API Error');
      
      mockApiClient.post.mockRejectedValue(apiError);

      await expect(generateArt({ description: 'test' })).rejects.toThrow('Ошибка при генерации арт-объекта');
    });
  });

  describe('Request validation', () => {
    it('accepts valid generation requests', async () => {
      const validRequests = [
        { description: 'Simple description' },
        { description: 'With style', style: 'abstract' },
        { description: 'With size', size: '512x512' },
        { description: 'Full request', style: 'realistic', size: '1024x1024' }
      ];

      const mockResponse = {
        data: {
          id: '123',
          imageUrl: 'https://example.com/image.jpg',
          description: 'Generated art',
          createdAt: '2023-01-01T00:00:00Z'
        },
        _links: {}
      };

      mockApiClient.post.mockResolvedValue(mockResponse);

      for (const request of validRequests) {
        await expect(generateArt(request)).resolves.toBeDefined();
      }
    });
  });
});
