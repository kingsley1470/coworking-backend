const express = require('express');
const spaceRoute = express.Router();

const {
    createSpace,
    getAllSpaces,
    getSpaceById,
    getSpaceByLocation
  } = require('../controllers/spaceContollers');



  spaceRoute.route('/').get(getAllSpaces).post(createSpace);
  spaceRoute.route('/single-space').get(getSpaceById);
  spaceRoute.route('/location').post(getSpaceByLocation);

module.exports = spaceRoute;