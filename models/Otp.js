const mongoose = require("mongoose");
const OtpSchema = mongoose.Schema({
  otp: {
    type: String,
    required: true,
  },
  otpExpires: {
    type: Date,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
  },
});

module.exports = mongoose.model("otps", OtpSchema);
