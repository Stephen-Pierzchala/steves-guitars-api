const Sequelize = require("sequelize");
const dotenv = require("dotenv").config("../.env");

module.exports = new Sequelize(process.env.DB_CONNECTION_STRING);
