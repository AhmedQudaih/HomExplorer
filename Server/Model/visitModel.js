const mongoose = require('mongoose');
const user = require("./userModel");
const estate = require("./estateModel");

const Schema = mongoose.Schema;

const visitSchema = new Schema ({
        visitorId: {  type:  Schema.Types.ObjectId, ref: 'user', required: true },
        estateId: {  type:  Schema.Types.ObjectId, ref: 'estate' , required: true },
        date:{type:Date , required:true},
        status:{ type: String, required:true, default: 'pending'},

});

const visitModel = mongoose.model('visit', visitSchema)
exports.visitModel = visitModel;
exports.visitSchema = visitSchema;
