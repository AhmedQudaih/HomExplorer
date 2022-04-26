const nodemailer = require('nodemailer');
const bid = require("../Model/bidEstateModel");
const visit = require("../Model/visitModel");
const estate = require("../Model/estateModel");
const save = require("../Model/savedModel");
require('dotenv').config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
  user:"softwareteamgproject@gmail.com",
  pass: process.env.emailPass
  }
});


const mailOptions = {
  from: 'softwareteamgproject@gmail.com',
  to: '',
  subject: '',
  text: ""
};

exports.placeBidNotification = async function(estateId , userEmail){
  try{
      var subject = "Update on Home Explorer Auction estate";
      var body = "some one bids more than you!! go place a higher bid"
      var bids = await bid.bidModel.find({estateId:estateId}).populate('userId','email');
      bids.forEach(bid => {
        if(bid.userId.email === userEmail){
           subject = "Home Explorer estate Auction";
           body = "Congrats!! your bid was successfully submited";
        }
        emailNotification(bid.userId.email, subject, body)
      });
    } catch (err) {
        console.log(err);
    }
}

exports.scheduleVisitNotifictaion = async function(visitId){
  try {
    var visitData = await visit.visitModel.findOne({_id:visitId}).populate([
      {path:'visitorId', select:'email'},{path : 'estateId', populate : { path : 'sellerId', select:'email'}}]);
      var subject = "Home Explorer estate visit schedule";
      var userBody = "You scheduled estate visit on "+ visitData.date +" to "+ visitData.estateId.address +" was successfully submited and we will notify you when owner reply ";
      var ownerBody = "a new visit scheduled for "+ visitData.estateId.address + "check it!!";
      emailNotification(visitData.visitorId.email, subject, userBody);
      emailNotification(visitData.estateId.sellerId.email, subject, ownerBody);

  } catch (err) {
      console.log(err);
  }
}



exports.scheduleVisitReplyNotifictaion = async function(visitId){
  try {
    var visitData = await visit.visitModel.findOne({_id:visitId}).populate([{path:'visitorId', select:'email'},{path:'estateId', select:'address'}]);
    var subject = "Update on Home Explorer estate visit schedule";
    var body = "Your request for visiting "+visitData.estateId.address+" was Updated check it ";
    emailNotification(visitData.visitorId.email, subject, body);
  } catch (err) {
      console.log(err);
  }
}


exports.estateNotification = async function(estateData){
  try{
      var subject = "Update on Home Explorer estate status";
      var body = "Your request for "+estateData.address+" estate was Updated check it ";
      emailNotification(estateData.sellerId.email, subject, body)
      if(estateData.status === "approve"){
        body = "New updates on "+estateData.estateId.address+" estate check it";
        var savedEstatesData = await save.savedModel.find({estateId:estateData._id}).populate('visitorId','email');
        savedEstatesData.forEach(element => {
           emailNotification(element.sellerId.email, subject, body)
         });
      }
    }catch (err) {
        console.log(err);
    }
}

function emailNotification(to, subject, text){
  mailOptions.to = to;
  mailOptions.subject = subject;
  mailOptions.text = text;
  transporter.sendMail(mailOptions, function(err, info){
    if(err){
      console.log(err);
    }else{
      console.log("Email send");
    }
  });
}
