// Test utilities for FSD architecture
import React from 'react';
import { render, RenderOptions, act } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../../features/auth/model/authStore';
import { FeatureProvider } from '../../app/providers/FeatureProvider';

// Create a test store
const createTestStore = (preloadedState?: any) => {
  return configureStore({
    reducer: {
      auth: authReducer,
    } as any,
    preloadedState,
  });
};

// Custom render function with providers
interface CustomRenderOptions extends Omit<RenderOptions, 'wrapper'> {
  preloadedState?: any;
  store?: ReturnType<typeof createTestStore>;
}

export const renderWithProviders = (
  ui: React.ReactElement,
  {
    preloadedState = {},
    store = createTestStore(preloadedState),
    ...renderOptions
  }: CustomRenderOptions = {}
) => {
  const Wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <FeatureProvider>
            {children}
          </FeatureProvider>
        </BrowserRouter>
      </Provider>
    );
  };

  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
};

// Mock API responses
export const mockApiResponse = <T,>(data: T, links: Record<string, any> = {}, meta: Record<string, any> = {}) => ({
  data,
  _links: links,
  _meta: meta,
});

// Mock user data
export const mockUser = {
  id: 1,
  username: 'testuser',
  email: 'test@example.com',
  firstName: 'Test',
  lastName: 'User',
  bio: 'Test bio',
  location: 'Test City',
  website: 'https://test.com',
  avatar: '/test-avatar.jpg',
};

// Mock auth state
export const mockAuthState = {
  user: mockUser,
  token: 'test-token',
  isAuthenticated: true,
  isLoading: false,
  error: null,
};

// Feature flags for testing
export const mockFeatures = {
  auth: true,
  userCenter: true,
  artGeneration: true,
  collection: true,
  contact: true,
  navigation: true,
};

export * from '@testing-library/react';
export { default as userEvent } from '@testing-library/user-event';
