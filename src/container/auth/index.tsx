import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getNavigationValue } from '@brojs/cli';
import { loginUser, registerUser } from '../../features/auth/model/authStore';
import { RootState } from '../../store';
import { useTranslation } from 'react-i18next';
import './index.css';

const AuthContainer: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, error } = useSelector((state: RootState) => state.auth);
  const { t } = useTranslation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (isLogin) {
        await dispatch(loginUser({
          username: formData.username,
          password: formData.password,
        }) as any);
      } else {
        if (formData.password !== formData.confirmPassword) {
          alert(t('passwords_do_not_match'));
          return;
        }
        await dispatch(registerUser({
          username: formData.username,
          email: formData.email,
          password: formData.password,
          confirmPassword: formData.confirmPassword,
          firstName: formData.firstName,
          lastName: formData.lastName,
        }) as any);
      }
      
      // Успешно - переход в личный кабинет
      navigate(getNavigationValue('project-monday.user-center'));
    } catch (error) {
      console.error('Ошибка аутентификации:', error);
    }
  };

  const handleCancel = () => {
    navigate(getNavigationValue('project-monday.main'));
  };

  return (
    <div className="auth-container">
      <div className="auth-wrapper">
        <div className="auth-header">
          <h1>{t('artcollab')}</h1>
          <p>{t('ai_art_platform')}</p>
        </div>

        <div className="auth-tabs">
          <button
            className={`auth-tab ${isLogin ? 'active' : ''}`}
            onClick={() => setIsLogin(true)}
          >
            {t('login_tab')}
          </button>
          <button
            className={`auth-tab ${!isLogin ? 'active' : ''}`}
            onClick={() => setIsLogin(false)}
          >
            {t('register_tab')}
          </button>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          {error && <div className="auth-error">{error}</div>}

          <div className="form-group">
            <label htmlFor="username">{t('username')}</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder={t('enter_username')}
              required
            />
          </div>

          {!isLogin && (
            <div className="form-group">
              <label htmlFor="email">{t('email')}</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder={t('enter_email')}
                required
              />
            </div>
          )}

          {!isLogin && (
            <>
              <div className="form-group">
                <label htmlFor="firstName">{t('first_name')}</label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder={t('enter_first_name')}
                />
              </div>
              <div className="form-group">
                <label htmlFor="lastName">{t('last_name')}</label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder={t('enter_last_name')}
                />
              </div>
            </>
          )}

          <div className="form-group">
            <label htmlFor="password">{t('password')}</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder={t('enter_password')}
              required
            />
          </div>

          {!isLogin && (
            <div className="form-group">
              <label htmlFor="confirmPassword">{t('confirm_password')}</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder={t('enter_confirm_password')}
                required
              />
            </div>
          )}

          <div className="form-actions">
            <button type="submit" disabled={isLoading} className="btn-primary">
              {isLoading ? (isLogin ? t('login_loading') : t('register_loading')) : (isLogin ? t('login') : t('register'))}
            </button>
            <button type="button" onClick={handleCancel} className="btn-secondary">
              {t('cancel')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AuthContainer;
