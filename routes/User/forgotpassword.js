const router = require("express").Router();
const User = require("../../models/user");
const otpSender = require("../../helper/otpSender");
const otpValidation = require("../../helper/otpValidator");

// @route   GET /api/user/forgotpassword/:email
// @desc    Generate otp and send to email
// @access  Public
router.get("/:email", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.params.email }).select(
      "-password"
    );

    if (!user) return res.status(404).json({ msg: "User not found" });

    const otp = await otpSender(user.name, user._id, user.email);
    if (otp === "otp send") {
      res.json({ msg: "otp send" });
    } else {
      res.status(500).json({ msg: "otp not send" });
    }
  } catch (err) {
    log.Errorlogger("[User forgotpassword.js(get)]", err.message);
    res.status(500).json({ msg: "Internal Server Error" });
  }
});

router.post("/:email", async (req, res) => {
  const { otp, password } = req.body;
  if (password.length <= 5)
    return res.status(400).json({ msg: "Password must greater than 5" });
  try {
    const user = await User.findOne({ email: req.params.email });
    if (!user) return res.json(404).json({ msg: "User not found" });
    const otpdata = await otpValidation(user._id, otp, password);
    if (!otpdata.valid) return res.status(401).json({ msg: "invalid otp" });
    const update_user = await User.findByIdAndUpdate(user._id, {
      $set: otpdata,
    });
    res.json({ msg: "password changed" });
  } catch (err) {
    log.Errorlogger("[User forgotpassword.js(get)]", err.message);
    res.status(500).json({ msg: "Internal Server Error" });
  }
});
module.exports = router;
