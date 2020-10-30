const router = require("express").Router();
const { check, validationResult } = require("express-validator");
const Admin = require("../../models/admin");
const bcrypt = require("bcryptjs");
const jwtgen = require("../../helper/jwtgen");

router.post(
  "/",
  [
    check("name", "Enter the name").not().isEmpty(),
    check("email", "Enter the valid email id").isEmail(),
    check("password", "Enter the password of min 7 character long").isLength({
      min: 7,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

    const { name, email, password } = req.body;
    try {
      let user = await Admin.findOne({ email });
      if (user) return res.status(400).json({ msg: "User already exists" });

      user = new Admin({
        name,
        email,
        password,
      });

      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      await user.save();
      jwtgen(req, res, user.id);
    } catch (err) {
      console.error("[admin register] :", err.message);
      res.status(500).json({ msg: "Internal Server Error" });
    }
  }
);

module.exports = router;
