import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './index.css';
import { getConfigValue } from '@brojs/cli';

const CreateNFT = (): React.ReactElement => {
  const [inputValue, setInputValue] = useState('');
  const [outputText, setOutputText] = useState('');
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const savedOutputText = sessionStorage.getItem('outputText');
    if (savedOutputText) {
      setOutputText(savedOutputText);
    }
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = () => {
    setOutputText(inputValue);
    sessionStorage.setItem('outputText', inputValue);
    fetchImage();
  };

  const fetchImage = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        getConfigValue('artcollab.api') + '/gigachat/prompt?prompt=' + encodeURIComponent(inputValue),
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

  return (
    <div className="create-nft-page-first">
      <header className="create-nft-header">
        <div className="create-nft-box">
          <div className="create-nft-input-field">
            <input
              type="text"
              value={inputValue}
              onChange={handleChange}
              placeholder="Введите запрос на создание NFT (Обрабатывается AI GigaChat)"
            />
            <button onClick={handleSubmit} disabled={loading}>
              {loading ? 'Генерация...' : 'Отправить'}
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
                <p>Здесь появится ваша картинка (когда-нибудь :'( )</p>
              )}
            </div>
          </div>
        </div>
      </header>
    </div>
  );
};

export default CreateNFT;