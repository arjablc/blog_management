module.exports = (sequelize, DataTypes) => {
	const blogModel = sequelize.define("blog", {
		title: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		subtitle: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		description: {
			type: DataTypes.TEXT("medium"),
			allowNull: false,
		},
	});
	return blogModel;
};
