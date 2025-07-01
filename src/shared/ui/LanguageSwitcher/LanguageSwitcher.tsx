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
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const handleChangeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    setOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const current = LANGUAGES.find(l => l.code === i18n.language) || LANGUAGES[0];

  return (
    <div ref={ref} className={className} style={{ position: 'relative', minWidth: 90 }}>
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          padding: '6px 16px',
          border: '1px solid #ccc',
          borderRadius: '6px',
          background: '#fff',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: 6,
          fontWeight: 500,
          minWidth: 80,
          boxShadow: open ? '0 2px 8px rgba(0,0,0,0.08)' : undefined
        }}
      >
        <span style={{ fontSize: 18 }}>{current.flag}</span>
        <span>{current.label}</span>
        <span style={{ marginLeft: 6, fontSize: 12, color: '#888' }}>▼</span>
      </button>
      {open && (
        <div
          style={{
            position: 'absolute',
            top: '110%',
            left: 0,
            background: '#fff',
            border: '1px solid #eee',
            borderRadius: 6,
            boxShadow: '0 4px 16px rgba(0,0,0,0.10)',
            zIndex: 100,
            minWidth: 120,
            padding: '4px 0',
          }}
        >
          {LANGUAGES.map(l => (
            <button
              key={l.code}
              onClick={() => handleChangeLanguage(l.code)}
              style={{
                width: '100%',
                padding: '8px 16px',
                background: i18n.language === l.code ? '#007bff' : 'transparent',
                color: i18n.language === l.code ? '#fff' : '#222',
                border: 'none',
                textAlign: 'left',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                fontWeight: i18n.language === l.code ? 600 : 400,
                fontSize: 15,
                transition: 'background 0.2s',
              }}
              disabled={i18n.language === l.code}
            >
              <span style={{ fontSize: 18 }}>{l.flag}</span>
              <span>{l.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher; 