const express = require("express");
const app = express();
const { blogModel, sequelize } = require("./model/index");
const { where } = require("sequelize");

//setting the view engine to use ejs
app.set("View Engine", "ejs");
app.use(express.static("./public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
	//getting all the blogs
	const allBlogs = await blogModel.findAll();
	res.render("./home/home.ejs", { blogs: allBlogs });
});

app.get("/single-blog/:id", async (req, res) => {
	const id = req.params.id;
	const singleBlog = await blogModel.findByPk(id); // this will use your primary key to find the single entity
	//you can also use .findAll({where: {col_name: parameter}}) to search for all the entities with the parameter passed
	//! However in that case you need to treat the return value as an array...
	res.render("./single_blog/single_blog.ejs", { singleBlog });
});

app.get("/add-blog", (req, res) => {
	res.render("./add_blog/add_blog.ejs");
});

//! the delete and the update make the api non restful
app.get("/delete/:id", async (req, res) => {
	const id = req.params.id;
	console.log(id);
	await blogModel.destroy({ where: { id } });
	res.redirect("/");
});

app.post("/add-blog", async (req, res) => {
	//accessing the data coming in the req body
	const { title, subtitle, description } = req.body;

	//putting the data coming from the req to db
	const newBlog = await blogModel.create({
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
