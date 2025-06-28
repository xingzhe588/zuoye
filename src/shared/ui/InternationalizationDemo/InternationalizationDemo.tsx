import React from 'react';
import { useTranslation } from 'react-i18next';

const InternationalizationDemo: React.FC = () => {
  const { t, i18n } = useTranslation();

  const handleChangeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div style={{ 
      padding: '20px', 
      border: '1px solid #ccc', 
      borderRadius: '8px', 
      margin: '20px 0',
      backgroundColor: '#f9f9f9'
    }}>
      <h3 style={{ marginBottom: '15px', color: '#333' }}>
        🌍 {t('language')} Demo
      </h3>
      
      <div style={{ marginBottom: '15px' }}>
        <p><strong>{t('welcome')}</strong></p>
        <p>{t('ai_art_platform')}</p>
        <p>{t('main_page_description')}</p>
      </div>

      <div style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
        <button 
          onClick={() => handleChangeLanguage('en')} 
          style={{ 
            padding: '8px 16px', 
            cursor: 'pointer', 
            border: '1px solid #007bff', 
            borderRadius: '4px',
            backgroundColor: i18n.language === 'en' ? '#007bff' : 'transparent',
            color: i18n.language === 'en' ? 'white' : '#007bff'
          }}
        >
          🇺🇸 English
        </button>
        <button 
          onClick={() => handleChangeLanguage('ru')} 
          style={{ 
            padding: '8px 16px', 
            cursor: 'pointer', 
            border: '1px solid #007bff', 
            borderRadius: '4px',
            backgroundColor: i18n.language === 'ru' ? '#007bff' : 'transparent',
            color: i18n.language === 'ru' ? 'white' : '#007bff'
          }}
        >
          🇷🇺 Русский
        </button>
      </div>

      <div style={{ fontSize: '14px', color: '#666' }}>
        <p><strong>Current Language:</strong> {i18n.language.toUpperCase()}</p>
        <p><strong>Available Languages:</strong> EN, RU</p>
      </div>

      <div style={{ marginTop: '15px', padding: '10px', backgroundColor: '#e9ecef', borderRadius: '4px' }}>
        <h4 style={{ marginBottom: '10px' }}>Quick Test:</h4>
        <ul style={{ margin: 0, paddingLeft: '20px' }}>
          <li>{t('login')} / {t('register')}</li>
          <li>{t('collection')} / {t('create')} / {t('contact')}</li>
          <li>{t('user_center')} / {t('profile')}</li>
          <li>{t('ai_art')} / {t('revolution')}</li>
        </ul>
      </div>
    </div>
  );
};

export default InternationalizationDemo; 