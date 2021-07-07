const Item = require('../models/item');
const itemController = require('./itemController');

exports.index = async (req, res, next) => {
    try {
        const items = await Item.countDocuments({})

        const list = await itemController.list();

        // temp
        // const items = 5;

        res.render('index', { title: 'Inventory Home', data: items, list: list });
    } catch (err) {
        return next(err)
    }
};

