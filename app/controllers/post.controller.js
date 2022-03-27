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
      res.status(201).send({
        status: true,
        message: "Post created successfully!",
        values: data,
        errors: [],
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Post.",
      });
    });
};

// retrieve all
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

  Post.findAll({ where: condition })
    .then((data) => {
      res.send({
        status: true,
        message: "Posts retrieved successfully!",
        values: data,
        errors: [],
      });
    })
    .catch((err) => {
      res.status(500).send({
        status: false,
        message: err.message || "Some error occurred while retrieving posts.",
        errors: err.message || [],
      });
    });
};

// retrieve one
exports.findOne = (req, res) => {
  const id = req.params.id;

  Post.findByPk(id)
    .then((data) => {
      res.send({
        status: true,
        message: "Post retrieved successfully!",
        values: data,
        errors: [],
      });
    })
    .catch((err) => {
      res.status(500).send({
        status: false,
        message: err.message || "Some error occurred while retrieving post.",
        errors: err.message || [],
      });
    });
};

// update
exports.update = (req, res) => {};

// delete
exports.delete = (req, res) => {};

// delete all
exports.deleteAll = (req, res) => {};

// find by published
exports.findByPublished = (req, res) => {};
