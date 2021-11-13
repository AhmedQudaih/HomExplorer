const mongoose = require('mongoose');
const estate = require("./estateModel");
const user = require("./userModel");


const Schema = mongoose.Schema;

const soldSchema = new Schema ({
        userId: {  type:  Schema.Types.ObjectId, ref: 'user', required: true },
        estateId: {  type:  Schema.Types.ObjectId, ref: 'estate' , required: true },
        date:{type:Date , required:true},
        price:{ type: Number , required:true},
        expedient:{type: String}
});

const soldModel = mongoose.model('sold', soldSchema)
exports.soldModel = soldModel;
exports.soldSchema = soldSchema;
