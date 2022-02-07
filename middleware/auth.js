const jwt = require("jsonwebtoken");
const keys = require("../config/keys");

module.exports = (req, res, next) => {
  const token = req.header("x-auth-token");
  if (!token) {
    return res.status(401).send("No token");
  }
  try {
    jwt.verify(token, keys.pjwt, (error, decoded) => {
      if (error) {
        return res.status(401).send("Token is not valid");
      } else {
        req.user = decoded.user;
        next();
      }
    });
  } catch (e) {
    console.error("something wrong with auth middleware");

    res.status(500).send(e);
  }
};
