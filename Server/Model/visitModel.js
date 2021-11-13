const mongoose = require('mongoose');
const user = require("./userModel");
const estate = require("./estateModel");

const Schema = mongoose.Schema;

const visitSchema = new Schema ({
        userId: {  type:  Schema.Types.ObjectId, ref: 'user', required: true },
        estateId: {  type:  Schema.Types.ObjectId, ref: 'estate' , required: true },
        date:{type:Date , required:true},
        status:{ type: Boolean},

});

const visitModel = mongoose.model('visit', visitSchema)
exports.visitModel = visitModel;
exports.visitSchema = visitSchema;
