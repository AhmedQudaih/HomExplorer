const mongoose = require('mongoose');
const estate = require("./estateModel");
const user = require("./userModel");
const auction = require("./auctionModel");

const Schema = mongoose.Schema;

const bidSchema = new Schema ({
        userId: { type:  Schema.Types.ObjectId, ref: 'user', required: true },
        estateId: {  type:  Schema.Types.ObjectId, ref: 'estate' , required: true },
        auctionId: {  type:  Schema.Types.ObjectId, ref: 'auction', required: true },
        date:{type:Date , required:true},
        price:{ type: Number , required:true},
});

const bidModel = mongoose.model('bid', bidSchema)
exports.bidModel = bidModel;
exports.bidSchema = bidSchema;
