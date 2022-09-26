const route = require('express').Router();
const ApiRoutes = require('./api');

route.use('/api', ApiRoutes)

module.exports = route;