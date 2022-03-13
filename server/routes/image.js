const router = require("express").Router();
const Image = require("../models/Image");
const randomString = require("randomstring");
const path = require("path");
const fs = require("fs");
const sharp = require("sharp");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const jwt = require("jsonwebtoken");

router.get("/", (req, res) => {
	Image.findAll()
		.then((response) => {
			console.log(response);
			res.json(response);
		})
		.catch((error) => console.log(error));
});

router.post("/search_images", (req, res) => {
	let { userId, imageType } = req.body;
	Image.findAll({
		where: {
			[Op.and]: [
				{
					userId: {
						[Op.like]: userId,
					},
				},
				{
					imageType: {
						[Op.like]: imageType,
					},
				},
			],
		},
	})
		.then((_res) => {
			res.json(_res);
			console.log(res);
		})
		.catch((error) => console.log(error));
});

router.delete("/delete_Image", (req, res) => {
	let { id } = req.query;

	Image.destroy({ where: { id } })
		.then((response) => {
			res.json({ success: true, msg: "Succefully deleted user" });
		})
		.catch((error) => console.log(error));
});

router.post("/save_image", (req, res) => {
	console.log("save image to db");
	let { userId, imageType, imageSmall, imageMedium, imageLarge } = req.body;

	Image.create({ userId, imageType, imageSmall, imageMedium, imageLarge })
		.then((response) => {
			res.json(response);
		})
		.catch((error) => console.log(error));
});

//Uploading Images
router.post("/add_image", (req, res) => {
	console.log("info", req.body);
	let { userId, imageType } = req.body;

	if (req.files === null) {
		return res.status(400).json({ msg: "No image uploaded!" });
	}

	const file = req.files.file;
	const randomFileName = randomString.generate(15);
	const splitFile = file.name.split(".");
	let inputBuffer = Buffer.from(file.data, "base64");
	console.log("file data", file.data);
	try {
		sharp(file.data)
			.resize(1000, 445)
			.png({ compressionLevel: 9, adaptiveFiltering: true, force: true })
			.toFile(
				`${__dirname}/../public/images/${randomFileName}-lg.${splitFile[1]}`,
				(err, info) => {
					if (err) throw err;

					sharp(file.data)
						.resize(640, 320)
						.png({ compressionLevel: 9, adaptiveFiltering: true, force: true })
						.toFile(
							`${__dirname}/../public/images/${randomFileName}-md.${splitFile[1]}`,
							(err, info) => {
								if (err) throw err;
								sharp(file.data)
									.resize(200, 100)
									.png({
										compressionLevel: 9,
										adaptiveFiltering: true,
										force: true,
									})
									.toFile(
										`${__dirname}/../public/images/${randomFileName}-sm.${splitFile[1]}`,
										(err, info) => {
											if (err) throw err;
											console.log(info);
											const imageLarge = `${randomFileName}-lg.${splitFile[1]}`;
											const imageSmall = `${randomFileName}-sm.${splitFile[1]}`;
											const imageMedium = `${randomFileName}-md.${splitFile[1]}`;
											Image.create({
												userId,
												imageType,
												imageLarge,
												imageMedium,
												imageSmall,
											})
												.then((response) => {
													res.json(response);
												})
												.catch((error) => console.log(error));
										}
									);
							}
						);
				}
			);
	} catch (err) {
		console.log(err);
	}
});

function saveImageToDatabase() {
	Image.create({ userId, imageType, imageLarge, imageMedium, imageSmall })
		.then((response) => {
			res.json(response);
		})
		.catch((error) => console.log(error));
}

router.delete("/delete_folder_image", (req, res) => {
	let { fileName, fileId } = req.query;

	const imagePath = path.resolve("public", "images", fileName);

	Image.destroy({ where: { id: fileId } })
		.then((response) => {
			const splitFile = fileName.split("-");
			const imageName = splitFile[0];
			const fileExtension = splitFile[1].split(".")[1];
			console.log(splitFile);
			if (require("fs").existsSync(imagePath)) {
				fs.unlinkSync(`public/images/${imageName}-lg.${fileExtension}`);
				fs.unlinkSync(`public/images/${imageName}-md.${fileExtension}`);
				fs.unlinkSync(`public/images/${imageName}-sm.${fileExtension}`);
			} else {
				console.log("ERROR");
			}
			res.json({ success: true, msg: "Succefully deleted image" });
		})
		.catch((error) => console.log(error));
});

router.get("/:fileName", (req, res) => {
	let profilePicture = req.params.fileName;
	// console.log(req.params);
	const splitFile = profilePicture.split("-");
	const imageName = splitFile[0];
	const fileExtension = splitFile[1].split(".")[1];
	const imagePath = path.resolve("public", "images", `${profilePicture}`);
	console.log(imagePath);
	console.log(require("fs").existsSync(imagePath));
	if (require("fs").existsSync(imagePath)) {
		console.log(imagePath);
		res.sendFile(path.resolve("public", "images", `${imagePath}`));
	} else {
		console.log("ERROR");
	}
});

function validateToken(req, res, next) {
	// console.log(req.headers);
	let authHeader = req.headers["authorization"];

	if (!authHeader) return res.sendStatus(403);

	// console.log(authHeader);

	let token = authHeader.split(" ")[1];

	if (!token) return res.sendStatus(403);

	jwt.verify(
		token,
		process.env.PUBLIC_KEY,
		{ algorithms: ["HS256"] },
		(error, decode) => {
			console.log(error);
			if (error) return res.sendStatus(403);
			req.decode = decode;
			next();
		}
	);
}

module.exports = router;
