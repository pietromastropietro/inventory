const Item = require('../models/item');

exports.list = async (req, res, next) => {
    try {
        const itemList = await Item.find();

        return itemList;
    } catch (err) {
        return next(err)
    }
};