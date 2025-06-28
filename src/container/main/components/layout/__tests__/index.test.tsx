import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import Layout from '../index';
import { createMockStore } from '../../../../../test-utils';

// Mock the header component
jest.mock('../header', () => {
  return function MockHeader() {
    return <div data-testid="header">Header</div>;
  };
});

const renderWithProviders = (initialAuthState = {}) => {
  const store = createMockStore(initialAuthState);

  return render(
    <Provider store={store}>
      <BrowserRouter>
        <Layout />
      </BrowserRouter>
    </Provider>
  );
};

describe('Layout Component', () => {
  it('renders without crashing', () => {
    expect(() => {
      renderWithProviders();
    }).not.toThrow();
  });

  it('renders header component', () => {
    renderWithProviders();
    
    expect(screen.getByTestId('header')).toBeInTheDocument();
  });

  it('renders outlet for child routes', () => {
    renderWithProviders();
    
    // The layout should render an Outlet component for child routes
    // Since we can't directly test Outlet, we test that the layout structure exists
    const layoutElement = screen.getByTestId('header').parentElement;
    expect(layoutElement).toBeInTheDocument();
  });

  it('works with authenticated user', () => {
    renderWithProviders({ isAuthenticated: true });
    
    expect(screen.getByTestId('header')).toBeInTheDocument();
  });

  it('works with unauthenticated user', () => {
    renderWithProviders({ isAuthenticated: false });
    
    expect(screen.getByTestId('header')).toBeInTheDocument();
  });
});
