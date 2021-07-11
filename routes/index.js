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

// GET request for deleting an item
router.get('/items/:id/delete', itemController.deleteGet);

// POST request for deleting an item
router.post('/items/:id/delete', itemController.deletePost);

// GET request for updating an item
router.get('/items/:id/update', itemController.updateGet);

// POST request for updating an item
router.post('/items/:id/update', itemController.updatePost);

// GET items list
router.get('/items', itemController.list);

// GET item details
router.get('/items/:id', itemController.details);


/** CATEGORY ROUTES **/

// GET request for creating a category
router.get('/categories/create', categoryController.createGet);

// POST request for creating a category
router.post('/categories/create', categoryController.createPost);

// GET request for deleting a category
router.get('/categories/:id/delete', categoryController.deleteGet);

// POST request for deleting a category
router.post('/categories/:id/delete', categoryController.deletePost);

// GET request for updating a category
router.get('/categories/:id/update', categoryController.updateGet);

// POST request for updating a category
router.post('/categories/:id/update', categoryController.updatePost);

// GET categories list
router.get('/categories', categoryController.list);

// GET category details
router.get('/categories/:id', categoryController.details);




module.exports = router;
