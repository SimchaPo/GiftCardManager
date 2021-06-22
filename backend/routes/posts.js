const router = require("express").Router();
let Post = require("../models/post.model.js");
const { authUser, authRole } = require("../middleware/basicAuth");
const ROLE = require("../../src/roles.enum");
const Comment = require("../models/comment.model.js");

router.route("/").get((req, res) => {
  console.log("get posts list");
  Post.find()
    .populate("postAuthor", "userName")
    .populate({
      path: "comments",
      populate: {
        path: "commentAuthor",
        select: "userName",
      },
    })
    .then((posts) => res.json(posts))
    .catch((err) => res.status(400).json("Error: " + err));
});

router
  .route("/addpost")
  //   .all(authUser)
  .post((req, res) => {
    console.log("add post:", req.body);
    new Post(req.body)
      .save()
      .then(() => res.json("post added!"))
      .catch((err) => res.status(400).json("Error: " + err));
  });

router.route("/getpostbyid/:id").get((req, res) => {
  Post.findById(req.params.id)
    .populate("postAuthor", "userName")
    .populate({
      path: "comments",
      populate: {
        path: "commentAuthor",
        select: "userName",
      },
    })
    .then((post) => res.json(post))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/delete/:id").delete((req, res) => {
  //console.log("user to delete:", id);
  Post.findByIdAndDelete(req.params.id)
    .then((post) => res.json("post deleted."))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/update/:id").post((req, res) => {
  Post.findById(req.params.id)
    .then((post) => {
      post.postTitle = req.body.postTitle;
      post.postContent = req.body.postContent;

      post
        .save()
        .then(() => res.json("post updated!"))
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/addcomment/:id").post((req, res) => {
  new Comment(req.body)
    .save()
    .then((comment) => {
      Post.findById(req.params.id)
        .then((post) => {
          post.comments.push(comment);
          post.save();
        })
        .catch((err) => res.status(400).json("Error: " + err));
      res.json("comment added!");
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/addlike/:id").post((req, res) => {
  Post.findById(req.params.id)
    .then((post) => {
      post.likes.push(req.body);
      post.save();
      res.json("like added!");
    })
    .catch((err) => res.status(400).json("Error: " + err));
});
router.route("/adddislike/:id").post((req, res) => {
  Post.findById(req.params.id)
    .then((post) => {
      post.dislikes.push(req.body);
      post.save();
      res.json("dislike added!");
    })
    .catch((err) => res.status(400).json("Error: " + err));
});
router.route("/removelike/:id").post((req, res) => {
  Post.findById(req.params.id)
    .then((post) => {
      post.likes.pull(req.body);
      post.save();
      res.json("like removed!");
    })
    .catch((err) => res.status(400).json("Error: " + err));
});
router.route("/removedislike/:id").post((req, res) => {
  Post.findById(req.params.id)
    .then((post) => {
      post.dislikes.pull(req.body);
      post.save();
      res.json("dislike removed!");
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
