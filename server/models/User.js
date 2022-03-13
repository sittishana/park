const Sequelize = require("sequelize");
const db = require("../database/database");

const User = db.define("users", {
	id: {
		type: Sequelize.INTEGER,
		primaryKey: true,
		autoIncrement: true,
		allowNull: false,
	},

	email: {
		type: Sequelize.STRING,
		allowNull: false,
		unique: true,
	},

	firstName: {
		type: Sequelize.STRING,
		allowNull: false,
	},

	lastName: {
		type: Sequelize.STRING,
		allowNull: false,
	},

	username: {
		type: Sequelize.STRING,
		allowNull: false,
	},

	contactNumber: {
		type: Sequelize.STRING,
		allowNull: false,
	},

	password: {
		type: Sequelize.STRING,
		allowNull: false,
	},

	profilePicture: {
		type: Sequelize.STRING,
		allowNull: false,
	},

	status: {
		type: Sequelize.INTEGER,
		allowNull: false,
	},
	userType: {
		type: Sequelize.INTEGER,
		allowNull: false,
	},
	providerStatus: {
		type: Sequelize.INTEGER,
		allowNull: false,
	},

	createdAt: {
		type: Sequelize.DATE,
		allowNull: false,
	},
	updatedAt: {
		type: Sequelize.DATE,
		allowNull: false,
	},
});

module.exports = User;
