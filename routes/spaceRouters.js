const express = require('express');
const spaceRoute = express.Router();

const {
    createSpace,
    getAllSpaces,
    getSpaceById,
    getSpaceByLocation,
    getSpaceId
  } = require('../controllers/spaceContollers');



  spaceRoute.route('/').get(getAllSpaces).post(createSpace);
  spaceRoute.route('/single-space').get(getSpaceById);
  spaceRoute.route('/location').post(getSpaceByLocation);
  spaceRoute.route('/space-id').get(getSpaceId);


module.exports = spaceRoute;