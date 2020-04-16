const axios = require("axios");
const User = require("../models/User");
const aws = require("aws-sdk");
const encryptPassword = require("../utils/encryptPassword");
const multer = require("multer");

const s3 = new aws.S3();

function getFileName(url) {
  const helper = "amazonaws.com/";
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
    const users = await User.find();
    var today = new Date();

    console.log(`Users information provided at ${today}`);
    return response.json(users);
  },

  async store(request, response) {
    const { name, username, email, password } = request.body;
    const hashedpassword = await encryptPassword.encryptPassword(password);
    const userNames = await User.find({ username });
    const userEmails = await User.find({ email });
    const photo_url = request.file.location;

    if (userNames.length == 0 && userEmails.length == 0) {
      const user = await User.create({
        name,
        username,
        email,
        password: hashedpassword,
        photo_url,
      });
      console.log(`${username} created`);
      return response.json(user);
    } else {
      return response
        .status(404)
        .json({ error: "Username or Email already in use" });
    }
  },
  async update(request, response) {
    const { name, password } = request.body;
    const username = request.params.username;
    const newphoto_url = request.file.location;
    const hashedpassword = await encryptPassword.encryptPassword(password);
    let user = await User.findOne({ username });
    const photo_url = user.photo_url;
    try {
      const filename = getFileName(photo_url);
      deleteFile(filename);
      await User.update({
        name,
        password: hashedpassword,
        photo_url: newphoto_url,
      });
      console.log(`${username} updated information`);
    } catch (error) {
      return response.json({ error });
    }

    return response.json();
  },
  async destroy(request, response) {
    const username = await request.params.username;
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
