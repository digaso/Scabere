const User = require("../models/User");
const aws = require("aws-sdk");
const encryptPassword = require("../utils/encryptPassword");
const multer = require("multer");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const s3 = new aws.S3();

function getFileName(url, helper = "amazonaws.com/") {
  const index = url.indexOf(helper) + helper.length;

  return url.substring(index);
}
function deleteFile(filename) {
  const deleteparams = {
    Bucket: "scaberefiles",
    Key: filename,
  };
  s3.deleteObject(deleteparams, function (err, data) {
    if (err) {
      return err;
    }
  });
  return true;
}

module.exports = {
  async index(request, response) {
    const { userId } = request.userData;
    const user = await User.findOne({ _id: userId });
    var today = new Date();

    console.log(`User information provided at ${today}`);
    return response.json(user);
  },
  async login(request, response) {
    const { email, password } = request.body;
    User.findOne({ email })
      .exec()
      .then((user) => {
        if (!user) {
          return response.status(401).json({
            message: "Authorization 1failed",
          });
        }
        bcrypt.compare(password, user.password, (err, result) => {
          if (err) {
            return response.status(401).json({
              message: "Authorization 2failed",
            });
          }
          if (result) {
            const token = jwt.sign(
              {
                username: user.username,
                userId: user._id,
              },
              process.env.JWT_SECRET_KEY
            );
            request.headers.authorization = token;
            console.log(request.headers.authorization);

            return response.status(200).json({
              message: "Authorition succeeded",
              token,
            });
          }
          response.status(401).json({
            message: "Authorization 3failed",
          });
        });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({
          error: err,
        });
      });
  },

  async store(request, response, next) {
    const { name, username, email, password, birthdate } = request.body;
    const hashedpassword = await encryptPassword.encryptPassword(password);
    const userNames = await User.find({ username });
    const userEmails = await User.find({ email });
    const photo_url = request.file.location;
    try {
      if (userNames.length == 0 && userEmails.length == 0) {
        const user = await User.create({
          name,
          username,
          email,
          password: hashedpassword,
          birthdate,
          photo_url,
        });
        console.log(`${username} created`);
        next();
      } else {
        return response
          .status(404)
          .json({ error: "Username or Email already in use" });
      }
    } catch (err) {
      return response.json({ err });
    }
  },
  async update(request, response) {
    const { name, password } = request.body;
    const userId = request.userData.userId;
    const newphoto_url = request.file.location;
    const hashedpassword = await encryptPassword.encryptPassword(password);
    let user = await User.findOne({ _id: userId });
    const photo_url = user.photo_url;
    try {
      const filename = getFileName(photo_url);
      deleteFile(filename);
      await user.update({
        name,
        password: hashedpassword,
        photo_url: newphoto_url,
      });
      console.log(`User updated information`);
    } catch (error) {
      return response.json({ error });
    }

    return response.json();
  },
  async destroy(request, response) {
    const username = await request.userData.username;
    const user = await User.findOne({ username });

    const filename = getFileName(user.photo_url);

    const res = deleteFile(filename);
    if (res == true) {
      await User.deleteOne({ username });
      console.log(`${username} deleted from the database`);
      return response.status(200).json();
    } else {
      return response.status(404).json({ error: res });
    }
  },
};
