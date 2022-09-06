const express = require("express");
const app = express();
const PORT = process.env.PORT || 3001;
// const session = require("express-session");
const sequelize = require("./config/connection");

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// GET route
app.get("/", async (req, res) => {
  res.send("test");
});

sequelize.sync({ force: true }).then(() => {
  app.listen(PORT, () => {
    console.log("Server is up and running at localhost:" + PORT);
  });
});
