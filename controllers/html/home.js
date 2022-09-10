const router = require("express").Router();

router.get("/", async (req, res) => {
  const isLoggedIn = req.session.isLoggedIn;
  res.render("home", {
    isLoggedIn,
  });
});

router.get("/login", async (req, res) => {
  const isLoggedIn = req.session.isLoggedIn;
  res.render("login", {
    isLoggedIn,
  });
});

module.exports = router;