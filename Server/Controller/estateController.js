const express = require("express");
const category = require("../Model/categoryModel");
const type = require("../Model/estateTypeModel");
const estate = require("../Model/estateModel");


exports.getAllEstates = function(req, res) {
  estate.estateModel.find({
    status: true
  }, function(err,doc) {
    if (err) {
      console.log(err);
      res.send("Somthing went wrong plz try again later");
    }
    console.log(doc);
    res.send(doc);
  });
}


exports.findEstate = function(req, res) {
  estate.estateModel.findById({
    _id: req.params.estateId
  }, function(err,doc) {
    if (err) {
      console.log(err);
      res.send("Somthing went wrong plz try again later");
    }
    console.log(doc);
    res.send(doc);
  });
}



exports.deleteEstate = function(req, res) {
  estate.estateModel.findByIdAndRemove({
    _id: req.body._id
  }, req.body, function(err, doc) {
    if (err) {
      console.log(err);
      res.send("Something wrong when deleting data!");
    }
    res.send("Deleted Successfully!");
  });
}


exports.addEstate = function(req, res) {
  var contract = [];
  var pics = [];
  if (req.files) {
    if (req.files.Contract.length == 0) {
      req.files.Contract.forEach((e) => {
        contract.push({
          buffer: e.buffer,
          name: e.originalname
        });
      })
    }
    if (req.files.Pics.length == 0) {
      req.files.Pics.forEach((e) => {
        pics.push({
          buffer: e.buffer,
          name: e.originalname
        });
      })
    }
  }
  var newEstate = new estate.estateModel(req.body);
  newEstate.contract = contract
  newEstate.pics = pics
  console.log(newEstate);
  newEstate.save(function(err) {
    if (err) {
      console.log(err);
      res.send("Somthing went wrong plz try again later");
    }
    res.send("Add request sended ");
  });

}

exports.updateEstate = function(req, res) {
  estate.estateModel.findOneAndUpdate({
    _id: req.body._id
  }, req.body, function(err, doc) {
    if (err) {
      console.log(err);
      res.send("Something wrong when updating data!");
    }
    res.send("Update request sended!");

  });
}

exports.getApproveEstateRequests = function(req, res) {
  estate.estateModel.find({
    status: false
  }, function(err, aproveReq) {
    if (err) {
      console.log(err);
      res.send("Somthing went wrong plz try again later");
    }
    console.log(aproveReq);
    res.send(aproveReq);
  });
}

exports.getCategoryAndType = async function(req, res) {
  var categoryAndType = {};
  categoryAndType.category = await category.categoryModel.find({}).exec();
  categoryAndType.type = await type.estateTypeModel.find({}).exec();
  res.send(categoryAndType);
}
