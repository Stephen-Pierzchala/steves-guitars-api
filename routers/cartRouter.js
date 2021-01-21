const express = require("express");
const router = express.Router();

const cartController = require("../controllers/authentication/auth");

router.get("", (req, res) => {
	res.json({ status: "Working!" });
});
router.post("/addToCart", cartController.addToCart);
router.post("/removeFromCart", cartController.removeFromCart);

module.exports = router;
