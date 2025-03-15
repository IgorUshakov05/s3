# **Хранилище файлов S3 by WebHunt**

Веб-приложение для управления файлами (загрузка, хранение, удаление) различных форматов. Разработано для упрощения работы с файлами, включая PDF, изображения и документы, с защитой через авторизацию.

---

## **Особенности приложения**

- **Загрузка файлов**: Поддержка различных форматов (PDF, изображения, текст, документы).
- **Удаление файлов**: Удобное удаление через API с проверкой существования.
- **Авторизация**: API защищено с использованием ключа авторизации.
- **Фильтрация файлов**: Проверка размера (до 20 МБ) и поддерживаемого формата.
- **Кросс-доменные запросы (CORS)**: Настроен для внешних запросов.

---

## **Установка и настройка**

1. **Клонирование проекта**

   ```bash
   git clone https://github.com/your-repo/s3-file-storage.git
   cd s3-file-storage
   ```

2. **Установка зависимостей**

   ```bash
   npm install
   ```

3. **Настройка переменных окружения**

   Создайте файл `.env` в корне проекта и укажите:

   ```bash
   PORT=3001
   API_KEY=your_api_key_here
   SERVER=http://localhost:3001
   ```

4. **Запуск сервера**

   ```bash
   npm start
   ```

---

## **API Endpoints**

1. **Загрузка файлов**

   - **URL**: `POST /upload/files`
   - **Описание**: Позволяет загрузить файлы на сервер.
   - **Заголовки**:
     - `Authorization`: `Bearer your_api_key_here`
   - **Тело запроса**: `FormData`, содержащий файлы.

   Пример:

   ```javascript
   const formData = new FormData();
   formData.append("file1", file1); // Замените file1 на ваш файл
   formData.append("file2", file2);

   fetch("http://localhost:3001/upload/files", {
     method: "POST",
     headers: {
       Authorization: "Bearer your_api_key_here",
     },
     body: formData,
   })
     .then((response) => response.json())
     .then((data) => console.log("Файлы успешно загружены:", data))
     .catch((error) => console.error("Ошибка при загрузке:", error));
   ```

2. **Удаление файлов**

   - **URL**: `DELETE /documents/remove`
   - **Описание**: Удаляет файлы из хранилища.
   - **Заголовки**:
     - `Authorization`: `Bearer your_api_key_here`
   - **Тело запроса**: JSON массив с именами файлов.

   Пример:

   ```json
   {
     "files": ["file1.pdf", "file2.png"]
   }
   ```

   Пример:

   ```javascript
   fetch("http://localhost:3001/documents/remove", {
     method: "DELETE",
     headers: {
       "Content-Type": "application/json",
       Authorization: "Bearer your_api_key_here",
     },
     body: JSON.stringify({ files: ["file1.pdf", "file2.png"] }),
   })
     .then((response) => response.json())
     .then((data) => console.log("Файлы успешно удалены:", data))
     .catch((error) => console.error("Ошибка при удалении:", error));
   ```

3. **Получение файла**

   - **URL**: `GET /files/:fileName`
   - **Описание**: Позволяет скачать файл по его имени.

   Пример:

   ```javascript
   fetch("http://localhost:3001/files/example.pdf", {
     method: "GET",
     headers: {
       Authorization: "Bearer your_api_key_here",
     },
   })
     .then((response) => response.blob())
     .then((blob) => {
       const url = window.URL.createObjectURL(blob);
       const a = document.createElement("a");
       a.style.display = "none";
       a.href = url;
       a.download = "example.pdf"; // Имя сохраняемого файла
       document.body.appendChild(a);
       a.click();
       window.URL.revokeObjectURL(url);
     })
     .catch((error) => console.error("Ошибка при скачивании:", error));
   ```

---

Теперь вы можете скопировать эту документацию и использовать в своем проекте.
