const express = require('express');
const router = express.Router();

// Require controller modules
const indexController = require ('../controllers/indexController');
const itemController = require('../controllers/itemController');
const categoryController = require('../controllers/categoryController');

/* GET home page. */
router.get('/', indexController.index);

router.get('/items', itemController.list);

router.get('/categories', categoryController.list);

module.exports = router;
