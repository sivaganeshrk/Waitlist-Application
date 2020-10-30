const router = require("express").Router();
const User = require("../../models/user");
const register = require("../../helper/register");

// @route   GET /api/referral/
// @desc    check the referral code enter by the user
// @access  Public
router.get("/:referral", async (req, res) => {
  try {
    const referralCode = await User.findOne({
      referralcode: req.params.referral,
    });
    if (!referralCode) return res.status(400).json({ msg: "Invalid Code" });
    res.json({ msg: "Valid code" });
  } catch (err) {
    console.error("[referralcode get] :", err.message);
    res.status(500).json({ msg: "Internal Server Error" });
  }
});

router.post("/:referral", async (req, res) => {
  try {
    const referral_user = await User.findOne({
      referralcode: req.params.referral,
    }).select("-password");
    if (!referral_user)
      return res.status(400).json({ mag: "Invalid referral code" });

    const { name, email, password } = req.body;

    const result = await register(req, res, name, email, password);
    const Updateuser = {};
    if (result) {
      Updateuser.waitno = referral_user.waitno - 1;

      await User.findByIdAndUpdate(
        referral_user._id,
        {
          $set: Updateuser,
        },
        { new: true }
      );
    }
  } catch (err) {
    console.error("[referralcode post]", err.message);
    res.status(500).json({ msg: "Internal Server Error" });
  }
});

module.exports = router;
