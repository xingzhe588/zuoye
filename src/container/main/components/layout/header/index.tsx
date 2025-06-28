import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux';
import { getNavigationValue } from '@brojs/cli';
import { RootState } from '../../../../../store';
import Logo from '../logo/logo';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from '../../../../../shared/ui/LanguageSwitcher';

import './index.css';

interface NavigationItem {
  name: string;
  href: string;
}

const Header = (): React.ReactElement => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);
  const { t, i18n } = useTranslation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleChangeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  const navigationItems: NavigationItem[] = [
    {
      name: t('collection'),
      href: getNavigationValue('project-monday.collection')
    },
    {
      name: t('create'),
      href: getNavigationValue('project-monday.create-nft')
    },
    {
      name: t('contact'),
      href: getNavigationValue('project-monday.contact')
    },
  ];

  return (
    <header className="header-header" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'relative', zIndex: 10 }}>
      <div className="header-logo" style={{ flex: '0 0 auto' }}>
        <Link to={getNavigationValue('project-monday.main')}>
          <span>ArtCollab</span>
        </Link>
      </div>

      <nav className={`header-nav ${isMenuOpen ? 'header-nav--open' : ''}`} style={{ flex: '1 1 auto', display: 'flex', justifyContent: 'center' }}>
        <ul className="header-nav__list" style={{ display: 'flex', alignItems: 'center', gap: '16px', margin: 0 }}>
          {navigationItems.map((item) => (
            item.href ? (
              <li key={item.name} className="header-nav__item">
                <Link to={item.href} className="header-nav__link">
                  {item.name}
                </Link>
              </li>
            ) : null
          ))}
          {isAuthenticated ? (
            <>
              <li className="header-nav__item">
                <Link to={getNavigationValue('project-monday.user-center')} className="header-nav__link">
                  {t('user_center')}
                </Link>
              </li>
              <li className="header-nav__item">
                <span className="header-user-info">
                  {t('welcome')}, {user?.username}
                </span>
              </li>
            </>
          ) : (
            <li className="header-nav__item">
              <Link to={getNavigationValue('project-monday.auth')} className="header-nav__link header-nav__link--auth">
                {t('login_register')}
              </Link>
            </li>
          )}
        </ul>
      </nav>

      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flex: '0 0 auto', zIndex: 20 }}>
        <LanguageSwitcher />
        <button className="header-menu-toggle" onClick={toggleMenu} style={{ cursor: 'pointer' }}>
          ☰
        </button>
      </div>
    </header>
  );
};

export default Header;