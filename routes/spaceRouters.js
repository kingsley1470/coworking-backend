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
userRoute.route('/location').post(getSpaceByLocation);

module.exports = userRoute;