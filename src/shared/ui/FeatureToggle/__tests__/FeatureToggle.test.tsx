// FeatureToggle component tests
import React from 'react';
import { render, screen } from '@testing-library/react';
import { FeatureToggle } from '../FeatureToggle';
import { featureManager } from '../../../config/features';

// Mock the feature manager
jest.mock('../../../config/features', () => ({
  featureManager: {
    isEnabled: jest.fn(),
  },
}));

const mockFeatureManager = featureManager as jest.Mocked<typeof featureManager>;

describe('FeatureToggle', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render children when feature is enabled', () => {
    mockFeatureManager.isEnabled.mockReturnValue(true);

    render(
      <FeatureToggle feature="auth">
        <div>Auth content</div>
      </FeatureToggle>
    );

    expect(screen.getByText('Auth content')).toBeInTheDocument();
    expect(mockFeatureManager.isEnabled).toHaveBeenCalledWith('auth');
  });

  it('should not render children when feature is disabled', () => {
    mockFeatureManager.isEnabled.mockReturnValue(false);

    render(
      <FeatureToggle feature="auth">
        <div>Auth content</div>
      </FeatureToggle>
    );

    expect(screen.queryByText('Auth content')).not.toBeInTheDocument();
    expect(mockFeatureManager.isEnabled).toHaveBeenCalledWith('auth');
  });

  it('should render fallback when feature is disabled and fallback is provided', () => {
    mockFeatureManager.isEnabled.mockReturnValue(false);

    render(
      <FeatureToggle 
        feature="auth" 
        fallback={<div>Feature disabled</div>}
      >
        <div>Auth content</div>
      </FeatureToggle>
    );

    expect(screen.queryByText('Auth content')).not.toBeInTheDocument();
    expect(screen.getByText('Feature disabled')).toBeInTheDocument();
  });

  it('should render nothing when feature is disabled and no fallback is provided', () => {
    mockFeatureManager.isEnabled.mockReturnValue(false);

    const { container } = render(
      <FeatureToggle feature="auth">
        <div>Auth content</div>
      </FeatureToggle>
    );

    expect(container.firstChild).toBeNull();
  });

  it('should work with different feature types', () => {
    mockFeatureManager.isEnabled.mockReturnValue(true);

    render(
      <FeatureToggle feature="userCenter">
        <div>User center content</div>
      </FeatureToggle>
    );

    expect(screen.getByText('User center content')).toBeInTheDocument();
    expect(mockFeatureManager.isEnabled).toHaveBeenCalledWith('userCenter');
  });

  it('should handle complex children', () => {
    mockFeatureManager.isEnabled.mockReturnValue(true);

    render(
      <FeatureToggle feature="artGeneration">
        <div>
          <h1>Art Generation</h1>
          <p>Create amazing art</p>
          <button>Start Creating</button>
        </div>
      </FeatureToggle>
    );

    expect(screen.getByText('Art Generation')).toBeInTheDocument();
    expect(screen.getByText('Create amazing art')).toBeInTheDocument();
    expect(screen.getByText('Start Creating')).toBeInTheDocument();
  });

  it('should handle React fragments as children', () => {
    mockFeatureManager.isEnabled.mockReturnValue(true);

    render(
      <FeatureToggle feature="collection">
        <>
          <div>Fragment child 1</div>
          <div>Fragment child 2</div>
        </>
      </FeatureToggle>
    );

    expect(screen.getByText('Fragment child 1')).toBeInTheDocument();
    expect(screen.getByText('Fragment child 2')).toBeInTheDocument();
  });

  it('should handle null children gracefully', () => {
    mockFeatureManager.isEnabled.mockReturnValue(true);

    const { container } = render(
      <FeatureToggle feature="contact">
        {null}
      </FeatureToggle>
    );

    // Should not crash and should render empty
    expect(container.firstChild).toBeNull();
  });

  it('should handle conditional children', () => {
    mockFeatureManager.isEnabled.mockReturnValue(true);
    const showContent = true;

    render(
      <FeatureToggle feature="navigation">
        {showContent && <div>Conditional content</div>}
      </FeatureToggle>
    );

    expect(screen.getByText('Conditional content')).toBeInTheDocument();
  });

  it('should re-evaluate when feature status changes', () => {
    mockFeatureManager.isEnabled.mockReturnValue(false);

    const { rerender } = render(
      <FeatureToggle feature="auth">
        <div>Auth content</div>
      </FeatureToggle>
    );

    expect(screen.queryByText('Auth content')).not.toBeInTheDocument();

    // Simulate feature being enabled
    mockFeatureManager.isEnabled.mockReturnValue(true);

    rerender(
      <FeatureToggle feature="auth">
        <div>Auth content</div>
      </FeatureToggle>
    );

    expect(screen.getByText('Auth content')).toBeInTheDocument();
  });
});
