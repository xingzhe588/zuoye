import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '../../../../../test-utils';
import { UserProfile } from '../UserProfile';
import { userApi } from '../../../api/userApi';
import { testData } from '../../../../../test-utils';

// Mock the userApi
jest.mock('../../../api/userApi', () => ({
  userApi: {
    getProfile: jest.fn(),
    updateProfile: jest.fn(),
    uploadAvatar: jest.fn(),
  },
}));

const mockUserApi = userApi as jest.Mocked<typeof userApi>;

const mockUserProfile = {
  id: 1,
  username: 'testuser',
  email: 'test@example.com',
  firstName: 'Test',
  lastName: 'User',
  bio: 'Test bio',
  location: 'Test City',
  website: 'https://test.com',
  birthDate: '1990-01-01',
  preferences: {
    theme: 'light' as const,
    language: 'en',
    notifications: true,
  },
};

describe('UserProfile', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders user profile correctly', async () => {
    mockUserApi.getProfile.mockResolvedValue({
      data: mockUserProfile,
      _links: {},
    });

    render(<UserProfile />, {
      initialAuthState: testData.authState.authenticated,
    });

    await waitFor(() => {
      expect(screen.getByText('Личный профиль')).toBeInTheDocument();
    });
  });

  it('loads profile data on mount', async () => {
    mockUserApi.getProfile.mockResolvedValue({
      data: mockUserProfile,
      _links: {},
    });

    render(<UserProfile />, {
      initialAuthState: testData.authState.authenticated,
    });

    await waitFor(() => {
      expect(mockUserApi.getProfile).toHaveBeenCalledTimes(1);
    });
  });

  it('displays loading state', () => {
    mockUserApi.getProfile.mockImplementation(() => new Promise(() => {})); // Never resolves

    render(<UserProfile />, {
      initialAuthState: testData.authState.authenticated,
    });

    expect(screen.getByText('Загрузка...')).toBeInTheDocument();
  });

  it('displays error state when profile loading fails', async () => {
    mockUserApi.getProfile.mockRejectedValue(new Error('Network error'));

    render(<UserProfile />, {
      initialAuthState: testData.authState.authenticated,
    });

    await waitFor(() => {
      expect(screen.getByText('Не удалось загрузить профиль пользователя')).toBeInTheDocument();
    });
  });

  it('displays profile information when loaded', async () => {
    mockUserApi.getProfile.mockResolvedValue({
      data: mockUserProfile,
      _links: {},
    });

    render(<UserProfile />, {
      initialAuthState: testData.authState.authenticated,
    });

    await waitFor(() => {
      expect(screen.getByText('Test User')).toBeInTheDocument();
      expect(screen.getByText('test@example.com')).toBeInTheDocument();
      expect(screen.getByText('Test bio')).toBeInTheDocument();
      expect(screen.getByText('Test City')).toBeInTheDocument();
    });
  });

  it('enters edit mode when edit button is clicked', async () => {
    mockUserApi.getProfile.mockResolvedValue({
      data: mockUserProfile,
      _links: {},
    });

    render(<UserProfile />, {
      initialAuthState: testData.authState.authenticated,
    });

    await waitFor(() => {
      expect(screen.getByText('Редактировать профиль')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText('Редактировать профиль'));

    expect(screen.getByText('Сохранить')).toBeInTheDocument();
    expect(screen.getByText('Отмена')).toBeInTheDocument();
  });

  it('shows form inputs in edit mode', async () => {
    mockUserApi.getProfile.mockResolvedValue({
      data: mockUserProfile,
      _links: {},
    });

    render(<UserProfile />, {
      initialAuthState: testData.authState.authenticated,
    });

    await waitFor(() => {
      fireEvent.click(screen.getByText('Редактировать профиль'));
    });

    expect(screen.getByDisplayValue('Test')).toBeInTheDocument(); // firstName
    expect(screen.getByDisplayValue('User')).toBeInTheDocument(); // lastName
    expect(screen.getByDisplayValue('Test bio')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Test City')).toBeInTheDocument();
    expect(screen.getByDisplayValue('https://test.com')).toBeInTheDocument();
  });

  it('updates form data when inputs change', async () => {
    mockUserApi.getProfile.mockResolvedValue({
      data: mockUserProfile,
      _links: {},
    });

    render(<UserProfile />, {
      initialAuthState: testData.authState.authenticated,
    });

    await waitFor(() => {
      fireEvent.click(screen.getByText('Редактировать профиль'));
    });

    const firstNameInput = screen.getByDisplayValue('Test');
    fireEvent.change(firstNameInput, { target: { value: 'Updated' } });

    expect(screen.getByDisplayValue('Updated')).toBeInTheDocument();
  });

  it('saves profile changes when save button is clicked', async () => {
    mockUserApi.getProfile.mockResolvedValue({
      data: mockUserProfile,
      _links: {},
    });

    mockUserApi.updateProfile.mockResolvedValue({
      data: { ...mockUserProfile, firstName: 'Updated' },
      _links: {},
    });

    render(<UserProfile />, {
      initialAuthState: testData.authState.authenticated,
    });

    await waitFor(() => {
      fireEvent.click(screen.getByText('Редактировать профиль'));
    });

    const firstNameInput = screen.getByDisplayValue('Test');
    fireEvent.change(firstNameInput, { target: { value: 'Updated' } });

    fireEvent.click(screen.getByText('Сохранить'));

    await waitFor(() => {
      expect(mockUserApi.updateProfile).toHaveBeenCalledWith({
        firstName: 'Updated',
        lastName: 'User',
        bio: 'Test bio',
        location: 'Test City',
        website: 'https://test.com',
        birthDate: '1990-01-01',
      });
    });
  });

  it('cancels editing when cancel button is clicked', async () => {
    mockUserApi.getProfile.mockResolvedValue({
      data: mockUserProfile,
      _links: {},
    });

    render(<UserProfile />, {
      initialAuthState: testData.authState.authenticated,
    });

    await waitFor(() => {
      fireEvent.click(screen.getByText('Редактировать профиль'));
    });

    const firstNameInput = screen.getByDisplayValue('Test');
    fireEvent.change(firstNameInput, { target: { value: 'Changed' } });

    fireEvent.click(screen.getByText('Отмена'));

    // Should exit edit mode and revert changes
    expect(screen.getByText('Редактировать профиль')).toBeInTheDocument();
    expect(screen.queryByText('Сохранить')).not.toBeInTheDocument();
  });

  it('renders avatar section', async () => {
    mockUserApi.getProfile.mockResolvedValue({
      data: mockUserProfile,
      _links: {},
    });

    render(<UserProfile />, {
      initialAuthState: testData.authState.authenticated,
    });

    await waitFor(() => {
      expect(screen.getByText('Личный профиль')).toBeInTheDocument();
    });

    // Check that avatar section exists
    expect(screen.getByAltText('Аватар пользователя')).toBeInTheDocument();
  });

  it('displays avatar when available', async () => {
    const profileWithAvatar = {
      ...mockUserProfile,
      avatar: 'https://example.com/avatar.jpg',
    };

    mockUserApi.getProfile.mockResolvedValue({
      data: profileWithAvatar,
      _links: {},
    });

    render(<UserProfile />, {
      initialAuthState: testData.authState.authenticated,
    });

    await waitFor(() => {
      const avatar = screen.getByAltText('Аватар пользователя');
      expect(avatar).toBeInTheDocument();
      expect(avatar).toHaveAttribute('src', 'https://example.com/avatar.jpg');
    });
  });

  it('renders without crashing', () => {
    mockUserApi.getProfile.mockResolvedValue({
      data: mockUserProfile,
      _links: {},
    });

    expect(() => {
      render(<UserProfile />, {
        initialAuthState: testData.authState.authenticated,
      });
    }).not.toThrow();
  });

  it('handles empty profile data gracefully', async () => {
    const emptyProfile = {
      id: 1,
      username: 'testuser',
      email: 'test@example.com',
      firstName: '',
      lastName: '',
    };

    mockUserApi.getProfile.mockResolvedValue({
      data: emptyProfile,
      _links: {},
    });

    render(<UserProfile />, {
      initialAuthState: testData.authState.authenticated,
    });

    await waitFor(() => {
      expect(screen.getByText('Личный профиль')).toBeInTheDocument();
    });

    // Should handle empty fields gracefully
    expect(screen.getByText('test@example.com')).toBeInTheDocument();
  });
});
