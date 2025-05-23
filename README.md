# GitHub API Search

Это приложение позволяет искать и добавлять репозитории GitHub. Оно написано на TypeScript и использует API GitHub для получения данных.

## Демонстрация

Приложение доступно по ссылке: [https://github-api-eight-psi.vercel.app/](https://github-api-eight-psi.vercel.app/)

## Описание

- **Поиск репозиториев**: Введите название репозитория в поле ввода, чтобы получить список результатов.
- **Добавление репозиториев**: Выберите репозиторий из выпадающего списка, чтобы добавить его в список избранного.
- **Удаление репозиториев**: Нажмите на кнопку "X" рядом с добавленным репозиторием, чтобы удалить его из списка.
- **Очистка**: Используйте кнопку очистки, чтобы сбросить поиск и список результатов.
- **Навигация через Tab**: Используйте клавишу `Tab` для перемещения между элементами интерфейса (поле ввода, выпадающий список, кнопки). Для добавления или удаления элементов в выпадающем списке используйте `Enter` или `Space`, находясь на нужном элементе.

## Структура проекта

- `src/`: Основной код приложения.
  - `services/`: Логика работы с API и утилиты.
  - `types/`: Типы и интерфейсы для TypeScript.
  - `ghDomContent.ts`: Генерация и управление DOM-элементами.
  - `index.ts`: Точка входа приложения.
- `styles.css`: Стили для интерфейса.
- `.env`: Переменные окружения (токен GitHub).
- `package.json`: Настройки и зависимости проекта.

## Используемые технологии

- TypeScript
- Fetch API для запросов к GitHub
- Debounce для оптимизации поиска
- Husky и lint-staged для контроля качества кода
