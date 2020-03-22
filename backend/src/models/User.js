const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  photo_url: {
    type: String,
    default: null
  },
  scabs: {
    type: Number,
    default: 0
  },
  friends: {
    type: [String],
    default: []
  },
  createdat: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("User", UserSchema);
