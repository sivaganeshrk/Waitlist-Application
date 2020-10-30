const router = require("express").Router();
const { check, validationResult } = require("express-validator");
const register = require("../../helper/register");
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
    try {
      register(req, res, name, email, password);
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
