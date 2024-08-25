const { Router } = require("express");
let router = Router();
const path = require("path");
const fs = require("fs");

router.delete("/documtns/remove/:imageDocs", (req, res) => {
  const imageDocs = req.params.imageDocs;

  if (!/^[a-zA-Z0-9_\.\-]+$/.test(imageDocs)) {
    return res.status(400).json({ message: "Некорректное имя файла." });
  }

  const storagePath = path.join(__dirname, "..", "..", "storage");
  const file = path.join(storagePath, "pdfs", imageDocs);

  // Проверка существования файла
  if (!fs.existsSync(file)) {
    return res.status(404).json({ message: "Файл не найден." });
  }

  try {
    // Удаление файла
    fs.unlinkSync(file);
    return res.json({ message: "Файл успешно удален." });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Ошибка при удалении файла." });
  }
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
