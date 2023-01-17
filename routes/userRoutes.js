const express = require('express');
const userRoute = express.Router();

const {
    registerUser,
    loginUser,
    getAllUsers,
    getOneUser,
    saveEnquiry
  } = require('../controllers/userControllers');

const { verifyToken } = require('../middlewares/verifyToken.js');

userRoute.route('/').get(getAllUsers);
userRoute.route('/login').post(loginUser);
userRoute.route('/register').post(registerUser);
userRoute.route('/auth').post(verifyToken, getOneUser);
userRoute.route('/get-user').post(getOneUser);



module.exports = userRoute;