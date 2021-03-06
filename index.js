// Imports
const express = require("express");
const dotenv = require("dotenv").config();
const port = process.env.PORT || 8080;
const bodyParser = require("body-parser");
const authTool = require("./controllers/authentication/auth");

const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

const sequelize = require("./database/db");
//test connection to database
sequelize
	.authenticate()
	.then(() => {
		console.log("Connected to database!");
	})
	.catch((err) => {
		console.log("Unable to connect to the database: \n", err);
		process.exit(-1);
	});

//declare api routes
app.get("/", (req, res) => {
	res.send("Hello World!");
});
app.use("/api/v1/test", (req, res, next) => {
	res.send({ status: "OK" });
});

app.post("/api/v1/tokenTest", authTool.validateToken, (req, res, next) => {
	res.send({ status: "this is protected!" });
});

//Authentication routes (Login/Register)
const authRouter = require("./routers/authRouter");
app.use("/api/v1/auth", authRouter);

//Product routes (CRUD)
const productRouter = require("./routers/productRouter");
app.use("/api/v1/products", productRouter);

//Cart Routes (Add/remove from cart)
const cartRouter = require("./routers/cartRouter");
app.use("/api/v1/cart", cartRouter);

//ensure that the models are in sync with the actual postgres DB
sequelize
	.sync({
		force: process.env.DB_FORCE == "true",
		alter: process.env.DB_ALTER == "true",
	})
	.then(() => {
		console.log("All models were synchronized successfully.\n");
		if (process.env.GENERATE_DATA == "true") {
			const dataGenerator = require("./database/generateData");
			dataGenerator.genereateDummyData().then(() => {
				console.log("...done.");
			});
		}
	});

app.listen(port, () => {
	console.log(
		`WELCOME :: STEVE'S GUITAR SHOP API SERVER LISTENING AT PORT ${port}`
	);
});
