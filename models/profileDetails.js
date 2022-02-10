const mongoose = require("mongoose");

const ProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  birthday: {
    type: Date,
    // required: true,
  },
  location: {
    type: String,
  },
  status: {
    type: String,
    required: true,
  },
  hobbies: {
    type: [String],
    required: true,
  },
  bio: {
    type: String,
  },
  education: {
    type: String,
  },

  social: {
    youtube: {
      type: String,
    },
    facebook: {
      type: String,
    },
    linkedin: {
      type: String,
    },
    instagram: {
      type: String,
    },
    github: {
      type: String,
    },
    tiktok: {
      type: String,
    },
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("profile", ProfileSchema);
