const Category = require('../models/category');
const Item = require('../models/item');

const { body, validationResult } = require('express-validator');

// Display list of all items.
exports.list = async (req, res, next) => {
    try {
        const items = await Item.find();

        res.render('item_list', { items: items });
    } catch (err) {
        return next(err)
    }
};

// Display detail page for a specific item.
exports.details = async (req, res, next) => {
    try {
        const item = await Item.findById(req.params.id).populate('category');

        res.render('item_details', { item: item });
    } catch (err) {
        return next(err);
    }
}

// Display item create form on GET.
exports.createGet = async (req, res, next) => {
    try {
        const categories = await Category.find();

        res.render('item_form', { title: 'Create a new item', categories: categories });
    } catch (err) {
        return next(err);
    }
};

// Handle item create on POST.
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
        // TODO should i remove the callback and use try/catch for consistency?
        item.save((err) => {
            if (err) {
                return next(err);
            };
            //successful - redirect to new item record.
            res.redirect(item.url);
        });

    }
];

// Display item delete form on GET.
exports.deleteGet = async (req, res, next) => {
    try {
        const item = await Item.findById(req.params.id)
        res.render('item_delete', { item: item });
    } catch (err) {
        return next(err)
    }
};

// Handle item delete on POST.
exports.deletePost = async (req, res, next) => {
    // TODO should i validate/sanitize the id?

    try {
        // Delete object and redirect to the list of items.
        await Item.findByIdAndRemove(req.params.id);

        res.redirect('/items');
    } catch (err) {
        return next(err)
    }
};

// Display item update form on GET.
exports.updateGet = async (req, res, next) => {
    try {
        const item = await Item.findById(req.params.id);
        const categories = await Category.find();

        res.render('item_form', { title: 'Update this item', item: item, categories: categories });
    } catch (err) {
        return next(err)
    }
};

// Handle item update on POST.
exports.updatePost = [

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
            category: req.body.category,
            _id: req.params.id
        });

        if (!errors.isEmpty()) {
            // There are errors. Render form again with sanitized values/error messages.

            // Get categories for form.
            try {
                const categories = await Category.find();

                res.render('item_form', { title: 'Update the item', item: item, categories: categories, errors: errors.array() });
            } catch (err) {
                return next(err);
            }
            return;
        }

        // Data from form is valid. Save item.
        // TODO should i remove the callback and use try/catch for consistency?
        Item.findByIdAndUpdate(req.params.id, item, {}, (err, updatedItem) => {
            if (err) {
                return next(err);
            };
            //successful - redirect to updated item record.
            res.redirect(updatedItem.url);
        });
    }
];
