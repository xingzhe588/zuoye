import React from 'react';
import { Link } from 'react-router-dom';

interface AuthRequiredProps {
  title?: string;
  message?: string;
  feature?: string;
}

export const AuthRequired: React.FC<AuthRequiredProps> = ({
  title = 'Требуется авторизация',
  message = 'Для доступа к этой функции необходимо войти в систему.',
  feature = 'эту функцию'
}) => {
  return (
    <div style={{
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
    }}>
      <div style={{
        fontSize: '48px',
        marginBottom: '20px',
        color: '#6c757d'
      }}>
        🔒
      </div>
      
      <h2 style={{
        fontSize: '24px',
        marginBottom: '16px',
        color: '#343a40'
      }}>
        {title}
      </h2>
      
      <p style={{
        fontSize: '16px',
        marginBottom: '30px',
        color: '#6c757d',
        maxWidth: '400px',
        lineHeight: '1.5'
      }}>
        {message}
      </p>
      
      <div style={{
        display: 'flex',
        gap: '15px',
        flexWrap: 'wrap',
        justifyContent: 'center'
      }}>
        <Link
          to="/auth"
          style={{
            padding: '12px 24px',
            background: '#007bff',
            color: 'white',
            textDecoration: 'none',
            borderRadius: '6px',
            fontSize: '16px',
            fontWeight: '500',
            transition: 'background-color 0.2s'
          }}
          onMouseOver={(e) => e.currentTarget.style.background = '#0056b3'}
          onMouseOut={(e) => e.currentTarget.style.background = '#007bff'}
        >
          Войти
        </Link>
        
        <Link
          to="/"
          style={{
            padding: '12px 24px',
            background: 'transparent',
            color: '#6c757d',
            textDecoration: 'none',
            borderRadius: '6px',
            fontSize: '16px',
            fontWeight: '500',
            border: '1px solid #dee2e6',
            transition: 'all 0.2s'
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.background = '#e9ecef';
            e.currentTarget.style.color = '#495057';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.background = 'transparent';
            e.currentTarget.style.color = '#6c757d';
          }}
        >
          На главную
        </Link>
      </div>
      
      <div style={{
        marginTop: '30px',
        padding: '20px',
        background: '#e3f2fd',
        borderRadius: '8px',
        border: '1px solid #bbdefb'
      }}>
        <h4 style={{
          fontSize: '16px',
          marginBottom: '10px',
          color: '#1976d2'
        }}>
          Почему нужна авторизация?
        </h4>
        <ul style={{
          textAlign: 'left',
          color: '#424242',
          fontSize: '14px',
          lineHeight: '1.6',
          margin: 0,
          paddingLeft: '20px'
        }}>
          <li>Сохранение ваших работ</li>
          <li>Управление коллекцией</li>
          <li>Персонализированный опыт</li>
          <li>Безопасность данных</li>
        </ul>
      </div>
    </div>
  );
};

export default AuthRequired;
