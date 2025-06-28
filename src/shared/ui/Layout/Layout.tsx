import React from 'react';
import { Navigation } from '../Navigation/Navigation';
import { FeatureToggle } from '../FeatureToggle/FeatureToggle';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="layout">
      <FeatureToggle feature="navigation">
        <Navigation />
      </FeatureToggle>
      
      <main className="main-content">
        {children}
      </main>
      
      <FeatureToggle feature="navigation">
        <footer className="footer" style={{ 
          padding: '20px', 
          textAlign: 'center', 
          borderTop: '1px solid #eee',
          marginTop: '40px'
        }}>
          <p>&copy; 2025 ArtCollab. All rights reserved.</p>
        </footer>
      </FeatureToggle>
    </div>
  );
};

export default Layout;
export { Layout };
