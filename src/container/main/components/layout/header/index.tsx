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

interface HeaderProps {
  isAuthPage?: boolean;
}

// SVG 太阳图标组件
const SunMoonIcon = ({ isDark }: { isDark: boolean }) => (
  isDark ? (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="orange" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ verticalAlign: 'middle' }}>
      <circle cx="12" cy="12" r="5" fill="orange" />
      <g stroke="orange">
        <line x1="12" y1="1" x2="12" y2="3" />
        <line x1="12" y1="21" x2="12" y2="23" />
        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
        <line x1="1" y1="12" x2="3" y2="12" />
        <line x1="21" y1="12" x2="23" y2="12" />
        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
      </g>
    </svg>
  ) : (
    // 月亮图标
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="orange" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ verticalAlign: 'middle' }}>
      <path d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 0 0 9.79 9.79z" fill="orange" />
    </svg>
  )
);

// SVG 美国国旗
const UsaFlagIcon = () => (
  <svg width="22" height="22" viewBox="0 0 32 32" style={{ verticalAlign: 'middle' }}>
    <rect width="32" height="32" fill="#fff"/>
    <rect y="4" width="32" height="4" fill="#b22234"/>
    <rect y="12" width="32" height="4" fill="#b22234"/>
    <rect y="20" width="32" height="4" fill="#b22234"/>
    <rect y="28" width="32" height="4" fill="#b22234"/>
    <rect width="14" height="14" fill="#3c3b6e"/>
    <g fill="#fff">
      <circle cx="2" cy="2" r="1"/>
      <circle cx="6" cy="2" r="1"/>
      <circle cx="10" cy="2" r="1"/>
      <circle cx="2" cy="6" r="1"/>
      <circle cx="6" cy="6" r="1"/>
      <circle cx="10" cy="6" r="1"/>
      <circle cx="2" cy="10" r="1"/>
      <circle cx="6" cy="10" r="1"/>
      <circle cx="10" cy="10" r="1"/>
    </g>
  </svg>
);

// SVG 俄罗斯国旗
const RuFlagIcon = () => (
  <svg width="22" height="22" viewBox="0 0 32 32" style={{ verticalAlign: 'middle' }}>
    <rect width="32" height="32" fill="#fff"/>
    <rect y="10.67" width="32" height="10.66" fill="#0033a0"/>
    <rect y="21.33" width="32" height="10.67" fill="#d52b1e"/>
  </svg>
);

const Header = ({ isAuthPage }: HeaderProps): React.ReactElement => {
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
            {/* PC端显示跳转链接，移动端隐藏 */}
            {/* 只在桌面端显示导航跳转按钮，移动端隐藏 */}
            {!isAuthPage && (
              <>
            {navigationItems.map((item) => (
              item.href ? (
                    <li key={item.name} className="header-nav__item header-nav__item-link only-desktop">
                  <Link to={item.href} className="header-nav__link">
                    {item.name}
                  </Link>
                </li>
              ) : null
            ))}
                {(isAuthenticated && user ? (
                  <li className="header-nav__item header-nav__item-link only-desktop">
                <Link to={getNavigationValue('project-monday.user-center')} className="header-nav__link">
                  {t('user_center')}
                </Link>
              </li>
            ) : (
                  <li className="header-nav__item header-nav__item-link only-desktop">
                <Link to={getNavigationValue('project-monday.auth')} className="header-nav__link header-nav__link--auth">
                  {t('login_register')}
                </Link>
              </li>
                ))}
              </>
            )}
          </ul>
        </nav>
        {/* 右侧切换按钮独立出来（桌面端） */}
        <div className="header-switchers-desktop" style={{display: 'flex', alignItems: 'center', gap: 10}}>
          <button
            style={{ background: 'none', border: 'none', fontSize: 22, cursor: 'pointer', padding: '0 6px' }}
            aria-label={t('toggle_language') || '切换语言'}
            onClick={() => {
              const LANGUAGES = ['en', 'ru'];
              const cur = i18n.language;
              const idx = LANGUAGES.indexOf(cur);
              const next = LANGUAGES[(idx + 1) % LANGUAGES.length];
              i18n.changeLanguage(next);
              window.localStorage.setItem('i18nextLng', next);
            }}
          >
            {i18n.language === 'en' ? <UsaFlagIcon /> : <RuFlagIcon />}
          </button>
          <button
            style={{ background: 'none', border: 'none', fontSize: 22, cursor: 'pointer', padding: '0 6px' }}
            aria-label={t('toggle_theme') || '切换主题'}
            onClick={() => {
              const body = document.body;
              if (body.classList.contains('dark-theme')) {
                body.classList.remove('dark-theme');
                body.classList.add('light-theme');
              } else {
                body.classList.remove('light-theme');
                body.classList.add('dark-theme');
              }
              setMenuOpen((v) => !v); // 触发重渲染以切换图标
            }}
          >
            <SunMoonIcon isDark={document.body.classList.contains('dark-theme')} />
          </button>
        </div>
        {/* 移动端顶部切换按钮 */}
        <div className="header-switchers-mobile" style={{display: 'none'}}>
          <button
            style={{ background: 'none', border: 'none', fontSize: 22, cursor: 'pointer', padding: '0 6px' }}
            aria-label={t('toggle_language') || '切换语言'}
            onClick={() => {
              const LANGUAGES = ['en', 'ru'];
              const cur = i18n.language;
              const idx = LANGUAGES.indexOf(cur);
              const next = LANGUAGES[(idx + 1) % LANGUAGES.length];
              i18n.changeLanguage(next);
              window.localStorage.setItem('i18nextLng', next);
            }}
          >
            {i18n.language === 'en' ? <UsaFlagIcon /> : <RuFlagIcon />}
          </button>
          <button
            style={{ background: 'none', border: 'none', fontSize: 22, cursor: 'pointer', padding: '0 6px' }}
            aria-label={t('toggle_theme') || '切换主题'}
            onClick={() => {
              const body = document.body;
              if (body.classList.contains('dark-theme')) {
                body.classList.remove('dark-theme');
                body.classList.add('light-theme');
              } else {
                body.classList.remove('light-theme');
                body.classList.add('dark-theme');
              }
              setMenuOpen((v) => !v); // 触发重渲染以切换图标
            }}
          >
            <SunMoonIcon isDark={document.body.classList.contains('dark-theme')} />
          </button>
        </div>
      </header>
      {/* 移动端底部导航栏 */}
      {!isAuthPage && (
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
      )}
    </>
  );
};

export default Header;