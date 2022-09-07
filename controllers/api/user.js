const { User } = require("../../models");

const router = require("express").Router();

// GET api/user route
router.get("/", async (req, res) => {
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
    return res.status(201).json(newUser);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Something went wrong while trying to create your user.",
    });
  }
});

module.exports = router;
