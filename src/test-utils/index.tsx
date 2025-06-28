import React, { ReactElement } from 'react';
import { render, RenderOptions, act } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import authReducer, { AuthState } from '../features/auth/model/authStore';

// Re-export testing utilities
export { act } from '@testing-library/react';
export * from '@testing-library/react';

// Mock FeatureProvider for testing
const MockFeatureProvider: React.FC<{ children: React.ReactNode; initialFeatures?: any }> = ({
  children
}) => {
  return <>{children}</>;
};

// Mock router for testing
export const createMockRouter = (router: any = {}) => ({
  basePath: '',
  pathname: '/',
  route: '/',
  query: {},
  asPath: '/',
  back: jest.fn(),
  beforePopState: jest.fn(),
  prefetch: jest.fn(),
  push: jest.fn(),
  reload: jest.fn(),
  replace: jest.fn(),
  events: {
    on: jest.fn(),
    off: jest.fn(),
    emit: jest.fn(),
  },
  isFallback: false,
  isLocaleDomain: false,
  isReady: true,
  defaultLocale: 'en',
  domainLocales: [],
  isPreview: false,
  ...router,
});

// Create a simple mock reducer for testing
const createMockAuthReducer = (initialState: AuthState) => {
  return (state = initialState, action: any) => {
    switch (action.type) {
      case 'auth/loginStart':
        return { ...state, isLoading: true, error: null };
      case 'auth/loginSuccess':
        return { ...state, isLoading: false, isAuthenticated: true, user: action.payload };
      case 'auth/loginFailure':
        return { ...state, isLoading: false, error: action.payload };
      case 'auth/logout':
        return { ...state, isAuthenticated: false, user: null, token: null };
      default:
        return state;
    }
  };
};

// Create mock store with proper AuthState structure
export const createMockStore = (initialAuthState: Partial<AuthState> = {}) => {
  const defaultAuthState: AuthState = {
    isAuthenticated: false,
    user: null,
    token: null,
    isLoading: false,
    error: null,
    ...initialAuthState,
  };

  const mockAuthReducer = createMockAuthReducer(defaultAuthState);

  return configureStore({
    reducer: {
      auth: mockAuthReducer,
    },
    preloadedState: {
      auth: defaultAuthState,
    },
  });
};

// Test providers wrapper
interface TestProvidersProps {
  children: React.ReactNode;
  initialAuthState?: Partial<AuthState>;
  initialFeatures?: any;
  routerMock?: any;
}

export const TestProviders: React.FC<TestProvidersProps> = ({ 
  children, 
  initialAuthState = {},
  initialFeatures = {},
  routerMock = {}
}) => {
  const store = createMockStore(initialAuthState);
  
  return (
    <Provider store={store}>
      <BrowserRouter>
        <MockFeatureProvider initialFeatures={initialFeatures}>
          {children}
        </MockFeatureProvider>
      </BrowserRouter>
    </Provider>
  );
};

// Custom render function
interface CustomRenderOptions extends Omit<RenderOptions, 'wrapper'> {
  initialAuthState?: Partial<AuthState>;
  initialFeatures?: any;
  routerMock?: any;
}

export const customRender = (
  ui: ReactElement,
  options: CustomRenderOptions = {}
) => {
  const { initialAuthState, initialFeatures, routerMock, ...renderOptions } = options;
  
  const Wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <TestProviders 
      initialAuthState={initialAuthState}
      initialFeatures={initialFeatures}
      routerMock={routerMock}
    >
      {children}
    </TestProviders>
  );

  return render(ui, { wrapper: Wrapper, ...renderOptions });
};

// Re-export everything from testing library
export * from '@testing-library/react';
export { customRender as render };

// Common test utilities
export const mockApiResponse = (data: any, status = 200) => ({
  data,
  status,
  statusText: 'OK',
  headers: {},
  config: {},
  _links: {},
});

export const mockHATEOASResponse = (data: any) => ({
  data,
  _links: {},
});

// Common mock functions
export const mockFunctions = {
  navigate: jest.fn(),
  dispatch: jest.fn(),
  onSuccess: jest.fn(),
  onError: jest.fn(),
  onCancel: jest.fn(),
  onClick: jest.fn(),
  onChange: jest.fn(),
  onSubmit: jest.fn(),
};

// Reset all mocks
export const resetAllMocks = () => {
  Object.values(mockFunctions).forEach(mock => mock.mockClear());
  jest.clearAllMocks();
};

// Common test data
export const testData = {
  user: {
    id: 1,
    username: 'testuser',
    email: 'test@example.com',
    firstName: 'Test',
    lastName: 'User',
  },
  authState: {
    authenticated: {
      isAuthenticated: true,
      user: {
        id: 1,
        username: 'testuser',
        email: 'test@example.com',
        firstName: 'Test',
        lastName: 'User',
      },
      token: 'test-token',
      isLoading: false,
      error: null,
    },
    unauthenticated: {
      isAuthenticated: false,
      user: null,
      token: null,
      isLoading: false,
      error: null,
    },
    loading: {
      isAuthenticated: false,
      user: null,
      token: null,
      isLoading: true,
      error: null,
    },
    error: {
      isAuthenticated: false,
      user: null,
      token: null,
      isLoading: false,
      error: 'Test error message',
    },
  },
};
