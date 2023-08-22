const express = require("express")();
const app = express;

//middlewares
app.set("View Engine", "ejs");
app.use(express.static("./public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
	//getting all the blogs
	const allBlogs = await blogModel.findAll();
	res.render("./home/home.ejs", { blogs: allBlogs });
});

module.exports = app;
