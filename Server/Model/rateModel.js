const mongoose = require('mongoose');
const user = require("./userModel");
const estate = require("./estateModel");

const Schema = mongoose.Schema;

const rateSchema = new Schema ({
        userId: {  type:  Schema.Types.ObjectId, ref: 'user', required: true },
        estateId: {  type:  Schema.Types.ObjectId, ref: 'estate' , required: true },
        rate: { type: Number, required: true, min: 0, max: 5},
});

const rateModel = mongoose.model('rate', rateSchema)
exports.rateModel = rateModel;
exports.rateSchema = rateSchema;
