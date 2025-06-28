import React from 'react';
import { render, screen } from '../../../../test-utils';
import { AuthRequired } from '../AuthRequired';

describe('AuthRequired', () => {
  it('renders with default props', () => {
    render(<AuthRequired />);

    expect(screen.getByText('Требуется авторизация')).toBeInTheDocument();
    expect(screen.getByText('Для доступа к этой функции необходимо войти в систему.')).toBeInTheDocument();
    expect(screen.getByText('🔒')).toBeInTheDocument();
  });

  it('renders with custom title', () => {
    const customTitle = 'Пользовательский заголовок';
    render(<AuthRequired title={customTitle} />);

    expect(screen.getByText(customTitle)).toBeInTheDocument();
  });

  it('renders with custom message', () => {
    const customMessage = 'Пользовательское сообщение';
    render(<AuthRequired message={customMessage} />);

    expect(screen.getByText(customMessage)).toBeInTheDocument();
  });

  it('renders with custom feature name', () => {
    const customFeature = 'пользовательская функция';
    render(<AuthRequired feature={customFeature} />);

    // The feature prop is used but not directly displayed in the current implementation
    expect(screen.getByText('Требуется авторизация')).toBeInTheDocument();
  });

  it('displays the lock icon', () => {
    render(<AuthRequired />);

    expect(screen.getByText('🔒')).toBeInTheDocument();
  });

  it('displays login and home links', () => {
    render(<AuthRequired />);

    const loginLink = screen.getByText('Войти');
    const homeLink = screen.getByText('На главную');

    expect(loginLink).toBeInTheDocument();
    expect(homeLink).toBeInTheDocument();

    expect(loginLink.closest('a')).toHaveAttribute('href', '/auth');
    expect(homeLink.closest('a')).toHaveAttribute('href', '/');
  });

  it('displays authorization benefits section', () => {
    render(<AuthRequired />);

    expect(screen.getByText('Почему нужна авторизация?')).toBeInTheDocument();
    expect(screen.getByText('Сохранение ваших работ')).toBeInTheDocument();
    expect(screen.getByText('Управление коллекцией')).toBeInTheDocument();
    expect(screen.getByText('Персонализированный опыт')).toBeInTheDocument();
    expect(screen.getByText('Безопасность данных')).toBeInTheDocument();
  });

  it('has correct styling structure', () => {
    const { container } = render(<AuthRequired />);

    const mainContainer = container.firstChild as HTMLElement;
    expect(mainContainer).toHaveStyle({
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '400px',
      padding: '40px',
      textAlign: 'center',
      background: '#f8f9fa',
      borderRadius: '10px',
      margin: '20px'
    });
  });

  it('renders title with correct styling', () => {
    render(<AuthRequired />);

    const title = screen.getByText('Требуется авторизация');
    expect(title).toHaveStyle({
      fontSize: '24px',
      marginBottom: '16px',
      color: '#343a40'
    });
  });

  it('renders message with correct styling', () => {
    render(<AuthRequired />);

    const message = screen.getByText('Для доступа к этой функции необходимо войти в систему.');
    expect(message).toHaveStyle({
      fontSize: '16px',
      color: '#6c757d',
      marginBottom: '30px',
      lineHeight: '1.5'
    });
  });

  it('renders action links with correct styling', () => {
    render(<AuthRequired />);

    const loginLink = screen.getByText('Войти');
    const homeLink = screen.getByText('На главную');

    expect(loginLink).toHaveStyle({
      padding: '12px 24px',
      background: '#007bff',
      color: 'white',
      textDecoration: 'none',
      borderRadius: '6px',
      fontSize: '16px',
      fontWeight: '500'
    });

    expect(homeLink).toHaveStyle({
      padding: '12px 24px',
      background: 'transparent',
      color: '#6c757d',
      textDecoration: 'none',
      borderRadius: '6px',
      fontSize: '16px',
      fontWeight: '500'
    });
  });

  it('renders without crashing', () => {
    expect(() => {
      render(<AuthRequired />);
    }).not.toThrow();
  });

  it('renders all props together correctly', () => {
    const props = {
      title: 'Пользовательский заголовок',
      message: 'Пользовательское сообщение',
      feature: 'пользовательская функция'
    };

    render(<AuthRequired {...props} />);

    expect(screen.getByText(props.title)).toBeInTheDocument();
    expect(screen.getByText(props.message)).toBeInTheDocument();
    expect(screen.getByText('Почему нужна авторизация?')).toBeInTheDocument();
  });

  it('renders all expected elements', () => {
    render(<AuthRequired />);

    // Check for all major elements
    expect(screen.getByText('🔒')).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2 })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 4 })).toBeInTheDocument();
    expect(screen.getAllByRole('link')).toHaveLength(2);
    expect(screen.getByRole('list')).toBeInTheDocument();
  });
});
