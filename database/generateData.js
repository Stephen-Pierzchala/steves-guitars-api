const User = require("../models/User");
const Product = require("../models/Product");
const CartItem = require("../models/CartItem");

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
		name: "Classical Guitar",
		price: 499,
		description:
			"A classical guitar with nylon strings perfect for guitar arrangements of orchestral pieces.",
		rating: 4,
		type: "Acoustic",
		imageLink:
			"https://images.unsplash.com/photo-1555638138-3892e6df8a68?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1447&q=80",
	});

	const product2 = await Product.create({
		name: "Washburn",
		price: 399,
		description:
			"Washburn makes beautiful guitars that are not only reliable, but affordable.",
		rating: 5,
		type: "Acoustic",
		imageLink:
			"https://images.unsplash.com/photo-1589471861110-1144cd568519?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1100&q=80",
	});

	const product3 = await Product.create({
		name: "Gibson SG",
		price: 849,
		description:
			"A 2014 Gibson SG in mint condition. Comes with 2 Humbucker pickups that create the signature Gibson sound you know and love.",
		rating: 5,
		type: "Electric",
		imageLink:
			"https://images.unsplash.com/photo-1576501558038-9db72cac6851?ixid=MXwxMjA3fDB8MHxzZWFyY2h8NDB8fGd1aXRhcnxlbnwwfDJ8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
	});

	const product4 = await Product.create({
		name: "Fender Stratocaster",
		price: 1999,
		description:
			"An American-made Fender Custom Shop Stratocaster. You can't go wrong with a straocaster: these guitars give you one of the most recognizable tones ever developed.",
		rating: 5,
		type: "Electric",
		imageLink:
			"https://images.unsplash.com/photo-1551909496-d9d4a69d4ecd?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1100&q=80",
	});

	const product5 = await Product.create({
		name: "Taylor Acoustic Guitar",
		price: 1000,
		description:
			"A Taylor guitar will last you a lifetime. This guitar was created in the late 80's and has been put to work ever since. Only moderate wear and aged mahogany makes this a deal of a lifetime. ",
		rating: 5,
		type: "Acoustic",
		imageLink:
			"https://images.unsplash.com/photo-1583255670343-a7a92d53d6e7?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1100&q=80",
	});

	const cartItem1 = await CartItem.create({
		UserId: 1,
		ProductId: 1,
	});
};

module.exports = { genereateDummyData };
