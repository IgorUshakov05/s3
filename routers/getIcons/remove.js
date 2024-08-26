const { Router } = require("express");
let router = Router();
const path = require("path");
const fs = require("fs");

router.delete("/avatarCompany/remove", (req, res) => {
  const file = req.body.file; // Expecting a single file name

  if (!file || !/^[a-zA-Z0-9_\.\-]+$/.test(file)) {
    return res.status(400).json({ message: "Некорректное имя файла." });
  }

  const storagePath = path.join(__dirname, "..", "..", "storage", "company");
  const filePath = path.join(storagePath, file);
  // Проверка существования файла
  if (fs.existsSync(filePath)) {
    try {
      // Удаление файла
      fs.unlinkSync(filePath);
      return res.json({ message: "Логотип компании удален" });
    } catch (error) {
      console.error(`Ошибка при удалении фото компании ${file}:`, error);
      return res.status(500).json({ message: "Ошибка при удалении файла." });
    }
  } else {
    return res.status(404).json({ message: "Файл не найден." });
  }
});

module.exports = router;
