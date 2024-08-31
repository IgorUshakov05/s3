const Router = require("express");
const router = Router();
const fs = require("fs");
const tmp = require("tmp");
const puppeteer = require("puppeteer");
router.get("/user", async (req, res) => {
  const name = req.query.name;
  const lastName = req.query.lastname;
  const role = req.query.role;
  const avatar = req.query.avatar;
  const location = req.query.location;
  const special = req.query.special;
  const premium = req.query.premium;
  let htmlContent = await `<html lang="ru">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <style>
      @import url("https://fonts.googleapis.com/css2?family=Raleway:ital,wght@0,100..900;1,100..900&display=swap");
    </style>
    <style>
      * {
        margin: 0;
        padding: 0;
        font-family: "Raleway";
        box-sizing: border-box;
      }
      body,
      html {
        width: 1200px;
        background-color: black;
        height: 630px;
        position: relative;
      }
      .preview {
        position: absolute;
        right: 0;
        left: 0;
        bottom: 0;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        top: 0;
        background: #f5f8ff;
      }
      .avatar {
        position: relative;
        left: 0;
        height: 100%;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        width: 356px;
      }
      .avatar > svg {
        height: 100%;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        width: fit-content;
      }
      .img {
        aspect-ratio: 1;
        width: 242px;
        position: relative;
        z-index: 1;
      }
      .img > img {
        width: 100%;
        height: 100%;
        border-radius:27px;
      }
      h1 {
        font-size: 60px;
        font-weight: 700;
        line-height: 100%;
        text-align: left;
        white-space: nowrap; /* Запрещает перенос текста на новую строку */
        overflow: hidden; /* Обрезает содержимое, которое выходит за пределы элемента */
        text-overflow: ellipsis;
        width: 710px;
      }
      .otherInfo {
        margin-left: 70px;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
      }
      h2 {
        font-size: 60px;
        font-weight: 400;
        line-height: 100px;
        text-align: left;
        white-space: nowrap; /* Запрещает перенос текста на новую строку */
        overflow: hidden; /* Обрезает содержимое, которое выходит за пределы элемента */
        text-overflow: ellipsis;
        width: 710px;
      }
      .location {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        right: 150px;
        padding: 50px 30px 50px 0;
        font-family: Raleway;
        font-size: 30px;
        font-weight: 400;
        line-height: 79.74px;
        text-align: right;
      }
      .location > svg {
        margin-right: 10px;
        width: 20px;
        aspect-ratio: 1;
      }
      .location:nth-child(3) > svg {
        width: 300px;
      }
      .is {
        fill:#E1E5EF;
      }
      .is.premium { 
        fill: #4900E3;
      }
    </style>
  </head>
  <body>
    <div class="preview">
      <div class="avatar">
        <svg
          width="659"
          height="1167"
          viewBox="0 0 659 1167"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path class="is ${premium === "true" ? "premium" : ""}"
            d="M148 0L640.094 366.904C651.991 375.774 659 389.743 659 404.583V760.509C659 775.298 652.04 789.224 640.212 798.1L148 1167.5H25.96C11.6227 1167.5 0 1155.88 0 1141.54V25.96C0 11.6227 11.6227 0 25.96 0H148Z"
            fill=""
          />
        </svg>
        <div class="img">
          <img src="${avatar}" alt="Картинка" />
        </div>
        <div class="text"></div>
      </div>
      <div class="otherInfo">
        <div class="location">
          <svg
            width="38"
            height="49"
            viewBox="0 0 38 49"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M18.6667 0C28.976 0 37.3333 7.67803 37.3333 17.15C37.3333 32.6163 18.6667 49 18.6667 49C18.6667 49 0 32.7538 0 17.15C0 7.67803 8.35734 0 18.6667 0Z"
              fill="#5412E0"
            />
            <path
              d="M18.6654 28C23.82 28 27.9987 23.8214 27.9987 18.6667C27.9987 13.5121 23.82 9.33337 18.6654 9.33337C13.5107 9.33337 9.33203 13.5121 9.33203 18.6667C9.33203 23.8214 13.5107 28 18.6654 28Z"
              fill="#F1F4FF"
            />
          </svg>

          <p>${location}</p>
        </div>
        <div class="name">
          <h1>${name} ${lastName}</h1>
          <h2>${!special? 'HR' : special}</h2>
        </div>
        <div class="location">
          <svg
            width="409"
            height="79"
            viewBox="0 0 409 79"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M311 0.615723H314.749C329.476 0.615723 341.414 12.5537 341.414 27.28V78.3392H337.664C322.938 78.3392 311 66.4012 311 51.6749V0.615723Z"
              fill="#4900E3"
            />
            <path
              d="M409 0.615723H405.251C390.524 0.615723 378.586 12.5537 378.586 27.28V78.3392H382.336C397.062 78.3392 409 66.4012 409 51.6749V0.615723Z"
              fill="#4900E3"
            />
            <path
              d="M344.794 39.9243H348.543C363.27 39.9243 375.207 51.8623 375.207 66.5886V78.3393C373.898 78.3393 372.652 78.3393 371.455 78.3393C356.729 78.3393 344.794 66.4014 344.794 51.6751V39.9243Z"
              fill="#4900E3"
            />
            <path
              d="M14.8 57L0.75 22H9.85L19.65 47.3L29.7 22H38.65L48.7 47.3L58.5 22H67.5L53.45 57H44.25L34.15 32.25L24 57H14.8ZM72.8598 54C69.8264 51.5333 68.3098 48.1333 68.3098 43.8C68.3098 39.4667 69.7931 36.0833 72.7598 33.65C75.7264 31.1833 79.6931 29.95 84.6598 29.95C89.6264 29.95 93.5931 31.1833 96.5598 33.65C99.5264 36.0833 101.01 39.4667 101.01 43.8V45.6H76.6098C77.0098 47.2667 77.9931 48.5333 79.5598 49.4C81.1264 50.2667 83.0598 50.7 85.3598 50.7C87.1598 50.7 88.7931 50.4167 90.2598 49.85C91.7598 49.2833 92.8264 48.5 93.4598 47.5L100.21 51.2C98.8431 53.2 96.8431 54.7833 94.2098 55.95C91.5764 57.0833 88.6264 57.65 85.3598 57.65C80.0931 57.65 75.9264 56.4333 72.8598 54ZM92.2098 40.2C90.9098 37.7333 88.3931 36.5 84.6598 36.5C80.7598 36.5 78.2098 37.7333 77.0098 40.2H92.2098ZM138.831 43.8C138.831 48.1333 137.498 51.5333 134.831 54C132.198 56.4333 128.681 57.65 124.281 57.65C120.448 57.65 117.281 56.6333 114.781 54.6V57H106.831V19.5H114.931V32.95C117.398 30.9167 120.514 29.9 124.281 29.9C128.714 29.9 132.248 31.1333 134.881 33.6C137.514 36.0333 138.831 39.4333 138.831 43.8ZM114.981 43.8C114.981 46 115.681 47.6833 117.081 48.85C118.514 50.0167 120.414 50.6 122.781 50.6C125.181 50.6 127.081 50.0167 128.481 48.85C129.914 47.6833 130.631 46 130.631 43.8C130.631 41.6333 129.914 39.9667 128.481 38.8C127.081 37.6 125.181 37 122.781 37C120.414 37 118.514 37.6 117.081 38.8C115.681 39.9667 114.981 41.6333 114.981 43.8ZM173.818 57V40.6H154.568V57H146.018V22H154.568V33H173.818V22H182.368V57H173.818ZM221.051 30.55V57H213.101V54.1C210.601 56.4333 207.301 57.6 203.201 57.6C199.468 57.6 196.451 56.6 194.151 54.6C191.885 52.6 190.751 49.95 190.751 46.65V30.55H198.851V45C198.851 46.7667 199.385 48.1333 200.451 49.1C201.518 50.0667 203.085 50.55 205.151 50.55C207.251 50.55 209.051 49.9833 210.551 48.85C212.085 47.7167 212.885 46.15 212.951 44.15V30.55H221.051ZM251.2 57V42.5C251.167 40.7667 250.617 39.4333 249.55 38.5C248.483 37.5333 246.917 37.05 244.85 37.05C242.617 37.05 240.767 37.6167 239.3 38.75C237.867 39.8833 237.117 41.4833 237.05 43.55V57H228.95V30.55H236.9V33.5C239.367 31.1333 242.667 29.95 246.8 29.95C250.5 29.95 253.5 30.9667 255.8 33C258.1 35 259.25 37.65 259.25 40.95V57H251.2ZM263.548 37.85V31H268.248V27.45L276.348 22.05V31H281.798V37.85H276.348V46.95C276.348 48.2833 276.548 49.2167 276.948 49.75C277.348 50.25 278.031 50.5 278.998 50.5C279.864 50.5 280.964 50.35 282.298 50.05L281.198 56.95C279.864 57.35 278.381 57.55 276.748 57.55C273.848 57.55 271.698 56.7667 270.298 55.2C268.931 53.6333 268.248 51.1833 268.248 47.85V37.85H263.548Z"
              fill="black"
            />
          </svg>
        </div>
      </div>
    </div>
  </body>
</html>
`;
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setContent(htmlContent, { waitUntil: "networkidle0" });
    await page.setViewport({ width: 1200, height: 630, deviceScaleFactor: 1 });
    await page.setContent(htmlContent);

    // Create a temporary file to save the image
    const tempFile = tmp.fileSync({ postfix: ".png" });
    const imgBuffer = await page.screenshot();
    fs.writeFileSync(tempFile.name, imgBuffer);

    res.sendFile(tempFile.name, (err) => {
      if (err) {
        console.error("Error sending file:", err);
        res.status(500).send("Error sending file");
      }
      // Clean up the temporary file
      tempFile.removeCallback();
      browser.close();
    });
  } catch (error) {
    console.error("Error generating image:", error);
    res.status(500).send("Error generating image");
  }
});

module.exports = router;
