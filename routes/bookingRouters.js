const express = require('express');
const BookingRoute = express.Router();

const {
   newBooking,
   getAllBooking
  } = require('../controllers/bookingControllers');



  BookingRoute.route('/').get(getAllBooking).post(newBooking);


module.exports = BookingRoute;