# NoteAppWithAuthorization

![Python](https://img.shields.io/badge/Python-3.13-blue)
![Django](https://img.shields.io/badge/Django-5.2.6-green)
![Docker](https://img.shields.io/badge/Docker-Supported-blue)

## 📝 Описание проекта

**NoteAppWithAuthorization** - это веб-приложение для управления заметками с системой аутентификации пользователей. Проект состоит из бэкенда на Django с REST API и фронтенда на HTML/CSS/JavaScript, который служит визуализацией данных и интерфейсом взаимодействия с API.

## ✨ Особенности

- **Аутентификация пользователей** - регистрация и вход с использованием JWT-токенов
- **Управление заметками** - создание, редактирование, удаление и просмотр заметок
- **Категоризация** - заметки можно распределять по категориям
- **Избранные заметки** - возможность помечать важные заметки

## 🛠️ Технологии


- **Django** 5.2.6 - веб-фреймворк
- **Django REST Framework** - для создания REST API
- **Simple JWT** - для аутентификации с использованием JWT-токенов
- **PostgreSQL** - основная база данных (возможна работа с SQLite)
- **Docker** - для контейнеризации


## 📁 Структура проекта

```
NoteAppWithAuthorization/
├── backend/                 # Django-приложение
│   ├── authentication/      # Модуль аутентификации
│   ├── notes/              # Модуль заметок
│   ├── note_project/       # Настройки Django-проекта
│   ├── manage.py
│   ├── requirements.txt
│   └── Dockerfile
├── frontend/               # Фронтенд-приложение
│   ├── index.html          
│   ├── auth.html          
│   ├── js/
│   ├── css/
│   └── Dockerfile
├── docker-compose.yml      # Конфигурация Docker
├── .env_example            # Пример файла переменных окружения
└── README.md               # Документация проекта
```

## 🔧 Установка и запуск

### С использованием Docker (рекомендуется):

1. Клонируйте репозиторий:
```bash
git https://github.com/SergeyR-172/Note-app-with-authorization-Django.git
cd Note-app-with-authorization-Django
```

2. Создайте файл `.env` на основе `.env_example`:


3. Отредактируйте файл `.env`, установив свои значения переменных:
```bash
DEBUG=1
VERY_SECRET_KEY=ваш_секретный_ключ
# и другие переменные
```

4. Запустите проект с помощью Docker Compose:
```bash
docker-compose up --build
```

Приложение будет доступно по адресу:
- Фронтенд: `http://localhost`
- Бэкенд: `http://localhost:8000`
- API документация (Swagger): `http://localhost:8000/api/schema/swagger-ui/`

### Без Docker:

1. Установите Python 3.13 и PostgreSQL

2. Клонируйте репозиторий:
```bash
git https://github.com/SergeyR-172/Note-app-with-authorization-Django.git
cd Note-app-with-authorization-Django
```

3. Установите зависимости для бэкенда:
```bash
cd backend
pip install -r requirements.txt
```

4. Настройте базу данных:
```bash
python manage.py migrate
```

5. Запустите бэкенд:
```bash
python manage.py runserver
```

6. Запустите фронтенд (например, с помощью Live Server в VS Code или любого другого способа)

## 🌐 API эндпоинты

### Аутентификация:
- `POST /api/auth/register/` - регистрация пользователя
- `POST /api/auth/login/` - аутентификация пользователя
- `POST /api/auth/token/refresh/` - обновление токена

### Заметки:
- `GET /api/notes/` - получить все заметки пользователя
- `POST /api/notes/` - создать новую заметку
- `GET /api/notes/{id}/` - получить заметку по ID
- `PUT /api/notes/{id}/` - полностью обновить заметку
- `PATCH /api/notes/{id}/` - частично обновить заметку
- `DELETE /api/notes/{id}/` - удалить заметку

> ⚠️ **Важно**: Для работы с заметками (все эндпоинты, кроме аутентификации) необходимо передавать заголовок `Authorization: Bearer <token>`, где `<token>` - это JWT-токен, полученный при аутентификации.

### Документация:
- `GET /api/schema/swagger-ui/` - Swagger UI
- `GET /api/schema/redoc/` - ReDoc

## 📋 Примеры использования API

### Регистрация пользователя:
```json
POST /api/auth/register/
{
  "username": "testuser",
  "email": "test@example.com",
  "password": "securepassword123",
  "password2": "securepassword123"
}
```

### Аутентификация:
```json
POST /api/auth/login/
{
  "username": "testuser",
  "password": "securepassword123"
}
```

### Создание заметки:
```json
POST /api/notes/
{
  "title": "Моя первая заметка",
  "content": "Содержание заметки",
  "category": "Работа",
  "favourite": false
}
```

## 🔐 Безопасность

- Использование JWT-токенов для аутентификации
- Валидация паролей по стандартным правилам Django
- Ограничение доступа к API только аутентифицированным пользователям
- Ограничение доступа к заметкам только их владельцам
- CORS настройки для разрешения запросов с доверенных источников
