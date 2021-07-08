const Category = require('../models/category');
const Item = require('../models/item');

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