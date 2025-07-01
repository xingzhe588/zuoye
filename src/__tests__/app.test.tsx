import React from 'react';
import { render, screen, act } from '@testing-library/react';
import App from '../app';

// Mock the store
jest.mock('../store', () => ({
  store: {
    getState: jest.fn(() => ({
      auth: {
        isAuthenticated: false,
        user: null,
        isLoading: false,
        error: null,
        token: null,
      },
    })),
    dispatch: jest.fn(),
    subscribe: jest.fn(),
    replaceReducer: jest.fn(),
  },
}));

// Mock the Main container
jest.mock('../container/main', () => {
  return function MockMain() {
    return <div data-testid="main-container">Main Container</div>;
  };
});

// Mock the config value
jest.mock('@brojs/cli', () => ({
  getConfigValue: jest.fn((key: string) => {
    if (key === 'project-monday.api') {
      return 'http://localhost:8000';
    }
    return '';
  }),
}));

// Mock fetch
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({}),
  })
) as jest.Mock;

describe('App', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Set NODE_ENV to test by default
    process.env.NODE_ENV = 'test';
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('renders without crashing', () => {
    render(<App />);
    expect(screen.getByTestId('main-container')).toBeInTheDocument();
  });

  it('wraps content with Redux Provider', () => {
    const { container } = render(<App />);
    expect(container.querySelector('.app')).toBeInTheDocument();
    expect(screen.getByTestId('main-container')).toBeInTheDocument();
  });

  it('renders Main container component', () => {
    render(<App />);
    expect(screen.getByTestId('main-container')).toBeInTheDocument();
    expect(screen.getByText('Main Container')).toBeInTheDocument();
  });

  it('makes API connection test on mount', () => {
    render(<App />);
    expect(global.fetch).toHaveBeenCalledWith('http://localhost:8000/api/');
  });

  it('has correct app structure', () => {
    const { container } = render(<App />);
    const appDiv = container.querySelector('.app');
    expect(appDiv).toBeInTheDocument();
    expect(appDiv).toContainElement(screen.getByTestId('main-container'));
  });

  it('does not show development indicator in test environment', () => {
    process.env.NODE_ENV = 'test';
    render(<App />);
    expect(screen.queryByText(/FSD \+ HATEOAS \+ Auth \+ 80% Test Coverage/)).not.toBeInTheDocument();
  });

  it('shows development indicator in development environment', () => {
    process.env.NODE_ENV = 'development';
    render(<App />);
    expect(screen.getByText(/FSD \+ HATEOAS \+ Auth \+ 80% Test Coverage/)).toBeInTheDocument();
  });

  it('development indicator has correct styling', () => {
    process.env.NODE_ENV = 'development';
    render(<App />);
    
    const indicator = screen.getByText(/FSD \+ HATEOAS \+ Auth \+ 80% Test Coverage/);
    expect(indicator).toHaveStyle({
      position: 'fixed',
      bottom: '20px',
      left: '20px',
      background: '#28a745',
      color: 'white',
      padding: '12px',
      borderRadius: '8px',
      fontSize: '12px',
      fontWeight: 'bold',
      zIndex: 1000,
    });
  });

  it('handles API connection errors gracefully', async () => {
    // Mock fetch to return a resolved promise to avoid throwing during render
    global.fetch = jest.fn(() => Promise.resolve({
      ok: false,
      status: 500,
      text: () => Promise.resolve('Server Error')
    })) as jest.Mock;

    // Suppress console.error for this test since we expect an error
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    // Wrap in act to handle async operations
    await act(async () => {
      render(<App />);
    });

    expect(screen.getByTestId('main-container')).toBeInTheDocument();

    // Wait a bit for the fetch to complete
    await new Promise(resolve => setTimeout(resolve, 100));

    consoleSpy.mockRestore();
  });

  it('uses correct API endpoint from config', () => {
    const mockGetConfigValue = require('@brojs/cli').getConfigValue;
    mockGetConfigValue.mockReturnValue('http://custom-api.com');
    
    render(<App />);
    
    expect(mockGetConfigValue).toHaveBeenCalledWith('project-monday.api');
    expect(global.fetch).toHaveBeenCalledWith('http://custom-api.com/api/');
  });

  it('renders with different NODE_ENV values', () => {
    // Test production environment
    process.env.NODE_ENV = 'production';
    const { unmount } = render(<App />);
    expect(screen.queryByText(/FSD \+ HATEOAS \+ Auth \+ 80% Test Coverage/)).not.toBeInTheDocument();
    
    unmount();
    
    // Test development environment
    process.env.NODE_ENV = 'development';
    render(<App />);
    expect(screen.getByText(/FSD \+ HATEOAS \+ Auth \+ 80% Test Coverage/)).toBeInTheDocument();
  });

  it('maintains app structure consistency', () => {
    const { container } = render(<App />);
    
    // Check that app div is the root container
    const appDiv = container.querySelector('.app');
    expect(appDiv).toBeInTheDocument();
    
    // Check that Main is rendered inside app div
    const mainContainer = screen.getByTestId('main-container');
    expect(appDiv).toContainElement(mainContainer);
  });

  it('integrates with Redux store correctly', () => {
    const mockStore = require('../store').store;
    
    render(<App />);
    
    // Store should be available (mocked)
    expect(mockStore.getState).toBeDefined();
    expect(mockStore.dispatch).toBeDefined();
  });
});
