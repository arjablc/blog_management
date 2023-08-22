const express = require("express");
const router = express.Router();
const controller = require("../controllers/blogController.js");
//**adding new blog
router.get("/new", controller.newBlogView);
router.post("/new", controller.newBlog);

//** single blog
router.get("/:id", controller.singleBlogView);

//** editing the blog
router.get("/edit/:id", controller.editBlogView);

router.post("/edit/:id", controller.editBlog);

//**delete a blog
router.get("/delete/:id", controller.deleteBlog);

module.exports = router;
