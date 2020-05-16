const multer = require("multer");
const path = require("path");
const multerS3 = require("multer-s3");
const aws = require("aws-sdk");
require("dotenv/config");

const storageTypes = {
  local: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.resolve(__dirname, "..", "..", "tmp", "uploads"));
    },
    filename: (request, file, cb) => {
      const originalName = file.originalname;
      const extensionFileposition = originalName.indexOf(".");
      const extensionFile = originalName.substring(extensionFileposition);
      let fileName;
      let time = new Date().getTime();
      if (request.body.username != undefined) {
        console.log(request.body.username);
        fileName = time + request.body.username + extensionFile;
      } else {
        fileName = time + request.userData.username + extensionFile;
      }
      cb(null, fileName);
    },
  }),
  s3: multerS3({
    s3: new aws.S3(),
    bucket: "scaberefiles",
    contentType: multerS3.AUTO_CONTENT_TYPE,
    acl: "public-read",
    key: (request, file, cb) => {
      const originalName = file.originalname;
      const extensionFileposition = originalName.indexOf(".");
      const extensionFile = originalName.substring(extensionFileposition);
      let fileName;
      let time = new Date().getTime();
      if (request.body.username != undefined) {
        fileName = time + request.body.username + extensionFile;
      } else {
        fileName = time + request.userData.username + extensionFile;
      }
      cb(null, fileName);
    },
  }),
};

module.exports = {
  dest: path.resolve(__dirname, "..", "..", "tmp", "uploads"),
  storage: storageTypes["s3"],
  limits: {
    fileSize: 12 * 1024 * 1024,
  },
  fileFilter: (request, file, cb) => {
    const allowedTypes = ["image/png", "image/jpeg", "image/pjpeg"];

    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("BRO!! Invalid File Type :("), false);
    }
  },
};
