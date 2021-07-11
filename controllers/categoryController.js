const Category = require('../models/category');
const Item = require('../models/item');
const private = require('../private');

const { body, validationResult } = require('express-validator');

// Display list of all categories.
exports.list = async (req, res, next) => {
    try {
        const categories = await Category.find();

        res.render('category_list', { categories: categories });
    } catch (err) {
        return next(err);
    }
};

// Display detail page for a specific category.
exports.details = async (req, res, next) => {
    try {
        const category = await Category.findById(req.params.id);
        const items = await Item.find({ category: req.params.id });

        res.render('category_details', { category: category, items: items });
    } catch (err) {
        return next(err);
    }
}

// Display category create form on GET.
exports.createGet = (req, res, next) => {
    res.render('category_form', { title: 'Create a new category' });
};

// Handle category create on POST.
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
            description: req.body.description
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

// Display category delete form on GET.
exports.deleteGet = async (req, res, next) => {
    try {
        const category = await Category.findById(req.params.id)

        // Find items with this category.
        const categoryItems = await Item.find({ 'category': req.params.id })

        if (categoryItems.length > 0) {
            // Category has items, user must delete them first.
            res.render('category_delete', { category: category, items: categoryItems.length });
        } else {
            // Category has no items, render delete page.
            res.render('category_delete', { category: category });
        }
    } catch (err) {
        return next(err)
    }
};

// Handle category delete on POST.
exports.deletePost = async (req, res, next) => {
    // TODO should i validate/sanitize the id?

    try {
        // Delete object and redirect to the list of categories.
        await Category.findByIdAndRemove(req.params.id);

        res.redirect('/categories');
    } catch (err) {
        return next(err)
    }
};

// Display category update form on GET.
exports.updateGet = async (req, res, next) => {
    try {
        const category = await Category.findById(req.params.id);

        res.render('category_form', { title: 'Update this category', category: category });
    } catch (err) {
        return next(err)
    }
};

// Handle category update on POST.
exports.updatePost = [

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
            _id: req.params.id
        });

        if (!errors.isEmpty()) {
            // There are errors. Render form again with sanitized values/error messages.

            // Get categories for form.
            try {
                const category = await Category.findById(req.params.id);

                res.render('category_form', { title: 'Update this category', category: category });
            } catch (err) {
                return next(err);
            }
            return;
        }

        // Data from form is valid. Save category.
        // TODO should i remove the callback and use try/catch for consistency?
        Category.findByIdAndUpdate(req.params.id, category, {}, (err, updatedCategory) => {
            if (err) {
                return next(err);
            };
            //successful - redirect to updated category record.
            res.redirect(updatedCategory.url);
        });
    }
];
