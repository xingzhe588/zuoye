import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getNavigationValue } from '@brojs/cli';
import { logoutUser } from '../../features/auth/model/authStore';
import { userApi } from '../../features/user-center/api/userApi';
import { RootState } from '../../store';
import FSDArchitectureDemo from '../../shared/ui/FSDArchitectureDemo/FSDArchitectureDemo';
import './index.css';

const UserCenterContainer: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useSelector((state: RootState) => state.auth);
  
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [profile, setProfile] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    bio: '',
    location: '',
    website: '',
  });

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
        firstName: response.data.firstName || '',
        lastName: response.data.lastName || '',
        bio: response.data.bio || '',
        location: response.data.location || '',
        website: response.data.website || '',
      });
    } catch (error) {
      setError('Ошибка загрузки профиля пользователя');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      await userApi.updateProfile(profile);
      setIsEditing(false);
      setError(null);
      alert('Профиль успешно обновлен!');
    } catch (error) {
      setError('Ошибка обновления профиля');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    await dispatch(logoutUser() as any);
    navigate(getNavigationValue('project-monday.main'));
  };

  const handleBackToMain = () => {
    navigate(getNavigationValue('project-monday.main'));
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="user-center-container">
      <div className="user-center-wrapper">
        <div className="user-center-header">
          <h1>Личный кабинет</h1>
          <div className="header-actions">
            <button onClick={handleBackToMain} className="btn-secondary">
              На главную
            </button>
            <button onClick={handleLogout} className="btn-danger">
              Выйти
            </button>
          </div>
        </div>

        {error && <div className="error-message">{error}</div>}

        <div className="profile-section">
          <div className="profile-header">
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
          </div>

          {isEditing ? (
            <form onSubmit={handleSubmit} className="profile-form">
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="firstName">Имя</label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={profile.firstName}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="lastName">Фамилия</label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={profile.lastName}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="bio">О себе</label>
                <textarea
                  id="bio"
                  name="bio"
                  value={profile.bio}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Расскажите о себе..."
                />
              </div>

              <div className="form-group">
                <label htmlFor="location">Местоположение</label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={profile.location}
                  onChange={handleChange}
                  placeholder="Например: Москва"
                />
              </div>

              <div className="form-group">
                <label htmlFor="website">Веб-сайт</label>
                <input
                  type="url"
                  id="website"
                  name="website"
                  value={profile.website}
                  onChange={handleChange}
                  placeholder="https://example.com"
                />
              </div>

              <div className="form-actions">
                <button type="submit" disabled={isLoading} className="btn-primary">
                  {isLoading ? 'Сохранение...' : 'Сохранить'}
                </button>
                <button type="button" onClick={() => setIsEditing(false)} className="btn-secondary">
                  Отмена
                </button>
              </div>
            </form>
          ) : (
            <div className="profile-display">
              <div className="profile-field">
                <label>О себе:</label>
                <p>{profile.bio || 'Не указано'}</p>
              </div>
              <div className="profile-field">
                <label>Местоположение:</label>
                <p>{profile.location || 'Не указано'}</p>
              </div>
              <div className="profile-field">
                <label>Веб-сайт:</label>
                <p>{profile.website || 'Не указано'}</p>
              </div>
              <button onClick={() => setIsEditing(true)} className="btn-primary">
                Редактировать профиль
              </button>
            </div>
          )}
        </div>

        {/* FSD архитектура */}
        <div className="features-section">
          <h3>FSD Архитектура - Feature-Sliced Design</h3>
          <div className="features-grid">
            <div className="feature-card">
              <h4>🔐 Слой аутентификации</h4>
              <span className="status enabled">✅ Включен</span>
              <p>Вход, регистрация, управление токенами</p>
            </div>
            <div className="feature-card">
              <h4>👤 Слой пользователя</h4>
              <span className="status enabled">✅ Включен</span>
              <p>Профиль, настройки пользователя</p>
            </div>
            <div className="feature-card">
              <h4>🎨 Слой генерации искусства</h4>
              <span className="status enabled">✅ Включен</span>
              <p>Функции создания ИИ-искусства</p>
            </div>
            <div className="feature-card">
              <h4>🖼️ Слой коллекции</h4>
              <span className="status enabled">✅ Включен</span>
              <p>Просмотр и управление работами</p>
            </div>
          </div>
          <div className="architecture-note">
            <p><strong>Особенности FSD:</strong> Каждый функциональный слой полностью независим, содержит API, UI, модели и тестовый код, поддерживает динамическое включение/отключение.</p>
          </div>
        </div>
      </div>

      {/* FSD架构展示 */}
      <div className="fsd-architecture-section">
        <FSDArchitectureDemo />
      </div>
    </div>
  );
};

export default UserCenterContainer;
