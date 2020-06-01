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
            message: "Email/Password combination are incorrect",
          });
        }
        bcrypt.compare(password, user.password, (err, result) => {
          if (err) {
            return response.status(401).json({
              message: "Email/Password combination are incorrect",
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

            return response.status(200).json({
              message: "Authorization succeeded",
              token,
            });
          }
          response.status(401).json({
            message: "Email/Password combination are incorrect",
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
    try {
      if (name == null || name == "") {
        return response.status(404).json({ message: "Invalid name" });
      }
      if (username == null || username == "") {
        return response.status(404).json({ message: "Invalid username" });
      }
      if (email == null || email == "") {
        return response.status(404).json({ message: "Invalid email" });
      }
      if (password == null || password == "" || password.length < 8) {
        return response.status(404).json({
          message: "Password must have at least 8 characters",
        });
      }

      if (userNames.length == 0 && userEmails.length == 0) {
        const user = await User.create({
          name,
          username,
          email,
          password: hashedpassword,
          birthdate,
        });
        console.log(`${username} created`);
        next();
      } else {
        return response
          .status(404)
          .json({ message: "Username or Email already in use" });
      }
    } catch (err) {
      return response.json({ err });
    }
  },
  async update(request, response) {
    let { name } = request.body;
    const userId = request.userData.userId;
    let user = await User.findOne({ _id: userId });
    const photo_url = user.photo_url;
    const newphoto_url = request.file ? request.file.location : photo_url;

    const filename = getFileName(photo_url);
    if (name == null || name == "" || name == undefined) {
      name = user.name;
    }
    if (newphoto_url != "defaultpic.jpg" && request.file) {
      const res = deleteFile(filename);
    }
    await user
      .updateOne({
        name,
        photo_url: newphoto_url,
      })
      .catch(() => {
        console.log("ah nao deu");
      });
    console.log(`User updated information`);
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
