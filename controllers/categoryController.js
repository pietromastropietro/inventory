const Category = require('../models/category');
const Item = require('../models/item');

const { body, validationResult } = require('express-validator');

exports.list = async (req, res, next) => {
    try {
        const categories = await Category.find();

        res.render('category_list', { categories: categories });
    } catch (err) {
        return next(err);
    }
};

exports.details = async (req, res, next) => {
    try {
        const category = await Category.findById(req.params.id);
        const items = await Item.find({ category: req.params.id });

        res.render('category_details', { category: category, items: items });
    } catch (err) {
        return next(err);
    }
}

exports.createGet = (req, res, next) => {
    res.render('category_form', { title: 'Create a new category' });
};

exports.createPost = [

    // Validate and sanitize fields.
    body('name', 'Name must not be empty.').trim().isLength({ min: 1 }).escape(),
    body('description', 'Description must not be empty.').trim().isLength({ min: 1 }).escape(),

    async (req, res, next) => {
        // Extract the validation errors from a request.
        const errors = validationResult(req);

        // Create a Category object with escaped and trimmed data.
        const category = new Category({
            name: req.body.name,
            description: req.body.description,
        });

        if (!errors.isEmpty()) {
            // There are errors. Render form again with sanitized values/error messages.
            res.render('category_form', { title: 'Create a new category', category: category, errors: errors.array() });
            return;
        }

        // Data from form is valid. Save category.
        category.save((err) => {
            if (err) {
                return next(err);
            };
            //successful - redirect to new item record.
            res.redirect(category.url);
        });

    }
];