const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categorySchema = new Schema ({
        name: { type: String, required: true },
});

const categoryModel = mongoose.model('category', categorySchema)
exports.categoryModel = categoryModel;
exports.categorySchema = categorySchema;
