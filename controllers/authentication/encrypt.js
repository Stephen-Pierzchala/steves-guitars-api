//This file handles hashing for passwords in the database.
const bcrypt = require("bcrypt");
const saltRounds = 2;

const hashPassword = async (password) => {
	const hashed = await bcrypt.hash(password, saltRounds);
	console.log(password, "=>", hashed);
	return hashed;
};

const checkPassword = async (inputPass, hashedPass) => {
	return await bcrypt.compare(inputPass, hashedPass);
};

module.exports = { hashPassword, checkPassword };
