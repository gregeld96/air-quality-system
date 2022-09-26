const route = require('express').Router();
const DataController = require('../../modules/data/controllers');

route.get('/', DataController.getData);
route.get('/category', DataController.getCategories);

module.exports = route;