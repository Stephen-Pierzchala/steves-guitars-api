const { DataTypes } = require("sequelize");
const sequelize = require("../database/db");

const Product = sequelize.define(
	"Product",
	{
		name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		price: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		description: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		rating: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		type: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		imageLink: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	},
	{}
);

module.exports = Product;
