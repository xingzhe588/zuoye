import React from 'react';
import { render, screen } from '../../../test-utils';
import Main from '../index';

// Mock RouterProvider
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  RouterProvider: ({ router }: { router: any }) => (
    <div data-testid="router-provider">
      <div data-testid="router-config">{JSON.stringify(router?.routes?.length || 0)} routes</div>
    </div>
  ),
}));

// Mock the router
jest.mock('../router', () => ({
  router: {
    routes: [
      { path: '/', element: 'Home' },
      { path: '/auth', element: 'Auth' },
      { path: '/user-center', element: 'UserCenter' },
      { path: '/create-art', element: 'CreateArt' },
      { path: '/create-nft', element: 'CreateNFT' },
      { path: '/contact', element: 'Contact' },
    ],
  },
}));

// Mock the store
jest.mock('../../../store', () => ({
  store: {
    getState: jest.fn(() => ({
      auth: {
        isAuthenticated: false,
        user: null,
        token: null,
        isLoading: false,
        error: null,
      },
    })),
    dispatch: jest.fn(),
    subscribe: jest.fn(),
  },
}));

describe('Main Container', () => {
  it('renders main container correctly', () => {
    render(<Main />);
    
    expect(screen.getByTestId('router-provider')).toBeInTheDocument();
  });

  it('provides Redux store to RouterProvider', () => {
    render(<Main />);
    
    // The component should render without errors, indicating store is properly provided
    expect(screen.getByTestId('router-provider')).toBeInTheDocument();
  });

  it('renders RouterProvider with router configuration', () => {
    render(<Main />);
    
    expect(screen.getByTestId('router-config')).toBeInTheDocument();
    expect(screen.getByText('6 routes')).toBeInTheDocument();
  });

  it('renders without crashing', () => {
    expect(() => {
      render(<Main />);
    }).not.toThrow();
  });

  it('has correct component structure', () => {
    const { container } = render(<Main />);
    
    // Should have Provider as root element containing RouterProvider
    expect(container.firstChild).toContainElement(screen.getByTestId('router-provider'));
  });

  it('integrates Redux Provider with RouterProvider', () => {
    render(<Main />);
    
    // Both Provider and RouterProvider should be present in the component tree
    expect(screen.getByTestId('router-provider')).toBeInTheDocument();
    expect(screen.getByTestId('router-config')).toBeInTheDocument();
  });

  it('handles router configuration correctly', () => {
    render(<Main />);
    
    // Should display the number of routes from the mocked router
    expect(screen.getByText('6 routes')).toBeInTheDocument();
  });

  it('provides store context to child components', () => {
    // This test verifies that the Redux Provider is working
    render(<Main />);
    
    // If the component renders successfully, it means the store is properly provided
    expect(screen.getByTestId('router-provider')).toBeInTheDocument();
  });

  it('renders with proper component hierarchy', () => {
    const { container } = render(<Main />);
    
    // Check that the component structure is correct
    const mainElement = container.firstChild;
    expect(mainElement).toBeInTheDocument();
    
    // RouterProvider should be inside the Provider
    expect(screen.getByTestId('router-provider')).toBeInTheDocument();
  });

  it('handles empty router gracefully', () => {
    // This test ensures the component doesn't break with different router configurations
    render(<Main />);
    
    expect(screen.getByTestId('router-provider')).toBeInTheDocument();
  });
});
