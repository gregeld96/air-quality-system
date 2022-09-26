const route = require('express').Router();
const ExportController = require('../../modules/exports/controller');

route.get('/', ExportController.exportPdf);

module.exports = route;