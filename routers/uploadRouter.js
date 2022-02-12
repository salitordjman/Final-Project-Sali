const express = require("express");
const multer = require("multer");
const sharp = require("sharp");
const router = new express.Router();
const uploadDetails = require("../models/uploadDetails");

const upload = multer({
  limits: {
    fileSize: 1000000, //  1mb
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb(new Error("Please upload an image"));
    }

    cb(undefined, true);
  },
});
router.post(
  "/",
  upload.single("image"),
  async (req, res) => {
    const buffer = await sharp(req.file.buffer)
      .resize({ width: 250, height: 250 })
      .toBuffer();
    const pic = await new uploadDetails({ buffer });
    pic.save();

    res.send(pic);
  },
  (error, req, res, next) => {
    res.status(400).send({ error: error.message });
  }
);

module.exports = router;
