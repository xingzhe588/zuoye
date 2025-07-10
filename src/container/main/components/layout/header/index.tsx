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
  icon?: React.ReactNode; // Added icon property
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
      href: getNavigationValue('project-monday.collection'),
      icon: <i className="fa-solid fa-layer-group" title={t('collection')}></i>
    },
    {
      name: t('create'),
      href: getNavigationValue('project-monday.create-nft'),
      icon: <i className="fa-solid fa-wand-magic-sparkles" title={t('create')}></i>
    },
    {
      name: t('contact'),
      href: getNavigationValue('project-monday.contact'),
      icon: <i className="fa-solid fa-address-card" title={t('contact')}></i>
    },
  ];

  return (
    <>
      <header className="header-header">
        <div className="header-logo">
          <Link to={getNavigationValue('project-monday.main')}>
            <span>ArtCollab</span>
          </Link>
        </div>
        {/* 仅PC端显示顶部导航 */}
        <nav className="header-nav">
          <ul className="header-nav__list">
            {navigationItems.map((item) => (
              item.href ? (
                <li key={item.name} className="header-nav__item">
                  <Link to={item.href} className="header-nav__link">
                    {item.name}
                  </Link>
                </li>
              ) : null
            ))}
            {isAuthenticated && user ? (
              <li className="header-nav__item">
                <Link to={getNavigationValue('project-monday.user-center')} className="header-nav__link">
                  {t('user_center')}
                </Link>
              </li>
            ) : (
              <li className="header-nav__item">
                <Link to={getNavigationValue('project-monday.auth')} className="header-nav__link header-nav__link--auth">
                  {t('login_register')}
                </Link>
              </li>
            )}
          </ul>
        </nav>
      </header>
      {/* 移动端底部导航栏 */}
      <nav className="mobile-bottom-nav">
        <ul className="mobile-bottom-nav__list">
          {navigationItems.map((item) => (
            item.href ? (
              <li key={item.name} className="mobile-bottom-nav__item">
                <Link to={item.href} className="mobile-bottom-nav__link">
                  {item.icon}
                </Link>
              </li>
            ) : null
          ))}
          {isAuthenticated && user ? (
            <li className="mobile-bottom-nav__item">
              <Link to={getNavigationValue('project-monday.user-center')} className="mobile-bottom-nav__link">
                <i className="fa-solid fa-user" title={t('user_center')}></i>
              </Link>
            </li>
          ) : (
            <li className="mobile-bottom-nav__item">
              <Link to={getNavigationValue('project-monday.auth')} className="mobile-bottom-nav__link">
                <i className="fa-solid fa-right-to-bracket" title={t('login_register')}></i>
              </Link>
            </li>
          )}
        </ul>
      </nav>
    </>
  );
};

export default Header;