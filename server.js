const express = require("express");
const session = require("express-session");
const { sequelize, sessionConfig } = require("./config/connection");
const controllers = require("./controllers");

const PORT = process.env.PORT || 3001;
const app = express();

// Middleware
app.use(session(sessionConfig));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(controllers);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => {
    console.log("Server is up and running at localhost:" + PORT);
  });
});
