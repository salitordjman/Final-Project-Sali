const mongoose = require("mongoose");
const keys = require("../config/keys");
mongoose.connect(
  process.env.MONGO_URL ||
    `mongodb+srv://salitor:${keys.password}@salitur.xfafu.mongodb.net/final-project-sali?retryWrites=true&w=majority`,
  {}
);
