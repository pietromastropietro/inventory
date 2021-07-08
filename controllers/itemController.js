const Item = require('../models/item');

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
    res.send('CREATE ITEM GET - NOT IMPLEMENTED YET');
};

exports.createPost = async (req, res, next) => {
    res.send('CREATE ITEM POST - NOT IMPLEMENTED YET');
}