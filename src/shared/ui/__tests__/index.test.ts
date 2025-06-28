import * as SharedUI from '../index';

describe('Shared UI Exports', () => {
  it('exports Layout component', () => {
    expect(SharedUI.Layout).toBeDefined();
    expect(typeof SharedUI.Layout).toBe('function');
  });

  it('exports Navigation component', () => {
    expect(SharedUI.Navigation).toBeDefined();
    expect(typeof SharedUI.Navigation).toBe('function');
  });

  it('exports FeatureToggle component', () => {
    expect(SharedUI.FeatureToggle).toBeDefined();
    expect(typeof SharedUI.FeatureToggle).toBe('function');
  });

  it('exports all expected components', () => {
    const expectedExports = ['Layout', 'Navigation', 'FeatureToggle'];
    
    expectedExports.forEach(exportName => {
      expect(SharedUI).toHaveProperty(exportName);
      expect(typeof SharedUI[exportName as keyof typeof SharedUI]).toBe('function');
    });
  });

  it('has correct number of exports', () => {
    const exportKeys = Object.keys(SharedUI);
    expect(exportKeys).toHaveLength(3);
  });
});
