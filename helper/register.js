const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwtgen = require("./jwtgen");
const crypto = require("crypto");

// register the new user
const register = async (req, res, name, email, password) => {
  const waitno = 99;
  const referralcode = crypto.randomBytes(6).toString("hex");
  const couponcode = crypto.randomBytes(6).toString("hex");
  try {
    let user = await User.findOne({ email });

    if (user) {
      res.status(400).json({ msg: "User already exist" });
      return false;
    }

    user = new User({
      name,
      email,
      password,
      waitno,
      referralcode,
      couponcode,
    });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    var totaluser = await User.find({});

    if (totaluser != 0) {
      user.waitno = waitno + totaluser.length;
    }

    await user.save();
    jwtgen(req, res, user.id);
    return true;
  } catch (err) {
    console.error("[register module]", err.message);
    res.status(500).json({ msg: "Internal Server Error" });
    return false;
  }
};
module.exports = register;
