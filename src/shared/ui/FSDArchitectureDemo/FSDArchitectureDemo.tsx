import React, { useState } from 'react';
import './FSDArchitectureDemo.css';

interface FeatureLayer {
  name: string;
  description: string;
  path: string;
  files: string[];
  status: 'active' | 'inactive';
  dependencies: string[];
}

const FSDArchitectureDemo: React.FC = () => {
  const [selectedLayer, setSelectedLayer] = useState<string | null>(null);

  // FSD架构层级定义
  const fsdLayers: FeatureLayer[] = [
    {
      name: 'app',
      description: 'Слой приложения - глобальная конфигурация',
      path: 'src/app/',
      files: ['store.ts', 'providers/FeatureProvider.tsx'],
      status: 'active',
      dependencies: []
    },
    {
      name: 'pages',
      description: 'Слой страниц - композиция виджетов',
      path: 'src/pages/',
      files: ['MainPage/', 'AuthPage/', 'UserCenterPage/', 'CollectionPage/'],
      status: 'active',
      dependencies: ['features', 'shared']
    },
    {
      name: 'features',
      description: 'Слой функций - бизнес-логика',
      path: 'src/features/',
      files: ['auth/', 'user-center/', 'feature-management/'],
      status: 'active',
      dependencies: ['shared']
    },
    {
      name: 'shared',
      description: 'Общий слой - переиспользуемые ресурсы',
      path: 'src/shared/',
      files: ['ui/', 'api/', 'config/', 'lib/'],
      status: 'active',
      dependencies: []
    }
  ];

  // Feature модули
  const featureModules = [
    {
      name: 'auth',
      description: 'Модуль аутентификации',
      structure: {
        'api/': ['authApi.ts'],
        'model/': ['authStore.ts', 'types.ts'],
        'ui/': ['LoginForm/', 'RegisterForm/', 'AuthPrompt/']
      },
      features: ['Вход в систему', 'Регистрация', 'Управление токенами', 'Проверка авторизации']
    },
    {
      name: 'user-center',
      description: 'Модуль пользовательского центра',
      structure: {
        'api/': ['userApi.ts'],
        'model/': ['userStore.ts'],
        'ui/': ['UserProfile/', 'UserSettings/']
      },
      features: ['Профиль пользователя', 'Настройки', 'Управление данными']
    },
    {
      name: 'feature-management',
      description: 'Модуль управления функциями',
      structure: {
        'model/': ['featureStore.ts'],
        'ui/': ['FeatureToggle/', 'FeaturePanel/']
      },
      features: ['Переключение функций', 'Конфигурация', 'HATEOAS поддержка']
    }
  ];

  return null;
};

export default FSDArchitectureDemo;
