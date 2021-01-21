const User = require("../models/User");
const Product = require("../models/Product");

const genereateDummyData = async () => {
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
};

module.exports = { genereateDummyData };
