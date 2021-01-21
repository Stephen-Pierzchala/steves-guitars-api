// Imports
const express = require("express");
const dotenv = require("dotenv").config();
const { Sequelize } = require("sequelize");
const app = express();

const port = process.env.PORT || 8080;
console.log(process.env.DB_CONNECTION_STRING);

//test connection to database
const sequelize = new Sequelize(process.env.DB_CONNECTION_STRING); // Example for postgres
const testDB = async () => {
	try {
		await sequelize.authenticate();
		console.log("Connected to database!");
	} catch (error) {
		console.error("Unable to connect to the database:", error);
	}
};
testDB();

//declare api routes
app.get("/", (req, res) => {
	res.send("Hello World!");
});
app.use("/api/v1/test", (req, res, next) => {
	res.send({ status: "OK" });
});

//Authentication routes (Login/Register)
const authRouter = require("./routers/authRouter");
app.use("/api/v1/auth", authRouter);

//Product routes (CRUD)
const productRouter = require("./routers/productRouter");
app.use("/api/v1/products", productRouter);

app.listen(port, () => {
	console.log(`WELCOME :: STEVE'S SERVER LISTENING AT PORT ${port}`);
});
