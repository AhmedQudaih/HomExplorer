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
const cloudinary = require('cloudinary').v2;
const objectId = require('mongodb').ObjectID;
const emailNotification = require("./notification");


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
      cloudinary.uploader.destroy(e.name);
    } catch (err) {
      console.error(err)
      return (err);
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

  if(req.file_error){
    return res.status(400).send(JSON.stringify(req.file_error));
  }
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
  if(req.file_error){
    return res.status(400).send(JSON.stringify(req.file_error));
  }
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


exports.approveEstate = function(req, res) {
    estate.estateModel.findOneAndUpdate({_id: req.body._id},{status:req.body.status},{new: true}).populate('sellerId','email')
    .then((data) => {
        emailNotification.estateNotification(data);
        res.status(200).send(JSON.stringify("Ok"));
  }).catch(err =>{
    console.log(err)
    res.status(400).send(JSON.stringify(err));
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


exports.getMyEstates = function(req,res){
  estate.estateModel.find({sellerId:req.user.id}).populate('category').populate("type").exec(function(error,myEstates) {
    if (error) {
      return res.status(400).send(JSON.stringify(error));
    }
    res.send(myEstates);
  });
}

/*----------------------------Sprint 2----------------------------*/

async function estateOverAllRate(estateId){

  var scoreTotal =0,
   responseTotal  =0,
   overallRating = 0;
  try{
    let rates = await rate.rateModel.aggregate().match({ estateId: objectId(estateId) }).group({ _id: '$rate', count: { $sum: 1 } });

    rates.forEach(element =>{
      scoreTotal +=  element.count * element._id;
      responseTotal += element.count;
    });
    overallRating = scoreTotal/ responseTotal;

    let modifiedEstate = await estate.estateModel.findOneAndUpdate({_id:estateId}, {rate:overallRating.toFixed(2)});

    return {rate: modifiedEstate.rate};
  }catch(error){
    console.log(error);
    return error
  }
}

exports.addAndUpdateRate = async function(req, res) {
  const filter = {
    userId: req.user.id,
    estateId: req.body.estateId
  };
  const update = {
    rate: req.body.rate
  };
  try{
      await rate.rateModel.findOneAndUpdate(filter, update, {
            upsert: true, new: true, setDefaultsOnInsert: true});
      await estateOverAllRate(req.body.estateId);
      res.send(JSON.stringify("ok"));
  }catch(error){
    console.log(error);
      res.send(JSON.stringify(error));
  }
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
          res.send(JSON.stringify("ok"));
        })
        .catch(err => {
          console.log(err);
          res.send(JSON.stringify(err))
        });
    } else {
      save.savedModel.findOneAndDelete(filter)
        .then(result => {
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
  filter.status = "approve";

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
        emailNotification.scheduleVisitNotifictaion(result._id);
      res.send(JSON.stringify("ok"));
    })
    .catch(err => {
      console.log(err);
      res.send(JSON.stringify(err));
    })
}

exports.approveScheduleVisit = function(req, res) {
  visit.visitModel.findOneAndUpdate({_id:req.body.visitId}, {status:req.body.status})
    .then(result => {
      emailNotification.scheduleVisitReplyNotifictaion(result._id);
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


  exports.approveAuction = async function(req, res) {
    let estateData = await estate.estateModel.findById({_id: req.body._id})
    var auctionEndDate = new Date();
    auctionEndDate.setDate(auctionEndDate.getDate() + (estateData.auctionData.duration * 7));
    console.log(auctionEndDate)
    const update = {
      "auctionData.endDate": auctionEndDate,
      status: req.body.status
    };
    estate.estateModel.updateOne({ _id: req.body._id}, update).then((data)=>{
        res.status(200).send(JSON.stringify("Ok"));
    }).catch(err=> {
      console.log(err);
       res.status(400).send(JSON.stringify(err));
      })
    }



exports.placeBid = async function (req,res){
  let auctionEndStatus = await auctionEnd(req.body.estateId);
  if(auctionEndStatus.status || auctionEndStatus.auctionOwner === req.user.id){
    let response = await auctionResult(req.body.estateId);
    res.status(400).send(JSON.stringify("Cant place bid to an ended auction"))
  }
  try {
  const newBid = new bid.bidModel(req.body);
  newBid.userId=req.user.id;
  newBid.save();
  emailNotification.placeBidNotification(req.body.estateId)
  estate.estateModel.updateOne({ _id: req.body.estateId}, {price:req.body.price}).exec();
  res.status(200).send(JSON.stringify("Ok"));
  }catch (error) {
  res.status(400).send(JSON.stringify(error));
    }
}

async function auctionResult (estateId){
  try {
    let result = await bid.bidModel.find({estateId:estateId}).sort('-price').limit(3).populate('userId');
    return result;
  } catch (err) {
    return err;
  }
}

  async function auctionEnd (estateId){
    try{
      var estateData = await estate.estateModel.findOne({_id:estateId});
      var nowDate = new Date();
      var auctionDate = new Date(estateData.auctionData.endDate);
      let diff = auctionDate.getTime() - nowDate.getTime();
      let msInDays = 1000 * 3600 * 24;
      let daysRemain = diff/msInDays
      return {status:daysRemain <= 0,daysRemain: parseInt(daysRemain), auctionOwner:estateData.sellerId}
    }catch(err){
      console.log(err);
      return err;
    }
  }

    exports.auctionOperations = async function(req,res){
      try {
        let auctionEndStatus = await auctionEnd(req.params.estateId);
        if(auctionEndStatus.status){
          if( auctionEndStatus.auctionOwner == req.user.id){
              let response = await auctionResult(req.params.estateId)
                res.send({auctionResult:response});
          }else {
              res.send({auctionResult:"Auction ended"});
          }
        }else{
          res.status(200).send(JSON.stringify(auctionEndStatus.daysRemain));
        }
      } catch (err) {
        res.status(400).send(JSON.stringify(err));
      }
    }



/*---------------------------- Sprint 5 ----------------------*/
exports.estateReport = async function (req,res){
    var report={type:{
         Sell:{},
         Auction:{},
       Rent:{}
     },
     category:{}
     };

     var category=[];
     var type=[];

    try{

    const allEstates = await estate.estateModel.find({}).populate('category').populate("type").exec();
    allEstates.forEach(element => {
       report.type[element.type.name][element.category.name] =  report.type[element.type.name][element.category.name] +1||1;
       report.type[element.type.name]["value"] = report.type[element.type.name]["value"] +1||1;
       report.category[element.category.name]=  report.category[element.category.name] +1||1;
    });

    for (const [key, value] of Object.entries(report.category)) {
      category.push({name:key, value: value});
    }

    for (const [key, value] of Object.entries(report.type)) {
      value.name = key
      type.push(value);
    }

    report.category = category;
    report.type = type;

    res.send(report);

    }catch(error){

      console.log(error);
      res.status(400).send(JSON.stringify(error));

    }
}
