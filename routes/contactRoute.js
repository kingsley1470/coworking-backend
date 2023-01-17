const express = require('express');
const contactRoute = express.Router();

const {
   newContactForm
  } = require('../controllers/contactController');



  contactRoute.route('/').post(newContactForm);


module.exports = contactRoute;