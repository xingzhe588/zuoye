import React from 'react';
import { render, screen } from '@testing-library/react';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { router } from '../router';
import { createMockStore } from '../../../test-utils';

// Mock all the page components
jest.mock('../components/layout', () => {
  return function MockLayout() {
    return <div data-testid="layout">Layout</div>;
  };
});

jest.mock('../components/main-page', () => {
  return function MockMainPage() {
    return <div data-testid="main-page">Main Page</div>;
  };
});

jest.mock('../../detail-kaban', () => {
  return function MockDetailKaban() {
    return <div data-testid="detail-kaban">Detail Kaban</div>;
  };
});

jest.mock('../../detail-monkey', () => {
  return function MockDetailMonkey() {
    return <div data-testid="detail-monkey">Detail Monkey</div>;
  };
});

jest.mock('../../detail-hero', () => {
  return function MockDetailHero() {
    return <div data-testid="detail-hero">Detail Hero</div>;
  };
});

jest.mock('../../collection', () => {
  return function MockCollection() {
    return <div data-testid="collection">Collection</div>;
  };
});

jest.mock('../../create-nft', () => {
  return function MockCreateNFT() {
    return <div data-testid="create-nft">Create NFT</div>;
  };
});

jest.mock('../../contact', () => {
  return function MockContact() {
    return <div data-testid="contact">Contact</div>;
  };
});

jest.mock('../../auth', () => {
  return function MockAuth() {
    return <div data-testid="auth">Auth</div>;
  };
});

jest.mock('../../user-center', () => {
  return function MockUserCenter() {
    return <div data-testid="user-center">User Center</div>;
  };
});

jest.mock('../../404', () => {
  return function Mock404() {
    return <div data-testid="not-found">404 Not Found</div>;
  };
});

// Mock brojs navigation
jest.mock('@brojs/cli', () => ({
  getNavigationValue: (key: string) => {
    const routes: Record<string, string> = {
      'project-monday.main': '/project-monday',
      'project-monday.detail-kaban': '/project-monday/detail-kaban',
      'project-monday.detail-monkey': '/project-monday/detail-monkey',
      'project-monday.detail-hero': '/project-monday/detail-hero',
      'project-monday.collection': '/project-monday/collection',
      'project-monday.create-nft': '/project-monday/create-nft',
      'project-monday.contact': '/project-monday/contact',
      'project-monday.auth': '/project-monday/auth',
      'project-monday.user-center': '/project-monday/user-center',
    };
    return routes[key] || '/';
  },
}));

const renderWithProviders = (initialEntries = ['/project-monday']) => {
  const store = createMockStore({ isAuthenticated: true });

  // Create a memory router for testing
  const testRouter = createMemoryRouter(router.routes, {
    initialEntries,
  });

  return render(
    <Provider store={store}>
      <RouterProvider router={testRouter} />
    </Provider>
  );
};

describe('Router Configuration', () => {
  it('exports router configuration', () => {
    expect(router).toBeDefined();
    expect(router.routes).toBeDefined();
    expect(router.routes.length).toBeGreaterThan(0);
  });

  it('has correct route structure', () => {
    const mainRoute = router.routes[0];
    expect(mainRoute.path).toBe('/project-monday');
    expect(mainRoute.children).toBeDefined();
    expect(mainRoute.children?.length).toBeGreaterThan(0);
  });

  it('includes all expected routes', () => {
    const mainRoute = router.routes[0];
    const childPaths = mainRoute.children?.map(child => child.path) || [];
    
    expect(childPaths).toContain('/project-monday');
    expect(childPaths).toContain('/project-monday/detail-kaban');
    expect(childPaths).toContain('/project-monday/detail-monkey');
    expect(childPaths).toContain('/project-monday/detail-hero');
    expect(childPaths).toContain('/project-monday/collection');
    expect(childPaths).toContain('/project-monday/create-nft');
    expect(childPaths).toContain('/project-monday/contact');
    expect(childPaths).toContain('/project-monday/auth');
    expect(childPaths).toContain('/project-monday/user-center');
    expect(childPaths).toContain('*'); // 404 route
  });

  it('renders without crashing', () => {
    expect(() => {
      renderWithProviders();
    }).not.toThrow();
  });
});
