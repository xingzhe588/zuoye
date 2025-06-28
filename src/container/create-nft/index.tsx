import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import './index.css';
import { getConfigValue } from '@brojs/cli';
import { AuthPrompt } from '../../shared/ui/AuthPrompt/AuthPrompt';
import { RootState } from '../../store';
import { useTranslation } from 'react-i18next';

const CreateNFT = (): React.ReactElement => {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const { t } = useTranslation();
  const [inputValue, setInputValue] = useState('');
  const [outputText, setOutputText] = useState('');
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showAuthPrompt, setShowAuthPrompt] = useState(false);
  const [guestAttempts, setGuestAttempts] = useState(0);

  useEffect(() => {
    const savedOutputText = sessionStorage.getItem('outputText');
    if (savedOutputText) {
      setOutputText(savedOutputText);
    }

    // Load guest attempts from localStorage
    const savedAttempts = localStorage.getItem('guestAttempts');
    if (savedAttempts) {
      setGuestAttempts(parseInt(savedAttempts, 10));
    }
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = () => {
    // Allow guests to try 2 times, then prompt for login
    if (!isAuthenticated && guestAttempts >= 2) {
      setShowAuthPrompt(true);
      return;
    }

    setOutputText(inputValue);
    sessionStorage.setItem('outputText', inputValue);

    // Increment guest attempts if not authenticated
    if (!isAuthenticated) {
      const newAttempts = guestAttempts + 1;
      setGuestAttempts(newAttempts);
      localStorage.setItem('guestAttempts', newAttempts.toString());
    }

    fetchImage();
  };

  const fetchImage = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        getConfigValue('project-monday.api') + '/gigachat/prompt?prompt=' + encodeURIComponent(inputValue),
        {
          responseType: 'blob',
        }
      );

      const imageUrl = URL.createObjectURL(response.data);
      setImageSrc(imageUrl);
    } catch (error) {
      console.error(t('image_fetch_error'), error);
    } finally {
      setLoading(false);
    }
  };

  const getButtonText = () => {
    if (loading) return t('creating');
    if (!isAuthenticated && guestAttempts >= 2) return t('login_to_continue');
    if (!isAuthenticated && guestAttempts > 0) return t('create_free_attempts_left', { count: 2 - guestAttempts });
    return t('create');
  };

  const getGuestNotice = () => {
    if (isAuthenticated) return null;
    if (guestAttempts === 0) {
      return (
        <div className="guest-notice guest-notice-welcome">
          {t('guest_welcome')}
        </div>
      );
    }
    if (guestAttempts === 1) {
      return (
        <div className="guest-notice guest-notice-warning">
          {t('guest_last_attempt')}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="create-nft-page-first">
      {showAuthPrompt && (
        <AuthPrompt
          message={t('no_more_attempts')}
          action={t('continue_creating')}
          onClose={() => setShowAuthPrompt(false)}
        />
      )}

      <header className="create-nft-header">
        <div className="create-nft-box create-nft-left-panel">
          <div className="create-nft-tips">
            <h2>{t('about_artcollab_ai')}</h2>
            <p>{t('artcollab_ai_desc')}</p>
            <ul>
              <li>{t('tip_use_adjectives')}</li>
              <li>{t('tip_example')}</li>
              <li>{t('tip_more_detail')}</li>
            </ul>
          </div>
          {getGuestNotice()}
          <div className="create-nft-input-field">
            <input
              type="text"
              value={inputValue}
              onChange={handleChange}
              placeholder={t('input_placeholder')}
            />
            <button
              onClick={handleSubmit}
              disabled={loading}
              className={!isAuthenticated && guestAttempts >= 2 ? 'auth-required' : ''}
            >
              {getButtonText()}
            </button>
          </div>
          <p>{outputText}</p>
        </div>

        <div className="create-nft-box">
          <div className="create-nft-rectangle">
            <div className="content">
              {loading ? (
                <p>{t('image_generating')}</p>
              ) : imageSrc ? (
                <img src={imageSrc} alt={t('generated_image')} className="img" />
              ) : (
                <p>{t('image_placeholder')}</p>
              )}
            </div>
          </div>
        </div>
      </header>
    </div>
  );
};

export default CreateNFT;