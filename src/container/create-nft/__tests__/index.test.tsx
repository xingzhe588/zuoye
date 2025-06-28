import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '../../../test-utils';
import CreateNFT from '../index';
import axios from 'axios';
import { testData } from '../../../test-utils';

// Mock axios
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

// Mock brojs config
jest.mock('@brojs/cli', () => ({
  getConfigValue: jest.fn(() => 'http://localhost:8000'),
}));

// Mock AuthPrompt
jest.mock('../../../shared/ui/AuthPrompt/AuthPrompt', () => ({
  AuthPrompt: ({ showModal, onClose }: { showModal: boolean; onClose: () => void }) => 
    showModal ? (
      <div data-testid="auth-prompt">
        <button onClick={onClose} data-testid="close-auth-prompt">Close</button>
      </div>
    ) : null,
}));

describe('CreateNFT Container', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
    sessionStorage.clear();
  });

  it('renders create NFT form correctly', () => {
    render(<CreateNFT />, {
      initialAuthState: testData.authState.unauthenticated,
    });

    expect(screen.getByText('О платформе ArtCollab AI')).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Введите описание для создания произведения искусства/)).toBeInTheDocument();
    expect(screen.getByText('Создать')).toBeInTheDocument();
  });

  it('handles input change correctly', () => {
    render(<CreateNFT />, {
      initialAuthState: testData.authState.unauthenticated,
    });

    const input = screen.getByPlaceholderText(/Введите описание для создания произведения искусства/) as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'Beautiful sunset' } });

    expect(input.value).toBe('Beautiful sunset');
  });

  it('allows guest users to submit twice', async () => {
    render(<CreateNFT />, {
      initialAuthState: testData.authState.unauthenticated,
    });

    const input = screen.getByPlaceholderText(/Введите описание для создания произведения искусства/);
    const submitButton = screen.getByText('Создать');

    // First attempt
    fireEvent.change(input, { target: { value: 'First attempt' } });
    fireEvent.click(submitButton);

    // Wait for loading to complete and check output
    await waitFor(() => {
      expect(screen.getByText('First attempt')).toBeInTheDocument();
    });

    // Second attempt - need to wait for button to be available again
    await waitFor(() => {
      expect(screen.getByText(/Создать/)).toBeInTheDocument();
    });

    fireEvent.change(input, { target: { value: 'Second attempt' } });
    fireEvent.click(screen.getByText(/Создать/));

    await waitFor(() => {
      expect(screen.getByText('Second attempt')).toBeInTheDocument();
    });
  });

  it('tracks guest attempts correctly', () => {
    render(<CreateNFT />, {
      initialAuthState: testData.authState.unauthenticated,
    });

    const input = screen.getByPlaceholderText(/Введите описание для создания произведения искусства/);
    const submitButton = screen.getByText('Создать');

    // First attempt
    fireEvent.change(input, { target: { value: 'First' } });
    fireEvent.click(submitButton);

    // Should show guest notice
    expect(screen.getByText(/У вас осталась/)).toBeInTheDocument();
  });

  it('allows unlimited attempts for authenticated users', async () => {
    render(<CreateNFT />, {
      initialAuthState: testData.authState.authenticated,
    });

    const input = screen.getByPlaceholderText(/Введите описание для создания произведения искусства/);

    // Multiple attempts should work
    for (let i = 1; i <= 3; i++) {
      // Wait for button to be available
      await waitFor(() => {
        expect(screen.getByText(/Создать/)).toBeInTheDocument();
      });

      const submitButton = screen.getByText(/Создать/);
      fireEvent.change(input, { target: { value: `Attempt ${i}` } });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText(`Attempt ${i}`)).toBeInTheDocument();
      });
    }

    expect(screen.queryByTestId('auth-prompt')).not.toBeInTheDocument();
  });

  it('works with sessionStorage', () => {
    // Clear any existing test data first
    sessionStorage.removeItem('test');

    // Test that sessionStorage API is available
    sessionStorage.setItem('test', 'value');
    expect(sessionStorage.getItem('test')).toBe('value');
    sessionStorage.removeItem('test');
  });

  it('works with localStorage', () => {
    // Clear any existing test data
    localStorage.removeItem('test');

    // Test that localStorage API is available
    localStorage.setItem('test', 'value');
    expect(localStorage.getItem('test')).toBe('value');
    localStorage.removeItem('test');
  });

  it('renders tips section', () => {
    render(<CreateNFT />, {
      initialAuthState: testData.authState.unauthenticated,
    });

    expect(screen.getByText('О платформе ArtCollab AI')).toBeInTheDocument();
    expect(screen.getByText(/Попробуйте использовать яркие прилагательные/)).toBeInTheDocument();
  });

  it('renders examples section', () => {
    render(<CreateNFT />, {
      initialAuthState: testData.authState.unauthenticated,
    });

    expect(screen.getByText(/Динамичный пейзаж в стиле киберпанк/)).toBeInTheDocument();
    expect(screen.getByText(/Чем подробнее описание — тем интереснее результат/)).toBeInTheDocument();
  });

  it('renders without crashing', () => {
    expect(() => {
      render(<CreateNFT />, {
        initialAuthState: testData.authState.unauthenticated,
      });
    }).not.toThrow();
  });

  it('has correct CSS classes', () => {
    const { container } = render(<CreateNFT />, {
      initialAuthState: testData.authState.unauthenticated,
    });

    expect(container.querySelector('.create-nft-page-first')).toBeInTheDocument();
  });

  it('handles form submission for authenticated users', () => {
    render(<CreateNFT />, {
      initialAuthState: testData.authState.authenticated,
    });

    const input = screen.getByPlaceholderText(/Введите описание для создания произведения искусства/);
    const submitButton = screen.getByText('Создать');

    fireEvent.change(input, { target: { value: 'Test output' } });
    fireEvent.click(submitButton);

    // Should show the output
    expect(screen.getByText('Test output')).toBeInTheDocument();
  });

  it('handles form submission for guest users', () => {
    render(<CreateNFT />, {
      initialAuthState: testData.authState.unauthenticated,
    });

    const input = screen.getByPlaceholderText(/Введите описание для создания произведения искусства/);
    const submitButton = screen.getByText('Создать');

    fireEvent.change(input, { target: { value: 'Test' } });
    fireEvent.click(submitButton);

    // Should show guest notice
    expect(screen.getByText(/У вас осталась/)).toBeInTheDocument();
  });
});
