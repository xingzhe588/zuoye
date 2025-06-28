import React, { createContext, useContext, useState, ReactNode } from 'react';
import { FeatureFlags, defaultFeatures } from '../../shared/config/features';

interface FeatureContextType {
  features: FeatureFlags;
  toggleFeature: (feature: keyof FeatureFlags) => void;
  enableFeature: (feature: keyof FeatureFlags) => void;
  disableFeature: (feature: keyof FeatureFlags) => void;
  isEnabled: (feature: keyof FeatureFlags) => boolean;
}

const FeatureContext = createContext<FeatureContextType | undefined>(undefined);

interface FeatureProviderProps {
  children: ReactNode;
  initialFeatures?: Partial<FeatureFlags>;
}

export const FeatureProvider: React.FC<FeatureProviderProps> = ({ 
  children, 
  initialFeatures = {} 
}) => {
  const [features, setFeatures] = useState<FeatureFlags>({
    ...defaultFeatures,
    ...initialFeatures,
  });

  const toggleFeature = (feature: keyof FeatureFlags) => {
    setFeatures(prev => ({
      ...prev,
      [feature]: !prev[feature],
    }));
  };

  const enableFeature = (feature: keyof FeatureFlags) => {
    setFeatures(prev => ({
      ...prev,
      [feature]: true,
    }));
  };

  const disableFeature = (feature: keyof FeatureFlags) => {
    setFeatures(prev => ({
      ...prev,
      [feature]: false,
    }));
  };

  const isEnabled = (feature: keyof FeatureFlags) => {
    return features[feature];
  };

  const value: FeatureContextType = {
    features,
    toggleFeature,
    enableFeature,
    disableFeature,
    isEnabled,
  };

  return (
    <FeatureContext.Provider value={value}>
      {children}
    </FeatureContext.Provider>
  );
};

export const useFeatures = (): FeatureContextType => {
  const context = useContext(FeatureContext);
  if (context === undefined) {
    throw new Error('useFeatures must be used within a FeatureProvider');
  }
  return context;
};

// Feature manager for global access (for console usage)
export const featureManager = {
  enable: (feature: keyof FeatureFlags) => {
    // This would need to be connected to the actual context in a real app
    console.log(`Feature ${feature} enabled`);
  },
  disable: (feature: keyof FeatureFlags) => {
    console.log(`Feature ${feature} disabled`);
  },
  isEnabled: (feature: keyof FeatureFlags) => {
    return defaultFeatures[feature];
  },
};
