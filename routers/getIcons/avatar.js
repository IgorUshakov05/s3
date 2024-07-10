const {Router} = require('express');
let router = Router() 
const path = require("path");
const fs = require("fs");

router.get("/company/:imageName", (req, res) => {
    const imageName = req.params.imageName;
    const storagePath = path.join(__dirname,'..','..',  "storage");
    const imagePath = path.join(storagePath, "company", imageName);
  
    if (!fs.existsSync(imagePath)) {
      return res.status(404).send("Изображение не найдено.");
    }
  
    res.sendFile(imagePath);
  });

module.exports = router