const mongoose = require("mongoose");
const UserSchema = mongoose.Schema({
  name: {
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
  waitno: {
    type: Number,
    required: true,
  },
  referralcode: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  couponcode: {
    type: String,
  },
  mailflag: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("user", UserSchema);
