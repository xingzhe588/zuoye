// Feature flags tests
import { featureManager, defaultFeatures, FeatureFlags } from '../features';

describe('Feature Manager', () => {
  beforeEach(() => {
    // Reset to default features before each test
    featureManager.updateFeatures(defaultFeatures);
  });

  describe('default configuration', () => {
    it('should have all features enabled by default', () => {
      const features = featureManager.getAllFeatures();
      
      expect(features.auth).toBe(true);
      expect(features.userCenter).toBe(true);
      expect(features.artGeneration).toBe(true);
      expect(features.collection).toBe(true);
      expect(features.contact).toBe(true);
      expect(features.navigation).toBe(true);
    });
  });

  describe('isEnabled', () => {
    it('should return true for enabled features', () => {
      expect(featureManager.isEnabled('auth')).toBe(true);
      expect(featureManager.isEnabled('userCenter')).toBe(true);
    });

    it('should return false for disabled features', () => {
      featureManager.disable('auth');
      expect(featureManager.isEnabled('auth')).toBe(false);
    });
  });

  describe('enable', () => {
    it('should enable a feature', () => {
      featureManager.disable('auth');
      expect(featureManager.isEnabled('auth')).toBe(false);
      
      featureManager.enable('auth');
      expect(featureManager.isEnabled('auth')).toBe(true);
    });
  });

  describe('disable', () => {
    it('should disable a feature', () => {
      expect(featureManager.isEnabled('auth')).toBe(true);
      
      featureManager.disable('auth');
      expect(featureManager.isEnabled('auth')).toBe(false);
    });
  });

  describe('updateFeatures', () => {
    it('should update multiple features at once', () => {
      const newFeatures: Partial<FeatureFlags> = {
        auth: false,
        userCenter: false,
        artGeneration: true,
      };

      featureManager.updateFeatures(newFeatures);

      expect(featureManager.isEnabled('auth')).toBe(false);
      expect(featureManager.isEnabled('userCenter')).toBe(false);
      expect(featureManager.isEnabled('artGeneration')).toBe(true);
      // Other features should remain unchanged
      expect(featureManager.isEnabled('collection')).toBe(true);
      expect(featureManager.isEnabled('contact')).toBe(true);
      expect(featureManager.isEnabled('navigation')).toBe(true);
    });

    it('should not affect unspecified features', () => {
      const originalFeatures = featureManager.getAllFeatures();
      
      featureManager.updateFeatures({ auth: false });
      
      const updatedFeatures = featureManager.getAllFeatures();
      expect(updatedFeatures.auth).toBe(false);
      expect(updatedFeatures.userCenter).toBe(originalFeatures.userCenter);
      expect(updatedFeatures.artGeneration).toBe(originalFeatures.artGeneration);
    });
  });

  describe('getAllFeatures', () => {
    it('should return a copy of all features', () => {
      const features1 = featureManager.getAllFeatures();
      const features2 = featureManager.getAllFeatures();
      
      // Should be equal but not the same object
      expect(features1).toEqual(features2);
      expect(features1).not.toBe(features2);
    });

    it('should reflect current state of features', () => {
      featureManager.disable('auth');
      featureManager.disable('userCenter');
      
      const features = featureManager.getAllFeatures();
      expect(features.auth).toBe(false);
      expect(features.userCenter).toBe(false);
      expect(features.artGeneration).toBe(true);
    });
  });

  describe('feature isolation', () => {
    it('should not affect other features when changing one', () => {
      const originalFeatures = featureManager.getAllFeatures();
      
      featureManager.disable('auth');
      
      expect(featureManager.isEnabled('userCenter')).toBe(originalFeatures.userCenter);
      expect(featureManager.isEnabled('artGeneration')).toBe(originalFeatures.artGeneration);
      expect(featureManager.isEnabled('collection')).toBe(originalFeatures.collection);
      expect(featureManager.isEnabled('contact')).toBe(originalFeatures.contact);
      expect(featureManager.isEnabled('navigation')).toBe(originalFeatures.navigation);
    });
  });

  describe('edge cases', () => {
    it('should handle empty update', () => {
      const originalFeatures = featureManager.getAllFeatures();
      
      featureManager.updateFeatures({});
      
      expect(featureManager.getAllFeatures()).toEqual(originalFeatures);
    });

    it('should handle multiple enable/disable operations', () => {
      featureManager.disable('auth');
      featureManager.enable('auth');
      featureManager.disable('auth');
      featureManager.enable('auth');
      
      expect(featureManager.isEnabled('auth')).toBe(true);
    });
  });
});
