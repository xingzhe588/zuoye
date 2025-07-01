import { listService } from '../index';
import { network } from '../../network';
import { GetListResponse } from '../types';

// Mock the network service
jest.mock('../../network', () => ({
  network: {
    get: jest.fn(),
  },
}));

const mockNetwork = network as jest.Mocked<typeof network>;

describe('ListService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('fetches list data successfully', async () => {
    const mockListData: GetListResponse = [
      {
        id: 1,
        title: 'Test Item 1',
        description: 'Description for test item 1',
      },
      {
        id: 2,
        title: 'Test Item 2',
        description: 'Description for test item 2',
      },
    ];

    const mockResponse = {
      data: mockListData,
    };

    mockNetwork.get.mockResolvedValue(mockResponse);

    const result = await listService.getList();

    expect(mockNetwork.get).toHaveBeenCalledWith('/list');
    expect(result).toEqual(mockListData);
  });

  it('handles empty list response', async () => {
    const mockResponse = {
      data: [],
    };

    mockNetwork.get.mockResolvedValue(mockResponse);

    const result = await listService.getList();

    expect(mockNetwork.get).toHaveBeenCalledWith('/list');
    expect(result).toEqual([]);
  });

  it('handles network error', async () => {
    const networkError = new Error('Network error');
    mockNetwork.get.mockRejectedValue(networkError);

    await expect(listService.getList()).rejects.toThrow('Network error');
    expect(mockNetwork.get).toHaveBeenCalledWith('/list');
  });

  it('handles API error response', async () => {
    const apiError = {
      response: {
        status: 500,
        data: { message: 'Internal server error' },
      },
    };

    mockNetwork.get.mockRejectedValue(apiError);

    await expect(listService.getList()).rejects.toEqual(apiError);
  });

  it('returns correct data structure', async () => {
    const mockListData: GetListResponse = [
      {
        id: 123,
        title: 'Sample Title',
        description: 'Sample Description',
      },
    ];

    const mockResponse = {
      data: mockListData,
    };

    mockNetwork.get.mockResolvedValue(mockResponse);

    const result = await listService.getList();

    expect(result).toHaveLength(1);
    expect(result[0]).toHaveProperty('id', 123);
    expect(result[0]).toHaveProperty('title', 'Sample Title');
    expect(result[0]).toHaveProperty('description', 'Sample Description');
  });

  it('is a singleton instance', () => {
    const { listService: anotherInstance } = require('../index');
    expect(listService).toBe(anotherInstance);
  });

  it('has getList method', () => {
    expect(listService).toHaveProperty('getList');
    expect(typeof listService.getList).toBe('function');
  });

  it('handles large list response', async () => {
    const mockListData: GetListResponse = Array.from({ length: 1000 }, (_, index) => ({
      id: index + 1,
      title: `Item ${index + 1}`,
      description: `Description for item ${index + 1}`,
    }));

    const mockResponse = {
      data: mockListData,
    };

    mockNetwork.get.mockResolvedValue(mockResponse);

    const result = await listService.getList();

    expect(result).toHaveLength(1000);
    expect(result[0].id).toBe(1);
    expect(result[999].id).toBe(1000);
  });
});
