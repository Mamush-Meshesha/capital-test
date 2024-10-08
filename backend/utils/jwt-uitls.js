const jwt = require("jsonwebtoken");

module.exports = {
  generateToken(res, id, role) {
    const token = jwt.sign({ id, role }, process.env.JWT_ACCESS_TOKEN, {
      expiresIn: "1h",
    });

    res.cookie("jwt", token, {
      httpOnly: false,
      secure: process.env.NODE_ENV === "production",
      maxAge: 3600 * 1000, 
      sameSite: "strict",
    });
  },
};
