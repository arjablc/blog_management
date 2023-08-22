const dbConfig = require("../../config/dbConfig");
const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWROD, {
	host: dbConfig.HOST,
	dialect: dbConfig.DIALECT,
});

sequelize
	.authenticate()
	.then(() => console.log("DB auth success!!"))
	.catch((err) => console.log("Error occured" + err));

const db = {};

db.Sequelize = Sequelize;
db.models = {};
db.models.blogModel = require("../model/blogModel")(sequelize, DataTypes);

sequelize
	.sync(() => console.log("DB sync success!"))
	.catch((err) => console.log("DB sync failed!! \n ERROR: " + err));

module.exports = db;
