const pool = require('../DB/dbConnection.js');
const spaces = require('../SpaceData.json');



const getAllSpaces = async (req, res) => {
	try {
		console.log("pool connected");
		const { rows } = await pool.query('SELECT * FROM Spaces;');

		if(rows.length===0) return res.status(404).send("No space found !")
		return res.send(rows);
	} catch (error) {
		console.log("ERRRRRR  -- ", error.message);
	}
	//return res.send(spaces);
};


//adding new space
const createSpace = async (req, res) => {
	// try {
		console.log("inside createSpace ", req.body)
		const { title, area, ownerEmail, ownerName, costperDay, maxPeople, description, address, city, state, zip, country, spacePicUrl,stars } = req.body;
		if (!title || !area || !costperDay || !address || !state || !zip || !ownerEmail)
			return res.status(400).send('Please provide all necessery fields');

		// const checkSpace = await pool.query(`SELECT * FROM Spaces WHERE OwnerEmail=$1;`, [ownerEmail]);

		// if (checkSpace.rowCount >= 1) return res.status(400).send('space already exist');

		// pool
		// .connect()
		// .then(() => {
			pool.query(`INSERT INTO Spaces(
				title,area,ownerName, ownerEmail, costperDay, maxPeople, description, address,city,state, zip,country,is_available,imgUrl,openhours_from,openhours_to,opendays_from,opendays_to)
				VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18);`, [title, area,ownerName, ownerEmail, costperDay, maxPeople, description, address,city,state, zip,country,"true",spacePicUrl,"07","19","Monday "," Saturday"])
				.then(response => {
					console.log(response);
					return res.status(201).send('Success');
				})
				.catch((err) => {
					console.log(err)
				});
		// })
	
	
	// 	const { rowCount } = pool.query(`INSERT INTO Spaces(
	// 				title, area, ownerEmail, ownerPhone, costperDay, maxPeople, description, address,city,state, zip,country,stars,availability)
	// 				VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9);`, [title, area, ownerEmail, ownerPhone, costperDay, maxPeople, description, address, city, state, zip, country, stars, "true"])
          
		
	// 				if (rowCount===0) return res.status(400).send("not updated !");
	// 				return res.status(200). send("200  Success !");
         

	// } catch (error) {
	// 	res.status(500).send(error.message);
	// }
	
};


const getSpaceById = async (req, res) => {
	try {
		//const space = await pool.query(`SELECT * FROM Spaces WHERE SpaceId=$1;`, [req.body.id]);
		const space = spaces.find(space => space.id === req.id);
		if (!space) return res.send("not match found")
		return res.json(space);
	} catch (error) {
		res.status(500).send(error.message);
	}
};


//selecting spaces according to location 
const getSpaceByLocation = async (req, res) => {
	try {
		const { searchKey } = req.body;

		const space = spaces.filter(space => space.city.toLowerCase().includes(searchKey) || (space.address.toLowerCase()).includes(searchKey));
		//const space = await pool.query(`SELECT * FROM Spaces WHERE state=$1 OR city=$1;`, [req.state]);
		console.log(space, space.length)
		if (space.length.toString() === '0') {
			return res.status(204).send("no space found! ");
		}
		else return res.status(200).json(space);
	} catch (error) {
		res.status(500).send(error.message);
	}
};


const getSpaceId = async (req, res) => {
	try {
		console.log("inside getspace", req.body)
		const space = await pool.query(`SELECT spaceId FROM Spaces WHERE ownerEmail=$1;`, [req.body.imgUrl]);

		if (!space) return res.status(404).send("not match found")
		return res.json(space.rows);
	} catch (error) {
		res.status(500).send(error.message);
	}
};




module.exports = { getAllSpaces, createSpace, getSpaceById, getSpaceByLocation, getSpaceId };