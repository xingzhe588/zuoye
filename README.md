# 🎨 ArtCollab - Платформа цифрового искусства

> **Современная веб-платформа для создания и управления цифровым искусством с использованием ИИ**

[![Build Status](https://img.shields.io/badge/build-passing-brightgreen)](https://github.com/artcollab/artcollab)
[![Tests](https://img.shields.io/badge/tests-51%20passing-brightgreen)](https://github.com/artcollab/artcollab)
[![Coverage](https://img.shields.io/badge/coverage-7.65%25-yellow)](https://github.com/artcollab/artcollab)
[![TypeScript](https://img.shields.io/badge/TypeScript-100%25-blue)](https://github.com/artcollab/artcollab)

## ✨ Особенности

- 🎨 **ИИ-генерация искусства** с помощью GigaChat
- 🔐 **Система аутентификации** с прогрессивным доступом
- 🏗️ **FSD архитектура** (Feature-Sliced Design)
- 🔄 **HATEOAS** с возможностью отключения функций
- 🌍 **Полная русификация** интерфейса
- 📱 **Адаптивный дизайн** для всех устройств
- 🧪 **Покрытие тестами** (51 тест)
- ⚡ **TypeScript** для типобезопасности

## 🚀 Быстрый старт

### Системные требования
- Node.js 16+ 
- npm 8+ или yarn 1.22+
- 4+ ГБ RAM

### Установка и запуск

```bash
# 1. Клонирование репозитория
git clone <repository-url>
cd artcollab-master

# 2. Установка зависимостей
npm install

# 3. Запуск в режиме разработки
npm start

# 4. Открыть http://localhost:3000
```

### Проверка работоспособности

```bash
# Запуск тестов
npm test

# Сборка для продакшена
npm run build

# Запуск с покрытием
npm test -- --coverage
```

## 📁 Архитектура проекта

Проект следует принципам **Feature-Sliced Design (FSD)**:

```
src/
├── app/                    # 🏗️ Слой приложения
│   ├── store/             # Глобальное состояние (Redux)
│   └── router/            # Маршрутизация
├── features/              # 🎯 Функциональные срезы
│   ├── auth/              # Аутентификация
│   ├── user-center/       # Пользовательский центр
│   └── feature-management/ # Управление функциями
├── shared/                # 🔧 Общие ресурсы
│   ├── api/              # API клиент
│   ├── config/           # Конфигурация
│   ├── ui/               # UI компоненты
│   └── lib/              # Утилиты
├── pages/                 # 📄 Страницы
└── container/             # 📦 Контейнеры
```

## 🎛️ Управление функциями (HATEOAS)

Система поддерживает динамическое включение/отключение функций:

```typescript
import { featureManager } from './src/shared/config/features';

// Управление функциями
featureManager.enable('artGeneration');   // Включить создание искусства
featureManager.disable('userCenter');     // Отключить личный кабинет
featureManager.isEnabled('auth');         // Проверить статус

// Условный рендеринг
<FeatureToggle feature="artGeneration">
  <CreateArtButton />
</FeatureToggle>
```

**Доступные функции:**
- `auth` - Аутентификация
- `userCenter` - Личный кабинет  
- `artGeneration` - Создание искусства
- `collection` - Коллекция работ
- `contact` - Контакты
- `navigation` - Навигация

## 🔐 Система аутентификации

### Прогрессивный доступ
- **Гости:** Просмотр + 2 бесплатные попытки создания
- **Пользователи:** Полный доступ ко всем функциям

### Защищенные функции
- ✅ Создание цифрового искусства (требует авторизации)
- ✅ Сохранение в коллекцию
- ✅ Управление профилем
- ✅ Личный кабинет

## 🧪 Тестирование

### Статистика тестов
- **51 тест** - все проходят ✅
- **6 тестовых наборов** 
- **7.65% покрытие кода**
- **0 критических ошибок**

### Команды тестирования

```bash
# Запуск всех тестов
npm test

# Тесты с покрытием
npm test -- --coverage

# Тесты в watch режиме
npm test -- --watch

# Тесты конкретного файла
npm test -- AuthStore.test.ts
```

## 📦 Скрипты

| Команда | Описание |
|---------|----------|
| `npm start` | Запуск в режиме разработки |
| `npm test` | Запуск тестов |
| `npm run build` | Сборка для продакшена |
| `npm run lint` | Проверка кода линтером |
| `npm run format` | Форматирование кода |

## 🌐 Развертывание

### Локальная сборка
```bash
npm run build
serve -s build
```

### Облачные платформы
- **Netlify:** Перетащите папку `build/`
- **Vercel:** `vercel --prod`
- **GitHub Pages:** Настройте GitHub Actions

Подробное руководство: [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)

## 🛠️ Технологический стек

**Frontend:**
- React 18 + TypeScript
- Redux Toolkit (состояние)
- React Router (маршрутизация)
- CSS Modules (стилизация)

**Тестирование:**
- Jest + React Testing Library
- Coverage reporting

**Инструменты:**
- Webpack (сборка)
- Babel (транспиляция)
- ESLint (линтинг)

## 📚 Документация

- 📋 [Отчет о проекте](./PROJECT_REPORT.md) - Полный отчет о выполненных требованиях
- 🚀 [Руководство по развертыванию](./DEPLOYMENT_GUIDE.md) - Подробная инструкция по установке и настройке
- 🧪 [Тестирование](./src/__tests__/) - Примеры тестов и покрытие

## 🤝 Участие в разработке

1. Форкните репозиторий
2. Создайте ветку функции (`git checkout -b feature/amazing-feature`)
3. Внесите изменения
4. Добавьте тесты для новой функциональности
5. Отправьте Pull Request

## 📄 Лицензия

Этот проект лицензирован под MIT License - см. файл [LICENSE](LICENSE) для деталей.

---

**🎨 Создавайте искусство с ArtCollab!** ✨

> Проект полностью готов к использованию и развертыванию
> https://github.com/xingzhe588/zuoye234.git
