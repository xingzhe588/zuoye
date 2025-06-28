import axios from 'axios';

// Mock axios
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

// Mock brojs config
jest.mock('@brojs/cli', () => ({
  getConfigValue: jest.fn(() => 'http://localhost:8000'),
}));

// Mock axios.create to return a mock instance
const mockAxiosInstance = {
  defaults: {
    headers: {
      authorization: '',
    },
  },
  get: jest.fn(),
  post: jest.fn(),
  put: jest.fn(),
  delete: jest.fn(),
};

mockedAxios.create.mockReturnValue(mockAxiosInstance as any);

describe('network service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Reset the mock instance headers
    mockAxiosInstance.defaults.headers.authorization = '';
  });

  it('creates axios instance with correct base URL', () => {
    // Import after mocks are set up
    const { network } = require('../network');

    expect(mockedAxios.create).toHaveBeenCalledWith({
      baseURL: 'http://localhost:8000',
    });
    expect(network).toBeDefined();
  });

  it('sets authorization token correctly', () => {
    const { setToken } = require('../network');
    const mockToken = 'test-token-123';

    setToken(mockToken);

    expect(mockAxiosInstance.defaults.headers.authorization).toBe(`Bearer ${mockToken}`);
  });

  it('exports network instance', () => {
    const { network } = require('../network');
    expect(network).toBeDefined();
  });

  it('exports setToken function', () => {
    const { setToken } = require('../network');
    expect(setToken).toBeDefined();
    expect(typeof setToken).toBe('function');
  });

  it('handles empty token', () => {
    const { setToken } = require('../network');

    setToken('');
    expect(mockAxiosInstance.defaults.headers.authorization).toBe('Bearer ');
  });

  it('handles token with special characters', () => {
    const { setToken } = require('../network');
    const specialToken = 'token-with-special-chars!@#$%^&*()';

    setToken(specialToken);
    expect(mockAxiosInstance.defaults.headers.authorization).toBe(`Bearer ${specialToken}`);
  });

  it('overwrites existing token', () => {
    const { setToken } = require('../network');

    // Set initial token
    setToken('old-token');

    const newToken = 'new-token-456';
    setToken(newToken);
    expect(mockAxiosInstance.defaults.headers.authorization).toBe(`Bearer ${newToken}`);
  });
});
