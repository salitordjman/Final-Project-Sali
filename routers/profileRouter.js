const express = require("express");
const router = new express.Router();
const auth = require("../middleware/auth");
const profileDetails = require("../models/profileDetails");
const userDetails = require("../models/userDetails");
const postDetails = require("../models/postDetails");

router.get("/me", auth, async (req, res) => {
  try {
    const profile = await profileDetails
      .findOne({
        user: req.user.id,
      })
      .populate("user", ["name", "picture"]);

    if (!profile) {
      return res.status(400).send("Not have a profile");
    }

    res.status(200).send(profile);
  } catch (e) {
    res.status(500).send({ error: e.message });
  }
});

router.post("/", auth, async (req, res) => {
  const {
    hobbies,
    youtube,
    facebook,
    linkedin,
    instagram,
    github,
    tiktok,
    ...rest
  } = req.body;
  const profileFields = {
    hobbies: Array.isArray(hobbies)
      ? hobbies
      : hobbies.split(",").map((hobby) => " " + hobby.trim()),
    ...rest,
  };
  const socialFields = {
    youtube,
    facebook,
    linkedin,
    instagram,
    github,
    tiktok,
  };
  for (const [key, value] of Object.entries(socialFields)) {
    if (value && value.length > 0) socialFields[key] = value;
  }

  profileFields.social = socialFields;

  try {
    const profile = await profileDetails.findOneAndUpdate(
      { user: req.user.id },
      { $set: profileFields },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );
    res.status(200).send(profile);
  } catch (e) {
    res.status(500).send({ Error: e.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const profiles = await profileDetails
      .find()
      .populate("user", ["name", "picture"]);
    res.status(200).send(profiles);
  } catch (e) {
    res.status(500).send({ Error: e.message });
  }
});

router.get("/user/:_id", async ({ params: { _id } }, res) => {
  try {
    const profile = await profileDetails
      .findOne({ user: _id })
      .populate("user", ["name", "picture"]);

    if (!profile) return res.status(400).send("Not have a profile");

    return res.send(profile);
  } catch (e) {
    return res.status(500).send({ Error: e.message });
  }
});

router.delete("/", auth, async (req, res) => {
  try {
    await Promise.all([
      postDetails.deleteMany({ user: req.user.id }),
      profileDetails.findOneAndRemove({ user: req.user.id }),
      userDetails.findOneAndRemove({ _id: req.user.id }),
    ]);

    res.send("User deleted successfully");
  } catch (e) {
    res.status(500).send({ Error: e.message });
  }
});

module.exports = router;
