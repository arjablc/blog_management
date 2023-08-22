const app = require("./src/app");
const { blogModel, sequelize } = require("./model/index");
const { where } = require("sequelize");

//setting the view engine to use ejs



app.get("/single-blog/:id", async (req, res) => {
	const id = req.params.id;
	const { blogId, title, subtitle, description } = await blogModel.findByPk(id); // this will use your primary key to find the single entity
	//you can also use .findAll({where: {col_name: parameter}}) to search for all the entities with the parameter passed
	//! However in that case you need to treat the return value as an array...
	const formattedDescription = description.replace(/\n/g, "<br>");
	res.render("./single_blog/single_blog.ejs", {
		blogId,
		title,
		subtitle,
		description: formattedDescription,
	});
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

//editing the blog
app.get("/edit/:id", async (req, res) => {
	const id = req.params.id;
	const currentBlog = await blogModel.findByPk(id);
	res.render("./edit_blog/edit_blog.ejs", { currentBlog });
});
app.post("/edit/:id", async (req, res) => {
	const id = req.params.id;
	//to update the database sequelize has 2 ways
	//one is to use the save method that updates every change on the model
	//other is the update method that updates the thing that is specified in the method

	await blogModel.update(req.body, {
		where: { id: id },
	});

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
