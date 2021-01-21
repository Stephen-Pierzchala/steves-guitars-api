const Product = require("../../models/Product");

const createProduct = () => {};

const getProducts = async (req, res) => {
	try {
		const products = await Product.findAll({
			limit: 10,
		});
		res.json({ products: products });
	} catch (err) {
		res.json({ error: err });
	}
};

module.exports = { createProduct, getProducts };
