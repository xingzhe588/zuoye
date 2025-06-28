import React from 'react';
import { featureManager, FeatureFlags } from '../../config/features';

interface FeatureToggleProps {
  feature: keyof FeatureFlags;
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

const FeatureToggle: React.FC<FeatureToggleProps> = ({ 
  feature, 
  children, 
  fallback = null 
}) => {
  const isEnabled = featureManager.isEnabled(feature);
  
  return isEnabled ? <>{children}</> : <>{fallback}</>;
};

export default FeatureToggle;
export { FeatureToggle };
