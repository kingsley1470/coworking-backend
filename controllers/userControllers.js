//const users=require('../UserData.json')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = require('../DB/dbConnection.js');




const getAllUsers = async (req, res) => {
	try {
		console.log("pool connected");
		//const { rows } = await pool.query('SELECT * FROM Users;');
		pool
			.connect()
			.then(() => {
				pool.query('SELECT * FROM Users;')
					.then(response => console.log(response.rows))
					.catch(err => console.log("error inside pool", err))
			})
	} catch (error) {
		console.log("ERRRRRR  -- ", error.message);
	}
};
//console.log("all users ", getAllUsers());


const registerUser = async (req, res) => {
	try {
		console.log("inside registration ");
		console.log(req.body)
		const { firstName, lastName, email, password, phone, address, city, country, zip } = req.body;
		if (!firstName || !lastName || !email || !password)
			return res.status(400).send('Please provide all necessery fields');

		const checkUser = await pool.query(`SELECT * FROM Users WHERE email=$1;`, [email]);
		
		if (checkUser.rowCount >= 1) return res.status(400).send('User already exist');

		const hash = await bcrypt.hash(password, 5);

		pool
			.connect()
			.then(() => {
				pool.query(`INSERT INTO Users(
				firstName, lastName, email, password, phonenumber, address, city, country, zip)
					VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9);`, [firstName, lastName, email, hash, phone, address, city, country, zip])
					.then(response => {
						pool.query(`SELECT userid  FROM Users WHERE email=$1;`, [email])
							.then(response => {
								const token = jwt.sign(Object.values(response.rows)[0].userid, process.env.JWT_SECRET);
	                            return res.status(201).json(token);
							}); //obj[Object.keys(obj)[0]]; 
						
					})
					.catch((err) => {
						console.log(err)
					});
			})
	} catch (error) {
		res.status(500).send(error.message);
	}
};


const loginUser = async (req, res) => {
	try {
		const { email, password } = req.body
       
		if (!email || !password)
			return res.status(400).send('Please provide all fields');

		const checkUser = await pool.query(`SELECT * FROM Users WHERE email=$1;`, [email]);
          console.log(" user password",Object.values(checkUser.rows)[0].password);
		if (!checkUser) return res.status(400).send('User does not exist');
		//  console.log(checkUser);
		const pwdMatch = await bcrypt.compare(password, Object.values(checkUser.rows)[0].password);
		
		if (!pwdMatch) return res.status(400).send('Incorrect password');

		const token = jwt.sign({ id: Object.values(checkUser.rows)[0].userid }, process.env.JWT_SECRET);
         // return res.status(200).send(token)
		return res.json(token);
	} catch (error) {
		res.status(500).send(error.message);
	}
};

const getOneUser = async (req, res) => {
	try {
		const user = await pool.query(`SELECT * FROM Users WHERE email=$1;`, [req.email]);
		return res.json(user);
	} catch (error) {
		res.status(500).send(error.message);
	}
};



module.exports = { registerUser, loginUser, getOneUser };