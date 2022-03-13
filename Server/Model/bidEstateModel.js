const mongoose = require('mongoose');
const estate = require("./estateModel");
const user = require("./userModel");

const Schema = mongoose.Schema;

const bidSchema = new Schema ({
        userId: { type:  Schema.Types.ObjectId, ref: 'user', required: true },
        estateId: {  type:  Schema.Types.ObjectId, ref: 'estate' , required: true },
        price:{ type: Number , required:true},
});

const bidModel = mongoose.model('bid', bidSchema)
exports.bidModel = bidModel;
exports.bidSchema = bidSchema;
