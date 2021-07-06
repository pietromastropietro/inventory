const Item = require('../models/item');

exports.index = /*async*/ (req, res, next) => {
    try {
        // const items = await Item.countDocuments({})

        // temp
        const items = 5;
        
        res.render('index', { title: 'Inventory Home', data: items });
    } catch (err) {
        return next(err)
    }
};