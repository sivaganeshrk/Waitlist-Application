const router = require("express").Router();
const bcrypt = require("bcryptjs");
const Admin = require("../../models/admin");
const { check, validationResult } = require("express-validator");
const jwtgen = require("../../helper/jwtgen");
const admin = require("../../middleware/admin");

// @route   POST /api/admin/auth
// @desc    admin Login endpoint
// @access  Public(admin only)
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
      let user = await Admin.findOne({ email });

      if (!user) return res.status(400).json({ msg: "Invalid Credentials" });

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(400).json({ msg: "Invalid Credentials" });
      jwtgen(req, res, user._id);
    } catch (err) {
      console.error("[admin auth post]:", err.message);
      res.status(500).json({ msg: "Internal Server Error" });
    }
  }
);

// @route   GET /api/admin/auth
// @desc    Get logged in admin detail
// @access  Private(admin only)
router.get("/", admin, async (req, res) => {
  try {
    // const admin = await Admin.findById(req.admin._id);
    res.json(req.admin);
  } catch (err) {
    console.error("[admin auth get] :", err.message);
    res.status(500).json({ msg: "Internal Server Error" });
  }
});
module.exports = router;
