const express = require('express');
const BookingRoute = express.Router();

const {
   newBooking,
   getAllBooking,
   bookingByUserId
  } = require('../controllers/bookingControllers');



  BookingRoute.route('/').get(getAllBooking).post(newBooking);
  BookingRoute.route('/prev-bookings').post(bookingByUserId)


module.exports = BookingRoute;