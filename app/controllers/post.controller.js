const db = require("../models");
const Post = db.posts;

const Op = db.Sequelize.Op;

// create
exports.create = (req, res) => {
  // validate request
  if (!req.body.title) {
    res.status(400).send({
      message: "Title can not be empty",
    });
    return;
  }

  // create a Post
  const post = {
    title: req.body.title,
    content: req.body.content,
    published: req.body.published || false,
  };

  // save Post in the database
  Post.create(post)
    .then((data) => {
      res.send(data);
    })
    .cath((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Post.",
      });
    });
};

// retrieve all
exports.findAll = (req, res) => {};

// retrieve one
exports.findOne = (req, res) => {};

// update
exports.update = (req, res) => {};

// delete
exports.delete = (req, res) => {};

// delete all
exports.deleteAll = (req, res) => {};

// find by published
exports.findByPublished = (req, res) => {};
