const Item = require('../models/item');

exports.index = async (req, res, next) => {
    try {
        const items = await Item.countDocuments({})

        res.render('index', { title: 'Inventory Home', data: items });
    } catch (err) {
        return next(err)
    }
};

