const spaces=require('../SpaceData.json');
const users=require('../UserData.json');


//adding new space
const newBooking = async (req, res) => {
	try {
		console.log("inside newBooking ")
		const { spaceId,userId,fromDate,toDate,fromTime,toTime } = req.body;
		if (!spaceId || !userId || !fromDate || !toDate )
			return res.status(400).send('Please provide all necessery fields');

		//const checkSpace = await pool.query(`INSERT INTO Booking(spaceId,userId,fromDate,toDate,fromTime,toTime) VALUES(spaceId,userId,fromDate,toDate,fromTime,toTime);`);
	
		pool
			.connect()
			.then(() => {
				pool.query(`INSERT INTO Booking(
					spaceId,userId,fromDate,toDate,fromTime,toTime)
					VALUES ($1,$2,$3,$4,$5,$6);`, [spaceId,userId,fromDate,toDate,fromTime,toTime])
					.then(response => {
					    return res.status(201).send(Success);
					})
					.catch((err) => 
					{	
                        console.log(err)
                    });
					});
			}
          catch (error) {
		res.status(500).send(error.message);
	}
};



const getAllBooking = async (req, res) => {
	// try {
	// 	console.log("pool connected");
	// 	const { rows } = await pool.query('SELECT * FROM Booking;');
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

const getAllBookingById = async(req, res ) =>{

}

module.exports = { newBooking,getAllBooking};