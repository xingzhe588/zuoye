import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getNavigationValue } from '@brojs/cli';
import { logoutUser } from '../../features/auth/model/authStore';
import { userApi } from '../../features/user-center/api/userApi';
import { RootState } from '../../store';
import { useTranslation } from 'react-i18next';
import './index.css';
import LanguageSwitcher from '../../shared/ui/LanguageSwitcher/LanguageSwitcher';
import ParticleDecor from '../main/components/main-page/ParticleDecor';

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

const UserCenterContainer: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useSelector((state: RootState) => state.auth);
  const { t, i18n } = useTranslation();
  
  // 新增：响应式判断是否为移动端（必须放在组件内部）
  const [isMobile, setIsMobile] = useState(() => window.innerWidth <= 600);
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 600);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [profile, setProfile] = useState({
    id: user?.id || '',
    email: user?.email || '',
    username: user?.username || '',
    password: '',
  });
  const [isEditing, setIsEditing] = useState(false);
  const [theme, setTheme] = useState(() => document.body.classList.contains('dark-theme') ? 'dark' : 'light');

  useEffect(() => {
    if (!isAuthenticated) {
      navigate(getNavigationValue('project-monday.auth'));
      return;
    }
    loadProfile();
    // 监听body主题变化，保证滑块同步
    const observer = new MutationObserver(() => {
      setTheme(document.body.classList.contains('dark-theme') ? 'dark' : 'light');
    });
    observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, [isAuthenticated, navigate]);

  const loadProfile = async () => {
    // 如果是guest用户，直接返回，不加载profile，也不设置error
    if (!user?.id || user?.username === 'guest') {
      return;
    }
    try {
      setIsLoading(true);
      const response = await userApi.getProfile();
      setProfile({
        id: response.data.id || user?.id || '',
        email: response.data.email || '',
        username: response.data.username || '',
        password: profile.password,
      });
    } catch (error) {
      setError(String(t('profile_load_error')));
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      await userApi.updateProfile({
        id: profile.id,
        email: profile.email,
        username: profile.username,
        password: profile.password,
      });
      const updated = await userApi.getProfile();
      setProfile({
        id: updated.data.id,
        email: updated.data.email,
        username: updated.data.username,
        password: profile.password,
      });
      setError(null);
    } catch (error) {
      setError(String(t('profile_update_error')));
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    await dispatch(logoutUser() as any);
    navigate(getNavigationValue('project-monday.auth'));
  };

  const handleBackToMain = () => {
    navigate(getNavigationValue('project-monday.main'));
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="user-center-container">
      <div className="page-bg-blur blue" style={{top: '40px', left: '60px'}} />
      <div className="page-bg-blur purple" style={{top: '300px', right: '80px'}} />
      <div className="particle-decor-bg">
        <ParticleDecor />
      </div>
      <div className="user-center-wrapper">
        {/* 左侧头像 */}
        <div className="user-center-avatar">
          <img src={require('../../assets/images/yh.jpg')} alt="avatar" style={{ width: 180, height: 180, borderRadius: '50%', marginBottom: 12, background: '#f5f5f5' }} />
          {/* 用户名 */}
          <div style={{ textAlign: 'center', fontWeight: 700, fontSize: 20, marginBottom: 8 }}>
            {profile.username}
          </div>
          <div className="user-center-card">
            {/* 语言/主题切换区域分离 */}
            {isMobile ? (
              <div className="usercenter-switchers-mobile">
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  alignItems: 'center',
                  width: '100%',
                  marginBottom: 8,
                  padding: '0 8px',
                  boxSizing: 'border-box'
                }}>
                  <span style={{fontSize: 15, color: 'var(--main-text, #232946)', fontWeight: 600, textAlign: 'left'}}>{t('language') || 'Language'}</span>
                  <div style={{display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 6}}>
                    <button
                      className="lang-toggle-btn"
                      aria-label={t('toggle_language') || '切换语言'}
                      role="switch"
                      aria-checked={i18n.language === 'en'}
                      onClick={() => {
                        const LANGUAGES = ['en', 'ru'];
                        const cur = i18n.language;
                        const idx = LANGUAGES.indexOf(cur);
                        const next = LANGUAGES[(idx + 1) % LANGUAGES.length];
                        i18n.changeLanguage(next);
                        window.localStorage.setItem('i18nextLng', next);
                      }}
                      style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
                    >
                      <span className={`theme-toggle-track lang`} style={{
                        width: 40,
                        height: 22,
                        display: 'inline-block',
                        background: i18n.language === 'ru' ? '#4ade80' : '#5a6173', // 俄语为开（绿色），英语为关（灰色）
                        borderRadius: 12,
                        position: 'relative',
                        verticalAlign: 'middle',
                      }}>
                        <span className="theme-toggle-thumb" style={{width: 18, height: 18, borderRadius: '50%', background: '#fff', position: 'absolute', top: 2, left: i18n.language === 'en' ? 2 : 'calc(100% - 18px - 2px)', transition: 'left 0.2s'}}></span>
                      </span>
                    </button>
                    <span style={{ fontSize: 20, userSelect: 'none' }}>{i18n.language === 'en' ? <UsaFlagIcon /> : <RuFlagIcon />}</span>
                  </div>
                </div>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  alignItems: 'center',
              width: '100%',
                  marginBottom: 8,
                  padding: '0 8px',
              boxSizing: 'border-box'
                }}>
                  <span style={{fontSize: 15, color: 'var(--main-text, #232946)', fontWeight: 600, textAlign: 'left'}}>{t('theme') || 'Theme'}</span>
                  <div style={{display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 6}}>
                    <button
                      className="theme-toggle-btn"
                      aria-label={t('toggle_theme') || 'Toggle theme'}
                      role="switch"
                      aria-checked={theme === 'dark'}
                      onClick={e => {
                        e.currentTarget.classList.add('clicked');
                        setTimeout(() => e.currentTarget.classList.remove('clicked'), 300);
                        const body = document.body;
                        if (body.classList.contains('dark-theme')) {
                          body.classList.remove('dark-theme');
                          body.classList.add('light-theme');
                          setTheme('light');
                        } else {
                          body.classList.remove('light-theme');
                          body.classList.add('dark-theme');
                          setTheme('dark');
                        }
                      }}
                    >
                      <span className={`theme-toggle-track ${theme}`} style={{
                        width: 40,
                        height: 22,
                        display: 'inline-block',
                        background: theme === 'dark' ? '#4ade80' : '#5a6173', // 绿色为开，灰色为关
                        borderRadius: 12,
                        position: 'relative',
                        verticalAlign: 'middle',
                      }}>
                        <span className="theme-toggle-thumb" style={{
                          width: 18,
                          height: 18,
                          borderRadius: '50%',
                          background: '#fff',
                          position: 'absolute',
                          top: 2,
                          left: theme === 'dark' ? 'calc(100% - 18px - 2px)' : 2,
                          transition: 'left 0.2s'
                        }}></span>
                      </span>
                    </button>
                    <span style={{ fontSize: 20, userSelect: 'none' }}><SunMoonIcon isDark={theme === 'dark'} /></span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="usercenter-switchers-desktop">
                <div style={{display: 'grid', gridTemplateColumns: '110px 48px 24px', alignItems: 'center', gap: 8}}>
                  <span style={{fontSize: 15, color: 'var(--main-text, #232946)', opacity: 0.9, letterSpacing: 0.5, fontWeight: 600, lineHeight: 1.2, textAlign: 'left'}}>{t('language') || 'Language'}</span>
                  <div className="lang-toggle-root">
                    <LanguageSwitcher />
                  </div>
                  <span style={{ fontSize: 20, userSelect: 'none' }}>
                    {i18n.language === 'en' ? <UsaFlagIcon /> : <RuFlagIcon />}
                  </span>
            </div>
                <div style={{display: 'grid', gridTemplateColumns: '110px 48px 24px', alignItems: 'center', gap: 8}}>
                  <span style={{fontSize: 15, color: 'var(--main-text, #232946)', opacity: 0.9, letterSpacing: 0.5, fontWeight: 600, lineHeight: 1.2, textAlign: 'left'}}>{t('theme') || 'Theme'}</span>
                  <div className="theme-toggle-root">
                    <div className="theme-toggle-row" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <button
                        className="theme-toggle-btn"
                  aria-label={t('toggle_theme') || 'Toggle theme'}
                  onClick={e => {
                    e.currentTarget.classList.add('clicked');
                    setTimeout(() => e.currentTarget.classList.remove('clicked'), 300);
                    const body = document.body;
                    if (body.classList.contains('dark-theme')) {
                      body.classList.remove('dark-theme');
                      body.classList.add('light-theme');
                      setTheme('light');
                    } else {
                      body.classList.remove('light-theme');
                      body.classList.add('dark-theme');
                      setTheme('dark');
                    }
                  }}
                >
                        <span className={`theme-toggle-track ${theme}`}>
                    <span className="theme-toggle-thumb"></span>
                  </span>
                </button>
              </div>
            </div>
                  <span style={{ fontSize: 20, userSelect: 'none' }}><SunMoonIcon isDark={theme === 'dark'} /></span>
                </div>
              </div>
            )}
          </div>
                </div>
        {/* 右侧表单 */}
        <form onSubmit={handleSubmit} className="user-center-form">
          <label style={{ fontWeight: 500, fontSize: 14, color: 'var(--main-text, #232946)' }}>{t('email') || 'Email'}</label>
          <input type="email" name="email" value={profile.email} onChange={handleChange} required style={{ padding: 8, borderRadius: 6, border: '1px solid #ccc' }} />
          <label style={{ fontWeight: 500, fontSize: 14, color: 'var(--main-text, #232946)' }}>{t('username') || 'Username'}</label>
          <input type="text" name="username" value={profile.username} onChange={handleChange} required style={{ padding: 8, borderRadius: 6, border: '1px solid #ccc' }} />
          <label style={{ fontWeight: 500, fontSize: 14, color: 'var(--main-text, #232946)' }}>{t('password') || 'Password'}</label>
          <input type="password" name="password" value={profile.password} onChange={handleChange} required style={{ padding: 8, borderRadius: 6, border: '1px solid #ccc' }} />
          {error && <div className="error-message" style={{ color: 'red', margin: '8px 0' }}>{error}</div>}
          <button type="submit" className="btn-primary" style={{ marginTop: 18, background: '#16a34a', color: '#fff', border: 'none', borderRadius: 6, padding: '12px 0', fontWeight: 600, fontSize: 16, letterSpacing: 1 }} disabled={isLoading}>
            {isLoading ? t('saving') || '保存中...' : t('save_changes') || '保存修改'}
                </button>
          <button
            type="button"
            onClick={handleLogout}
            style={{
              marginTop: 18,
              background: '#e53e3e',
              color: '#fff',
              border: 'none',
              borderRadius: 6,
              padding: '12px 0',
              fontWeight: 600,
              fontSize: 16,
              letterSpacing: 1,
              width: '100%',
            }}
          >
            {t('logout') || '退出登录'}
                </button>
            </form>
      </div>
    </div>
  );
};

export default UserCenterContainer;
