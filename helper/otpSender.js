const Otp = require("../models/Otp");
const sendMail = require("./mailsender");
const moment = require("moment");

// Otp sender
module.exports = async (name, id, email) => {
  const otp = Math.random().toString().slice(6, 10);
  const otpExpires = moment().add(5, "minute").format();
  const otpdata = new Otp({
    otp,
    otpExpires,
    user: id,
  });
  await otpdata.save();
  const subject = "Password reset requested for your waitlist Account";
  const body = `
<html>
<body>
<h4>Hi ${name},<h4>
<span> Your requested for password reset </span><br>
<span> OTP for resting your password <b>${otp}</b></span><br>
<span> Note: that this link is valid for 5 Minutes. After the time limit has expired, you will have to resubmit the request for a password reset.</span>
</body>
</html>
`;
  const res = await sendMail(email, subject, body);
  if (res === "Email sent successfully") {
    return "otp send";
  } else {
    return "otp not Send";
  }
};
