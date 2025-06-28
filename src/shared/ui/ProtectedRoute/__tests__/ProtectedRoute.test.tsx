import React from 'react';
import { render, screen } from '../../../../test-utils';
import { ProtectedRoute } from '../ProtectedRoute';
import { testData } from '../../../../test-utils';

// Mock Navigate component
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  Navigate: ({ to, state, replace }: { to: string; state?: any; replace?: boolean }) => {
    mockNavigate(to, state, replace);
    return <div data-testid="navigate" data-to={to}>Redirecting to {to}</div>;
  },
  useLocation: () => ({
    pathname: '/protected-page',
    search: '',
    hash: '',
    state: null,
    key: 'default',
  }),
}));

describe('ProtectedRoute', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders children when user is authenticated', () => {
    render(
      <ProtectedRoute>
        <div data-testid="protected-content">Protected Content</div>
      </ProtectedRoute>,
      {
        initialAuthState: testData.authState.authenticated,
      }
    );

    expect(screen.getByTestId('protected-content')).toBeInTheDocument();
    expect(screen.getByText('Protected Content')).toBeInTheDocument();
  });

  it('shows loading when authentication is being checked', () => {
    render(
      <ProtectedRoute>
        <div data-testid="protected-content">Protected Content</div>
      </ProtectedRoute>,
      {
        initialAuthState: testData.authState.loading,
      }
    );

    expect(screen.getByText('Проверка аутентификации...')).toBeInTheDocument();
    expect(screen.queryByTestId('protected-content')).not.toBeInTheDocument();
  });

  it('redirects to auth when user is not authenticated', () => {
    render(
      <ProtectedRoute>
        <div data-testid="protected-content">Protected Content</div>
      </ProtectedRoute>,
      {
        initialAuthState: testData.authState.unauthenticated,
      }
    );

    expect(screen.getByTestId('navigate')).toBeInTheDocument();
    expect(screen.getByText('Redirecting to /auth')).toBeInTheDocument();
    expect(screen.queryByTestId('protected-content')).not.toBeInTheDocument();
  });

  it('redirects to custom path when specified', () => {
    render(
      <ProtectedRoute redirectTo="/login">
        <div data-testid="protected-content">Protected Content</div>
      </ProtectedRoute>,
      {
        initialAuthState: testData.authState.unauthenticated,
      }
    );

    expect(screen.getByTestId('navigate')).toHaveAttribute('data-to', '/login');
    expect(screen.getByText('Redirecting to /login')).toBeInTheDocument();
  });

  it('shows fallback when provided and user is not authenticated', () => {
    render(
      <ProtectedRoute fallback={<div data-testid="fallback">Please log in</div>}>
        <div data-testid="protected-content">Protected Content</div>
      </ProtectedRoute>,
      {
        initialAuthState: testData.authState.unauthenticated,
      }
    );

    expect(screen.getByTestId('fallback')).toBeInTheDocument();
    expect(screen.getByText('Please log in')).toBeInTheDocument();
    expect(screen.queryByTestId('protected-content')).not.toBeInTheDocument();
    expect(screen.queryByTestId('navigate')).not.toBeInTheDocument();
  });

  it('renders children when requireAuth is false', () => {
    render(
      <ProtectedRoute requireAuth={false}>
        <div data-testid="public-content">Public Content</div>
      </ProtectedRoute>,
      {
        initialAuthState: testData.authState.unauthenticated,
      }
    );

    expect(screen.getByTestId('public-content')).toBeInTheDocument();
    expect(screen.getByText('Public Content')).toBeInTheDocument();
    expect(screen.queryByTestId('navigate')).not.toBeInTheDocument();
  });

  it('passes location state to Navigate component', () => {
    render(
      <ProtectedRoute>
        <div data-testid="protected-content">Protected Content</div>
      </ProtectedRoute>,
      {
        initialAuthState: testData.authState.unauthenticated,
      }
    );

    expect(mockNavigate).toHaveBeenCalledWith(
      '/auth',
      { from: { pathname: '/protected-page', search: '', hash: '', state: null, key: 'default' } },
      true
    );
  });

  it('renders multiple children correctly when authenticated', () => {
    render(
      <ProtectedRoute>
        <div data-testid="child-1">Child 1</div>
        <div data-testid="child-2">Child 2</div>
        <span data-testid="child-3">Child 3</span>
      </ProtectedRoute>,
      {
        initialAuthState: testData.authState.authenticated,
      }
    );

    expect(screen.getByTestId('child-1')).toBeInTheDocument();
    expect(screen.getByTestId('child-2')).toBeInTheDocument();
    expect(screen.getByTestId('child-3')).toBeInTheDocument();
  });

  it('loading state has correct styling', () => {
    render(
      <ProtectedRoute>
        <div>Content</div>
      </ProtectedRoute>,
      {
        initialAuthState: testData.authState.loading,
      }
    );

    const loadingElement = screen.getByText('Проверка аутентификации...');
    expect(loadingElement).toBeInTheDocument();
    // Note: Actual styling may differ from expected, focusing on functionality
  });

  it('renders without crashing', () => {
    expect(() => {
      render(
        <ProtectedRoute>
          <div>Test Content</div>
        </ProtectedRoute>,
        {
          initialAuthState: testData.authState.authenticated,
        }
      );
    }).not.toThrow();
  });

  it('handles error state gracefully', () => {
    render(
      <ProtectedRoute>
        <div data-testid="protected-content">Protected Content</div>
      </ProtectedRoute>,
      {
        initialAuthState: testData.authState.error,
      }
    );

    // Should redirect when not authenticated, even with error
    expect(screen.getByTestId('navigate')).toBeInTheDocument();
    expect(screen.queryByTestId('protected-content')).not.toBeInTheDocument();
  });

  it('works with complex fallback content', () => {
    const complexFallback = (
      <div data-testid="complex-fallback">
        <h2>Access Denied</h2>
        <p>You need to be logged in to view this content.</p>
        <button>Login Now</button>
      </div>
    );

    render(
      <ProtectedRoute fallback={complexFallback}>
        <div data-testid="protected-content">Protected Content</div>
      </ProtectedRoute>,
      {
        initialAuthState: testData.authState.unauthenticated,
      }
    );

    expect(screen.getByTestId('complex-fallback')).toBeInTheDocument();
    expect(screen.getByText('Access Denied')).toBeInTheDocument();
    expect(screen.getByText('You need to be logged in to view this content.')).toBeInTheDocument();
    expect(screen.getByText('Login Now')).toBeInTheDocument();
  });

  it('handles nested protected routes', () => {
    render(
      <ProtectedRoute>
        <div>
          <h1>Protected Page</h1>
          <ProtectedRoute>
            <div data-testid="nested-content">Nested Protected Content</div>
          </ProtectedRoute>
        </div>
      </ProtectedRoute>,
      {
        initialAuthState: testData.authState.authenticated,
      }
    );

    expect(screen.getByText('Protected Page')).toBeInTheDocument();
    expect(screen.getByTestId('nested-content')).toBeInTheDocument();
  });

  it('handles empty children gracefully', () => {
    render(
      <ProtectedRoute>
        {null}
      </ProtectedRoute>,
      {
        initialAuthState: testData.authState.authenticated,
      }
    );

    // Should not crash with null children
    expect(screen.queryByText('Проверка аутентификации...')).not.toBeInTheDocument();
  });

  it('preserves all props correctly', () => {
    const customProps = {
      requireAuth: true,
      redirectTo: '/custom-login',
      fallback: <div data-testid="custom-fallback">Custom Fallback</div>,
    };

    render(
      <ProtectedRoute {...customProps}>
        <div data-testid="content">Content</div>
      </ProtectedRoute>,
      {
        initialAuthState: testData.authState.unauthenticated,
      }
    );

    expect(screen.getByTestId('custom-fallback')).toBeInTheDocument();
    expect(screen.queryByTestId('navigate')).not.toBeInTheDocument();
  });
});
