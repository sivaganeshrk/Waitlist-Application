const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = async function (req, res, next) {
  // Get the token form the header
  const token = req.header("x-auth-token");

  // Check for the presence of token
  if (!token) res.status(401).json({ msg: "No token,authorization denied" });

  try {
    // Decode the token
    const decode = jwt.decode(token, config.get("jwtSecret"));
    req.user = decode.user;
    next();
  } catch (err) {
    // catch error and send not valid if token is not valid
    res.status(401).json({ msg: "Token is not valid" });
  }
};
