const { Router } = require("express");
let router = Router();
const path = require("path");
const fs = require("fs");

router.delete("/documtns/remove", (req, res) => {
  const files = req.body.files;
  console.log(files);
  if (
    !Array.isArray(files) ||
    files.some((file) => !/^[a-zA-Z0-9_\.\-]+$/.test(file))
  ) {
    return res.status(400).json({ message: "Некорректные имена файлов." });
  }

  const storagePath = path.join(__dirname, "..", "..", "storage", "pdfs");
  let errors = [];

  files.forEach((file) => {
    const filePath = path.join(storagePath, file);

    // Проверка существования файла
    if (fs.existsSync(filePath)) {
      try {
        // Удаление файла
        fs.unlinkSync(filePath);
      } catch (error) {
        console.error(`Ошибка при удалении файла ${file}:`, error);
        errors.push({ file, error: "Ошибка при удалении файла" });
      }
    } else {
      errors.push({ file, error: "Файл не найден" });
    }
  });

  if (errors.length > 0) {
    return res
      .status(500)
      .json({ message: "Некоторые файлы не были удалены.", errors });
  }

  return res.json({ message: "Все файлы успешно удалены." });
});

module.exports = router;

//   fetch(
//     "http://localhost:3001/documtns/remove/73c3142b-3f9d-4108-bc58-26c26238937a.pdf",
//     {
//       method: "DELETE",
//     }
//   )
//     .then((response) => {
//       if (!response.ok) {
//         throw new Error("Запрос не удался");
//       }
//       return response.json();
//     })
//     .then((data) => {
//       console.log(data); // Вывод ответа сервера
//     })
//     .catch((error) => {
//       console.error("Ошибка:", error);
//     });
