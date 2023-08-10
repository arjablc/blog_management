const express = require("express");
const app = express();

//setting the view engine to use ejs
app.set("View Engine", "ejs");

app.get("/", (req, res) => {
	res.render("./home/home.ejs");
});

app.get("/add-blog", (req, res) => {
	res.render("./add_blog/add_blog.ejs");
});



app.listen(4000, () => {
	console.log("Started on port 4000");
});
