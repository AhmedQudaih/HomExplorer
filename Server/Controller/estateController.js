const express = require("express");
const category = require("../Model/categoryModel");
const type = require("../Model/estateTypeModel");
const estate = require("../Model/estateModel");
const rate = require("../Model/rateModel");
const save = require("../Model/savedModel");
const fs = require('fs')


function picAddOperation(files, estate) {
  if (files.contract) {
    estate.contract = {};
    estate.contract.path = files.contract[0].path;
    estate.contract.name = files.contract[0].filename;
  }
  if (files.pic) {
    files.pic.forEach((e) => {
      estate.pic.push({
        path: e.path,
        name: e.filename
      });
    })
  }
}

function picDeleteOperation(picPath) {
  picPath.forEach((e) => {
    try {
      fs.unlinkSync(e.path)
    } catch (err) {
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
      return res.status(400).send(JSON.stringify(error));
    }
    res.send(doc);
  });

}

exports.deleteEstate = function(req, res) {

  estate.estateModel.findByIdAndRemove({ _id: req.body._id }, req.body, function(error, doc) { if (error) {return res.status(400).send(JSON.stringify(error)); }
    picDeleteOperation([doc.contract, ...doc.pic]);
    save.savedModel.deleteMany({ estateId: req.body._id }).exec();
    rate.rateModel.deleteMany({ estateId: req.body._id }).exec();
    res.status(200).send(JSON.stringify("Ok"));
  });
}


exports.addEstate = function(req, res) {
  req.body.status = true //while testing then remove
  var newEstate = new estate.estateModel(req.body);
  picAddOperation(req.files, newEstate);
  newEstate.save(function(error) {
    if (error) {
      picDeleteOperation([newEstate.contract, ...newEstate.pic]);
      return res.status(400).send(JSON.stringify(error));
    }
    res.status(200).send(JSON.stringify("Ok"));
  });
}

exports.updateEstate = function(req, res) {
  console.log(req.body);
  estate.estateModel.findById({
    _id: req.body._id
  }).then((data) => {
    if (req.body.deletedPicNames || req.files.contract) {
      req.body.deletedPicNames = req.body.deletedPicNames.split(",");
      req.body.pic = [];
      req.body.pic = data.pic.filter(e => {
        if (!req.body.deletedPicNames.includes(e.path)) {
          return e
        }
      })
      picAddOperation(req.files, req.body);
      if (req.body.contract) {
        req.body.deletedPicNames.push(data.contract.path)
      } else if (!req.body.contract) {
        req.body.contract = data.contract;
      }
      req.body.deletedPicNames.forEach((e) => {
        if (e.length > 1) {
          try {
            fs.unlinkSync(e)
          } catch (err) {
            console.error(err)
          }
        }
      })
    }
    req.body.status?null:req.body.status = false //while testing then false
    estate.estateModel.updateOne({
        _id: req.body._id
      }, req.body,
      function(error) {
        if (error) {
          return res.status(400).send(JSON.stringify(error));
        }
        res.status(200).send(JSON.stringify("Ok"));
      });
  });

}

exports.getCategoryAndType = async function(req, res) {
  var categoryAndType = {};
  categoryAndType.category = await category.categoryModel.find({}).exec();
  categoryAndType.type = await type.estateTypeModel.find({}).exec();
  res.send(categoryAndType);
}




exports.getApproveEstateRequests = function(req, res) {
  estate.estateModel.find({
    status: false
  }).populate('category').populate("type").exec(function(error,aproveReq) {

    if (error) {
      return res.status(400).send(JSON.stringify(error));
    }
    res.send(aproveReq);
  });

}


/*----------------------------Sprint 2----------------------------*/

exports.addAndUpdateRate = function(req, res) {
  const filter = {
    userId: req.body.userId,
    estateId: req.body.estateId
  };
  const update = {
    rate: req.body.rate
  };
  rate.rateModel.findOneAndUpdate(filter, update, {
      upsert: true,
      new: true,
      setDefaultsOnInsert: true
    })
    .then(result => {
      console.log("Done");
      res.send(JSON.stringify("ok"));
    })
    .catch(err => {
      console.log(err);
      res.send(JSON.stringify(err));
    })
}

exports.getRates = function(req, res) {
  rate.rateModel.find({
      userId: req.params.userId
    },{_id:0 ,__v:0 ,userId:0})
    .then(result => {
      res.send(result);
    })
    .catch(err => {
      console.log(err);
      res.send(JSON.stringify(err));
    });
}

exports.saveAndUnsave = function (req, res) {
  const filter = {
    userId: req.body.userId,
    estateId: req.body.estateId
  };
  save.savedModel.find(filter, function(err, results) {
    if (err) {
      console.log(err);
    }
    if (!results.length) {
      const x = new save.savedModel(filter);
      x.save()
        .then(result => {
          console.log("saved");
          res.send(JSON.stringify("ok"));
        })
        .catch(err => {
          console.log(err);
          res.send(JSON.stringify(err))
        });
    } else {
      save.savedModel.findOneAndDelete(filter)
        .then(result => {
          console.log("Deleted");
          res.send(JSON.stringify("ok"));
        })
        .catch(err => {
          console.log(err);
          res.send(JSON.stringify(err))
        });
    }
  })
}

exports.getSavedEstates = function(req, res) {
  save.savedModel.find({
      userId: req.params.userId
    },{_id:0 ,__v:0 ,userId:0}).populate('estateId').populate({
    path : 'estateId',
    populate : {
      path : 'type category'
    }
  })
    .then(result => {
      res.send(result);
    })
    .catch(err => {
      console.log(err);
      res.send(JSON.stringify(err));
    })
}


exports.search = function(req, res) {
  let filter = {};

  if((req.body.desc && req.body.desc.length > 0)  || (req.body.address && req.body.address.length > 0) ){
        let test = `"\" ${req.body.address.concat(' ').concat(req.body.desc)}"\"`;
        filter.$text = {
          $search:test
        }
    }
  for (const [key, value] of Object.entries(req.body)) {

      if(value.length != 0){
          if(key === "price" || key === "size"){
            if(value[1]==0){continue;}
            filter[key] = { $gt: req.body[key][0] -1, $lt: req.body[key][1]+1 };
          }else if(key === "desc" || key ==="address"){
            continue;
          }else{
            filter[key]= value;
          }
      }
}
estate.estateModel.find(filter).populate('category').populate("type")
  .then(result => {
    res.send(result);
  })
  .catch(err => {
    res.send(err);
  })
}
