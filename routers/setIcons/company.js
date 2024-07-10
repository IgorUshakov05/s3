const {Router} = require('express');
let router = Router() 
const multer = require("multer");
const fs = require("fs");
const { v4 } = require("uuid");
const path = require("path");
const processImage = require('./methods/processImage')

const createStorage = (folderName) => {
    return multer.diskStorage({
      destination: function (req, file, cb) {
        const folderPath = path.join(storagePath, folderName);
        if (!fs.existsSync(folderPath)) {
          fs.mkdirSync(folderPath);
        }
        cb(null, folderPath);
      },
      filename: function (req, file, cb) {
        const filename = `${v4()}.png`;
        req.filename = filename;
        cb(null, filename);
      },
    });
  };


  const fileFilter = (req, file, cb) => {
    const allowedTypes = ["image/jpeg", "image/png"];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Недопустимый тип файла. Пожалуйста, загрузите изображение."));
    }
  };
  

const uploadCompany = multer({ storage: createStorage("company"), fileFilter });
const storagePath = path.join(__dirname,'..','..',"storage");
router.post(
    "/upload/company",
    uploadCompany.single("company"),
    async (req, res) => {
      if (!req.file) {
        return res.status(400).json({ message: "Файл пуст или имеет недопустимый тип." });
      }
  
      const imagePath = path.join(storagePath, "company", req.filename);
  
      try {
        await processImage(imagePath, 400);
        res.status(200).json({ title: `${process.env.SERVER}/company/${req.filename}` });
      } catch (error) {
        console.error("Ошибка обработки изображения:", error);
        res.status(500).json({ error: "Ошибка при обработке изображения." });
      }
    }
  );


module.exports = router