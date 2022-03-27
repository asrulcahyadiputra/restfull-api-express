module.exports = (app) => {
  const posts = require("../controllers/post.controller.js");

  let router = require("express").Router();

  //   create new post
  router.post("/", posts.create);

  //   retrieve all posts
  router.get("/", posts.findAll);

  //   retrieve published posts
  router.get("/published", posts.findByPublished);

  //   retrieve a single post
  router.get("/:id", posts.findOne);

  //   update a post
  router.put("/:id", posts.update);

  //   delete a post
  router.delete("/:id", posts.delete);

  //   delete all posts
  router.delete("/", posts.deleteAll);

  app.use("/api/posts", router);
};
