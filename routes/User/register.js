const router = require("express").Router();
const bcrypt = require("bcryptjs");
const User = require("../../models/user");
const { check, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const config = require("config");
const jwtgen = require("../../helper/jwtgen");

// @route   POST /api/user/register
// @desc    New User Registration
// @access  Public
router.post(
  "/",
  [
    check("name", "Enter the name").not().isEmpty(),
    check("email", "Enter the Email").isEmail(),
    check("password", "Enter the password more than 7 character").isLength({
      min: 7,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ status: "error" });
    }

    const { name, email, password } = req.body;
    const waitno = 99;

    try {
      let user = await User.findOne({ email });

      if (user) {
        return res.status(400).json({ msg: "User already exist" });
      }

      user = new User({
        name,
        email,
        password,
        waitno,
      });

      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      var totaluser = await User.find({});

      if (totaluser != 0) {
        user.waitno = waitno + totaluser.length;
      }

      await user.save();
      jwtgen(req, res, user.id);
      // const payload = {
      //   user: {
      //     id: user.id,
      //   },
      // };

      // jwt.sign(
      //   payload,
      //   config.get("jwtSecret"),
      //   { expiresIn: 2120000 },
      //   (err, token) => {
      //     if (err) throw err;
      //     res.json({ token });
      //   }
      // );
    } catch (err) {
      console.error("[User register.js]", err.message);
      return res.status(500).json({ msg: "Internal Server Error" });
    }
  }
);

module.exports = router;
