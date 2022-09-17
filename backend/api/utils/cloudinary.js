const cloudinary = require("cloudinary").v2;

async function uploadImage(path) {
  const options = {
    use_filename: true,
    unique_filename: false,
    overwrite: true,
    folder: "/cesory",
  };
  const result = await cloudinary.uploader.upload(path, options);
  return result.secure_url;
}

module.exports = { uploadImage };
