const router = require("express").Router();
const User = require("../../models/user");
const register = require("../../helper/register");
const sendmail = require("../../helper/mailsender");

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
    if (result && referral_user.waitno !== 1) {
      Updateuser.waitno = referral_user.waitno - 1;
      if (Updateuser.waitno == 1) {
        Updateuser.mailflag = true;
        const to = referral_user.email;
        const subject = "Your Coupon Code";
        const body = `<html>
       <body>
       <h4>Hai ${referral_user.name}</h4>
       <p>Your Coupon code is :<b>${referral_user.couponcode}</b> </p>
       </body>
       <html>`;
        sendmail(to, subject, body);
      }
      await User.findByIdAndUpdate(
        referral_user._id,
        {
          $set: Updateuser,
        },
        { new: true }
      );
    } else {
      if (!referral_user.mailflag) {
        Updateuser.mailflag = true;
        const to = referral_user.email;
        const subject = "Your Coupon Code";
        const body = `<html>
       <body>
       <h4>Hai ${referral_user.name}</h4>
       <p>Your Coupon code is :<b>${referral_user.couponcode}</b> </p>
       </body>
       <html>`;
        sendmail(to, subject, body);

        await User.findByIdAndUpdate(
          referral_user._id,
          {
            $set: Updateuser,
          },
          { new: true }
        );
      }
    }
  } catch (err) {
    console.error("[referralcode post]", err.message);
    res.status(500).json({ msg: "Internal Server Error" });
  }
});

module.exports = router;
