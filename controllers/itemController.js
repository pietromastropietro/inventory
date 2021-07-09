const Category = require('../models/category');
const Item = require('../models/item');

const { body, validationResult } = require('express-validator');

exports.list = async (req, res, next) => {
    try {
        const items = await Item.find();

        res.render('item_list', { items: items });
    } catch (err) {
        return next(err)
    }
};

exports.details = async (req, res, next) => {
    try {
        const item = await Item.findById(req.params.id).populate('category');

        res.render('item_details', { item: item });
    } catch (err) {
        return next(err);
    }
}

exports.createGet = async (req, res, next) => {
    try {
        const categories = await Category.find();

        res.render('item_form', { title: 'Create a new item', categories: categories });
    } catch (err) {
        return next(err);
    }
};

exports.createPost = [

    // Validate and sanitize fields.
    body('name', 'Name must not be empty.').trim().isLength({ min: 1 }).escape(),
    body('description', 'Description must not be empty.').trim().isLength({ min: 1 }).escape(),
    body('stockQty', 'Stock must not be empty.').trim().isLength({ min: 1 }).escape(),
    body('price', 'Price must not be empty').trim().isLength({ min: 1 }).escape(),
    body('category.*').escape(),

    async (req, res, next) => {
        // Extract the validation errors from a request.
        const errors = validationResult(req);

        // Create an Item object with escaped and trimmed data.
        const item = new Item({
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            stockQty: req.body.stockQty,
            category: req.body.category
        });

        if (!errors.isEmpty()) {
            // There are errors. Render form again with sanitized values/error messages.

            // Get all categories for form.
            try {
                const categories = await Category.find();

                res.render('item_form', { title: 'Create a new item', item: item, categories: categories, errors: errors.array() });
            } catch (err) {
                return next(err);
            }
            return;
        }

        // Data from form is valid. Save item.
        item.save((err) => {
            if (err) {
                return next(err);
            };
            //successful - redirect to new item record.
            res.redirect(item.url);
        });

    }
];
