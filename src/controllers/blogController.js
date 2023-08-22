module.exports = {
	singleBlogView: async (req, res) => {
		const id = req.params.id;
		const { blogId, title, subtitle, description } = await blogModel.findByPk(
			id
		); // this will use your primary key to find the single entity
		//you can also use .findAll({where: {col_name: parameter}}) to search for all the entities with the parameter passed
		//! However in that case you need to treat the return value as an array...
		const formattedDescription = description.replace(/\n/g, "<br>");
		res.render("./single_blog/single_blog.ejs", {
			blogId,
			title,
			subtitle,
			description: formattedDescription,
		});
	},
	editBlogView: async (req, res) => {
		const id = req.params.id;
		const currentBlog = await blogModel.findByPk(id);
		res.render("./edit_blog/edit_blog.ejs", { currentBlog });
	},
	editBlog: async (req, res) => {
		const id = req.params.id;
		//to update the database sequelize has 2 ways
		//one is to use the save method that updates every change on the model
		//other is the update method that updates the thing that is specified in the method

		await blogModel.update(req.body, {
			where: { id: id },
		});

		res.redirect("/");
	},
	deleteBlog: async (req, res) => {
		const id = req.params.id;
		console.log(id);
		await blogModel.destroy({ where: { id } });
		res.redirect("/");
	},
	newBlogView: (req, res) => {
		res.render("./add_blog/add_blog.ejs");
	},
	newBlog: async (req, res) => {
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
	},
};
