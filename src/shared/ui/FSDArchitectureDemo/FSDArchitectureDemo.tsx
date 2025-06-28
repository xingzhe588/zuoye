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

  return (
    <div className="fsd-demo">
      <div className="fsd-header">
        <h2>🏗️ Feature-Sliced Design (FSD) Архитектура</h2>
        <p>Демонстрация реализации FSD в проекте ArtCollab</p>
      </div>

      {/* Слои архитектуры */}
      <div className="fsd-layers">
        <h3>Слои архитектуры (снизу вверх):</h3>
        <div className="layers-container">
          {fsdLayers.reverse().map((layer, index) => (
            <div
              key={layer.name}
              className={`layer ${selectedLayer === layer.name ? 'selected' : ''}`}
              onClick={() => setSelectedLayer(selectedLayer === layer.name ? null : layer.name)}
            >
              <div className="layer-header">
                <span className="layer-name">{layer.name}</span>
                <span className={`layer-status ${layer.status}`}>
                  {layer.status === 'active' ? '✅' : '❌'}
                </span>
              </div>
              <div className="layer-description">{layer.description}</div>
              <div className="layer-path">{layer.path}</div>
              
              {selectedLayer === layer.name && (
                <div className="layer-details">
                  <h4>Файлы и папки:</h4>
                  <ul>
                    {layer.files.map((file, idx) => (
                      <li key={idx}>{file}</li>
                    ))}
                  </ul>
                  {layer.dependencies.length > 0 && (
                    <>
                      <h4>Зависимости:</h4>
                      <ul>
                        {layer.dependencies.map((dep, idx) => (
                          <li key={idx}>{dep}</li>
                        ))}
                      </ul>
                    </>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Feature модули */}
      <div className="fsd-features">
        <h3>Feature модули (функциональные срезы):</h3>
        <div className="features-grid">
          {featureModules.map((feature, index) => (
            <div key={feature.name} className="feature-card">
              <div className="feature-header">
                <h4>📦 {feature.name}</h4>
                <span className="feature-status">✅ Активен</span>
              </div>
              <p className="feature-description">{feature.description}</p>
              
              <div className="feature-structure">
                <h5>Структура:</h5>
                {Object.entries(feature.structure).map(([folder, files]) => (
                  <div key={folder} className="structure-item">
                    <strong>{folder}</strong>
                    <ul>
                      {files.map((file, idx) => (
                        <li key={idx}>{file}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
              
              <div className="feature-capabilities">
                <h5>Возможности:</h5>
                <ul>
                  {feature.features.map((capability, idx) => (
                    <li key={idx}>{capability}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* FSD принципы */}
      <div className="fsd-principles">
        <h3>Принципы FSD в проекте:</h3>
        <div className="principles-grid">
          <div className="principle-card">
            <h4>🔄 Однонаправленные зависимости</h4>
            <p>Слои могут импортировать только из нижележащих слоев</p>
            <code>app → pages → features → shared</code>
          </div>
          
          <div className="principle-card">
            <h4>📦 Модульность</h4>
            <p>Каждый feature - независимый модуль с собственным API, UI и логикой</p>
            <code>features/auth/{api,model,ui}</code>
          </div>
          
          <div className="principle-card">
            <h4>🔧 Переиспользование</h4>
            <p>Общие компоненты и утилиты в слое shared</p>
            <code>shared/{ui,api,config,lib}</code>
          </div>
          
          <div className="principle-card">
            <h4>⚡ Динамическое управление</h4>
            <p>Функции можно включать/выключать через feature flags</p>
            <code>FeatureToggle component</code>
          </div>
        </div>
      </div>

      {/* Практические примеры */}
      <div className="fsd-examples">
        <h3>Практические примеры использования:</h3>
        <div className="examples-list">
          <div className="example-item">
            <h4>🔐 Модуль аутентификации</h4>
            <p><strong>Путь:</strong> <code>src/features/auth/</code></p>
            <p><strong>Использование:</strong> Компонент LoginForm импортируется в AuthPage</p>
            <p><strong>Feature flag:</strong> Можно отключить через <code>features.auth = false</code></p>
          </div>
          
          <div className="example-item">
            <h4>🎨 Переключение функций</h4>
            <p><strong>Компонент:</strong> <code>shared/ui/FeatureToggle</code></p>
            <p><strong>Использование:</strong> Обертка для условного рендеринга</p>
            <p><strong>Пример:</strong> <code>&lt;FeatureToggle feature="auth"&gt;...&lt;/FeatureToggle&gt;</code></p>
          </div>
          
          <div className="example-item">
            <h4>📊 Глобальное состояние</h4>
            <p><strong>Store:</strong> <code>src/store.ts</code> объединяет все feature stores</p>
            <p><strong>Модули:</strong> authStore, userStore из соответствующих features</p>
            <p><strong>Изоляция:</strong> Каждый feature управляет своим состоянием</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FSDArchitectureDemo;
