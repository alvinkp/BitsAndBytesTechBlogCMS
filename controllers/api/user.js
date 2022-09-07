const router = require("express").Router();

router.get("/", async (req, res) => {
  console.log("You're in the user route");
  res.end();
});

module.exports = router;
