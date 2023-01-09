//const pool = require('../DB/dbConnection.js');
const spaces=require('../SpaceData.json');



const getAllSpaces = async (req, res) => {
	// try {
	// 	console.log("pool connected");
	// 	const { rows } = await pool.query('SELECT * FROM Spaces;');
	// 	pool
	// 		.connect()
	// 		.then(() => {
	// 			pool.query('SELECT * FROM Spaces;')
	// 				.then(response => console.log(response.rows))
	// 				.catch(err => console.log("error inside pool", err))
	// 		})
	// } catch (error) {
	// 	console.log("ERRRRRR  -- ", error.message);
	// }
	return res.send(spaces);
};


//adding new space
const createSpace = async (req, res) => {
	try {
		console.log("inside createSpace ")
		const { title, area, ownerEmail, ownerPhone, costperDay, maxPeople, description, address,city,state, zip,country,stars } = req.body;
		if (!title || !area || !costperDay || !address ||!state ||!zip)
			return res.status(400).send('Please provide all necessery fields');

		const checkSpace = await pool.query(`SELECT * FROM Spaces WHERE OwnerEmail=$1;`, [ownerEmail]);
	
	if (checkSpace.rowCount >= 1) return res.status(400).send('space already exist');

		pool
			.connect()
			.then(() => {
				pool.query(`INSERT INTO Spaces(
					title, area, ownerEmail, ownerPhone, costperDay, maxPeople, description, address,city,state, zip,country,stars,availability)
					VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9);`, [title, area, ownerEmail, ownerPhone, costperDay, maxPeople, description, address,city,state, zip,country,stars,"true"])
					.then(response => {
					    return res.status(201).send(Success);
					})
					.catch((err) => {
						console.log(err)
					});
			})
	} catch (error) {
		res.status(500).send(error.message);
	}
};


const getSpaceById = async (req, res) => {
	try {
		//const space = await pool.query(`SELECT * FROM Spaces WHERE SpaceId=$1;`, [req.id]);
		const space = spaces.find(space => space.id===req.id);
		if(!space) return res.send("not match found")
		return res.json(space);
	} catch (error) {
		res.status(500).send(error.message);
	}
};


//selecting spaces according to location 
const getSpaceByLocation = async (req, res) => {
	try {
		console.log(req.location)
		const space = spaces.filter(space => space.state.includes(req.location)||space.city.includes(req.location));
		//const space = await pool.query(`SELECT * FROM Spaces WHERE state=$1;`, [req.state]);
		return res.json(space);
	} catch (error) {
		res.status(500).send(error.message);
	}
};


module.exports = { getAllSpaces, createSpace, getSpaceById, getSpaceByLocation};