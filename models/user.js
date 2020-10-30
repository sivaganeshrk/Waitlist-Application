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
});

module.exports = mongoose.model("user", UserSchema);
