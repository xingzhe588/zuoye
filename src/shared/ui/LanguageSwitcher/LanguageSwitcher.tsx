import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

interface LanguageSwitcherProps {
  className?: string;
}

const LANGUAGES = [
  { code: 'en', label: 'English', flag: '🇺🇸' },
  { code: 'ru', label: 'Русский', flag: '🇷🇺' },
];

const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ className }) => {
  const { i18n } = useTranslation();
  const [lang, setLang] = useState(i18n.language === 'ru' ? 'ru' : 'en');

  useEffect(() => {
    setLang(i18n.language === 'ru' ? 'ru' : 'en');
  }, [i18n.language]);

  const handleSwitch = () => {
    const next = lang === 'en' ? 'ru' : 'en';
    setLang(next);
    i18n.changeLanguage(next);
  };

  return (
    <div className={`lang-toggle-root ${className || ''}`} style={{ minWidth: 90, display: 'flex', justifyContent: 'center' }}>
      <button
        className={`usercenter-switch-btn lang-toggle-btn ${lang === 'ru' ? 'ru' : 'en'}`}
        aria-label="切换语言"
        onClick={handleSwitch}
      >
        <span className="lang-toggle-track">
          <span className="lang-toggle-icon en">🇬🇧</span>
          <span className="lang-toggle-icon ru">🇷🇺</span>
          <span className="lang-toggle-thumb"></span>
        </span>
      </button>
    </div>
  );
};

export default LanguageSwitcher; 