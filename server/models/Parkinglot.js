const Sequelize = require("sequelize");
const db = require("../database/database");

const Parkinglot = db.define("parkinglots", {
	id: {
		type: Sequelize.INTEGER,
		primaryKey: true,
		autoIncrement: true,
		allowNull: false,
	},
	providerId: {
		type: Sequelize.INTEGER,

		allowNull: false,
	},

	parkinglotName: {
		type: Sequelize.STRING,
		allowNull: true,
	},

	parkinglotAddress: {
		type: Sequelize.STRING,
		allowNull: true,
	},
	parkinglotPicture: {
		type: Sequelize.STRING,
		allowNull: true,
	},
	parkinglotStatus: {
		type: Sequelize.INTEGER,
		allowNull: true,
	},

	contactNumber: {
		type: Sequelize.STRING,
		allowNull: true,
	},
	reservedSlots: {
		type: Sequelize.INTEGER,
		allowNull: true,
	},
	totalSlots: {
		type: Sequelize.INTEGER,
		allowNull: true,
	},
	parkingRate: {
		type: Sequelize.INTEGER,
		allowNull: true,
	},
	vehicleType: {
		type: Sequelize.INTEGER,
		allowNull: true,
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

module.exports = Parkinglot;
