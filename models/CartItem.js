const { DataTypes } = require("sequelize");
const sequelize = require("../database/db");

const User = require("./User");
const Product = require("./Product");

const CartItem = sequelize.define("CartItem", {}, {});

User.hasMany(CartItem, {
	foreignKey: "id",
});
CartItem.belongsTo(User);

Product.hasMany(CartItem, {
	foreignKey: "id",
});
CartItem.belongsTo(Product);

module.exports = { CartItem };
