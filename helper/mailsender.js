const nodemailer = require("nodemailer");
const config = require("config");
let mailTransporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: config.get("email"),
    pass: config.get("emailPassword"),
  },
});

module.exports = async (to, subject, body) => {
  try {
    const res = await mailTransporter.sendMail({
      from: "rksivaganesh@gmail.com",
      to: to,
      subject: subject,
      html: body,
    });
    if (res) {
      return "Email sent successfully";
    } else {
      return "Error Occurs";
    }
  } catch (err) {
    console.log("[sendMail] :", err.message);
    return "Error Occurs";
  }
};
