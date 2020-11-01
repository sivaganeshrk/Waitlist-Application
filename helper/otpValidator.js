const Otp = require("../models/Otp");
const moment = require("moment");
const bcrypt = require("bcryptjs");

// Validate the otp and change password
module.exports = async (id, otp, password) => {
  const otpValidation = {
    valid: false,
  };
  try {
    const otpdate = await Otp.findOne({
      user: id,
      otp: otp,
      otpExpires: { $gt: moment().format() },
    });
    if (!otpdate) return otpValidation;
    const salt = await bcrypt.genSalt(10);
    otpValidation.password = await bcrypt.hash(password, salt);
    otpValidation.valid = true;
    return otpValidation;
  } catch (err) {
    console.error("[OTP Validation]:", err.message);
    otpValidation.valid = false;
    return otpValidation;
  }
};
