import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux';
import { getNavigationValue } from '@brojs/cli';
import { RootState } from '../../../../../store';
import Logo from '../logo/logo';

import './index.css';

interface NavigationItem {
  name: string;
  href: string;
}

const navigationItems: NavigationItem[] = [
  {
    name: 'Коллекция',
    href: getNavigationValue('project-monday.collection')
  },
  {
    name: 'Создать',
    href: getNavigationValue('project-monday.create-nft')
  },
  {
    name: 'Контакты',
    href: getNavigationValue('project-monday.contact')
  },

];

const Header = (): React.ReactElement => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="header-header">
      <div className="header-logo">
          <Link to={getNavigationValue('project-monday.main')}>
              <span>ArtCollab</span>
          </Link>
      </div>

      <button className="header-menu-toggle" onClick={toggleMenu}>
          ☰
      </button>

      <nav className={`header-nav ${isMenuOpen ? 'header-nav--open' : ''}`}>
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

        {/* Навигация аутентификации */}
        {isAuthenticated ? (
          <>
            <li className="header-nav__item">
              <Link to={getNavigationValue('project-monday.user-center')} className="header-nav__link">
                Личный кабинет
              </Link>
            </li>
            <li className="header-nav__item">
              <span className="header-user-info">
                Добро пожаловать, {user?.username}
              </span>
            </li>
          </>
        ) : (
          <li className="header-nav__item">
            <Link to={getNavigationValue('project-monday.auth')} className="header-nav__link header-nav__link--auth">
              Вход/Регистрация
            </Link>
          </li>
        )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;