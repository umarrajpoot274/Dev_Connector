const { response } = require("express");
const express = require("express");
router = express.Router();
const { check, validationResult } = require("express-validator");
const { restart } = require("nodemon");
const auth = require("../../middleware/auth");
const Post = require("../../models/post");
const User = require("../../models/user");

//@route getapi/post
//@dec testroute
//@access public
router.post(
  "/",
  [auth, [check("text", "text is required").not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.json({ errors: errors.array() });
    }

    try {
      const user = User.findById(req.user.id).select("-password"); //fetching user
      const newPost = new Post({
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id,
      });

      const post = await newPost.save();
      res.json(post);
    } catch (err) {
      console.errors(err.message);
      res.status(500).send("Server Eror.");
    }
  }
);

// Get all posts
router.get("/", auth, async (req, res) => {
  try {
    const posts = await Post.find().sort({ date: -1 });
    if (!posts) {
      res.status(404).json({
        msg: "No Post found.",
      });
    }

    res.json(posts);
  } catch (err) {
    console.errors(err.message);
    res.status(500).send("Server Eror.");
  }
});

//Get specific post of the user
router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id); // using id from which post maked
    // if no post
    if (!post) {
      return res.status(404).json({ msg: "No post found" });
    }
    res.json(post);
  } catch (err) {
    console.error(err.message);
    if (err.kind == "ObjectId") {
      res.status(404).json({ msg: "No profile found" });
    }
  }
});
//Delete Specific Post
router.delete("/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({
        msg: "No post found",
      });
    }
    // Match with user post id if found
    if (post.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "User not valid" });
    }
    // if User found
    await post.remove();
    res.send("post removed");
  } catch (err) {
    console.error(err.message);
    if (err.kind == "ObjectId") {
      res.status(404).json({ msg: "No profile found" });
    }
  }
});

//Add likes to the post
router.put("/like/:id", auth, async (req, res) => {
  try {
    const posts = await Post.findById(req.params.id);

    //Check if the post have already like
    if (
      posts.likes.filter((like) => like.user.toString() === req.user.id)
        .length > 0
    ) {
      res.status(400).json({ msg: "already liked" });
    }
    // if not liked before
    posts.likes.unshift({ user: req.user.id });
    await posts.save();
    res.json(posts.likes);
  } catch (err) {
    console.error(err.message);
    if (err.kind == "ObjectId") {
      res.status(404).json({ msg: "No profile found" });
    }
  }
});
//Unlike Post
router.put("/unlike/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    //Check if like before
    if (
      post.likes.filter((like) => like.user.toString() === req.user.id)
        .length === 0
    ) {
      return res.status(400).json({ msg: "Post has been yet liked" });
    }
    //Get remove index
    const removeIndex = post.likes
      .map((like) => like.user.toString())
      .indexOf(req.user.id);
    post.likes.splice(removeIndex, 1);
    await post.save();
    res.json(post.likes);
  } catch (err) {
    console.error(err.message);
    if (err.kind == "ObjectId") {
      res.status(404).json({ msg: "No profile found" });
    }
  }
});
//Add Comment route
router.post(
  "/comment/:id",
  [auth, [check("text", "text is required").not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json(errors.array());
    }
    try {
      const user = await User.findById(req.user.id).select("-password");
      const post = await Post.findById(req.params.id);

      const newComment = {
        //comment include these fields
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id,
      };
      post.comments.unshift(newComment);
      await post.save();
      res.json(post.comments);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error.");
    }
  }
);
// Delete Comment
router.delete("/comment/:id/:comment_id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    //pull out comment
    const comment = post.comments.find(
      (comment) => comment.id === req.params.comment_id
    );
    if (!comment) {
      return res.status(404).json({ msg: "Comment not exist" });
    }
    if (comment.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "User not authorized" });
    }
    //Get remove Index
    const removeIndex = post.comments
      .map((comment) => comment.user.toString())
      .indexOf(req.user.id);
    post.comments.splice(removeIndex, 1);
    await post.save();
    res.json(post.comments);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});
module.exports = router;
