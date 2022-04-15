const express = require("express");
const category = require("../Model/categoryModel");
const type = require("../Model/estateTypeModel");
const estate = require("../Model/estateModel");
const rate = require("../Model/rateModel");
const save = require("../Model/savedModel");
const visit = require("../Model/visitModel");
const bid = require("../Model/bidEstateModel");
const user = require("../Model/userModel");
const fs = require('fs');


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
    status: 'approve'
  }).skip(partitionNumber).limit(60).populate('category').populate("type").exec(function(error,doc) {
    if (error) {
      return res.status(400).send(JSON.stringify(error));
    }
    res.send(doc);
  });

}

exports.deleteEstate = function(req, res) {
  try{
  estate.estateModel.findByIdAndRemove({ _id: req.body._id }, req.body, function(error, doc) { if (error) {return res.status(400).send(JSON.stringify(error)); }
    picDeleteOperation([doc.contract, ...doc.pic]);
    save.savedModel.deleteMany({ estateId: req.body._id }).exec();
    rate.rateModel.deleteMany({ estateId: req.body._id }).exec();
    visit.visitModel.deleteMany({ estateId: req.body._id }).exec();
    bid.bidModel.deleteMany({ estateId: req.body._id }).exec();
    res.status(200).send(JSON.stringify("Ok"));
  });
} catch (err) {
    return res.status(400).send(JSON.stringify(error));
}
}


exports.addEstate = function(req, res) {

  var newEstate = new estate.estateModel(req.body);
  newEstate.sellerId = req.user.id;
  picAddOperation(req.files, newEstate);
  newEstate.save(function(error, estate) {
    if (error){
         picDeleteOperation([newEstate.contract, ...newEstate.pic]);
          return res.status(400).send(JSON.stringify(error));
    }
    res.status(200).send(JSON.stringify("Ok"));

  });

}

exports.updateEstate = function(req, res) {
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
    req.body.status?null:req.body.status = "pending" ;
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
  try{
  categoryAndType.category = await category.categoryModel.find({}).exec();
  categoryAndType.type = await type.estateTypeModel.find({}).exec();
  res.send(categoryAndType);
}catch(error){
    console.log(error);
  }
}


exports.getApproveEstateRequests = function(req, res) {
  estate.estateModel.find({
    status: 'pending'
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
    userId: req.user.id,
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
      userId: req.user.id
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
    userId: req.user.id,
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
      userId: req.user.id
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
  let filter = req.body;

  if(req.body.text){
      filter.$text = {
        $search:`"\" ${req.body.text}"\"`
      }
      delete filter.text;
  }
   if(req.body.price){
       filter.price = { $gt: req.body.price[0] -1, $lt: req.body.price[1]+1 };
  }if(req.body.size){
    filter.size = { $gt: req.body.size[0] -1, $lt: req.body.size[1]+1 };
  }
estate.estateModel.find(filter).populate('category').populate("type")
  .then(result => {
    res.send(result);
  })
  .catch(err => {
    res.send(err);
  })
}

/*---------------------------- Sprint 3 ----------------------*/


exports.scheduleAndUpdateVisit = function(req, res) {
  const filter = {
    visitorId: req.user.id,
    estateId: req.body.estateId
  };
  const update = {
    date: req.body.date,
    status:req.body.status?req.body.status:"pending"
  };
  visit.visitModel.findOneAndUpdate(filter, update, {
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

exports.getVisitsDates = function(req,res){
  req = JSON.parse(req.params.filter)

  visit.visitModel.find(req).populate('estateId').populate('visitorId',"name email phoneNumber").then(result => {
    if(req.sellerId){
      let data = {};
      data.approve=[];data.reject=[];data.pending=[];
      result.forEach((item) => {
        if(item.estateId.sellerId == req.sellerId){
          if(item.status === 'approve'){
            data.approve.push(item);
          }else if (item.status === 'reject') {
            data.reject.push(item);
          }else if (item.status === 'pending') {
            data.pending.push(item);
          }
        };
      });
        res.send(data);
    }else{
      res.send(result);
    }
  }).catch(err => {
    console.log(err)
    res.send(err);
  })
}

/*---------------------------- Sprint 4 ----------------------*/



exports.getAuctionHighestPrice = function(req,res){
    bid.bidModel.findOne({estateId:req.params.estateId}).sort("-price").select({price: 1, _id: false}).then(result => {
       res.send(result || {price:0});
    })
    .catch(err => {
      console.log(err);
      res.status(400).send(JSON.stringify(err));
    })

}


exports.placeBid = function (req,res){
    const newBid = new bid.bidModel(req.body);
    newBid.userId=req.user.id;
    newBid.save(function(error) {
      if (error) {
        return res.status(400).send(JSON.stringify(error));
      }
      res.status(200).send(JSON.stringify("Ok"));
    });
}

exports.auctionResult= function (req,res){
    bid.bidModel.find({estateId:req.params.estateId}).sort('-price').limit(3).populate('userId').then(result =>{
      res.send(result);
    }).catch(err=> {
      console.log(err);
       res.status(400).send(JSON.stringify(error));
      })
  }

////////////////////////////// srpint 5
function get_estates (req,res){
    var categories = [];
    var types = [];
    var estates_of_type = [];
    var estate_of_categories = [];

    categoryModel.find().distinct('_id')
    .then(result=>{result.forEach(element => categories.push(JSON.stringify(element).replace('"','').replace('"','')));})
    .catch(err => {console.log(err)})

    estateTypeModel.find().distinct('_id')
    .then(result=>{result.forEach(element => types.push(JSON.stringify(element).replace('"','').replace('"',''))); console.log(types)})
    .catch(err => {console.log(err)})

    types.forEach((element)=> {estateModel.find({type:element})
    .then(result => {estates_of_type.push(result); console.log(result);})
    .catch(err => {console.log(err)});
    })
    categories.forEach((element)=> {estateModel.find({type:element})
    .then(result => {estate_of_categories.push(result); console.log(result);})
    .catch(err => {console.log(err)});
    res.send(estate_of_categories,estate_of_categories)

    })


}
