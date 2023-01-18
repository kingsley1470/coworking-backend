//const users=require('../UserData.json')
const bcrypt = require('bcrypt');
const { json } = require('express');
const jwt = require('jsonwebtoken');
const pool = require('../DB/dbConnection.js');


const getAllUsers = async (req, res) => {
	try {
		console.log("pool connected inside all users");
		//const { rows } = await pool.query('SELECT * FROM Users;');
		pool
			.connect()
			.then(() => {
				pool.query('SELECT * FROM Users;')
					.then(response =>res.status(200).send(response.rows))
					.catch(err => console.log(err))
			})
	} catch (error) {
		console.log("ERR  -- ", error.message);
	}
};
//console.log("all users ", getAllUsers());


const registerUser = async (req, res) => {
	try {
		console.log(req.body)
		const { firstName, lastName, email, password, phone, address, city, country, zip , profilePicUrl } = req.body;

	
		if (!firstName || !lastName || !email || !password)
			return res.status(400).send('Please provide all necessery fields');

		const checkUser = await pool.query(`SELECT * FROM Users WHERE email=$1;`, [email]);
		
		if (checkUser.rowCount >= 1) return res.status(400).send('User already exist');

		const hash = await bcrypt.hash(password, 5);

		pool
			.connect()
			.then(() => {
				pool.query(`INSERT INTO Users(
				firstName, lastName, email, password, phonenumber, address, city, country, zip, profilepicurl)
					VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10);`, [firstName, lastName, email, hash, phone, address, city, country, zip ,profilePicUrl])
					.then(response => {
						pool.query(`SELECT userid FROM Users WHERE email=$1;`, [email])
							.then(response => {
								const token = jwt.sign(Object.values(response.rows)[0].userid, process.env.JWT_SECRET);
	                            return res.status(201).json({userid:(response.rows)[0].userid,token:token,user:response.rows[0]});
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
		console.log(req.body)
       
		if (!email || !password)
			return res.status(400).send('Please provide all fields');

		const checkUser = await pool.query(`SELECT * FROM Users WHERE email=$1;`, [email]);
         
		if (checkUser.rowCount ===0) return res.status(400).send('User does not exist');
	  
		const pwdMatch = await bcrypt.compare(password, Object.values(checkUser.rows)[0].password);

		if (!pwdMatch) return res.status(400).send('Incorrect password');

		const token = jwt.sign({ id: Object.values(checkUser.rows)[0].userid }, process.env.JWT_SECRET);
	
		//res.write(JSON.stringify(checkUser.rows));
		//res.write((checkUser.rows).toString());
		const jsonRes={
			"user":checkUser.rows[0] ,
			"token":token,
			"userid":checkUser.rows[0].userid
		}
		 res.status(200).send(JSON.stringify(jsonRes));
		// res.end();
		 return ;

	} catch (error) {
		res.status(500).send(error.message);
	}
};

const getOneUser = async (req, res) => {
	try {
		console.log("user id from body ",req.body.userId)
		const userId =req.body.userId;
		//const user = await pool.query(`SELECT * FROM Users WHERE email=$1;`, [userId]);
		const user = await pool.query(`SELECT * FROM Users WHERE userid=$1;`, [userId]);
		console.log(user.rows[0])
		return res.json(user.rows[0]);
	} catch (error) {
		res.status(500).send(error.message);
	}
};

const changePass = async(req,res)=>{
	try {
		console.log("new password",req.body)

		const newPass =req.body.newPassword;
		const userId=req.body.userId;

		//const user = await pool.query(`SELECT * FROM Users WHERE email=$1;`, [userId]);
		 // for checking entered pass is correct 
		// const pwdMatch = await bcrypt.compare(password, Object.values(checkUser.rows)[0].password);

		// if (!pwdMatch) return res.status(400).send('Incorrect password');

	
		const hash = await bcrypt.hash(newPass, 5);

		const {rowCount} = await pool.query(`Update Users SET password=$1 WHERE userid=$2;`, [hash,userId]);
		if(!rowCount) return res.status(500).send("failed !");
		return res.status(200).send("Success");
	
	} catch (error) {
		res.status(500).send(error.message);
	}
}

const updateProfile = async(req,res)=>{
	try {
		console.log("inside update ",req.body)

		const user =req.body.user;
        const userId=req.body.userId;
        const profilepicurl=req.body.profilepicurl;

		const {rowCount} = await pool.query(`Update Users SET firstname=$1,lastname=$2,phonenumber=$3,address=$4,city=$5,country=$6,zip=$7,profilepicurl=$8 WHERE userid=$9;`, 
		[user.firstname,user.lastname,user.phonenumber,user.address,user.city,user.country,user.zip,profilepicurl,userId]
		);
		if(!rowCount) return res.status(500).send("failed !")
		 return res.status(200).send("Success");
	} catch (error) {
		res.status(500).send(error.message);
	}
}


module.exports = { registerUser, loginUser, getOneUser,getAllUsers,changePass,updateProfile };