const express = require("express");
const category = require("../Model/categoryModel");
const type = require("../Model/estateTypeModel");
const estate = require("../Model/estateModel");
const fs = require('fs')



function picAddOperation(files,estate){
  if(files.contract){
            estate.contract={};
            estate.contract.path =files.contract[0].path;
            estate.contract.name =files.contract[0].filename;
      }
      if(files.pic){
    files.pic.forEach((e) => {
      estate.pic.push({
        path:e.path,
        name:e.filename
      });
    })}
  }

function picDeleteOperation(picPath){
  picPath.forEach((e)=>{
    try {
      fs.unlinkSync(e.path)
    } catch(err) {
      console.error(err)
    }
  })
}



exports.getAllEstates = function(req, res) {
  partitionNumber =(parseInt(req.params.partition)*60);
  estate.estateModel.find({
    status: true
  }).skip(partitionNumber).limit(60).populate('category').populate("type").exec(function(error,doc) {
    if (error) {
      return  res.status(400).send(JSON.stringify(error));
    }
    res.send(doc);
  });

}

exports.deleteEstate = function(req, res) {

  estate.estateModel.findByIdAndRemove({
    _id: req.body._id
  }, req.body, function(error, doc) {
    if (error) {
      return res.status(400).send(JSON.stringify(error));
    }
      picDeleteOperation([doc.contract,...doc.pic]);
    res.status(200).send(JSON.stringify("Ok"));
  });
}


exports.addEstate = function(req, res) {
  req.body.status = true //while testing then remove
  var newEstate = new estate.estateModel(req.body);
    picAddOperation(req.files ,newEstate);
  newEstate.save(function(error) {
    if (error) {
  picDeleteOperation([newEstate.contract,...newEstate.pic]);
         return res.status(400).send(JSON.stringify(error));
    }
    res.status(200).send(JSON.stringify("Ok"));
  });
}

exports.updateEstate = function(req, res) {
req.body.deletedPicNames = req.body.deletedPicNames.split(",");
estate.estateModel.findById({ _id: req.body._id}).then((data)=>{
if(req.body.deletedPicNames || req.files.contract){
  req.body.pic=[];
  req.body.pic = data.pic.filter(e => {
      if(!req.body.deletedPicNames.includes(e.path)){
        return e
      }})
    picAddOperation(req.files,req.body);
  if(req.body.contract){
    req.body.deletedPicNames.push(data.contract.path)
  }else if(!req.body.contract){
    req.body.contract = data.contract;
  }
  req.body.deletedPicNames.forEach((e)=>{
    if(e.length > 1){
    try {
      fs.unlinkSync(e)
    } catch(err) {
      console.error(err)
    }
  }
  })
}
  req.body.status = true; //while testing then false
  estate.estateModel.updateOne({  _id: req.body._id }, req.body,
  function(error) {
   if (error) {
       return res.status(400).send(JSON.stringify(error));
   }
   res.status(200).send(JSON.stringify("Ok"));
 });});

}

exports.getCategoryAndType = async function(req, res) {
  var categoryAndType = {};
  categoryAndType.category = await category.categoryModel.find({}).exec();
  categoryAndType.type = await type.estateTypeModel.find({}).exec();
  res.send(categoryAndType);
}


/*
exports.getApproveEstateRequests = function(req, res) {
  estate.estateModel.find({
    status: false
  }, function(error, aproveReq) {
    if (error) {
    return  res.status(400).send(JSON.stringify(error));
    }
    res.send(aproveReq);
  });
}

exports.findEstate = function(req, res) {
  estate.estateModel.findById({
    _id: req.params.estateId
  }, function(error,doc) {
    if (error) {
     return res.status(400).send(JSON.stringify(error));
    }
    res.send(doc);
  });
}
*/
