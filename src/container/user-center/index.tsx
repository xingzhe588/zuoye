import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getNavigationValue } from '@brojs/cli';
import { logoutUser } from '../../features/auth/model/authStore';
import { userApi } from '../../features/user-center/api/userApi';
import { RootState } from '../../store';
import { useTranslation } from 'react-i18next';
import './index.css';

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

  useEffect(() => {
    if (!isAuthenticated) {
      navigate(getNavigationValue('project-monday.auth'));
      return;
    }
    loadProfile();
  }, [isAuthenticated, navigate]);

  const loadProfile = async () => {
    try {
      setIsLoading(true);
      const response = await userApi.getProfile();
      setProfile({
        id: response.data.id || user?.id || '',
        email: response.data.email || '',
        username: response.data.username || '',
        password: '',
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
      await userApi.updateProfile(profile);
      const updated = await userApi.getProfile();
      setProfile({
        id: updated.data.id,
        email: updated.data.email,
        username: updated.data.username,
        password: '',
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
    <div className="user-center-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', minHeight: '60vh', padding: '32px 0' }}>
      <div style={{ display: 'flex', background: '#fff', borderRadius: 12, boxShadow: '0 2px 8px rgba(0,0,0,0.08)', padding: 32, minWidth: 700 }}>
        {/* 左侧头像 */}
        <div style={{ flex: '0 0 260px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', marginRight: 48 }}>
          <img src="https://cdn-icons-png.flaticon.com/512/147/147144.png" alt="avatar" style={{ width: 180, height: 180, borderRadius: '50%', marginBottom: 24, background: '#f5f5f5' }} />
        </div>
        {/* 右侧表单 */}
        <form onSubmit={handleSubmit} style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 18, maxWidth: 350 }}>
          <label style={{ fontWeight: 500 }}>{t('email') || '电子邮箱'}</label>
          <input type="email" name="email" value={profile.email} onChange={handleChange} required style={{ padding: 8, borderRadius: 6, border: '1px solid #ccc' }} />
          <label style={{ fontWeight: 500 }}>{t('username') || '昵称'}</label>
          <input type="text" name="username" value={profile.username} onChange={handleChange} required style={{ padding: 8, borderRadius: 6, border: '1px solid #ccc' }} />
          <label style={{ fontWeight: 500 }}>{t('password') || '密码'}</label>
          <input type="password" name="password" value={profile.password} onChange={handleChange} required style={{ padding: 8, borderRadius: 6, border: '1px solid #ccc' }} />
          {error && <div className="error-message" style={{ color: 'red', margin: '8px 0' }}>{error}</div>}
          <button type="submit" className="btn-primary" style={{ marginTop: 18, background: '#16a34a', color: '#fff', border: 'none', borderRadius: 6, padding: '12px 0', fontWeight: 600, fontSize: 16, letterSpacing: 1 }} disabled={isLoading}>
            {isLoading ? t('saving') || '保存中...' : t('save_changes') || '保存修改'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserCenterContainer;
