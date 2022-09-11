const router = require("express").Router();

router.get("/", async (req, res) => {
  const isLoggedIn = req.session.loggedIn;
  res.render("home", {
    isLoggedIn,
  });
});

router.get("/login", async (req, res) => {
  const isLoggedIn = req.session.loggedIn;
  console.log(isLoggedIn);
  res.render("login", {
    isLoggedIn,
  });
});

router.get("/dashboard", async (req, res) => {
  const isLoggedIn = req.session.loggedIn;
  if (isLoggedIn) {
    res.render("dashboard", {
      isLoggedIn,
    });
  } else {
    res.render("login");
  }
});

module.exports = router;
