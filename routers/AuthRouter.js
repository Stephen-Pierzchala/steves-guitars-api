const express = require("express");
const router = express.Router();

const auth = require("../controllers/authentication/auth");

router.post("/login", auth.logIn);
router.get("/register", auth.register);

module.exports = router;
