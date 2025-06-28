import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { RegisterForm } from '../RegisterForm';
import authReducer from '../../../model/authStore';

// Mock the registerUser action
jest.mock('../../../model/authStore', () => ({
  ...jest.requireActual('../../../model/authStore'),
  registerUser: jest.fn(() => ({
    type: 'auth/registerUser',
    payload: Promise.resolve({ user: { id: 1, username: 'testuser' } }),
  })),
}));

const createMockStore = (initialState = {}) => {
  const mockAuthReducer = (state = {
    isAuthenticated: false,
    user: null,
    isLoading: false,
    error: null,
    token: null,
    ...initialState,
  }, action: any) => state;

  return configureStore({
    reducer: {
      auth: mockAuthReducer,
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

describe('RegisterForm', () => {
  const mockOnSuccess = jest.fn();
  const mockOnCancel = jest.fn();

  beforeEach(() => {
    mockOnSuccess.mockClear();
    mockOnCancel.mockClear();
  });

  it('renders register form correctly', () => {
    renderWithProvider(<RegisterForm onSuccess={mockOnSuccess} onCancel={mockOnCancel} />);
    
    expect(screen.getByText('Регистрация')).toBeInTheDocument();
    expect(screen.getByLabelText('Имя пользователя')).toBeInTheDocument();
    expect(screen.getByLabelText('Электронная почта')).toBeInTheDocument();
    expect(screen.getByLabelText('Пароль')).toBeInTheDocument();
    expect(screen.getByLabelText('Подтвердите пароль')).toBeInTheDocument();
    expect(screen.getByLabelText('Имя')).toBeInTheDocument();
    expect(screen.getByLabelText('Фамилия')).toBeInTheDocument();
  });

  it('renders form buttons', () => {
    renderWithProvider(<RegisterForm onSuccess={mockOnSuccess} onCancel={mockOnCancel} />);
    
    expect(screen.getByText('Зарегистрироваться')).toBeInTheDocument();
    expect(screen.getByText('Отмена')).toBeInTheDocument();
  });

  it('updates form data when inputs change', () => {
    renderWithProvider(<RegisterForm onSuccess={mockOnSuccess} onCancel={mockOnCancel} />);
    
    const usernameInput = screen.getByLabelText('Имя пользователя');
    const emailInput = screen.getByLabelText('Электронная почта');
    
    fireEvent.change(usernameInput, { target: { value: 'testuser' } });
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    
    expect(usernameInput).toHaveValue('testuser');
    expect(emailInput).toHaveValue('test@example.com');
  });

  it('shows validation error when passwords do not match', async () => {
    renderWithProvider(<RegisterForm onSuccess={mockOnSuccess} onCancel={mockOnCancel} />);

    const usernameInput = screen.getByLabelText('Имя пользователя');
    const emailInput = screen.getByLabelText('Электронная почта');
    const passwordInput = screen.getByLabelText('Пароль');
    const confirmPasswordInput = screen.getByLabelText('Подтвердите пароль');
    const submitButton = screen.getByText('Зарегистрироваться');

    // Fill required fields first
    await act(async () => {
      fireEvent.change(usernameInput, { target: { value: 'testuser' } });
      fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
      fireEvent.change(passwordInput, { target: { value: 'password123' } });
      fireEvent.change(confirmPasswordInput, { target: { value: 'password456' } });
    });

    await act(async () => {
      fireEvent.click(submitButton);
    });

    await waitFor(() => {
      expect(screen.getByText('Пароли не совпадают')).toBeInTheDocument();
    });
  });

  it('shows validation error for required fields', async () => {
    renderWithProvider(<RegisterForm onSuccess={mockOnSuccess} onCancel={mockOnCancel} />);

    const submitButton = screen.getByText('Зарегистрироваться');
    fireEvent.click(submitButton);

    await waitFor(() => {
      const errorMessage = document.querySelector('.error-message');
      expect(errorMessage).toBeInTheDocument();
      expect(errorMessage).toHaveTextContent('Введите имя пользователя');
    });
  });

  it('shows validation error for short password', async () => {
    renderWithProvider(<RegisterForm onSuccess={mockOnSuccess} onCancel={mockOnCancel} />);

    const usernameInput = screen.getByLabelText('Имя пользователя');
    const emailInput = screen.getByLabelText('Электронная почта');
    const passwordInput = screen.getByLabelText('Пароль');
    const confirmPasswordInput = screen.getByLabelText('Подтвердите пароль');
    const submitButton = screen.getByText('Зарегистрироваться');

    fireEvent.change(usernameInput, { target: { value: 'testuser' } });
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: '123' } });
    fireEvent.change(confirmPasswordInput, { target: { value: '123' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('Пароль должен содержать не менее 6 символов')).toBeInTheDocument();
    });
  });

  it('shows validation error for short password', async () => {
    renderWithProvider(<RegisterForm onSuccess={mockOnSuccess} onCancel={mockOnCancel} />);
    
    const usernameInput = screen.getByLabelText('Имя пользователя');
    const emailInput = screen.getByLabelText('Электронная почта');
    const passwordInput = screen.getByLabelText('Пароль');
    const confirmPasswordInput = screen.getByLabelText('Подтвердите пароль');
    const submitButton = screen.getByText('Зарегистрироваться');
    
    fireEvent.change(usernameInput, { target: { value: 'testuser' } });
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: '123' } });
    fireEvent.change(confirmPasswordInput, { target: { value: '123' } });
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(screen.getByText(/Пароль должен содержать/)).toBeInTheDocument();
    });
  });

  it('calls onCancel when cancel button is clicked', () => {
    renderWithProvider(<RegisterForm onSuccess={mockOnSuccess} onCancel={mockOnCancel} />);
    
    const cancelButton = screen.getByText('Отмена');
    fireEvent.click(cancelButton);
    
    expect(mockOnCancel).toHaveBeenCalledTimes(1);
  });

  it('displays loading state when isLoading is true', () => {
    const store = createMockStore({ isLoading: true });
    renderWithProvider(<RegisterForm onSuccess={mockOnSuccess} onCancel={mockOnCancel} />, store);
    
    const submitButton = screen.getByText('Регистрация...');
    expect(submitButton).toBeDisabled();
  });

  it('displays error message from store', () => {
    const store = createMockStore({ error: 'Registration failed' });
    renderWithProvider(<RegisterForm onSuccess={mockOnSuccess} onCancel={mockOnCancel} />, store);
    
    expect(screen.getByText('Registration failed')).toBeInTheDocument();
  });

  it('renders without crashing', () => {
    expect(() => {
      renderWithProvider(<RegisterForm />);
    }).not.toThrow();
  });

  it('works without onSuccess and onCancel props', () => {
    renderWithProvider(<RegisterForm />);

    expect(screen.getByText('Регистрация')).toBeInTheDocument();

    // Cancel button should not be rendered when onCancel is not provided
    expect(screen.queryByText('Отмена')).not.toBeInTheDocument();
  });
});
