import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import zh from './locales/zh.json';
import ru from './locales/ru.json';

i18n
  .use(LanguageDetector) // 检测语言
  .use(initReactI18next) // React 插件
  .init({
    resources: {
      zh: { translation: zh },
      ru: { translation: ru }
    },
    fallbackLng: 'zh', // 默认中文
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
