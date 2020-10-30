const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = (req, res, user_id) => {
  try {
    const payload = {
      user: {
        id: user_id,
      },
    };

    jwt.sign(
      payload,
      config.get("jwtSecret"),
      { expiresIn: 2120000 },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    console.log("[jwt]", err.message);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};
