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
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    bio: '',
    location: '',
    website: '',
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
        firstName: response.data.firstName || '',
        lastName: response.data.lastName || '',
        bio: response.data.bio || '',
        location: response.data.location || '',
        website: response.data.website || '',
      });
    } catch (error) {
      setError(String(t('profile_load_error')));
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      await userApi.updateProfile(profile);
      loadProfile();
      setIsEditing(false);
    } catch (error) {
      setError(String(t('profile_update_error')));
    } finally {
      setIsLoading(false);
    }
  };

  // 新增简单Modal组件
  const Modal: React.FC<{ open: boolean; onClose: () => void; children: React.ReactNode }> = ({ open, onClose, children }) => {
    if (!open) return null;
    return (
      <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.25)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ background: '#fff', borderRadius: 10, minWidth: 320, maxWidth: 400, width: '90vw', padding: 24, position: 'relative', boxShadow: '0 4px 24px rgba(0,0,0,0.18)' }}>
          <button onClick={onClose} style={{ position: 'absolute', top: 12, right: 16, background: 'none', border: 'none', fontSize: 22, cursor: 'pointer', color: '#888' }}>&times;</button>
          {children}
        </div>
      </div>
    );
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="user-center-container">
      <div className="user-center-wrapper">
        <div className="user-center-header">
          <h1>{t('user_center')}</h1>
          <div className="header-actions">
            <button onClick={handleBackToMain} className="btn-secondary">
              {t('to_main')}
            </button>
            <button onClick={handleLogout} className="btn-danger">
              {t('logout')}
            </button>
          </div>
        </div>
        {error && <div className="error-message">{error}</div>}
        <div className="profile-section">
          <div className="profile-card" style={{ position: 'relative', background: '#fff', borderRadius: 12, boxShadow: '0 2px 8px rgba(0,0,0,0.08)', padding: 24, marginBottom: 24 }}>
            <button onClick={() => setIsEditing(true)} style={{ position: 'absolute', top: 18, right: 18, background: '#007bff', color: '#fff', border: 'none', borderRadius: '50%', width: 36, height: 36, fontSize: 18, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }} title={t('edit')}>
              ✎
            </button>
            <div className="avatar-section">
              <div className="avatar">
                {user?.firstName?.[0] || user?.username?.[0] || 'U'}
              </div>
              <div className="user-info">
                <h2>{user?.firstName} {user?.lastName}</h2>
                <p>@{user?.username}</p>
                <p>{user?.email}</p>
              </div>
            </div>
            <div className="profile-fields" style={{ marginTop: 18 }}>
              <div><strong>{t('about')}:</strong> {profile.bio || t('not_specified')}</div>
              <div><strong>{t('location')}:</strong> {profile.location || t('not_specified')}</div>
              <div><strong>{t('website')}:</strong> {profile.website || t('not_specified')}</div>
            </div>
          </div>
        </div>
        {/* 编辑弹窗 */}
        <Modal open={isEditing} onClose={() => setIsEditing(false)}>
          <h2 style={{ marginTop: 0 }}>{t('edit_profile') || '编辑资料'}</h2>
          <form onSubmit={handleSubmit} className="profile-form">
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="firstName">{t('first_name')}</label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={profile.firstName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="lastName">{t('last_name')}</label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={profile.lastName}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="bio">{t('about')}</label>
              <textarea
                id="bio"
                name="bio"
                value={profile.bio}
                onChange={handleChange}
                rows={3}
                placeholder={t('about_placeholder')}
              />
            </div>
            <div className="form-group">
              <label htmlFor="location">{t('location')}</label>
              <input
                type="text"
                id="location"
                name="location"
                value={profile.location}
                onChange={handleChange}
                placeholder={t('location_placeholder')}
              />
            </div>
            <div className="form-group">
              <label htmlFor="website">{t('website')}</label>
              <input
                type="url"
                id="website"
                name="website"
                value={profile.website}
                onChange={handleChange}
                placeholder={t('website_placeholder')}
              />
            </div>
            {error && <div className="error-message" style={{ color: 'red', marginBottom: 8 }}>{error}</div>}
            <div className="form-actions" style={{ display: 'flex', gap: 12, marginTop: 12 }}>
              <button type="submit" disabled={isLoading} className="btn-primary">
                {isLoading ? t('saving') : t('save')}
              </button>
              <button type="button" onClick={() => setIsEditing(false)} className="btn-secondary">
                {t('cancel')}
              </button>
            </div>
          </form>
        </Modal>
      </div>
    </div>
  );
};

export default UserCenterContainer;
