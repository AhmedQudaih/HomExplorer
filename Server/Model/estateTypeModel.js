const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//auction or rent or sell
const estateTypeSchema = new Schema ({
        name: { type: String, required: true },
});

const estateTypeModel = mongoose.model('estateType', estateTypeSchema)
exports.estateTypeModel = estateTypeModel;
exports.estateTypeSchema = estateTypeSchema;
