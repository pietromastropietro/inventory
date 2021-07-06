const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ItemSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: Schema.ObjectId, ref: 'Category', required: true },
    price: { type: Number, required: true },
    stockQty: { type: Number, required: true },
});

// Virtual for this item URL
ItemSchema
    .virtual('url')
    // TODO try to change into arrow func
    .get(function () {
        return '/inventory/item/' + this._id
    });

// Export model
module.exports = mongoose.model('Item', ItemSchema);