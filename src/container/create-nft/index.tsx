import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import './index.css';
import { getConfigValue } from '@brojs/cli';
import { AuthPrompt } from '../../shared/ui/AuthPrompt/AuthPrompt';
import { RootState } from '../../store';

const CreateNFT = (): React.ReactElement => {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
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
      console.error('Ошибка при получении изображения:', error);
    } finally {
      setLoading(false);
    }
  };

  const getButtonText = () => {
    if (loading) return 'Создание...';
    if (!isAuthenticated && guestAttempts >= 2) return 'Войти для продолжения';
    if (!isAuthenticated && guestAttempts > 0) return `Создать (осталось ${2 - guestAttempts} бесплатных попыток)`;
    return 'Создать';
  };

  const getGuestNotice = () => {
    if (isAuthenticated) return null;
    if (guestAttempts === 0) {
      return (
        <div className="guest-notice guest-notice-welcome">
          🎨 Добро пожаловать! Вы можете бесплатно создать 2 произведения искусства
        </div>
      );
    }
    if (guestAttempts === 1) {
      return (
        <div className="guest-notice guest-notice-warning">
          ⚡ У вас осталась 1 бесплатная попытка, войдите для неограниченного создания
        </div>
      );
    }
    return null;
  };

  return (
    <div className="create-nft-page-first">
      {showAuthPrompt && (
        <AuthPrompt
          message="Вы исчерпали бесплатные попытки"
          action="продолжить создание искусства"
          onClose={() => setShowAuthPrompt(false)}
        />
      )}

      <header className="create-nft-header">
        <div className="create-nft-box create-nft-left-panel">
          <div className="create-nft-tips">
            <h2>О платформе ArtCollab AI</h2>
            <p>ArtCollab AI — это инновационный сервис для генерации уникальных арт-объектов с помощью искусственного интеллекта GigaChat.</p>
            <ul>
              <li>Попробуйте использовать яркие прилагательные и конкретные описания.</li>
              <li>Например: <b>«Динамичный пейзаж в стиле киберпанк»</b></li>
              <li>Чем подробнее описание — тем интереснее результат!</li>
            </ul>
          </div>
          {getGuestNotice()}
          <div className="create-nft-input-field">
            <input
              type="text"
              value={inputValue}
              onChange={handleChange}
              placeholder="Введите описание для создания произведения искусства (генерируется GigaChat AI)"
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
                <p>Изображение генерируется... Пожалуйста, подождите.</p>
              ) : imageSrc ? (
                <img src={imageSrc} alt="Сгенерированное изображение" className="img" />
              ) : (
                <p>Ваше спортивное произведение будет отображаться здесь</p>
              )}
            </div>
          </div>
        </div>
      </header>
    </div>
  );
};

export default CreateNFT;