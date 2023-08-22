require("dotenv").config();

module.exports = {
	HOST: process.env.DB_HOST,
	DIALECT: process.env.DB_DIALECT,
	USER: process.env.DB_USER,
	DB: process.env.DB_NAME,
};
