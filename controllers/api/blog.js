const { Blog } = require("../../models");
const { restore, beforeBulkDestroy } = require("../../models/User");
const { withAuth } = require("../../utils");

const router = require("express").Router();

router.post("/", withAuth, async (req, res) => {
  const { title, content } = req.body;
  const UserId = req.session.userId;

  try {
    const newBlog = await Blog.create({
      title,
      content,
      UserId,
    });

    res.json(newBlog);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Something went wrong while trying to post your blog.",
    });
  }
});

router.get("/", withAuth, async (req, res) => {
  const UserId = req.session.userId;

  try {
    const dbBlogs = await Blog.findAll({
      where: {
        UserId,
      },
    });
    dbBlogs.map((blog) => blog.get({ plain: true }));
    res.status(200).json(dbBlogs);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Something went wrong while trying to post your blog.",
    });
  }
});

module.exports = router;
