require("dotenv").config();
const express = require("express");
const fs = require("fs");
const cors = require("cors");
const app = express();
const path = require("path");
const getAvatar = require("./routers/getIcons/avatar");
const getCompany = require("./routers/getIcons/company");
const setDocument = require("./routers/Documents/documents");
const downloadDocs = require("./routers/Documents/documentsGet");
const removeDocs = require("./routers/Documents/remove");
const removeAvatarCompany = require("./routers/getIcons/remove");
const setAvatar = require("./routers/setIcons/avatar");
const setCompany = require("./routers/setIcons/company");
const vacancyPreview = require("./routers/preview/vacancy");
const userPreview = require("./routers/preview/user");
const companyPreview = require("./routers/preview/company");
app.use(
  cors({
    origin: [
      "https://webhunt.ru",
      "http://localhost:3000",
      "https://aed0-85-140-163-20.ngrok-free.app",
    ],
    methods: ["GET", "POST", "DELETE", "PUT", "PATCH", "OPTIONS"], // Разрешите все необходимые методы (POST, PUT, DELETE)
  })
);

app.use("/preview", userPreview, companyPreview, vacancyPreview);
const storagePath = path.join(__dirname, "storage");
app.use((req, res, next) => {
  let way = req.headers.origin;
  console.log(way);
  next();
});
app.use(express.json());
if (!fs.existsSync(storagePath)) {
  fs.mkdirSync(storagePath, { recursive: true });
}

app.use(
  getAvatar,
  getCompany,
  setCompany,
  removeAvatarCompany,
  downloadDocs,
  setAvatar,
  removeDocs,
  setDocument
);
app.get("/", (req, res) => {
  const indexPath = path.join(__dirname, "dist", "index.html");
  res.sendFile(indexPath);
});
// app.all("*", (req, res) => {
//   res.redirect("https://webhunt.ru");
// });
try {
  app.listen(process.env.PORT, () => {
    console.log(`Сервер запущен на порту ${process.env.PORT}`);
  });
} catch (e) {
  console.log(e);
}
