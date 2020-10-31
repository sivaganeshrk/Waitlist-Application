const router = require("express").Router();
const bcrypt = require("bcryptjs");
const User = require("../../models/user");
const { check, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const auth = require("../../middleware/auth");
const config = require("config");
const jwtgen = require("../../helper/jwtgen");

// @route POST /api/user/auth
// @desc  User login
// @access Public
router.post(
  "/",
  [
    check("email", "Enter the valid email id").isEmail(),
    check("password", "password is required").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });

      if (!user) return res.status(400).json({ msg: "Invalid Credentials" });

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(400).json({ msg: "Invalid Credentials" });

      // const payload = {
      //   user:{
      //     id:user.id
      //   }
      // }

      // jwt.sign
      jwtgen(req, res, user._id);
    } catch (err) {
      console.error("[user auth post]", err.messgae);
      res.status(500).json({ msg: "Internal Server Error" });
    }
  }
);

// @route   GET /api/user/auth
// @desc    Get the logged in user details
// @access  Private
router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select(
      "-password -couponcode"
    );
    res.json(user);
  } catch (err) {
    console.error("[user auth get] :", err.message);
    res.status(500).json({ msg: "Internal Server Error" });
  }
});
module.exports = router;
