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
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);
  const { t, i18n } = useTranslation();
  const [menuOpen, setMenuOpen] = useState(false);

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
    <header className="header-header">
      <div className="header-logo">
        <Link to={getNavigationValue('project-monday.main')}>
          <span>ArtCollab</span>
        </Link>
      </div>
      <button
        className="header-menu-toggle"
        onClick={() => setMenuOpen(open => !open)}
        aria-label="Open menu"
        style={{ marginLeft: 'auto', marginRight: 8 }}
      >
        ☰
      </button>
      <nav className={`header-nav${menuOpen ? ' header-nav--open' : ''}`}>
        <ul className="header-nav__list">
          {navigationItems.map((item) => (
            item.href ? (
              <li key={item.name} className="header-nav__item">
                <Link to={item.href} className="header-nav__link" onClick={() => setMenuOpen(false)}>
                  {item.name}
                </Link>
              </li>
            ) : null
          ))}
          {isAuthenticated && user ? (
              <li className="header-nav__item">
              <Link to={getNavigationValue('project-monday.user-center')} className="header-nav__link" onClick={() => setMenuOpen(false)}>
                  {t('user_center')}
                </Link>
              </li>
          ) : (
            <li className="header-nav__item">
              <Link to={getNavigationValue('project-monday.auth')} className="header-nav__link header-nav__link--auth" onClick={() => setMenuOpen(false)}>
                {t('login_register')}
              </Link>
            </li>
          )}
        </ul>
      </nav>
      {/* 移动端弹出菜单 */}
      {menuOpen && (
        <div className={`header-mobile-menu${!menuOpen ? ' menu-exit' : ''}`}>
          <ul className="header-mobile-menu__list">
            {navigationItems.map((item) => (
              item.href ? (
                <li key={item.name} className="header-mobile-menu__item">
                  <Link to={item.href} className="header-mobile-menu__link" onClick={() => setMenuOpen(false)}>
                    {item.name}
                  </Link>
                </li>
              ) : null
            ))}
            {isAuthenticated && user ? (
              <li className="header-mobile-menu__item">
                <Link to={getNavigationValue('project-monday.user-center')} className="header-mobile-menu__link" onClick={() => setMenuOpen(false)}>
                  {t('user_center')}
                </Link>
              </li>
            ) : (
              <li className="header-mobile-menu__item">
                <Link to={getNavigationValue('project-monday.auth')} className="header-mobile-menu__link" onClick={() => setMenuOpen(false)}>
                  {t('login_register')}
                </Link>
              </li>
            )}
          </ul>
      </div>
      )}
    </header>
  );
};

export default Header;