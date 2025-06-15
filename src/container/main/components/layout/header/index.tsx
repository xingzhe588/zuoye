import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import { getNavigationValue } from '@brojs/cli';
import Logo from '../logo/logo';  

import './index.css';

interface NavigationItem {
  name: string;
  href: string;
}

const navigationItems: NavigationItem[] = [
  { 
    name: 'Коллекции', 
    href: getNavigationValue('artcollab.collection') 
  },
  { 
    name: 'Создать NFT', 
    href: getNavigationValue('artcollab.create-nft') 
  },
  { 
    name: 'Контакты', 
    href: getNavigationValue('artcollab.contact') 
  },
];

const Header = (): React.ReactElement => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="header-header">
      <div className="header-logo">
        <Link to={getNavigationValue('artcollab.main')}>
          <Logo />
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
        </ul>
      </nav>
    </header>
  );
};

export default Header;