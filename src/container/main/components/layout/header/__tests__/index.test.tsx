import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import Header from '../index';
import authReducer from '../../../../../../features/auth/model/authStore';

// Mock the base API to avoid getConfigValue error
jest.mock('../../../../../../shared/api/base', () => ({
  apiClient: {
    get: jest.fn(),
    post: jest.fn(),
    put: jest.fn(),
    delete: jest.fn(),
  },
}));

// Mock brojs navigation
jest.mock('@brojs/cli', () => ({
  getNavigationValue: (key: string) => {
    const routes: Record<string, string> = {
      'project-monday.main': '/project-monday',
      'project-monday.collection': '/project-monday/collection',
      'project-monday.create-nft': '/project-monday/create-nft',
      'project-monday.contact': '/project-monday/contact',
      'project-monday.auth': '/project-monday/auth',
      'project-monday.user-center': '/project-monday/user-center',
    };
    return routes[key] || '/';
  },
}));

const createMockStore = (authState: any) => {
  return configureStore({
    reducer: {
      auth: authReducer,
    },
    preloadedState: {
      auth: {
        isAuthenticated: false,
        user: null,
        isLoading: false,
        error: null,
        token: null,
        ...authState,
      },
    },
  });
};

const renderWithProviders = (authState = {}) => {
  const store = createMockStore(authState);
  return render(
    <Provider store={store}>
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    </Provider>
  );
};

describe('Header Component', () => {
  it('renders header with logo', () => {
    renderWithProviders();
    
    expect(screen.getByText('ArtCollab')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'ArtCollab' })).toHaveAttribute('href', '/project-monday');
  });

  it('renders navigation items', () => {
    renderWithProviders();
    
    expect(screen.getByText('Коллекция')).toBeInTheDocument();
    expect(screen.getByText('Создать')).toBeInTheDocument();
    expect(screen.getByText('Контакты')).toBeInTheDocument();
  });

  it('renders menu toggle button', () => {
    renderWithProviders();
    
    const menuToggle = screen.getByRole('button');
    expect(menuToggle).toBeInTheDocument();
    expect(menuToggle).toHaveTextContent('☰');
  });

  it('toggles menu when button is clicked', () => {
    renderWithProviders();
    
    const menuToggle = screen.getByRole('button');
    const nav = document.querySelector('.header-nav');
    
    expect(nav).not.toHaveClass('header-nav--open');
    
    fireEvent.click(menuToggle);
    expect(nav).toHaveClass('header-nav--open');
    
    fireEvent.click(menuToggle);
    expect(nav).not.toHaveClass('header-nav--open');
  });

  it('shows auth link when user is not authenticated', () => {
    renderWithProviders({ isAuthenticated: false });
    
    expect(screen.getByText('Вход/Регистрация')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Вход/Регистрация' })).toHaveAttribute('href', '/project-monday/auth');
  });

  it('shows user info when authenticated', () => {
    renderWithProviders({ 
      isAuthenticated: true, 
      user: { username: 'testuser' } 
    });
    
    expect(screen.getByText('Личный кабинет')).toBeInTheDocument();
    expect(screen.getByText('Добро пожаловать, testuser')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Личный кабинет' })).toHaveAttribute('href', '/project-monday/user-center');
  });

  it('handles missing user gracefully', () => {
    renderWithProviders({ 
      isAuthenticated: true, 
      user: null 
    });
    
    expect(screen.getByText('Личный кабинет')).toBeInTheDocument();
    expect(screen.getByText('Добро пожаловать,')).toBeInTheDocument();
  });

  it('renders all navigation links with correct hrefs', () => {
    renderWithProviders();
    
    expect(screen.getByRole('link', { name: 'Коллекция' })).toHaveAttribute('href', '/project-monday/collection');
    expect(screen.getByRole('link', { name: 'Создать' })).toHaveAttribute('href', '/project-monday/create-nft');
    expect(screen.getByRole('link', { name: 'Контакты' })).toHaveAttribute('href', '/project-monday/contact');
  });

  it('applies correct CSS classes', () => {
    renderWithProviders();
    
    expect(document.querySelector('.header-header')).toBeInTheDocument();
    expect(document.querySelector('.header-logo')).toBeInTheDocument();
    expect(document.querySelector('.header-nav')).toBeInTheDocument();
    expect(document.querySelector('.header-nav__list')).toBeInTheDocument();
  });
});
