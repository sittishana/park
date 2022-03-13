const Sequelize = require("sequelize");
const db = require("../database/database");

const Image = db.define("images", {
	id: {
		type: Sequelize.INTEGER,
		primaryKey: true,
		autoIncrement: true,
		allowNull: false,
	},

	imageSmall: {
		type: Sequelize.STRING,
		allowNull: false,
	},

	imageMedium: {
		type: Sequelize.STRING,
		allowNull: false,
	},

	imageLarge: {
		type: Sequelize.STRING,
		allowNull: false,
	},
	imageType: {
		type: Sequelize.INTEGER,
		allowNull: false,
	},
	userId: {
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

module.exports = Image;
