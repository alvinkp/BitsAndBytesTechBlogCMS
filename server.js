const express = require("express");
const app = express();
const PORT = process.env.PORT || 3001;
const session = require("express-session");

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// GET route
app.get("/", async (req, res) =>{
    res.send("test");
})



app.listen(PORT, ()=>{
    console.log("Server is up and running at localhost:" + PORT)
})