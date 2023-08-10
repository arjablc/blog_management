const express = require("express");
const app = express();

//setting the view engine to use ejs 
app.set("View Engine", "ejs");

app.get("/", (req, res )=>{
    res.render("home.ejs");
})


app.listen(4000, ()=>{
    console.log("Started on port 4000");
})
