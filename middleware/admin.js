const jwt = require("jsonwebtoken");
const config = require("config");
const Admin = require("../models/admin");

module.exports = async function (req, res, next) {
  // Get the token from header
  const token = req.header("x-auth-token");

  // Check if not token
  if (!token)
    return res.status(401).json({ msg: "No token, authorization denied" });

  try {
    const decode = jwt.verify(token, config.get("jwtSecret"));

    admin = await Admin.findById(decode.user.id).select("-password");
    if (!admin || !admin.isactive)
      return res.status(401).json({ msg: "Unauthorized User" });
    req.user = decode.user;
    req.admin = admin;
    next();
  } catch (err) {
    res.status(401).json({ msg: "Token is not valid" });
  }
};
