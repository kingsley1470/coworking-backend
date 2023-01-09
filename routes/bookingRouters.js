const express = require('express');
const userRoute = express.Router();

const {
   newBooking,
   getAllBooking
  } = require('../controllers/bookingControllers');



userRoute.route('/').get(getAllBooking).post(newBooking);


module.exports = userRoute;