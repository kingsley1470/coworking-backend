const express = require('express');
const sendMailRoute = express.Router();

const {
   newMail
  } = require('../controllers/mailSendingController');



  sendMailRoute.route('/').post(newMail);


module.exports = sendMailRoute;