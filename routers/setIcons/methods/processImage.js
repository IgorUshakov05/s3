const Jimp = require("jimp");

const processImage = async (imagePath, size) => {
  const image = await Jimp.read(imagePath);
  const { width, height } = image.bitmap;
  const cropSize = Math.min(width, height);

  return image
    .crop((width - cropSize) / 2, (height - cropSize) / 2, cropSize, cropSize)
    .resize(size, size)
    .writeAsync(imagePath);
};

module.exports = processImage;
