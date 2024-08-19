require("dotenv").config();
const express = require("express");
const fs = require("fs");
const cors = require("cors");
const app = express();
const path = require("path");
const getAvatar = require("./routers/getIcons/avatar");
const getCompany = require("./routers/getIcons/company");
const setDocument = require("./routers/setDocuments/documents");
const setAvatar = require("./routers/setIcons/avatar");
const setCompany = require("./routers/setIcons/company");

app.use(cors({
  origin: [
    'https://webhunt.ru',
    'http://localhost:3000',
    'http://localhost:5500',
    'null',
    "https://q72v1zh5-3000.euw.devtunnels.ms",
    'file://'
  ],
  methods: ['GET', 'POST'],
}));
const storagePath = path.join(__dirname, "storage");
app.use((req,res,next) => {
  let way = req.headers.origin
  console.log(way)
  next()
})
if (!fs.existsSync(storagePath)) {
  fs.mkdirSync(storagePath, { recursive: true });
}

app.use(getAvatar, getCompany, setCompany, setAvatar, setDocument);
app.get('/', (req, res) => {
  const indexPath = path.join(__dirname, 'dist', 'index.html');
  res.sendFile(indexPath);
});
app.all("*", (req, res) => {
  res.redirect("https://webhunt.ru");
});
try {
  app.listen(process.env.PORT, () => {
    console.log(`Сервер запущен на порту ${process.env.PORT}`);
  });
} catch (e) {
  console.log(e);
}
