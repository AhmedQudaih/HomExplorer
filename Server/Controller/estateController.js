const express = require("express");
const category = require("../Model/categoryModel");
const type = require("../Model/estateTypeModel");
const estate = require("../Model/estateModel");

function picOperation(req,estate){
      req.files.contract.forEach((e) => {
        estate.contract.push({
            path:e.path,
            name:e.filename
        });
      })
    req.files.pics.forEach((e) => {
      estate.pic.push({
        path:e.path,
        name:e.filename
      });
    })
}


exports.getAllEstates = function(req, res) {
  console.log(typeof req.params.partition)
  estate.estateModel.find({
    status: true
  }).skip(parseInt(req.params.partition)).limit(30).populate('category').populate("type").exec(function(error,doc) {
    if (error) {
      return  res.status(400).send(JSON.stringify(error));
    }
    res.send(doc);
  });

}


exports.findEstate = function(req, res) {
  estate.estateModel.findById({
    _id: req.params.estateId
  }, function(error,doc) {
    if (error) {
     return res.status(400).send(JSON.stringify(error));
    }
    console.log(doc);
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
    res.status(200).send(JSON.stringify("Ok"));
  });
}


exports.addEstate = function(req, res) {
  console.log(req.files)
  var newEstate = new estate.estateModel(req.body);
    picOperation(req ,newEstate);
  newEstate.save(function(error) {
    if (error) {
      console.log(error);
         return res.status(400).send(JSON.stringify(error));
    }
    res.status(200).send(JSON.stringify("Ok"));
  });
}

exports.updateEstate = function(req, res) {

  estate.estateModel.findOneAndUpdate({
    _id: req.body._id
  }, req.body, function(error) {
    if (error) {
      console.log(error);
         res.status(400).send(JSON.stringify(error));
    }
    res.status(200).send(JSON.stringify("Ok"));
  });
}

exports.getApproveEstateRequests = function(req, res) {
  estate.estateModel.find({
    status: false
  }, function(error, aproveReq) {
    if (error) {
      console.log(error)
    return  res.status(400).send(JSON.stringify(error));
    }
    res.send(aproveReq);
  });
}

exports.getCategoryAndType = async function(req, res) {
  var categoryAndType = {};
  categoryAndType.category = await category.categoryModel.find({}).exec();
  categoryAndType.type = await type.estateTypeModel.find({}).exec();
  res.send(categoryAndType);
}
