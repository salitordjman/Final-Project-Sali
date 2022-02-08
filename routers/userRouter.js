const express = require("express");
const keys = require("../config/keys");
const userDetails = require("../models/userDetails");
const router = new express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

router.post("/", async (req, res) => {
  try {
    const { email } = req.body;

    const checkUser = await userDetails.findOne({ email });

    if (checkUser) {
      return res.status(400).send("User already exists");
    }
    const newUser = new userDetails(req.body);
    const salt = await bcrypt.genSalt(10);
    newUser.password = await bcrypt.hash(newUser.password, salt);
    await newUser.save();
    const payload = {
      user: {
        id: newUser.id,
      },
    };

    jwt.sign(payload, keys.pjwt, { expiresIn: "100 days" }, (err, token) => {
      if (err) throw err;
      res.status(201).send({ token });
    });
  } catch (e) {
    res.status(500).send({ Error: e.message });
  }
});

module.exports = router;
