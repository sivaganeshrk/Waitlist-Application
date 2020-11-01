const router = require("express").Router();
const User = require("../../models/user");
const admin = require("../../middleware/admin");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");

// @route   GET /api/admin/user
// @desc    Get all user data from the database
// @access  Private(admin only)
router.get("/", admin, async (req, res) => {
  try {
    const users = await User.find({}).select("-password").sort({
      waitno: -1,
    });
    res.json(users);
  } catch (err) {
    console.error("[admin user get] :", err.message);
    res.status(500).json({ msg: "Internal Server Error" });
  }
});

// @route   POST /api/admin/user
// @desc    Create a new user
// @access  Private(admin only)
router.post("/", admin, async (req, res) => {
  const { name, email, password } = req.body;
  const waitno = 99;
  const referralcode = crypto.randomBytes(6).toString("hex");
  const couponcode = crypto.randomBytes(6).toString("hex");
  try {
    let user = await User.findOne({ email });
    const total_user = await User.find({}).select("-password");
    if (user) return res.status(400).json({ msg: "User already exists" });

    user = new User({
      name,
      email,
      password,
      waitno,
      referralcode,
      couponcode,
    });

    if (total_user.length != 0) {
      user.waitno = waitno + total_user.length;
    }

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    const new_user = await user.save();
    res.json(new_user);
  } catch (err) {
    console.error("[admin user post] :", err.message);
    res.status(500).json({ msg: "Internal Server Error" });
  }
});

// @route   PUT /api/admin/user/:id
// @desc    Update the user data
// @access  Private(admin)
router.put("/:id", admin, async (req, res) => {
  const { name, email, waitno, referralcode } = req.body;
  const userFields = {};
  if (name) userFields.name = name;
  if (email) userFields.email = email;
  if (waitno) userFields.waitno = waitno;
  if (referralcode) userFields.referralcode = referralcode;
  try {
    let user = await User.findById(req.params.id);

    if (!user) return res.status(404).json({ msg: "User not found" });

    user = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: userFields,
      },
      { new: true }
    );
    res.json(user);
  } catch (err) {
    console.error("[admin user put] :", err.message);
    res.status(500).json({ msg: "Internal Server Error" });
  }
});

// @route   DELETE /api/admin/user/:id
// @desc    Delete the user from the database
// @access  Private(admin only)
router.delete("/:id", admin, async (req, res) => {
  try {
    let user = await User.findById(req.params.id);

    if (!user) return res.status(400).json({ msg: "User not found" });

    await User.findByIdAndRemove(req.params.id);
    res.json({ msg: "User Removed" });
  } catch (err) {
    console.error("[admin user delete] :", err.message);
    res.status(500).json({ msg: "Internal Server Error" });
  }
});
module.exports = router;
