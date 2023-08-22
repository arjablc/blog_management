const express = require("express");
const router = express.Router();
const {
	models: { blogModel },
} = require("../database/database");
router.get("/", async (req, res) => {
	const blogs = await blogModel.findAll();
	res.render("./home/home.ejs", { blogs });
});

module.exports = router;
