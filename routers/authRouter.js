const express = require("express");
// const keys = require("../config/keys");
const router = new express.Router();
const auth = require("../middleware/auth");
const userDetails = require("../models/userDetails");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

router.get("/", auth, async (req, res) => {
  try {
    const myUser = await userDetails.findById(req.user.id).select("-password");
    res.status(200).send(myUser);
  } catch (e) {
    res.status(500).send({ Error: e.message });
  }
});

router.post("/", async (req, res) => {
  const { email, password } = req.body;
  try {
    const myUser = await userDetails.findOne({ email });
    if (!myUser) {
      return res.status(400).send("Error: Incorrect details");
    }
    const isMatch = await bcrypt.compare(password, myUser.password);
    if (!isMatch) {
      return res.status(400).send("Error: Incorrect details");
    }
    const payload = {
      user: {
        id: myUser.id,
      },
    };
    jwt.sign(
      payload,
      "thisismyproject",
      { expiresIn: "100 days" },
      (err, token) => {
        // jwt.sign(payload, keys.pjwt, { expiresIn: "100 days" }, (err, token) => {
        if (err) throw err;
        res.status(201).send({ token });
      }
    );
  } catch (e) {
    res.status(500).send({ Error: e.message });
  }
});

module.exports = router;
