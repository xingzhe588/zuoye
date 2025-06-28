import React from 'react';
import { useNavigate } from 'react-router-dom';
import { getNavigationValue } from '@brojs/cli';
import { useTranslation } from 'react-i18next';
import './AuthPrompt.css';

interface AuthPromptProps {
  message?: string;
  action?: string;
  onClose?: () => void;
  showModal?: boolean;
}

export const AuthPrompt: React.FC<AuthPromptProps> = ({
  message,
  action,
  onClose,
  showModal = true
}) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleLogin = () => {
    navigate(getNavigationValue('project-monday.auth'));
    onClose?.();
  };

  const handleClose = () => {
    onClose?.();
  };

  if (!showModal) return null;

  return (
    <div className="auth-prompt-overlay">
      <div className="auth-prompt-modal">
        <div className="auth-prompt-header">
          <h3>{t('login_required')}</h3>
          <button className="auth-prompt-close" onClick={handleClose}>
            ×
          </button>
        </div>

        <div className="auth-prompt-content">
          <div className="auth-prompt-icon">
            🎨
          </div>
          <p className="auth-prompt-message">
            {message || t('login_required_message')}
          </p>
          <p className="auth-prompt-description">
            {t('after_login_you_can')}
          </p>
          <ul className="auth-prompt-benefits">
            <li>🎨 {t('create_ai_artworks')}</li>
            <li>💾 {t('save_your_works')}</li>
            <li>👥 {t('collaborate_with_artists')}</li>
            <li>📱 {t('manage_personal_collection')}</li>
          </ul>
        </div>

        <div className="auth-prompt-actions">
          <button
            className="auth-prompt-login-btn"
            onClick={handleLogin}
          >
            {t('login_register')}
          </button>
          <button
            className="auth-prompt-cancel-btn"
            onClick={handleClose}
          >
            {t('later')}
          </button>
        </div>
      </div>
    </div>
  );
};
