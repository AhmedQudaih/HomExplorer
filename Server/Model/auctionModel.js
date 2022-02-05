const mongoose = require('mongoose');
const estate = require("./estateModel");
const bid = require("./bidEstateModel");


const Schema = mongoose.Schema;

const auctionSchema = new Schema ({
        estateId: { type:  Schema.Types.ObjectId, ref: 'estate' , required: true },
        startDate:{type:Date , required:true},
        endDate:{type:Date, required:true},
        startingPrice:{ type: Number , required:true},
        highestPrice:{type:bid.bidSchema, required:true}
});

const auctionModel = mongoose.model('auction', auctionSchema)
exports.auctionModel = auctionModel;
exports.auctionSchema = auctionSchema;
