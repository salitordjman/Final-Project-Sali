const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    lowercase: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Email is invalid");
      }
    },
  },
  password: {
    type: String,
    trim: true,
    required: true,
    minLength: 6,
  },
  // picture: {
  //   type: String,
  // },
  DateAdded: {
    type: Date,
    default: Date.now,
  },
});

const userDetails = mongoose.model("user", userSchema);

module.exports = userDetails;
