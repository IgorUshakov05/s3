# **Хранилище файлов S3 by WebHunt**

Веб-приложение для управления файлами (загрузка, хранение, удаление) различных форматов. Разработано для упрощения работы с файлами, включая PDF, изображения и документы, с защитой через авторизацию.

---

## **Особенности приложения**

- **Загрузка файлов**: Поддержка различных форматов (PDF, изображения, текст, документы).
- **Удаление файлов**: Удобное удаление через API с проверкой существования.
- **Авторизация**: API защищено с использованием ключа авторизации.
- **Генерация preview**: Генерация превью-ссылки на основе входных данных.
- **Фильтрация файлов**: Проверка размера (до 20 МБ) и поддерживаемого формата.
- **Кросс-доменные запросы (CORS)**: Настроен для внешних запросов.

---

## **Установка и настройка**

1. **Клонирование проекта**
   ```bash
   git clone https://github.com/IgorUshakov05/s3.git
   cd s3-file-storage
   ```
   Установка зависимостей:
   ```bash
   npm install
   ```
   Настройка переменных окружения:
   Создайте файл `.env` в корне проекта и укажите:
   ```bash
   PORT=3001
   API_KEY=your_api_key_here
   SERVER=http://localhost:3001
   ```

2. **Запуск сервера**
   ```bash
   npm start
   ```

---

## **API Endpoints**

### 1. **Получение изображения компании**
- **URL**: `GET /company/:imageName`
- **Описание**: Получение изображения компании по имени файла.
- **Заголовки**:
  - `Authorization: Bearer your_api_key_here`
  
---

### 2. **Получение аватара**
- **URL**: `GET /avatar/:imageName`
- **Описание**: Получение аватара по имени файла.
- **Заголовки**:
  - `Authorization: Bearer your_api_key_here`

---

### 3. **Загрузка изображения компании**
- **URL**: `POST /upload/company`
- **Описание**: Загрузка изображения компании.
- **Заголовки**:
  - `Authorization: Bearer your_api_key_here`
- **Тело запроса**: `FormData`, содержащий файл.
  
---

### 4. **Удаление аватара компании**
- **URL**: `DELETE /avatarCompany/remove`
- **Описание**: Удаляет аватар компании.
- **Заголовки**:
  - `Authorization: Bearer your_api_key_here`
- **Тело запроса**: Нет (удаляется по имени файла).

---

### 5. **Получение документа**
- **URL**: `GET /documtns/:imageDocs`
- **Описание**: Получение документа по его имени.
- **Заголовки**:
  - `Authorization: Bearer your_api_key_here`

---

### 6. **Загрузка аватара**
- **URL**: `POST /upload/avatar`
- **Описание**: Загрузка аватара.
- **Заголовки**:
  - `Authorization: Bearer your_api_key_here`
- **Тело запроса**: `FormData`, содержащий файл.

---

### 7. **Удаление документа**
- **URL**: `DELETE /documtns/remove`
- **Описание**: Удаляет документы по списку имен файлов.
- **Заголовки**:
  - `Authorization: Bearer your_api_key_here`
- **Тело запроса**: JSON массив с именами файлов.
  ```json
  {
    "files": ["document1.pdf", "document2.pdf"]
  }
  ```

---

### 8. **Загрузка PDF-файлов**
- **URL**: `POST /upload/pdfs`
- **Описание**: Загрузка PDF-файлов.
- **Заголовки**:
  - `Authorization: Bearer your_api_key_here`
- **Тело запроса**: `FormData`, содержащий файл.

---

### 9. **Главная страница**
- **URL**: `GET /`
- **Описание**: Доступ к главной странице приложения.
- **Заголовки**:
  - `Authorization: Bearer your_api_key_here`

