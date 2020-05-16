const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  photo_url: {
    type: String,
    default: "https://scaberefiles.s3.eu-west-3.amazonaws.com/defaultpic.png",
  },
  scabs: {
    type: Number,
    default: 0,
  },
  birthdate: {
    type: Date,
    required: true,
  },
  friends: {
    type: [String],
    default: [],
  },
  createdat: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("User", UserSchema);
