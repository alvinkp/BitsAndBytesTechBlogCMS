const { User } = require("../../models");
const { restore } = require("../../models/User");

const router = require("express").Router();

// GET api/user route
router.get("/", async (req, res) => {
  if (req.session.loggedIn) {
    res.json({ message: "You are logged in" });
  } else {
    res.json({ message: "You have logged out" });
  }
  console.log("You're in the user route");
  res.end();
});

// Create New User route
router.post("/", async (req, res) => {
  const { username, email, password } = req.body;

  if ((!username, !email, !password)) {
    return res.status(400).json({
      message:
        "You did not submit all required information: Username, Email Address & Password",
    });
  }

  try {
    const newUser = await User.create({
      username,
      email,
      password,
    });

    req.session.save(() => {
      req.session.loggedIn = true;
      req.session.userId = newUser.id;
      return res.status(201).json(newUser);
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Something went wrong while trying to create your user.",
    });
  }
});

// Login route
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if ((!email, !password)) {
    return res
      .status(400)
      .json({ message: "Incorrect Login, please try again." });
  }

  try {
    const user = await User.findOne({
      where: {
        email,
      },
    });

    const hasValidPass = user.checkPassword(password);

    if (hasValidPass) {
      req.session.save(() => {
        req.session.loggedIn = true;
        req.session.userId = user.id;
        return res.status(200).json(user);
      });
    } else {
      res
        .status(404)
        .json({ message: "Email or Password is incorrect, please try again." });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Something went wrong while trying to log in.",
    });
  }
});

module.exports = router;
