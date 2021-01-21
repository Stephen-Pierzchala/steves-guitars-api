const express = require("express");
const router = express.Router();

const productController = require("../controllers/product/product");

router.get("", (req, res) => {
	res.status(400).json({ status: "ok!!" });
});
router.get("/getProducts", productController.getProducts);
router.post("/createProduct", productController.createProduct);

module.exports = router;
