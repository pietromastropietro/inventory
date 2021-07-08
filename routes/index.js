const express = require('express');
const router = express.Router();

// Require controller modules
const indexController = require('../controllers/indexController');
const itemController = require('../controllers/itemController');
const categoryController = require('../controllers/categoryController');

// GET home page.
router.get('/', indexController.index);

/** ITEM ROUTES **/

// GET request for creating an item
router.get('/items/create', itemController.createGet);

// POST request for creating an item
router.post('/items/create', itemController.createPost);

// GET items list
router.get('/items', itemController.list);

// GET item details
router.get('/items/:id', itemController.details);


/** CATEGORY ROUTES **/

// GET categories list
router.get('/categories', categoryController.list);

// GET category details
router.get('/categories/:id', categoryController.details);




module.exports = router;
