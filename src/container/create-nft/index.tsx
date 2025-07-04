import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { fetchAIGeneratedImage } from '../../service/imageApi';
import './index.css';
import { getConfigValue } from '@brojs/cli';
import { AuthPrompt } from '../../shared/ui/AuthPrompt/AuthPrompt';
import { RootState } from '../../store';
import { useTranslation } from 'react-i18next';
import ParticleDecor from '../main/components/main-page/ParticleDecor';
import { FaRobot } from 'react-icons/fa';

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

    // 最保险：提交时自动补全"图片"前缀
    let prompt = inputValue.trim();
    if (!prompt.startsWith('图片')) {
      prompt = '图片 ' + prompt;
    }
    setOutputText(prompt);
    sessionStorage.setItem('outputText', prompt);

    // Increment guest attempts if not authenticated
    if (!isAuthenticated) {
      const newAttempts = guestAttempts + 1;
      setGuestAttempts(newAttempts);
      localStorage.setItem('guestAttempts', newAttempts.toString());
    }

    fetchImage(prompt);
  };

  const fetchImage = async (promptText = inputValue) => {
    setLoading(true);
    try {
      const imageBlob = await fetchAIGeneratedImage(promptText);
      const imageUrl = URL.createObjectURL(imageBlob);
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
      {/* 粒子装饰（只在四周，数量减少） */}
      <ParticleDecor />
      {/* 顶部渐变分割线 */}
      <div className="main-gradient-divider"></div>
      <div className="create-nft-main-content create-nft-cool-layout">
        <div className="create-nft-left-panel">
          {/* AI icon和渐变线 */}
          <div className="create-nft-ai-icon"><FaRobot size={38} color="#1ef1f1" /></div>
          <div className="create-nft-title">ArtCollab AI</div>
          <div className="create-nft-title-divider"></div>
          {/* AI Tips区块，移动到标题分割线下方 */}
          <div className="create-nft-ai-tips-card">
            <div className="ai-tips-divider"></div>
            <div className="ai-tips-title"><FaRobot size={22} color="#1ef1f1" style={{marginRight:8}}/>AI Tips</div>
            <ul className="ai-tips-list">
              <li>✨ {t('tip_use_adjectives')}</li>
              <li>💡 {t('tip_example')}</li>
              <li>🧠 {t('tip_more_detail')}</li>
            </ul>
          </div>
          {getGuestNotice()}
          {/* 移动端保留输入框 */}
          <div className="create-nft-input-field cool-input-field create-nft-input-bottom mobile-input-field">
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
        </div>
        <div className="create-nft-right-panel">
          <div className="create-nft-image-card cool-image-card cool-image-glow">
            <div className="content">
              {loading ? (
                <p>{t('image_generating')}</p>
              ) : imageSrc ? (
                <img src={imageSrc} alt={t('generated_image')} className="img" />
              ) : (
                <div className="cool-image-placeholder">
                  <FaRobot size={64} color="#1ef1f1" style={{ filter: 'drop-shadow(0 0 16px #1ef1f1cc)' }} />
                  <p style={{ color: '#1ef1f1', fontWeight: 700, marginTop: 12 }}>{t('image_placeholder')}</p>
                </div>
              )}
            </div>
          </div>
          {/* 桌面端显示输入框和按钮 */}
          <div className="create-nft-input-field cool-input-field create-nft-input-bottom desktop-input-field">
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
        </div>
      </div>
      {showAuthPrompt && (
        <AuthPrompt
          message={t('no_more_attempts')}
          action={t('continue_creating')}
          onClose={() => setShowAuthPrompt(false)}
        />
      )}
      {/* 礼花筒装饰，仅在图片生成成功后显示 */}
      {imageSrc && !loading && (
        <>
          <div className="confetti-cannon confetti-cannon-left">🎉</div>
          <div className="confetti-cannon confetti-cannon-right">🎉</div>
        </>
      )}
    </div>
  );
};

export default CreateNFT;