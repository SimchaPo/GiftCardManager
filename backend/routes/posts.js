const router = require("express").Router();
let Post = require("../models/post.model.js");
const { authUser, authRole } = require("../middleware/basicAuth");
const ROLE = require("../../src/roles.enum");

router.route("/").get((req, res) => {
  console.log("get posts list");
  Post.find()
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

module.exports = router;
