const spaces=require('../SpaceData.json');
const users=require('../UserData.json');
const pool = require('../DB/dbConnection.js');


//adding new space
const newBooking = async (req, res) => {
	try {
		console.log("inside newBooking ",req.body)
		const { spaceId,userId,fromDate,toDate,fromTime,toTime } = req.body;
		if (!spaceId || !userId || !fromDate || !toDate )
			return res.status(404).send('Please provide all necessery fields');

			const {rowCount}=await	pool.query(`INSERT INTO Bookings(
					spaceId,userId,fromDate,toDate,fromTime,toTime)
					VALUES ($1,$2,$3,$4,$5,$6);`, [spaceId,userId,fromDate,toDate,fromTime,toTime]);
					
					if (rowCount===0) return res.status(400).send("not updated !");
					return res.status(200). send("200  Updated !");
			}
          catch (error) {
	  	res.status(500).send(error.message);
	}
};

const bookingByUserId =async (req,res)=>{
	 try {
		 	console.log("inside bookingBy user id ", req.body.userid);
			const userId=req.body.userid;
		 	//const { rows,rowCount } = 
			const {rows,rowCount}=await pool.query('SELECT spaceId,fromdate,todate FROM Bookings WHERE userId=$1;',[userId]);
			if (rowCount===0) return res.status(404).send("no booking yet !");	
			return res.status(200). send(rows);
			}
		  catch (error) {
		 	console.log("ERRRRRR  -- ", error.message);
		 }
}

const getAllBooking = async (req, res) => {
	// try {
	// 	console.log("pool connected");
	// 	const { rows } = await pool.query('SELECT * FROM Bookings;');
	// 	pool
	// 		.connect()
	// 		.then(() => {
	// 			pool.query('SELECT * FROM Booking;')
	// 				.then(response => console.log(response.rows))
	// 				.catch(err => console.log("error inside pool", err))
	// 		})
	// } catch (error) {
	// 	console.log("ERRRRRR  -- ", error.message);
	// }
	//return res.send(Booking);
};



module.exports = { newBooking,getAllBooking,bookingByUserId};