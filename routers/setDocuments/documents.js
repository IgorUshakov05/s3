const { Router } = require("express");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const { v4 } = require("uuid");

const router = Router();
const storagePath = path.join(__dirname, "..", "..", "storage");

// Функция для создания хранилища multer
const createStorage = (folderName) => {
  return multer.diskStorage({
    destination: function (req, file, cb) {
      const folderPath = path.join(storagePath, folderName);
      if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath, { recursive: true }); // Создание директории, если она не существует
      }
      cb(null, folderPath);
    },
    filename: function (req, file, cb) {
      const filename = `${v4()}.pdf`; // Генерация уникального имени файла
      cb(null, filename);
    },
  });
};

// Фильтр для проверки типа файла
const fileFilter = (req, file, cb) => {
  console.log("Received file type:", file.mimetype); // Логируем MIME-тип файла

  const allowedTypes = ["application/pdf"];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Недопустимый тип файла. Пожалуйста, загрузите PDF файл."));
  }
};

// Настройка multer для обработки нескольких файлов PDF с ограничением по размеру
const uploadPDF = multer({
  storage: createStorage("pdfs"),
  fileFilter,
  limits: { fileSize: 20 * 1024 * 1024 }, // Ограничение размера файла в 20 МБ
});

// Функция для удаления файлов
const deleteFiles = (files) => {
  files.forEach((file) => {
    const filePath = path.join(storagePath, "pdfs", file.filename);
    fs.unlink(filePath, (err) => {
      if (err) {
        console.error("Ошибка при удалении файла:", err);
      }
    });
  });
};

// Маршрут для загрузки нескольких PDF файлов
router.post("/upload/pdfs", uploadPDF.any(), (req, res) => {
  // Проверка на количество файлов
  if (!req.files || req.files.length !== 3) {
    // Удаление всех загруженных файлов
    if (req.files) {
      deleteFiles(req.files);
    }
    return res.status(400).json({
      message:
        "Ожидалось 3 файла, но получено другое количество. Все файлы удалены.",
    });
  }

  // Проверка на превышение размера файла
  const exceededFile = req.files.find((file) => file.size > 20 * 1024 * 1024);
  if (exceededFile) {
    // Удаление всех загруженных файлов
    deleteFiles(req.files);
    return res.status(400).json({
      message:
        "Один из файлов превышает максимальный размер 20 МБ. Все файлы удалены.",
    });
  }

  // Фильтрация загруженных файлов
  const filePaths = req.files.reduce((acc, file) => {
    console.log(file);
    const fieldName = file.fieldname; // Имя поля формы, используемое для ключа
    acc[fieldName] = `${process.env.SERVER}/pdfs/${file.filename}`;
    return acc;
  }, {});

  res.status(200).json({ files: filePaths });
});

// Обработка ошибок Multer
router.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    if (err.code === "LIMIT_FILE_SIZE") {
      return res
        .status(400)
        .json({ message: "Файл превышает максимальный размер 20 МБ." });
    }
  } else if (err) {
    return res.status(500).json({ message: err.message });
  }
  next();
});

module.exports = router;
