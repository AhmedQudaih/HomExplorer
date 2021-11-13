const mongoose = require('mongoose');
const user = require("./userModel");
const estate = require("./estateModel");

const Schema = mongoose.Schema;

const savedSchema = new Schema ({
        userId: {  type:  Schema.Types.ObjectId, ref: 'user', required: true },
        estateId: {  type:  Schema.Types.ObjectId, ref: 'estate' , required: true },
});

const savedModel = mongoose.model('saved', savedSchema)
exports.savedModel = savedModel;
exports.savedSchema = savedSchema;
