const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CategorySchema = new Schema({
    name: { type: String, required: true },
    description: { type: String }
});

// Virtual for this category URL
CategorySchema
    .virtual('url')
    .get(function () {
        return `inventory/category/${this._id}`;
    });

// Export model
module.exports = mongoose.model('Category', CategorySchema);