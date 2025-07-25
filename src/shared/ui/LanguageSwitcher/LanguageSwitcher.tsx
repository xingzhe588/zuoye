import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

interface LanguageSwitcherProps {
  className?: string;
}

const LANGUAGES = [
  { code: 'en', label: 'English', flag: '🇺🇸' },
  { code: 'ru', label: 'Русский', flag: '🇷🇺' }
];

const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ className }) => {
  const { i18n } = useTranslation();
  const [lang, setLang] = useState(i18n.language === 'ru' ? 'ru' : 'en');

  useEffect(() => {
    setLang(i18n.language === 'ru' ? 'ru' : 'en');
  }, [i18n.language]);

  const handleSwitch = () => {
    // 循环切换两种语言
    const currentIdx = LANGUAGES.findIndex(l => l.code === lang);
    const nextIdx = (currentIdx + 1) % LANGUAGES.length;
    const next = LANGUAGES[nextIdx].code;
    setLang(next);
    i18n.changeLanguage(next);
  };

  return (
    <div className={`lang-toggle-root ${className || ''}`} style={{ minWidth: 48, display: 'flex', alignItems: 'center' }}>
      <button
        className={`lang-toggle-btn ${lang}`}
        aria-label="切换语言"
        onClick={handleSwitch}
      >
        <span className={`lang-toggle-track ${lang}`}>
          <span className="lang-toggle-thumb"></span>
        </span>
      </button>
      <span style={{ marginLeft: 8, fontSize: 20, userSelect: 'none' }}>{LANGUAGES.find(l => l.code === lang)?.flag}</span>
    </div>
  );
};

export default LanguageSwitcher; 