# Добро пожаловать в Хранилище изображений - S3 by WebHunt 

Это веб-приложение для загрузки и обработки изображений, предназначенное для использования разработчиками для загрузки аватар и логотипов компаний.

## Установка и настройка

1. **Установка зависимостей**:
   ```bash
   npm install

2. **Настройка переменных окружения**:
Создайте файл .env в корне проекта и укажите в нем переменные:
  ``bash
  PORT=3001
  API_KEY=your_api_key_here

3. **Запуск сервера**:
    ```bash
  npm start
# Особенности
1. **Загрузка изображений: Поддерживаются изображения в форматах JPEG и PNG.**
2. **Обработка изображений: Аватары обрезаются до квадратной формы и изменяются до размера 250x250 пикселей. Логотипы компаний также обрезаются и изменяются до размера 400x400 пикселей.**
3. **Авторизация: Защита доступа к API с использованием ключа авторизации.**
4. **Кросс-доменные запросы (CORS): Настроен для разрешения доступа с указанных источников.**
**Загрузка аватар**
- ***POST /upload/avatar***
```javascript
fetch("http://localhost:3001/upload/avatar", {
  method: "POST",
  headers: {
    Authorization: "Bearer your_api_key_here",
  },
  body: formData,
});```
**Загрузка логотипа компании**
- ***POST /upload/company***
```fetch("http://localhost:3001/upload/company", {
  method: "POST",
  headers: {
    Authorization: "Bearer your_api_key_here",
  },
  body: formData,
});```
**Обработка ошибок**
- Если загружаемый файл не соответствует формату JPEG или PNG, сервер вернет статус 400 и сообщение об ошибке.
Неправильный API ключ вызовет ошибку с кодом 403.
# Автор: [Игорь Ушаков](https://github.com/IgorUshakov05) 