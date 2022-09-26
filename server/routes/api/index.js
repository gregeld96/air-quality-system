const route = require('express').Router();
const DataRoutes = require('./data');
const ExportRoutes = require('./export');

route.use('/datas', DataRoutes);
route.use('/exports', ExportRoutes);

module.exports = route;