const router = require("express").Router();
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

const Parkinglot = require("../models/Parkinglot");
//const Image = require("../models/Image");

const bcrypt = require("bcryptjs");
const saltRounds = 10;
const someOtherPlaintextPassword = "not_bacon";

//User.hasMany(Image, { foreignKey: "imageOwnerId" });
//mage.belongsTo(User, { foreignKey: "imageOwnerId" });

router.get("/", (req, res) => {
	//SELECT * FROM users
	Parkinglot.findAll({
		attributes: { exclude: ["password"] },
		/*include: [
      {
        model: Image,
        where: { imageReferenceId: 4 },
        required: false,
      },
    ],*/
	})
		.then((response) => {
			res.json(response);
		})
		.catch((error) => console.log(error));
});
router.post("/findparkinglot", (req, res) => {
	let { value } = req.body;

	Parkinglot.findAll({
		where: {
			providerId: {
				[Op.like]: value,
			},
		},
	})
		.then((_res) => {
			res.json(_res);
		})
		.catch((error) => console.log(error));
});

router.post("/addparkinglot", (req, res) => {
	let { id } = req.query;
	let {
		providerId,
		parkinglotName,
		parkinglotAddress,
		parkinglotPicture,
		parkingStatus,
		contactNumber,
		reservedSlots,
		totalSlots,
		parkingRate,
		vehicleType,
	} = req.body;
	console.log("addparkinglot", req.body);

	Parkinglot.create({
		providerId,
		parkinglotName,
		parkinglotAddress,
		parkinglotPicture,
		parkingStatus,
		contactNumber,
		reservedSlots,
		totalSlots,
		parkingRate,
		vehicleType,
	})
		.then((_res) => {
			res.json(_res);
			//console.log(_res)
		})
		.catch((error) => console.log(error));
});

router.post("/update_parkinglot", (req, res) => {
	let {
		id,
		providerId,
		parkinglotName,
		parkinglotAddress,
		parkinglotPicture,
		parkingStatus,
		contactNumber,
		reservedSlots,
		totalSlots,
		parkingRate,
		vehicleType,
	} = req.body;

	Parkinglot.update(
		{
			providerId,
			parkinglotName,
			parkinglotAddress,
			parkinglotPicture,
			parkingStatus,
			contactNumber,
			reservedSlots,
			totalSlots,
			parkingRate,
			vehicleType,
		},
		{ where: { id } }
	)
		.then((_res) => {
			res.json(_res);
		})
		.catch((error) => console.log(error));
});

router.delete("/delete_parkinglot", (req, res) => {
	let { id } = req.query;

	Parkinglot.destroy({ where: { id } })
		.then((response) => {
			res.json({ success: true, msg: "Succefully deleted Parking Lot" });
		})
		.catch((error) => console.log(error));
});

module.exports = router;
