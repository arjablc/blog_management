require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT;


//import routes 
const blogRoute = require("./src/routes/blogRouters.js");
const indexRoute = require("./src/routes/indexRoute.js");


//middlewares
app.set("View Engine", "ejs");
app.use(express.static("./public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//routes
app.use("/blog", blogRoute);
app.use("/", indexRoute);

app.listen(PORT, () => {
	console.log("Started on port " + PORT);
});
