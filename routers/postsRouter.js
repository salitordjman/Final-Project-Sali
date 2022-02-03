const express = require("express");
const router = new express.Router();
const auth = require("../middleware/auth");
const userDetails = require("../models/userDetails");
const postDetails = require("../models/postDetails");

router.post("/", auth, async (req, res) => {
  try {
    const user = await userDetails.findById(req.user.id).select("-password");

    const newPost = new postDetails({
      text: req.body.text,
      newPicture: req.body.newPicture,
      link: req.body.link,
      name: user.name,
      picture: user.picture,
      user: req.user.id,
    });

    const post = await newPost.save();

    res.status(200).send(post);
  } catch (e) {
    res.status(500).send({ Error: e.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const posts = await postDetails.find().sort({ date: -1 });
    res.status(200).send(posts);
  } catch (e) {
    res.status(500).send({ Error: e.message });
  }
});

router.get("/:idPost", auth, async (req, res) => {
  try {
    const post = await postDetails.findById(req.params.idPost);

    if (!post) {
      return res.status(404).send("Not found a post");
    }
    res.status(200).send(post);
  } catch (e) {
    res.status(500).send({ Error: e.message });
  }
});

router.delete("/:idPost", auth, async (req, res) => {
  try {
    const post = await postDetails.findById(req.params.idPost);

    if (!post) {
      return res.status(404).send("Not found a post");
    }
    if (post.user.toString() !== req.user.id) {
      return res.status(401).send("The user is not allowed to delete the post");
    }

    await post.remove();

    res.status(200).send("Post deleted successfully");
  } catch (e) {
    res.status(500).send({ Error: e.message });
  }
});

router.put("/like/:idPost", auth, async (req, res) => {
  try {
    const post = await postDetails.findById(req.params.idPost);
    if (!post) return res.status(401).send("not found this Post");
    if (post.likes.some((like) => like.user.toString() === req.user.id)) {
      return res.status(400).send("User cannot likes twice at the same post");
    }

    post.likes.unshift({ user: req.user.id });

    await post.save();

    return res.status(200).send(post.likes);
  } catch (e) {
    res.status(500).send({ Error: e.message });
  }
});

router.put("/unlike/:idPost", auth, async (req, res) => {
  try {
    const post = await postDetails.findById(req.params.idPost);

    if (!post) return res.status(401).send("not found this Post");
    if (!post.likes.some((like) => like.user.toString() === req.user.id)) {
      return res.status(400).send("This post is not yet Like");
    }

    post.likes = post.likes.filter(
      ({ user }) => user.toString() !== req.user.id
    );

    await post.save();

    res.status(200).send(post.likes);
  } catch (e) {
    res.status(500).send({ Error: e.message });
  }
});

router.post("/comment/:idPost", auth, async (req, res) => {
  try {
    const user = await userDetails.findById(req.user.id).select("-password");
    const post = await postDetails.findById(req.params.idPost);
    if (!post) return res.status(401).send("not found this Post");
    if (!user) return res.status(404).send("not found this user");

    const newComment = {
      text: req.body.text,
      name: user.name,
      picture: user.picture,
      user: req.user.id,
    };

    post.comments.unshift(newComment);

    await post.save();
    res.status(200).send(post.comments);
  } catch (e) {
    res.status(500).send({ Error: e.message });
  }
});

router.delete("/comment/:idPost/:idComment", auth, async (req, res) => {
  try {
    const post = await postDetails.findById(req.params.idPost);
    if (!post) return res.status(401).send("not found this Post");

    const comment = post.comments.find(
      (comment) => comment.id === req.params.idComment
    );
    if (!comment) {
      return res.status(404).send("not found this Comment");
    }

    if (comment.user.toString() !== req.user.id) {
      return res.status(401).send("not found this User");
    }

    post.comments = post.comments.filter(
      ({ id }) => id !== req.params.idComment
    );

    await post.save();

    res.status(200).send(post.comments);
  } catch (e) {
    res.status(500).send({ Error: e.message });
  }
});

module.exports = router;
