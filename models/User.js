const { DataTypes } = require("sequelize");
const sequelize = require("../database/db");

const User = sequelize.define(
	"User",
	{
		firstName: {
			type: DataTypes.STRING,
		},
		lastName: {
			type: DataTypes.STRING,
		},
		email: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	},
	{}
);

module.exports = User;
