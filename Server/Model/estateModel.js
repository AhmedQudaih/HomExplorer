const mongoose = require('mongoose');
const user = require("./userModel");
const estateType = require("./estateTypeModel");
const estateCategory = require("./categoryModel");
const Schema = mongoose.Schema;

const estateSchema = new Schema ({
      sellerId: { type: Schema.Types.ObjectId, ref: 'user', required: true },
      address: { type: String,  minLength:5 , required: true , index: true   },
      price: { type: Number,  min: 1, max: 200000000, required: true },
        numOfRooms : {type: Number,  min: 1, max: 30, required: true},
        numOfBathRooms : {type: Number,  min: 1, max: 30, required: true},
          floor : {type: Number,  min: 0, max: 163, required: true},
        size : {type: Number, min: 20, max: 10000, required: true},
        desc: { type: String, minLength:30 ,required: true , index: true   },
      status:{ type: Boolean, default: false},
      type: {  type:  Schema.Types.ObjectId, ref: 'estateType', required: true },
      category: {  type:  Schema.Types.ObjectId, ref: 'category', required: true },
      addressOnMap:{type: [Number] , required:true},
          contract: {type: {path:String , name:String}},
       pic:  {type: [{path:String , name:String}] }
});

const estateModel = mongoose.model('estate', estateSchema)
exports.estateModel = estateModel;
exports.estateSchema = estateSchema;
