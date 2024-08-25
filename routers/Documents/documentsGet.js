const { Router } = require("express");
let router = Router();
const path = require("path");
const fs = require("fs");

router.get("/documtns/:imageDocs", (req, res) => {
  const imageDocs = req.params.imageDocs;
  const storagePath = path.join(__dirname, "..", "..", "storage");
  const file = path.join(storagePath, "pdfs", imageDocs);

  if (!fs.existsSync(file)) {
    return res.status(404).json({ message: "Файл не найден." });
  }

  res.download(file);
});

module.exports = router;
