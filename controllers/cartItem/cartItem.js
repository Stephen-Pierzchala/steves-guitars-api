const sequelize = require("../../database/db");

const addToCart = async (req, res) => {
	res.json({ status: "called AddToCart" });
};

const removeFromCart = async (req, res) => {
	res.json({ status: "called RemoveFromCart" });
};

module.exports = { addToCart, removeFromCart };
