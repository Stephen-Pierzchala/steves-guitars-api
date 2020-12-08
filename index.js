const express = require("express");
const dotenv = require("dotenv").config();
const app = express();
const port = process.env.PORT || 8080;
console.log(process.env.DB_HOST);

//define routers
const authRouter = require("./routers/AuthRouter");

//declare api routes
app.get("/", (req, res) => {
	res.send("Hello World!");
});
app.use("/api/v1/test", (req, res, next) => {
	res.send({ status: "OK" });
});
app.use("/api/v1/auth", authRouter);

app.listen(port, () => {
	console.log(`WELCOME :: STEVE'S SERVER LISTENING AT PORT ${port}`);
});
