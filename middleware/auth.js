const jwt = require("jsonwebtoken");
const keys = require("../config/keys");

module.exports = (req, res, next) => {
  const token = req.header("x-auth-token");
  if (!token) {
    throw new Error("No token");
  }
  try {
    const decoded = jwt.verify(token, "thisismyproject");
    // const decoded = jwt.verify(token, keys.pjwt);
    req.user = decoded.user;
    next();
  } catch (e) {
    res.status(401).send({ error: "Please authenticate" });
  }
};
