// Feature flags configuration for FSD architecture
export interface FeatureFlags {
  auth: boolean;
  userCenter: boolean;
  artGeneration: boolean;
  collection: boolean;
  contact: boolean;
  navigation: boolean;
}

// Default feature configuration
export const defaultFeatures: FeatureFlags = {
  auth: true,
  userCenter: true,
  artGeneration: true,
  collection: true,
  contact: true,
  navigation: true,
};

// Feature flag management
class FeatureManager {
  private features: FeatureFlags;

  constructor(initialFeatures: FeatureFlags = defaultFeatures) {
    this.features = { ...initialFeatures };
  }

  isEnabled(feature: keyof FeatureFlags): boolean {
    return this.features[feature];
  }

  enable(feature: keyof FeatureFlags): void {
    this.features[feature] = true;
  }

  disable(feature: keyof FeatureFlags): void {
    this.features[feature] = false;
  }

  updateFeatures(newFeatures: Partial<FeatureFlags>): void {
    this.features = { ...this.features, ...newFeatures };
  }

  getAllFeatures(): FeatureFlags {
    return { ...this.features };
  }
}

export const featureManager = new FeatureManager();
