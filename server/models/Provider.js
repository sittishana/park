const Sequelize = require("sequelize");
const db = require("../database/database");

const Provider = db.define("providers", {
	id: {
		type: Sequelize.INTEGER,
		primaryKey: true,
		autoIncrement: true,
		allowNull: false,
	},
	userId: {
		type: Sequelize.INTEGER,

		allowNull: false,
	},

	email: {
		type: Sequelize.STRING,
		allowNull: false,
		unique: true,
	},

	address: {
		type: Sequelize.STRING,
		allowNull: false,
	},

	contactNumber: {
		type: Sequelize.STRING,
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

module.exports = Provider;
