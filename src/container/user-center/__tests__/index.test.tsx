import React from 'react';
import { render, screen, fireEvent, waitFor } from '../../../test-utils';
import UserCenterContainer from '../index';
import { testData } from '../../../test-utils';

// Mock navigation
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

// Mock getNavigationValue
jest.mock('@brojs/cli', () => ({
  getNavigationValue: jest.fn((key: string) => {
    if (key === 'project-monday.auth') return '/auth';
    if (key === 'project-monday.main') return '/';
    return '';
  }),
}));

// Mock userApi
jest.mock('../../../features/user-center/api/userApi', () => ({
  userApi: {
    getProfile: jest.fn(),
    updateProfile: jest.fn(),
    uploadAvatar: jest.fn(),
    getUserArt: jest.fn(),
    deleteArt: jest.fn(),
  },
}));

const mockUserApi = require('../../../features/user-center/api/userApi').userApi;

// Mock auth actions
jest.mock('../../../features/auth/model/authStore', () => ({
  logoutUser: jest.fn(() => ({ type: 'auth/logoutUser' })),
}));

describe('UserCenterContainer', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockUserApi.getProfile.mockResolvedValue({
      data: {
        firstName: 'John',
        lastName: 'Doe',
        bio: 'Test bio',
        location: 'Test City',
        website: 'https://test.com',
      },
    });
    mockUserApi.getUserArt.mockResolvedValue({
      data: [
        { id: '1', title: 'Art 1', imageUrl: 'image1.jpg' },
        { id: '2', title: 'Art 2', imageUrl: 'image2.jpg' },
      ],
    });
  });

  it('redirects to auth when not authenticated', async () => {
    render(<UserCenterContainer />, {
      initialAuthState: testData.authState.unauthenticated,
    });

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/auth');
    });
  });

  it('loads and displays user profile when authenticated', async () => {
    render(<UserCenterContainer />, {
      initialAuthState: testData.authState.authenticated,
    });

    await waitFor(() => {
      expect(mockUserApi.getProfile).toHaveBeenCalled();
    });

    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument();
      expect(screen.getByText('Test bio')).toBeInTheDocument();
      expect(screen.getByText('Test City')).toBeInTheDocument();
      expect(screen.getByText('https://test.com')).toBeInTheDocument();
    });
  });

  it('displays loading state', () => {
    render(<UserCenterContainer />, {
      initialAuthState: testData.authState.authenticated,
    });

    expect(screen.getByText('Загрузка...')).toBeInTheDocument();
  });

  it('displays error state', async () => {
    mockUserApi.getProfile.mockRejectedValue(new Error('Network error'));

    render(<UserCenterContainer />, {
      initialAuthState: testData.authState.authenticated,
    });

    await waitFor(() => {
      expect(screen.getByText('Ошибка загрузки профиля пользователя')).toBeInTheDocument();
    });
  });

  it('enters edit mode when edit button is clicked', async () => {
    render(<UserCenterContainer />, {
      initialAuthState: testData.authState.authenticated,
    });

    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText('Редактировать профиль'));

    expect(screen.getByDisplayValue('John')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Doe')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Test bio')).toBeInTheDocument();
  });

  it('saves profile changes', async () => {
    mockUserApi.updateProfile.mockResolvedValue({
      data: { success: true },
    });

    render(<UserCenterContainer />, {
      initialAuthState: testData.authState.authenticated,
    });

    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument();
    });

    // Enter edit mode
    fireEvent.click(screen.getByText('Редактировать профиль'));

    // Change values
    fireEvent.change(screen.getByDisplayValue('John'), {
      target: { value: 'Jane' }
    });
    fireEvent.change(screen.getByDisplayValue('Test bio'), {
      target: { value: 'Updated bio' }
    });

    // Save changes
    fireEvent.click(screen.getByText('Сохранить'));

    await waitFor(() => {
      expect(mockUserApi.updateProfile).toHaveBeenCalledWith({
        firstName: 'Jane',
        lastName: 'Doe',
        bio: 'Updated bio',
        location: 'Test City',
        website: 'https://test.com',
      });
    });
  });

  it('cancels edit mode', async () => {
    render(<UserCenterContainer />, {
      initialAuthState: testData.authState.authenticated,
    });

    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument();
    });

    // Enter edit mode
    fireEvent.click(screen.getByText('Редактировать профиль'));

    // Change values
    fireEvent.change(screen.getByDisplayValue('John'), {
      target: { value: 'Jane' }
    });

    // Cancel changes
    fireEvent.click(screen.getByText('Отмена'));

    // Should exit edit mode and revert changes
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.queryByDisplayValue('Jane')).not.toBeInTheDocument();
  });

  it('handles avatar upload', async () => {
    mockUserApi.uploadAvatar.mockResolvedValue({
      data: { avatarUrl: 'new-avatar.jpg' },
    });

    render(<UserCenterContainer />, {
      initialAuthState: testData.authState.authenticated,
    });

    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument();
    });

    const fileInput = screen.getByLabelText(/загрузить аватар/i);
    const file = new File(['avatar'], 'avatar.jpg', { type: 'image/jpeg' });

    fireEvent.change(fileInput, { target: { files: [file] } });

    await waitFor(() => {
      expect(mockUserApi.uploadAvatar).toHaveBeenCalledWith(file);
    });
  });

  it('displays user art gallery', async () => {
    render(<UserCenterContainer />, {
      initialAuthState: testData.authState.authenticated,
    });

    await waitFor(() => {
      expect(mockUserApi.getUserArt).toHaveBeenCalled();
    });

    await waitFor(() => {
      expect(screen.getByText('Art 1')).toBeInTheDocument();
      expect(screen.getByText('Art 2')).toBeInTheDocument();
    });
  });

  it('deletes art item', async () => {
    mockUserApi.deleteArt.mockResolvedValue({
      data: { success: true },
    });

    render(<UserCenterContainer />, {
      initialAuthState: testData.authState.authenticated,
    });

    await waitFor(() => {
      expect(screen.getByText('Art 1')).toBeInTheDocument();
    });

    // Find and click delete button for first art item
    const deleteButtons = screen.getAllByText('Удалить');
    fireEvent.click(deleteButtons[0]);

    await waitFor(() => {
      expect(mockUserApi.deleteArt).toHaveBeenCalledWith('1');
    });
  });

  it('handles logout', async () => {
    const mockLogoutUser = require('../../../features/auth/model/authStore').logoutUser;

    render(<UserCenterContainer />, {
      initialAuthState: testData.authState.authenticated,
    });

    await waitFor(() => {
      expect(screen.getByText('Test User')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText('Выйти'));

    expect(mockLogoutUser).toHaveBeenCalled();
  });

  it('displays user profile section', async () => {
    render(<UserCenterContainer />, {
      initialAuthState: testData.authState.authenticated,
    });

    await waitFor(() => {
      expect(screen.getByText('Личный кабинет')).toBeInTheDocument();
      expect(screen.getByText('Test User')).toBeInTheDocument();
    });
  });

  it('handles profile update error', async () => {
    mockUserApi.updateProfile.mockRejectedValue(new Error('Update failed'));

    render(<UserCenterContainer />, {
      initialAuthState: testData.authState.authenticated,
    });

    await waitFor(() => {
      expect(screen.getByText('Test User')).toBeInTheDocument();
    });

    // Enter edit mode and try to save
    fireEvent.click(screen.getByText('Редактировать профиль'));
    fireEvent.click(screen.getByText('Сохранить'));

    await waitFor(() => {
      expect(screen.getByText('Ошибка обновления профиля')).toBeInTheDocument();
    });
  });

  it('handles avatar upload error', async () => {
    mockUserApi.uploadAvatar.mockRejectedValue(new Error('Upload failed'));

    render(<UserCenterContainer />, {
      initialAuthState: testData.authState.authenticated,
    });

    await waitFor(() => {
      expect(screen.getByText('Test User')).toBeInTheDocument();
    });

    const fileInput = screen.getByLabelText(/загрузить аватар/i);
    const file = new File(['avatar'], 'avatar.jpg', { type: 'image/jpeg' });

    fireEvent.change(fileInput, { target: { files: [file] } });

    await waitFor(() => {
      expect(screen.getByText('Ошибка загрузки аватара')).toBeInTheDocument();
    });
  });

  it('renders without crashing', () => {
    expect(() => {
      render(<UserCenterContainer />, {
        initialAuthState: testData.authState.authenticated,
      });
    }).not.toThrow();
  });

  it('displays user information correctly', async () => {
    render(<UserCenterContainer />, {
      initialAuthState: testData.authState.authenticated,
    });

    await waitFor(() => {
      expect(screen.getByText('Личный кабинет')).toBeInTheDocument();
      expect(screen.getByText('@testuser')).toBeInTheDocument();
      expect(screen.getByText('test@example.com')).toBeInTheDocument();
    });
  });

  it('handles empty art gallery', async () => {
    mockUserApi.getUserArt.mockResolvedValue({
      data: [],
    });

    render(<UserCenterContainer />, {
      initialAuthState: testData.authState.authenticated,
    });

    await waitFor(() => {
      expect(screen.getByText('У вас пока нет созданных работ')).toBeInTheDocument();
    });
  });
});
