const { Sequelize, DataTypes } = require("sequelize");
const dotenv = require("dotenv").config({ path: "../../.env" });

//test connection to database
const sequelize = new Sequelize(process.env.DB_CONNECTION_STRING); // Example for postgres
const testDB = async () => {
	try {
		await sequelize.authenticate();
		console.log("Connected to database!");
	} catch (error) {
		console.error("Unable to connect to the database:", error);
	}
};
testDB();

const User = sequelize.define(
	"User",
	{
		firstName: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		lastName: {
			type: DataTypes.STRING,
			allowNull: false,
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

// const Favorite = sequelize.define("Favorite", {}, {});

//drops database and recreates it
(async () => {
	await sequelize.sync({ force: true });
	console.log("All models were synchronized successfully.\n");

	//Generate basic dummy data
	console.log("generating dummy data... \n");
	const user1 = await User.create({
		firstName: "Steve",
		lastName: "Pierzchala",
		email: "pierzchalastephen@gmail.com",
		password: "hunter2",
	});

	const product1 = await Product.create({
		name: "Fender Stratocaster",
		price: 1000,
		description: "A fender stratocaster made in the United States.",
		rating: 5,
		type: "Electric",
		imageLink:
			"https://images.unsplash.com/photo-1555638138-3892e6df8a68?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1447&q=80",
	});
})();
