import React from 'react';
import { useTranslation } from 'react-i18next';

interface LanguageSwitcherProps {
  className?: string;
}

const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ className }) => {
  const { i18n } = useTranslation();

  const handleChangeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className={className} style={{ display: 'flex', gap: '8px' }}>
      <button 
        onClick={() => handleChangeLanguage('en')} 
        style={{ 
          padding: '4px 8px', 
          cursor: 'pointer', 
          border: '1px solid #ccc', 
          borderRadius: '4px',
          backgroundColor: i18n.language === 'en' ? '#007bff' : 'transparent',
          color: i18n.language === 'en' ? 'white' : 'black'
        }}
      >
        EN
      </button>
      <button 
        onClick={() => handleChangeLanguage('ru')} 
        style={{ 
          padding: '4px 8px', 
          cursor: 'pointer', 
          border: '1px solid #ccc', 
          borderRadius: '4px',
          backgroundColor: i18n.language === 'ru' ? '#007bff' : 'transparent',
          color: i18n.language === 'ru' ? 'white' : 'black'
        }}
      >
        RU
      </button>
    </div>
  );
};

export default LanguageSwitcher; 