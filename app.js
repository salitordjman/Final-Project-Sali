const express = require("express");
require("./db/mongoose");
const userRouter = require("./routers/userRouter");
const authRouter = require("./routers/authRouter");
const postsRouter = require("./routers/postsRouter");
const profileRouter = require("./routers/profileRouter");
const uploadRouter = require("./routers/uploadRouter");

const cors = require("cors");
const path = require("path");

const app = express();

const publicPath = path.join(__dirname, "client/build");
app.use(cors());
app.use(express.static(publicPath));
app.use(express.json());
app.use("/api/user", userRouter);
app.use("/api/upload", uploadRouter);
app.use("/api/auth", authRouter);
app.use("/api/posts", postsRouter);
app.use("/api/profile", profileRouter);

app.get("*", (req, res) => {
  res.sendFile(path.resolve(publicPath, "index.html"));
});

module.exports = app;
