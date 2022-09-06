const express = require("express");
const app = express();
const PORT = process.env.PORT || 3001;

app.listen(PORT, ()=>{
    console.log("Server is up and running at localhost:" + PORT)
})