const jwt = require("jsonwebtoken");
const User = require("../../models/User");
const passwordUtil = require("./encrypt");

//LOGIN
// The user logs in with a login API call.
// Server generates JWT Token and refresh_token
// Server sets a HttpOnly cookie with refresh_token. jwt_token and jwt_token_expiry are returned back to the client as a JSON payload.
// The jwt_token is stored in memory.
// A countdown to a future silent refresh is started based on jwt_token_expiry

//SILENT REFRESH
// Call /refresh_token endpoint
// Server will read httpOnly cookie and if it finds a valid refresh_token, then...
// ...the server returns a new jwt_token and jwt_token_expiry to the client and also sets a new refresh token cookie via  Set-Cookie header.

// const privateKeyTest = "somerandomkeyhere";
// const payload = { username: "epicmager64", password: "hunter2" };

// //verify that the username and pass are right first, and if so then create a token
// const token = jwt.sign(payload, privateKeyTest, { expiresIn: "2s" });

// console.log("\nTOKEN\n___________");
// console.log(token);

// const oldData = jwt.verify(token, privateKeyTest);
// console.log("\nOLD\n___________");
// console.log(oldData);
// // After 3s: verify signature (it will fail)
// setTimeout(() => {
// 	const data = jwt.verify(token, privateKeyTest);
// 	console.log("\nNEW\n___________");
// 	console.log(data);
// }, 3000);

//create an account
const register = async (req, res) => {
	const { email, password, confirmPassword } = req.body;

	if (!email) {
		res.status(400).json({
			email: true,
			errorText: "Please Provide An Email",
		});
		return;
	}
	if (!password) {
		res.status(400).json({
			password: true,
			errorText: "Please Provide A Password",
		});
		return;
	}
	if (!confirmPassword) {
		res.status(400).json({
			confirmPassword: true,
			errorText: "Please Provide A Cofirmed Password",
		});
		return;
	}
	if (password !== confirmPassword) {
		res.status(400).json({
			confirmPassword: true,
			password: true,
			errorText: "Please Ensure Passwords Match",
		});
		return;
	}

	const [user, created] = await User.findOrCreate({
		where: { email: email },
		defaults: { password: await passwordUtil.hashPassword(password) },
	});
	if (!created) {
		res.status(401).json({
			errorText: "Email is already in use.",
			email: true,
		});
		return;
	} else {
		res.status(200).json({ message: "Success! Redirect to Login Page." });
		return;
	}
};

//Request an access token from the server
const logIn = async (req, res) => {
	const { email, password } = req.body;

	// res.status(200).json({ success: false, errorText: "There was an error" });
	// return;

	if (!email) {
		res.status(400).json({
			email: true,
			errorText: "Please Provide An Email",
		});
	}
	if (!password) {
		res.status(400).json({
			password: true,
			errorText: "Please Provide An Email",
		});
	}

	const user = await User.findOne({
		where: { email: email },
	});

	if (!user) {
		res.status(401).json({
			errorText: "Error: No User found with these credentials",
			email: true,
			password: true,
		});
		return;
	} else if (
		(await passwordUtil.checkPassword(password, user.password)) == false
	) {
		res.status(401).json({
			errorText: "Error: Invalid password",
			password: true,
		});
		return;
	} else {
		const token = jwt.sign(
			{ email: email },
			process.env.ACCESS_TOKEN_SECRET,
			{ expiresIn: "30s" }
		);
		res.status(200).json({
			message: "Login Success!",
			token: token,
		});
		return;
	}
};

//Request a new access token using a refresh token
const refresh = (username) => {
	console.log("refresh function called.");
	res.send("called refresh function");
};

const validateToken = (res, res, next) => {};

module.exports = { logIn, refresh, register, validateToken };
