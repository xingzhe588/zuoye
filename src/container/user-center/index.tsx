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

const UserCenterContainer: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useSelector((state: RootState) => state.auth);
  const { t } = useTranslation();
  
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
      <div className="particle-decor-bg">
        <ParticleDecor />
      </div>
      <div className="user-center-wrapper">
        {/* 左侧头像 */}
        <div className="user-center-avatar">
          <img src={require('../../assets/images/yh.jpg')} alt="avatar" style={{ width: 180, height: 180, borderRadius: '50%', marginBottom: 12, background: '#f5f5f5' }} />
          <div style={{ textAlign: 'center', fontWeight: 700, fontSize: 20, marginBottom: 8 }}>
            {profile.username}
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'stretch',
              gap: 14,
              marginBottom: 24,
              border: '1px solid #e0e7ef',
              borderRadius: 10,
              padding: '16px 18px',
              background: 'rgba(245,246,250,0.7)',
              width: '100%',
              maxWidth: 350,
              boxSizing: 'border-box'
            }}
          >
            {/* 语言切换 */}
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
              <span style={{
                fontSize: 15,
                color: 'var(--main-text, #232946)',
                opacity: 0.85,
                letterSpacing: 0.5,
                fontWeight: 500,
                flex: 1,
                display: 'flex',
                alignItems: 'center'
              }}>{t('language') || 'Language'}</span>
              <div style={{ flexShrink: 0, display: 'flex', alignItems: 'center' }}>
                <LanguageSwitcher />
              </div>
            </div>
            {/* 主题切换 */}
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
              <span style={{
                fontSize: 15,
                color: 'var(--main-text, #232946)',
                opacity: 0.85,
                letterSpacing: 0.5,
                fontWeight: 500,
                flex: 1,
                display: 'flex',
                alignItems: 'center'
              }}>{t('theme') || 'Theme'}</span>
              <div style={{ flexShrink: 0, display: 'flex', alignItems: 'center' }}>
                <button
                  className={`usercenter-switch-btn theme-switch-btn theme-toggle-btn ${theme}`}
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
                  <span className="theme-toggle-track">
                    <span className="theme-toggle-icon sun">🌞</span>
                    <span className="theme-toggle-icon moon">🌜</span>
                    <span className="theme-toggle-thumb"></span>
                  </span>
                </button>
              </div>
            </div>
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
