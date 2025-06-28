import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { userApi, UserProfile as UserProfileType } from '../../api/userApi';
import { RootState } from '../../../../store';

const UserProfile: React.FC = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const [profile, setProfile] = useState<UserProfileType | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    bio: '',
    location: '',
    website: '',
    birthDate: '',
  });

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      setIsLoading(true);
      const response = await userApi.getProfile();
      setProfile(response.data);
      setFormData({
        firstName: response.data.firstName || '',
        lastName: response.data.lastName || '',
        bio: response.data.bio || '',
        location: response.data.location || '',
        website: response.data.website || '',
        birthDate: response.data.birthDate || '',
      });
    } catch (error) {
      setError('Не удалось загрузить профиль пользователя');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const response = await userApi.updateProfile(formData);
      setProfile(response.data);
      setIsEditing(false);
      setError(null);
    } catch (error) {
      setError('Не удалось обновить профиль пользователя');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsLoading(true);
      const response = await userApi.uploadAvatar(file);
      if (profile) {
        setProfile({ ...profile, avatar: response.data.avatar });
      }
    } catch (error) {
      setError('Не удалось загрузить аватар');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading && !profile) {
    return <div className="loading">Загрузка...</div>;
  }

  return (
    <div className="user-profile">
      <h2>Личный профиль</h2>

      {error && <div className="error-message">{error}</div>}

      <div className="profile-header">
        <div className="avatar-section">
          <img
            src={profile?.avatar || '/default-avatar.png'}
            alt="Аватар пользователя"
            className="avatar"
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleAvatarUpload}
            className="avatar-upload"
          />
        </div>
        
        <div className="user-info">
          <h3>{profile?.firstName} {profile?.lastName}</h3>
          <p>@{profile?.username}</p>
          <p>{profile?.email}</p>
        </div>
      </div>

      {isEditing ? (
        <form onSubmit={handleSubmit} className="profile-form">
          <div className="form-group">
            <label htmlFor="firstName">Имя</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="lastName">Фамилия</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="bio">О себе</label>
            <textarea
              id="bio"
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              rows={4}
            />
          </div>

          <div className="form-group">
            <label htmlFor="location">Местоположение</label>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="website">Веб-сайт</label>
            <input
              type="url"
              id="website"
              name="website"
              value={formData.website}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="birthDate">Дата рождения</label>
            <input
              type="date"
              id="birthDate"
              name="birthDate"
              value={formData.birthDate}
              onChange={handleChange}
            />
          </div>

          <div className="form-actions">
            <button type="submit" disabled={isLoading}>
              {isLoading ? 'Сохранение...' : 'Сохранить'}
            </button>
            <button type="button" onClick={() => setIsEditing(false)}>
              Отмена
            </button>
          </div>
        </form>
      ) : (
        <div className="profile-display">
          <div className="profile-field">
            <label>О себе:</label>
            <p>{profile?.bio || 'Не указано'}</p>
          </div>

          <div className="profile-field">
            <label>Местоположение:</label>
            <p>{profile?.location || 'Не указано'}</p>
          </div>

          <div className="profile-field">
            <label>Веб-сайт:</label>
            <p>{profile?.website || 'Не указано'}</p>
          </div>

          <div className="profile-field">
            <label>Дата рождения:</label>
            <p>{profile?.birthDate || 'Не указано'}</p>
          </div>

          <button onClick={() => setIsEditing(true)}>
            Редактировать профиль
          </button>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
export { UserProfile };
