//const pool = require('../DB/dbConnection.js');
const spaces=require('../SpaceData.json');
const pool = require('../DB/dbConnection.js');



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
	
		const { title, area, ownerName,  costperDay, maxPeople, description, address,city,state, zip,country,spacePicUrl,ownerEmail } = req.body;
		if (!title || !area || !costperDay || !address ||!state ||!zip || !ownerEmail)
			return res.status(400).send('Please provide all necessery fields');

		const checkSpace = await pool.query(`SELECT * FROM Spaces WHERE OwnerEmail=$1;`, [ownerEmail]);
	
	//if (checkSpace.rowCount >= 1) return res.status(400).send('one user can add only one space');

		pool
			.connect()
			.then(() => {
				pool.query(`INSERT INTO Spaces(
					title,area,ownerName, ownerEmail, costperDay, maxPeople, description, address,city,state, zip,country,is_available,imgUrl)
					VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14);`, [title, area,ownerName, ownerEmail, costperDay, maxPeople, description, address,city,state, zip,country,"true",spacePicUrl])
					.then(response => {
						console.log(response);
					    return res.status(201).send('Success');
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
		const {searchKey} = req.body;

		const space = spaces.filter(space => space.city.toLowerCase().includes(searchKey)||(space.address.toLowerCase()).includes(searchKey));
		//const space = await pool.query(`SELECT * FROM Spaces WHERE state=$1 OR city=$1;`, [req.state]);
		console.log(space,space.length)
		if(space.length.toString()==='0') {
		 return res.status(204).send("no space found! ");
		}
		else return res.status(200).json(space);
	} catch (error) {
		res.status(500).send(error.message);
	}
};


module.exports = { getAllSpaces, createSpace, getSpaceById, getSpaceByLocation};