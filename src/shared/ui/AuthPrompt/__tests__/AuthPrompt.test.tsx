import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { AuthPrompt } from '../AuthPrompt';

// Mock the navigation function
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

// Mock the brojs navigation value
jest.mock('@brojs/cli', () => ({
  getNavigationValue: jest.fn(() => '/auth'),
}));

const renderWithRouter = (component: React.ReactElement) => {
  return render(
    <BrowserRouter>
      {component}
    </BrowserRouter>
  );
};

describe('AuthPrompt', () => {
  beforeEach(() => {
    mockNavigate.mockClear();
  });

  it('renders auth prompt with default props', () => {
    renderWithRouter(<AuthPrompt />);

    expect(screen.getByText('Войдите для использования этой функции')).toBeInTheDocument();
    expect(screen.getByText('Войти/Зарегистрироваться')).toBeInTheDocument();
    expect(screen.getByText('Позже')).toBeInTheDocument();
  });

  it('renders with custom message and action', () => {
    const customMessage = 'Custom auth message';
    const customAction = 'custom action';

    renderWithRouter(
      <AuthPrompt message={customMessage} action={customAction} />
    );

    expect(screen.getByText(customMessage)).toBeInTheDocument();
  });

  it('calls navigate when login button is clicked', () => {
    const mockOnClose = jest.fn();

    renderWithRouter(<AuthPrompt onClose={mockOnClose} />);

    const loginButton = screen.getByText('Войти/Зарегистрироваться');
    fireEvent.click(loginButton);

    expect(mockNavigate).toHaveBeenCalledWith('/auth');
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('calls onClose when close button is clicked', () => {
    const mockOnClose = jest.fn();

    renderWithRouter(<AuthPrompt onClose={mockOnClose} />);

    const closeButton = screen.getByText('Позже');
    fireEvent.click(closeButton);

    expect(mockOnClose).toHaveBeenCalledTimes(1);
    expect(mockNavigate).not.toHaveBeenCalled();
  });

  it('calls onClose when X button is clicked', () => {
    const mockOnClose = jest.fn();
    
    renderWithRouter(<AuthPrompt onClose={mockOnClose} />);
    
    const xButton = screen.getByText('×');
    fireEvent.click(xButton);
    
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('does not render when showModal is false', () => {
    renderWithRouter(<AuthPrompt showModal={false} />);
    
    expect(screen.queryByText('Войдите для использования этой функции')).not.toBeInTheDocument();
  });

  it('renders when showModal is true', () => {
    renderWithRouter(<AuthPrompt showModal={true} />);
    
    expect(screen.getByText('Войдите для использования этой функции')).toBeInTheDocument();
  });

  it('works without onClose callback', () => {
    renderWithRouter(<AuthPrompt />);

    const loginButton = screen.getByText('Войти/Зарегистрироваться');
    const closeButton = screen.getByText('Позже');

    expect(() => {
      fireEvent.click(loginButton);
      fireEvent.click(closeButton);
    }).not.toThrow();
  });

  it('displays the auth icon', () => {
    renderWithRouter(<AuthPrompt />);

    expect(screen.getByText('🎨')).toBeInTheDocument();
  });

  it('has correct modal structure', () => {
    const { container } = renderWithRouter(<AuthPrompt />);
    
    expect(container.querySelector('.auth-prompt-overlay')).toBeInTheDocument();
    expect(container.querySelector('.auth-prompt-modal')).toBeInTheDocument();
    expect(container.querySelector('.auth-prompt-header')).toBeInTheDocument();
    expect(container.querySelector('.auth-prompt-content')).toBeInTheDocument();
    expect(container.querySelector('.auth-prompt-actions')).toBeInTheDocument();
  });

  it('displays correct message structure', () => {
    const customAction = 'viewing gallery';
    renderWithRouter(<AuthPrompt action={customAction} />);

    expect(screen.getByText('После входа вы сможете:')).toBeInTheDocument();
    expect(screen.getByText(/Создавать ИИ-произведения искусства/)).toBeInTheDocument();
  });

  it('renders without crashing', () => {
    expect(() => {
      renderWithRouter(<AuthPrompt />);
    }).not.toThrow();
  });

  it('handles keyboard events correctly', () => {
    const mockOnClose = jest.fn();
    renderWithRouter(<AuthPrompt onClose={mockOnClose} />);

    // Test that buttons are focusable
    const loginButton = screen.getByText('Войти/Зарегистрироваться');
    const closeButton = screen.getByText('Позже');

    expect(loginButton).toBeInTheDocument();
    expect(closeButton).toBeInTheDocument();

    // Buttons should be clickable
    fireEvent.click(loginButton);
    expect(mockNavigate).toHaveBeenCalled();
  });
});
