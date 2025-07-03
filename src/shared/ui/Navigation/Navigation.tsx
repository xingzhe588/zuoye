import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { FeatureToggle } from '../FeatureToggle/FeatureToggle';
import { useFeatures } from '../../../app/providers/FeatureProvider';
import './Navigation.css';

const Navigation: React.FC = () => {
  const location = useLocation();
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);
  const { isEnabled } = useFeatures();
  const [menuOpen, setMenuOpen] = useState(false);

  const navStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '15px 30px',
    background: '#fff',
    borderBottom: '1px solid #eee',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    position: 'relative' as const,
    zIndex: 1001,
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

  const navLinksResponsiveStyle = {
    ...navLinksStyle,
    flexDirection: 'column' as const,
    position: 'absolute' as const,
    top: '60px',
    right: 0,
    background: '#fff',
    width: '200px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
    display: menuOpen ? 'flex' : 'none',
    zIndex: 1000,
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

  // 导航内容抽取为函数，避免重复
  const renderNavLinks = () => <>
    <Link
      to="/"
      style={isActive('/') || isActive('/project-monday') ? activeLinkStyle : linkStyle}
      onClick={() => setMenuOpen(false)}
    >
      Главная
    </Link>
    <FeatureToggle feature="artGeneration">
      <Link
        to="/create-nft"
        style={isActive('/create-nft') ? activeLinkStyle : linkStyle}
        onClick={() => setMenuOpen(false)}
      >
        Создать
      </Link>
    </FeatureToggle>
    <FeatureToggle feature="collection">
      <Link
        to="/collection"
        style={isActive('/collection') ? activeLinkStyle : linkStyle}
        onClick={() => setMenuOpen(false)}
      >
        Коллекция
      </Link>
    </FeatureToggle>
    <FeatureToggle feature="contact">
      <Link
        to="/contact"
        style={isActive('/contact') ? activeLinkStyle : linkStyle}
        onClick={() => setMenuOpen(false)}
      >
        Контакты
      </Link>
    </FeatureToggle>
    {isAuthenticated ? (
      <>
        <FeatureToggle feature="userCenter">
          <Link
            to="/user-center"
            style={isActive('/user-center') ? activeLinkStyle : linkStyle}
            onClick={() => setMenuOpen(false)}
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
          onClick={() => setMenuOpen(false)}
        >
          Вход/Регистрация
        </Link>
      </FeatureToggle>
    )}
  </>;

  return (
    <>
      {/* 移动端导航栏 */}
      <nav className="mobile-navbar">
        <div className="mobile-navbar-left">
          <Link to="/" className="logo" onClick={() => setMenuOpen(false)}>
            ArtCollab
          </Link>
        </div>
        <div className="mobile-navbar-center">
          {/* 语言切换组件，假设为LanguageSwitcher */}
          <div className="language-switcher-mobile">
            {/* 这里请替换为你的实际语言切换组件 */}
          </div>
        </div>
        <div className="mobile-navbar-right">
          <button
            className="mobile-menu-btn"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Open menu"
          >
            <span style={{ fontSize: 32, lineHeight: 1 }}>☰</span>
          </button>
        </div>
      </nav>
      {/* 桌面端导航 */}
      <nav style={navStyle} className="desktop-navbar">
        <Link to="/" style={logoStyle} onClick={() => setMenuOpen(false)}>
          ArtCollab
        </Link>
        <div className="nav-links desktop-nav" style={navLinksStyle}>
          {renderNavLinks()}
        </div>
        <div className={`nav-links mobile-nav${menuOpen ? ' open' : ''}`}>{renderNavLinks()}</div>
      </nav>
    </>
  );
};

export default Navigation;
export { Navigation };
