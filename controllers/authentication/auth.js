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

	if (!email || !password || !confirmPassword) {
		res.send("Error: Please provide all input fields");
		return;
	} else if (password !== confirmPassword) {
		res.send("Error: passwords do not match");
		return;
	}

	const [user, created] = await User.findOrCreate({
		where: { email: email },
		defaults: { password: await passwordUtil.hashPassword(password) },
	});
	if (!created) {
		res.send("Email Already In Use.");
		return;
	} else {
		res.send("Success!");
		return;
	}
};

//Request an access token from the server
const logIn = async (req, res) => {
	const { email, password } = req.body;

	if (!email || !password)
		res.send("Error: Please provide email and password.");

	const user = await User.findOne({
		where: { email: email },
	});

	if (!user) res.send("Error: No User found with these credentials");
	if ((await passwordUtil.checkPassword(password, user.password)) == false) {
		res.send("Error: Invalid password");
		return;
	} else {
		res.send("Login Success!");
		return;
	}
};

//Request a new access token using a refresh token
const refresh = (username) => {
	console.log("refresh function called.");
	res.send("called refresh function");
};

//change the refresh token for a specific user
// -- This means that after the current access token expires user will be logged out automatically.
const logOut = () => {
	console.log("logout function called.");
};

module.exports = { logIn, refresh, register, logOut };
