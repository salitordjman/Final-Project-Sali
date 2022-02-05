const express = require("express");
// const keys = require("../config/keys");
const userDetails = require("../models/userDetails");
const router = new express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

router.post("/", async (req, res) => {
  const newUser = new userDetails(req.body);
  try {
    const salt = await bcrypt.genSalt(10);
    newUser.password = await bcrypt.hash(newUser.password, salt);
    await newUser.save();
    const payload = {
      user: {
        id: newUser.id,
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
