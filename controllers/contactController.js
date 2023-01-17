const spaces=require('../SpaceData.json');
const users=require('../UserData.json');
const pool = require('../DB/dbConnection.js');


//adding new space
const newContactForm = async (req, res) => {
	try {
		console.log("inside new Contact  ",req.body)
		const { spaceId,userId,fromDate,toDate,fromTime,toTime } = req.body;
		if (!spaceId || !userId || !fromDate || !toDate )
			return res.status(404).send('Please provide all necessery fields');

			const {rowCount}=await	pool.query(`INSERT INTO Enquiryfoam(
					spaceId,userId,fromDate,toDate,fromTime,toTime)
					VALUES ($1,$2,$3,$4,$5,$6);`, [spaceId,userId,fromDate,toDate,fromTime,toTime]);
					
					if (rowCount===0) return res.status(400).send("not updated !");
					return res.status(200). send("200  Updated !");
			}
          catch (error) {
	  	res.status(500).send(error.message);
	}
};


module.exports = {newContactForm};