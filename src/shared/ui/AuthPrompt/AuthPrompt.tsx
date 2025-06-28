import React from 'react';
import { useNavigate } from 'react-router-dom';
import { getNavigationValue } from '@brojs/cli';
import './AuthPrompt.css';

interface AuthPromptProps {
  message?: string;
  action?: string;
  onClose?: () => void;
  showModal?: boolean;
}

export const AuthPrompt: React.FC<AuthPromptProps> = ({
  message = "Войдите для использования этой функции",
  action = "создание произведений искусства",
  onClose,
  showModal = true
}) => {
  const navigate = useNavigate();

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
          <h3>Требуется вход</h3>
          <button className="auth-prompt-close" onClick={handleClose}>
            ×
          </button>
        </div>

        <div className="auth-prompt-content">
          <div className="auth-prompt-icon">
            🎨
          </div>
          <p className="auth-prompt-message">
            {message}
          </p>
          <p className="auth-prompt-description">
            После входа вы сможете:
          </p>
          <ul className="auth-prompt-benefits">
            <li>🎨 Создавать ИИ-произведения искусства</li>
            <li>💾 Сохранять ваши работы</li>
            <li>👥 Сотрудничать с другими художниками</li>
            <li>📱 Управлять личной коллекцией</li>
          </ul>
        </div>

        <div className="auth-prompt-actions">
          <button
            className="auth-prompt-login-btn"
            onClick={handleLogin}
          >
            Войти/Зарегистрироваться
          </button>
          <button
            className="auth-prompt-cancel-btn"
            onClick={handleClose}
          >
            Позже
          </button>
        </div>
      </div>
    </div>
  );
};
