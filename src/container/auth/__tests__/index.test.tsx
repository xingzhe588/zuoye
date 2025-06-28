import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { createMockStore, testData } from '../../../test-utils';
import AuthContainer from '../index';

// Mock navigation
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

// Mock getNavigationValue
jest.mock('@brojs/cli', () => ({
  getNavigationValue: jest.fn((key: string) => {
    if (key === 'project-monday.main') return '/';
    return '';
  }),
}));

// Mock auth actions - define before using
const mockLoginUser = jest.fn(() => Promise.resolve({ type: 'auth/loginUser/fulfilled' }));
const mockRegisterUser = jest.fn(() => Promise.resolve({ type: 'auth/registerUser/fulfilled' }));

jest.mock('../../../features/auth/model/authStore', () => ({
  ...jest.requireActual('../../../features/auth/model/authStore'),
  loginUser: mockLoginUser,
  registerUser: mockRegisterUser,
}));

// Custom render function
const renderWithProviders = (ui: React.ReactElement, initialAuthState = {}) => {
  const store = createMockStore(initialAuthState);

  return render(
    <Provider store={store}>
      <BrowserRouter>
        {ui}
      </BrowserRouter>
    </Provider>
  );
};

describe('AuthContainer', () => {
  const defaultAuthState = {
    isAuthenticated: false,
    user: null,
    isLoading: false,
    error: null,
    token: null,
  };

  beforeEach(() => {
    jest.clearAllMocks();
    mockLoginUser.mockClear();
    mockRegisterUser.mockClear();
    // Mock window.alert
    window.alert = jest.fn();
  });

  it('renders login form by default', () => {
    renderWithProviders(<AuthContainer />, defaultAuthState);

    expect(screen.getByText('Вход в систему')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Имя пользователя')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Пароль')).toBeInTheDocument();
    expect(screen.getByText('Войти')).toBeInTheDocument();
  });

  it('switches to registration form', () => {
    renderWithProviders(<AuthContainer />, defaultAuthState);

    fireEvent.click(screen.getByText('Зарегистрироваться'));

    expect(screen.getByText('Регистрация')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Подтвердите пароль')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Имя')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Фамилия')).toBeInTheDocument();
  });

  it('handles input changes', () => {
    renderWithProviders(<AuthContainer />, defaultAuthState);

    const usernameInput = screen.getByPlaceholderText('Имя пользователя') as HTMLInputElement;
    const passwordInput = screen.getByPlaceholderText('Пароль') as HTMLInputElement;

    fireEvent.change(usernameInput, { target: { value: 'testuser' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    expect(usernameInput.value).toBe('testuser');
    expect(passwordInput.value).toBe('password123');
  });

  it('submits login form', async () => {
    renderWithProviders(<AuthContainer />, defaultAuthState);

    fireEvent.change(screen.getByPlaceholderText('Имя пользователя'), {
      target: { value: 'testuser' }
    });
    fireEvent.change(screen.getByPlaceholderText('Пароль'), {
      target: { value: 'password123' }
    });

    fireEvent.click(screen.getByText('Войти'));

    await waitFor(() => {
      expect(mockLoginUser).toHaveBeenCalledWith({
        username: 'testuser',
        password: 'password123',
      });
    });
  });

  it('submits registration form', async () => {
    renderWithProviders(<AuthContainer />, defaultAuthState);

    // Switch to registration
    fireEvent.click(screen.getByText('Зарегистрироваться'));

    // Fill form
    fireEvent.change(screen.getByPlaceholderText('Имя пользователя'), {
      target: { value: 'newuser' }
    });
    fireEvent.change(screen.getByPlaceholderText('Email'), {
      target: { value: 'new@example.com' }
    });
    fireEvent.change(screen.getByPlaceholderText('Пароль'), {
      target: { value: 'password123' }
    });
    fireEvent.change(screen.getByPlaceholderText('Подтвердите пароль'), {
      target: { value: 'password123' }
    });
    fireEvent.change(screen.getByPlaceholderText('Имя'), {
      target: { value: 'John' }
    });
    fireEvent.change(screen.getByPlaceholderText('Фамилия'), {
      target: { value: 'Doe' }
    });

    fireEvent.click(screen.getByText('Зарегистрироваться'));

    await waitFor(() => {
      expect(mockRegisterUser).toHaveBeenCalledWith({
        username: 'newuser',
        email: 'new@example.com',
        password: 'password123',
        confirmPassword: 'password123',
        firstName: 'John',
        lastName: 'Doe',
      });
    });
  });

  it('displays loading state', () => {
    renderWithProviders(<AuthContainer />, {
      ...defaultAuthState,
      isLoading: true,
    });

    expect(screen.getByText('Войти')).toBeDisabled();
  });

  it('displays error message', () => {
    renderWithProviders(<AuthContainer />, {
      ...defaultAuthState,
      error: 'Ошибка аутентификации',
    });

    expect(screen.getByText('Ошибка аутентификации')).toBeInTheDocument();
  });

  it('renders without crashing', () => {
    expect(() => {
      renderWithProviders(<AuthContainer />, defaultAuthState);
    }).not.toThrow();
  });
  it('shows error when passwords do not match', async () => {
    renderWithProviders(<AuthContainer />, defaultAuthState);

    // Switch to registration
    fireEvent.click(screen.getByText('Зарегистрироваться'));

    // Fill form with mismatched passwords
    fireEvent.change(screen.getByPlaceholderText('Пароль'), {
      target: { value: 'password123' }
    });
    fireEvent.change(screen.getByPlaceholderText('Подтвердите пароль'), {
      target: { value: 'different' }
    });

    fireEvent.click(screen.getByText('Зарегистрироваться'));

    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith('Пароли не совпадают');
    });
  });

  it('handles cancel button click', () => {
    renderWithProviders(<AuthContainer />, defaultAuthState);

    const cancelButton = screen.getByText('Отмена');
    fireEvent.click(cancelButton);

    expect(mockNavigate).toHaveBeenCalledWith('/');
  });

  it('renders all form elements correctly', () => {
    renderWithProviders(<AuthContainer />, defaultAuthState);

    expect(document.querySelector('.auth-container')).toBeInTheDocument();
    expect(document.querySelector('.auth-wrapper')).toBeInTheDocument();
    expect(document.querySelector('.auth-header')).toBeInTheDocument();
    expect(document.querySelector('.auth-tabs')).toBeInTheDocument();
    expect(document.querySelector('.auth-form')).toBeInTheDocument();
  });
});
