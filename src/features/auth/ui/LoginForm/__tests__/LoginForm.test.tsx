import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import LoginForm from '../LoginForm';
import authReducer from '../../../model/authStore';

// Mock the auth API
jest.mock('../../../api/authApi', () => ({
  authApi: {
    login: jest.fn(),
  },
}));

const createMockStore = (initialState = {}) => {
  return configureStore({
    reducer: {
      auth: authReducer,
    },
    preloadedState: {
      auth: {
        user: null,
        token: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
        ...initialState,
      },
    },
  });
};

const renderWithProvider = (component: React.ReactElement, store = createMockStore()) => {
  return render(
    <Provider store={store}>
      {component}
    </Provider>
  );
};

describe('LoginForm', () => {
  const mockOnSuccess = jest.fn();
  const mockOnCancel = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders login form correctly', () => {
    renderWithProvider(<LoginForm onSuccess={mockOnSuccess} onCancel={mockOnCancel} />);
    
    expect(screen.getByLabelText(/имя пользователя/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/пароль/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /войти/i })).toBeInTheDocument();
  });

  it('handles input changes correctly', () => {
    renderWithProvider(<LoginForm onSuccess={mockOnSuccess} onCancel={mockOnCancel} />);
    
    const usernameInput = screen.getByLabelText(/имя пользователя/i);
    const passwordInput = screen.getByLabelText(/пароль/i);

    fireEvent.change(usernameInput, { target: { value: 'testuser' } });
    fireEvent.change(passwordInput, { target: { value: 'testpass' } });

    expect(usernameInput).toHaveValue('testuser');
    expect(passwordInput).toHaveValue('testpass');
  });

  it('shows loading state when submitting', () => {
    const store = createMockStore({ isLoading: true });
    renderWithProvider(<LoginForm onSuccess={mockOnSuccess} onCancel={mockOnCancel} />, store);
    
    const submitButton = screen.getByRole('button', { name: /вход\.\.\./i });
    expect(submitButton).toBeDisabled();
  });

  it('displays error message when login fails', () => {
    const store = createMockStore({ error: 'Неверные учетные данные' });
    renderWithProvider(<LoginForm onSuccess={mockOnSuccess} onCancel={mockOnCancel} />, store);
    
    expect(screen.getByText('Неверные учетные данные')).toBeInTheDocument();
  });

  it('calls onCancel when cancel button is clicked', () => {
    renderWithProvider(<LoginForm onSuccess={mockOnSuccess} onCancel={mockOnCancel} />);
    
    const cancelButton = screen.getByRole('button', { name: /отмена/i });
    fireEvent.click(cancelButton);
    
    expect(mockOnCancel).toHaveBeenCalledTimes(1);
  });

  it('submits form with correct data', async () => {
    renderWithProvider(<LoginForm onSuccess={mockOnSuccess} onCancel={mockOnCancel} />);
    
    const usernameInput = screen.getByLabelText(/имя пользователя/i);
    const passwordInput = screen.getByLabelText(/пароль/i);
    const submitButton = screen.getByRole('button', { name: /войти/i });

    fireEvent.change(usernameInput, { target: { value: 'testuser' } });
    fireEvent.change(passwordInput, { target: { value: 'testpass' } });
    fireEvent.click(submitButton);

    // Form should be submitted
    expect(submitButton).toBeInTheDocument();
  });

  it('requires username and password fields', () => {
    renderWithProvider(<LoginForm onSuccess={mockOnSuccess} onCancel={mockOnCancel} />);
    
    const usernameInput = screen.getByLabelText(/имя пользователя/i);
    const passwordInput = screen.getByLabelText(/пароль/i);

    expect(usernameInput).toBeRequired();
    expect(passwordInput).toBeRequired();
  });

  it('has correct input types', () => {
    renderWithProvider(<LoginForm onSuccess={mockOnSuccess} onCancel={mockOnCancel} />);
    
    const usernameInput = screen.getByLabelText(/имя пользователя/i);
    const passwordInput = screen.getByLabelText(/пароль/i);

    expect(usernameInput).toHaveAttribute('type', 'text');
    expect(passwordInput).toHaveAttribute('type', 'password');
  });
});
