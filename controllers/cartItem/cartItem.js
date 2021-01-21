const sequelize = require("../../database/db");
const cartItem = require("../../models/CartItem");

const addToCart = async (req, res) => {
	res.json({ status: "called AddToCart" });
};

const removeFromCart = async (req, res) => {
	res.json({ status: "called RemoveFromCart" });
};

module.exports = { addToCart, removeFromCart };
