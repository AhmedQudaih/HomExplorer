const mongoose = require('mongoose');
const user = require("./userModel");
const estateType = require("./estateTypeModel");
const estateCategory = require("./categoryModel");
const Schema = mongoose.Schema;

const estateSchema = new Schema ({
      sellerId: { type: Schema.Types.ObjectId, ref: 'user', required: true },
      address: { type: String, required: true },
      price: { type: Number, required: true },
        numOfRooms : {type: Number, required: true},
        numOfBathRooms : {type: Number, required: true},
        size : {type: Number, required: true},
        desc: { type: String, required: true },
      status:{ type: Boolean, default: false},
      type: {  type:  Schema.Types.ObjectId, ref: 'estateType', required: true },
      category: {  type:  Schema.Types.ObjectId, ref: 'category', required: true },
      addressOnMap:{type: [Number] ,required:true},
      contract:  {type: [{path:String , name:String}] },
       pic:  {type: [{path:String , name:String}] }
});

const estateModel = mongoose.model('estate', estateSchema)
exports.estateModel = estateModel;
exports.estateSchema = estateSchema;
