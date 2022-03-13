const router = require("express").Router();
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

const Provider = require("../models/Provider");
//const Image = require("../models/Image");

const bcrypt = require("bcryptjs");
const saltRounds = 10;
const someOtherPlaintextPassword = "not_bacon";

//User.hasMany(Image, { foreignKey: "imageOwnerId" });
//mage.belongsTo(User, { foreignKey: "imageOwnerId" });

router.get("/", (req, res) => {
	//SELECT * FROM users
	Provider.findAll({
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
router.post("/findprovider", (req, res) => {
	let { value } = req.body;

	Provider.findAll({
		where: {
			userId: {
				[Op.like]: value,
			},
		},
	})
		.then((_res) => {
			res.json(_res);
		})
		.catch((error) => console.log(error));
});

router.post("/register", (req, res) => {
	let { id } = req.query;
	let { contactNumber, email, address, userId } = req.body;
	console.log("register", req.body);

	Provider.create({
		contactNumber,
		email,
		address,
		userId,
	})
		.then((_res) => {
			res.json(_res);
			//console.log(_res)
		})
		.catch((error) => console.log(error));
});

router.post("/update_provider", (req, res) => {
	let { id, firstName, lastName, contactNumber, email, username } = req.body;

	Provider.update(
		{ firstName, lastName, contactNumber, email, username },
		{ where: { id } }
	)
		.then((_res) => {
			res.json(_res);
		})
		.catch((error) => console.log(error));
});

router.delete("/delete_provider", (req, res) => {
	let { id } = req.query;

	Provider.destroy({ where: { id } })
		.then((response) => {
			res.json({ success: true, msg: "Succefully deleted User" });
		})
		.catch((error) => console.log(error));
});

module.exports = router;
