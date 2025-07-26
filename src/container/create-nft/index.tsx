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
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);
  const isGuest = localStorage.getItem('isGuest') === '1' || user?.username === '游客';
  const { t } = useTranslation();
  const [inputValue, setInputValue] = useState('');
  const [outputText, setOutputText] = useState('');
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showAuthPrompt, setShowAuthPrompt] = useState(false);
  const [guestAttempts, setGuestAttempts] = useState(0);

  useEffect(() => {
    const savedImage = localStorage.getItem('lastImageSrc');
    if (savedImage) {
      setImageSrc(savedImage);
    }
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
    if ((!isAuthenticated || isGuest) && guestAttempts >= 2) {
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

    // Increment guest attempts if not authenticated or isGuest
    if (!isAuthenticated || isGuest) {
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
      localStorage.setItem('lastImageSrc', imageUrl);
    } catch (error) {
      console.error(t('image_fetch_error'), error);
    } finally {
      setLoading(false);
    }
  };

  const getButtonText = () => {
    if (loading) return t('creating');
    if ((!isAuthenticated || isGuest) && guestAttempts >= 2) return t('login_to_continue');
    if ((!isAuthenticated || isGuest) && guestAttempts === 1) return t('create_left_one');
    if ((!isAuthenticated || isGuest) && guestAttempts === 0) return t('create');
    return t('create');
  };

  const getGuestNotice = () => {
    if (isAuthenticated && !isGuest) return null;
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
    <main aria-label="AI Art Creation Page" tabIndex={-1}>
      {/* 粒子装饰 */}
      <ParticleDecor />
      {/* 顶部渐变分割线 */}
      <div className="main-gradient-divider"></div>
      <div className="page-bg-blur blue" style={{top: '40px', left: '60px'}} />
      <div className="page-bg-blur green" style={{top: '300px', right: '80px'}} />
      <div className="page-bg-blur yellow" style={{bottom: '60px', left: '120px'}} />
      <div className="create-nft-main-content create-nft-cool-layout">
        <section aria-labelledby="ai-title" className="create-nft-left-panel" role="region">
          <h1 id="ai-title" style={{display:'flex',alignItems:'center',gap:8}}>
            <FaRobot aria-hidden="true" style={{color:'#1ef1f1',fontSize:32}} />
            ArtCollab AI
          </h1>
          <hr aria-hidden="true" />
          {/* AI Tips区块，移动到标题分割线下方 */}
          <section className="create-nft-ai-tips-card" role="region" aria-label="AI Tips">
            <h2 style={{display:'flex',alignItems:'center',gap:8}}>
              <FaRobot aria-hidden="true" style={{color:'#1ef1f1',fontSize:22}} />
              AI Tips
            </h2>
            <ul className="ai-tips-list">
              <li>✨ {t('tip_use_adjectives')}</li>
              <li>💡 {t('tip_example')}</li>
              <li>🧠 {t('tip_more_detail')}</li>
            </ul>
          </section>
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
        </section>
        <section className="create-nft-right-panel" role="region" aria-label="AI Artwork Preview">
          <div className="create-nft-image-card cool-image-card cool-image-glow">
            <div className="content">
              {loading ? (
                <p className="image-generating-tip">{t('image_generating')}</p>
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
        </section>
      </div>
      {showAuthPrompt && (
        <AuthPrompt
          message={t('no_more_attempts')}
          action={t('continue_creating')}
          onClose={() => setShowAuthPrompt(false)}
        />
      )}

    </main>
  );
};

export default CreateNFT;