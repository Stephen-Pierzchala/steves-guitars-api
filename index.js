const express = require("express");
const dotenv = require("dotenv").config();

const app = express();
const port = process.env.PORT || 8080;

console.log(process.env.DB_HOST);

app.get("/", (req, res) => {
	res.send("Hello World!");
});

app.use("/api/v1/test", (req, res, next) => {
	res.send({ status: "OK" });
});

app.listen(port, () => {
	console.log(`WELCOME :: SERVER LISTENING AT PORT ${port}`);
});
