const { Comment } = require("../../models");
const { restore, beforeBulkDestroy } = require("../../models/user");
const { withAuth } = require("../../utils");

const router = require("express").Router();

// Get Blogs that belong to a blog
router.get("/getConnected:id", withAuth, async (req, res) => {
  const BlogId = req.params.id.slice(1);

  try {
    const dbComments = await Comment.findAll({
      where: {
        blogNum: BlogId,
      },
    });
    dbComments.map((comment) => comment.get({ plain: true }));
    res.status(200).json(dbComments);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Something went wrong while trying to retrieve comments.",
    });
  }
});

// Add Blog
router.post("/", withAuth, async (req, res) => {
  const { content, blogNum } = req.body;
  const posterId = req.session.userId;

  try {
    const newComment = await Comment.create({
      content,
      blogNum,
      posterId,
    });

    res.json(newComment);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Something went wrong while trying to post your blog.",
    });
  }
});

module.exports = router;
