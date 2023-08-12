const dbConfig = require("../config/dbConfig");
const { Sequelize, DataTypes } = require("sequelize");
const { blogModel } = require("./blogModel");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWROD, {
	host: dbConfig.HOST,
	dialect: dbConfig.DIALECT,
});

sequelize
	.authenticate()
	.then(() => console.log("DB auth success!!"))
	.catch((err) => console.log("Error occured" + err));

const db = {};

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.blogModel = require("./blogModel")(sequelize, DataTypes);

sequelize
	.sync(() => console.log("DB sync success!"))
	.catch((err) => console.log("DB sync failed!! \n ERROR: " + err));

module.exports = db;
