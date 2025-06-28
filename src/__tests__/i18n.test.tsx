import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { I18nextProvider } from 'react-i18next';
import i18n from '../i18n';
import { useTranslation } from 'react-i18next';

// 测试组件
const TestComponent = () => {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div>
      <h1>{t('welcome')}</h1>
      <p>{t('ai_art')}</p>
      <button onClick={() => changeLanguage('en')}>EN</button>
      <button onClick={() => changeLanguage('ru')}>RU</button>
    </div>
  );
};

// 包装组件
const TestWrapper = ({ children }: { children: React.ReactNode }) => (
  <I18nextProvider i18n={i18n}>
    {children}
  </I18nextProvider>
);

describe('i18n Internationalization', () => {
  beforeEach(() => {
    i18n.changeLanguage('en');
  });

  test('should display English text by default', () => {
    render(
      <TestWrapper>
        <TestComponent />
      </TestWrapper>
    );

    expect(screen.getByText('Welcome')).toBeInTheDocument();
    expect(screen.getByText('AI ART')).toBeInTheDocument();
  });

  test('should switch to Russian when RU button is clicked', () => {
    render(
      <TestWrapper>
        <TestComponent />
      </TestWrapper>
    );

    const ruButton = screen.getByText('RU');
    fireEvent.click(ruButton);

    expect(screen.getByText('Добро пожаловать')).toBeInTheDocument();
    expect(screen.getByText('ИИ-ИСКУССТВО')).toBeInTheDocument();
  });

  test('should switch back to English when EN button is clicked', () => {
    render(
      <TestWrapper>
        <TestComponent />
      </TestWrapper>
    );

    // 先切换到俄语
    const ruButton = screen.getByText('RU');
    fireEvent.click(ruButton);

    // 再切换回英语
    const enButton = screen.getByText('EN');
    fireEvent.click(enButton);

    expect(screen.getByText('Welcome')).toBeInTheDocument();
    expect(screen.getByText('AI ART')).toBeInTheDocument();
  });

  test('should handle missing translation keys gracefully', () => {
    render(
      <TestWrapper>
        <TestComponent />
      </TestWrapper>
    );

    // 测试不存在的翻译键应该返回键名本身
    const { t } = useTranslation();
    expect(t('non_existent_key')).toBe('non_existent_key');
  });
}); 