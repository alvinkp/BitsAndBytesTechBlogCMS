const express = require("express");
const app = express();
const PORT = process.env.PORT || 3001;
// const session = require("express-session");
const sequelize = require("./config/connection");
const controllers = require("./controllers");
const { Blog, User } = require("./models");

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(controllers);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => {
    console.log("Server is up and running at localhost:" + PORT);
  });
});
