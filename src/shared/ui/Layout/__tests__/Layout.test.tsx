import React from 'react';
import { render, screen } from '../../../../test-utils';
import { Layout } from '../Layout';

// Mock Navigation component
jest.mock('../../Navigation/Navigation', () => ({
  Navigation: () => <nav data-testid="navigation">Navigation Component</nav>,
}));

// Mock FeatureToggle component
jest.mock('../../FeatureToggle/FeatureToggle', () => ({
  FeatureToggle: ({ children, feature }: { children: React.ReactNode; feature: string }) => (
    <div data-testid={`feature-toggle-${feature}`}>
      {children}
    </div>
  ),
}));

describe('Layout', () => {
  it('renders layout with children', () => {
    render(
      <Layout>
        <div data-testid="test-content">Test Content</div>
      </Layout>
    );

    expect(screen.getByTestId('test-content')).toBeInTheDocument();
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('renders navigation wrapped in FeatureToggle', () => {
    render(
      <Layout>
        <div>Content</div>
      </Layout>
    );

    expect(screen.getAllByTestId('feature-toggle-navigation')).toHaveLength(2); // Navigation and footer
    expect(screen.getByTestId('navigation')).toBeInTheDocument();
  });

  it('renders main content area', () => {
    render(
      <Layout>
        <div data-testid="main-content">Main Content</div>
      </Layout>
    );

    const mainContent = screen.getByTestId('main-content').parentElement;
    expect(mainContent).toHaveClass('main-content');
  });

  it('renders footer with correct content', () => {
    render(
      <Layout>
        <div>Content</div>
      </Layout>
    );

    expect(screen.getByText('© 2025 ArtCollab. All rights reserved.')).toBeInTheDocument();
  });

  it('footer is wrapped in FeatureToggle', () => {
    render(
      <Layout>
        <div>Content</div>
      </Layout>
    );

    const footer = screen.getByText('© 2025 ArtCollab. All rights reserved.').closest('footer');
    expect(footer).toBeInTheDocument();
    expect(footer).toHaveClass('footer');
  });

  it('has correct CSS classes', () => {
    const { container } = render(
      <Layout>
        <div>Content</div>
      </Layout>
    );

    expect(container.firstChild).toHaveClass('layout');
    expect(screen.getByText('Content').parentElement).toHaveClass('main-content');
  });

  it('footer has correct styling', () => {
    render(
      <Layout>
        <div>Content</div>
      </Layout>
    );

    const footer = screen.getByText('© 2025 ArtCollab. All rights reserved.').closest('footer');
    expect(footer).toHaveStyle({
      padding: '20px',
      textAlign: 'center',
      borderTop: '1px solid #eee',
      marginTop: '40px',
    });
  });

  it('renders multiple children correctly', () => {
    render(
      <Layout>
        <div data-testid="child-1">Child 1</div>
        <div data-testid="child-2">Child 2</div>
        <span data-testid="child-3">Child 3</span>
      </Layout>
    );

    expect(screen.getByTestId('child-1')).toBeInTheDocument();
    expect(screen.getByTestId('child-2')).toBeInTheDocument();
    expect(screen.getByTestId('child-3')).toBeInTheDocument();
  });

  it('renders without crashing', () => {
    expect(() => {
      render(
        <Layout>
          <div>Test</div>
        </Layout>
      );
    }).not.toThrow();
  });

  it('has proper component structure', () => {
    const { container } = render(
      <Layout>
        <div data-testid="content">Content</div>
      </Layout>
    );

    const layout = container.firstChild as HTMLElement;
    expect(layout).toHaveClass('layout');

    // Should contain navigation, main content, and footer
    expect(screen.getByTestId('navigation')).toBeInTheDocument();
    expect(screen.getByTestId('content')).toBeInTheDocument();
    expect(screen.getByText('© 2025 ArtCollab. All rights reserved.')).toBeInTheDocument();
  });

  it('navigation and footer use same feature toggle', () => {
    render(
      <Layout>
        <div>Content</div>
      </Layout>
    );

    // Both navigation and footer should be wrapped in feature-toggle-navigation
    const featureToggles = screen.getAllByTestId('feature-toggle-navigation');
    expect(featureToggles).toHaveLength(2);
  });

  it('handles empty children gracefully', () => {
    render(
      <Layout>
        {null}
      </Layout>
    );

    // Layout should still render with navigation and footer
    expect(screen.getByTestId('navigation')).toBeInTheDocument();
    expect(screen.getByText('© 2025 ArtCollab. All rights reserved.')).toBeInTheDocument();
  });

  it('renders complex children correctly', () => {
    render(
      <Layout>
        <div>
          <h1>Page Title</h1>
          <section>
            <p>Page content</p>
            <button>Action Button</button>
          </section>
        </div>
      </Layout>
    );

    expect(screen.getByText('Page Title')).toBeInTheDocument();
    expect(screen.getByText('Page content')).toBeInTheDocument();
    expect(screen.getByText('Action Button')).toBeInTheDocument();
  });

  it('maintains proper DOM hierarchy', () => {
    const { container } = render(
      <Layout>
        <div data-testid="test-content">Content</div>
      </Layout>
    );

    const layout = container.firstChild as HTMLElement;
    const mainContent = screen.getByTestId('test-content').parentElement;
    const footer = screen.getByText('© 2025 ArtCollab. All rights reserved.').closest('footer');

    expect(layout).toContainElement(mainContent);
    expect(layout).toContainElement(footer);
    expect(mainContent).toHaveClass('main-content');
  });

  it('renders all expected elements', () => {
    render(
      <Layout>
        <div>Content</div>
      </Layout>
    );

    // Check for all major elements
    expect(screen.getByTestId('navigation')).toBeInTheDocument();
    expect(screen.getByText('Content')).toBeInTheDocument();
    expect(screen.getByText('© 2025 ArtCollab. All rights reserved.')).toBeInTheDocument();
    expect(screen.getAllByTestId(/feature-toggle/)).toHaveLength(2);
  });
});
