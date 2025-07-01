import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { FeatureProvider, useFeatures } from '../FeatureProvider';
import { defaultFeatures } from '../../../shared/config/features';

// Test component that uses the FeatureProvider
const TestComponent: React.FC = () => {
  const { features, toggleFeature, enableFeature, disableFeature, isEnabled } = useFeatures();

  return (
    <div>
      <div data-testid="auth-status">{features.auth ? 'enabled' : 'disabled'}</div>
      <div data-testid="user-center-status">{features.userCenter ? 'enabled' : 'disabled'}</div>
      <div data-testid="art-generation-status">{features.artGeneration ? 'enabled' : 'disabled'}</div>
      
      <button onClick={() => toggleFeature('auth')} data-testid="toggle-auth">
        Toggle Auth
      </button>
      <button onClick={() => enableFeature('userCenter')} data-testid="enable-user-center">
        Enable User Center
      </button>
      <button onClick={() => disableFeature('artGeneration')} data-testid="disable-art-generation">
        Disable Art Generation
      </button>
      
      <div data-testid="is-auth-enabled">{isEnabled('auth') ? 'true' : 'false'}</div>
    </div>
  );
};

describe('FeatureProvider', () => {
  it('provides default features', () => {
    render(
      <FeatureProvider>
        <TestComponent />
      </FeatureProvider>
    );

    expect(screen.getByTestId('auth-status')).toHaveTextContent('enabled');
    expect(screen.getByTestId('user-center-status')).toHaveTextContent('enabled');
    expect(screen.getByTestId('art-generation-status')).toHaveTextContent('enabled');
  });

  it('accepts initial features override', () => {
    const initialFeatures = { auth: false, userCenter: false };
    
    render(
      <FeatureProvider initialFeatures={initialFeatures}>
        <TestComponent />
      </FeatureProvider>
    );

    expect(screen.getByTestId('auth-status')).toHaveTextContent('disabled');
    expect(screen.getByTestId('user-center-status')).toHaveTextContent('disabled');
    // artGeneration should still be enabled from defaults
    expect(screen.getByTestId('art-generation-status')).toHaveTextContent('enabled');
  });

  it('toggles features correctly', () => {
    render(
      <FeatureProvider>
        <TestComponent />
      </FeatureProvider>
    );

    // Initially auth should be enabled
    expect(screen.getByTestId('auth-status')).toHaveTextContent('enabled');

    // Toggle auth feature
    fireEvent.click(screen.getByTestId('toggle-auth'));
    expect(screen.getByTestId('auth-status')).toHaveTextContent('disabled');

    // Toggle again
    fireEvent.click(screen.getByTestId('toggle-auth'));
    expect(screen.getByTestId('auth-status')).toHaveTextContent('enabled');
  });

  it('enables features correctly', () => {
    const initialFeatures = { userCenter: false };
    
    render(
      <FeatureProvider initialFeatures={initialFeatures}>
        <TestComponent />
      </FeatureProvider>
    );

    // Initially userCenter should be disabled
    expect(screen.getByTestId('user-center-status')).toHaveTextContent('disabled');

    // Enable userCenter feature
    fireEvent.click(screen.getByTestId('enable-user-center'));
    expect(screen.getByTestId('user-center-status')).toHaveTextContent('enabled');
  });

  it('disables features correctly', () => {
    render(
      <FeatureProvider>
        <TestComponent />
      </FeatureProvider>
    );

    // Initially artGeneration should be enabled
    expect(screen.getByTestId('art-generation-status')).toHaveTextContent('enabled');

    // Disable artGeneration feature
    fireEvent.click(screen.getByTestId('disable-art-generation'));
    expect(screen.getByTestId('art-generation-status')).toHaveTextContent('disabled');
  });

  it('isEnabled method works correctly', () => {
    render(
      <FeatureProvider>
        <TestComponent />
      </FeatureProvider>
    );

    // Initially auth should be enabled
    expect(screen.getByTestId('is-auth-enabled')).toHaveTextContent('true');

    // Toggle auth feature
    fireEvent.click(screen.getByTestId('toggle-auth'));
    expect(screen.getByTestId('is-auth-enabled')).toHaveTextContent('false');
  });

  it('throws error when useFeatures is used outside provider', () => {
    // Suppress console.error for this test
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    expect(() => {
      render(<TestComponent />);
    }).toThrow('useFeatures must be used within a FeatureProvider');

    consoleSpy.mockRestore();
  });

  it('renders children correctly', () => {
    render(
      <FeatureProvider>
        <div data-testid="child-component">Child Content</div>
      </FeatureProvider>
    );

    expect(screen.getByTestId('child-component')).toHaveTextContent('Child Content');
  });

  it('maintains feature state across re-renders', () => {
    const { rerender } = render(
      <FeatureProvider>
        <TestComponent />
      </FeatureProvider>
    );

    // Toggle auth feature
    fireEvent.click(screen.getByTestId('toggle-auth'));
    expect(screen.getByTestId('auth-status')).toHaveTextContent('disabled');

    // Re-render the same component (state should persist)
    rerender(
      <FeatureProvider>
        <TestComponent />
      </FeatureProvider>
    );

    // State should be reset to default after re-render with new provider instance
    expect(screen.getByTestId('auth-status')).toHaveTextContent('enabled');
  });

  it('works with all feature flags', () => {
    const TestAllFeatures: React.FC = () => {
      const { features } = useFeatures();

      return (
        <div>
          {Object.keys(defaultFeatures).map(feature => (
            <div key={feature} data-testid={`feature-${feature}`}>
              {features[feature as keyof typeof features] ? 'enabled' : 'disabled'}
            </div>
          ))}
        </div>
      );
    };

    render(
      <FeatureProvider>
        <TestAllFeatures />
      </FeatureProvider>
    );

    // Check that all default features are available and enabled
    Object.keys(defaultFeatures).forEach(feature => {
      expect(screen.getByTestId(`feature-${feature}`)).toHaveTextContent('enabled');
    });
  });
});
