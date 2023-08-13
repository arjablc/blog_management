const express = require("express");
const app = express();
const { blogModel, sequelize } = require("./model/index");

//setting the view engine to use ejs
app.set("View Engine", "ejs");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
	res.render("./home/home.ejs");
});

app.get("/add-blog", (req, res) => {
	res.render("./add_blog/add_blog.ejs");
});

app.post("/add-blog", async (req, res) => {
	//accessing the data coming in the req body
	const { title, subtitle, description } = req.body;

	//putting the data coming from the req to db
	await blogModel.create({
		title: title,
		subtitle: subtitle,
		description: description,
	});

	//redirect after the data is kept in the db
	res.redirect("/");
});

app.listen(4000, () => {
	console.log("Started on port 4000");
});
