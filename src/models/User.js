const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema({
  name: String,
  username: String,
  email: String,
  photo_url: String,
  scabs: Number,
  friends: [String]
});

module.exports = mongoose.model("User", UserSchema);
