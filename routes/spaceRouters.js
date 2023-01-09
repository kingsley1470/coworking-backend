const express = require('express');
const userRoute = express.Router();

const {
    createSpace,
    getAllSpaces,
    getSpaceById,
    getSpaceByLocation
  } = require('../controllers/spaceContollers');



userRoute.route('/').get(getAllSpaces).post(createSpace);
userRoute.route('/single-space').get(getSpaceById);
userRoute.route('/spaces-by-location').get(getSpaceByLocation);

module.exports = userRoute;