import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { FeatureToggle } from '../FeatureToggle/FeatureToggle';
import { useFeatures } from '../../../app/providers/FeatureProvider';

const Navigation: React.FC = () => {
  const location = useLocation();
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);
  const { isEnabled } = useFeatures();

  const navStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '15px 30px',
    background: '#fff',
    borderBottom: '1px solid #eee',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
  };

  const logoStyle = {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#007bff',
    textDecoration: 'none'
  };

  const navLinksStyle = {
    display: 'flex',
    gap: '20px',
    alignItems: 'center'
  };

  const linkStyle = {
    textDecoration: 'none',
    color: '#333',
    padding: '8px 16px',
    borderRadius: '4px',
    transition: 'background-color 0.2s'
  };

  const activeLinkStyle = {
    ...linkStyle,
    background: '#007bff',
    color: 'white'
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav style={navStyle}>
      <Link to="/" style={logoStyle}>
        ArtCollab
      </Link>
      
      <div style={navLinksStyle}>
        <Link
          to="/"
          style={isActive('/') || isActive('/project-monday') ? activeLinkStyle : linkStyle}
        >
          Главная
        </Link>

        <FeatureToggle feature="artGeneration">
          <Link
            to="/create-nft"
            style={isActive('/create-nft') ? activeLinkStyle : linkStyle}
          >
            Создать
          </Link>
        </FeatureToggle>

        <FeatureToggle feature="collection">
          <Link
            to="/collection"
            style={isActive('/collection') ? activeLinkStyle : linkStyle}
          >
            Коллекция
          </Link>
        </FeatureToggle>

        <FeatureToggle feature="contact">
          <Link
            to="/contact"
            style={isActive('/contact') ? activeLinkStyle : linkStyle}
          >
            Контакты
          </Link>
        </FeatureToggle>
        
        {/* Навигация аутентификации */}
        {isAuthenticated ? (
          <>
            <FeatureToggle feature="userCenter">
              <Link
                to="/user-center"
                style={isActive('/user-center') ? activeLinkStyle : linkStyle}
              >
                Личный кабинет
              </Link>
            </FeatureToggle>
            <span style={{ color: '#666', fontSize: '14px' }}>
              Добро пожаловать, {user?.username}
            </span>
          </>
        ) : (
          <FeatureToggle feature="auth">
            <Link
              to="/auth"
              style={isActive('/auth') ? activeLinkStyle : linkStyle}
            >
              Вход/Регистрация
            </Link>
          </FeatureToggle>
        )}
        
        {/* Development tools */}

      </div>
    </nav>
  );
};

export default Navigation;
export { Navigation };
