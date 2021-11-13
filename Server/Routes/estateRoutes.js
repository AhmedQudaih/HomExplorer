const express = require("express");
const uploadpPic = require("../Controller/uploadPic");
const estate = require("../Controller/estateController");
const router  = express.Router();

router.get("/",function(req,res){
  estate.getAllEstates(req , res);
})

router.get("/findEstate/:estateId",function(req,res){
  estate.findEstate(req , res);
})

router.post("/deleteEstate",function(req,res){
 estate.deleteEstate(req , res);
})

const upFi = uploadpPic.upload.fields([{name: 'Contract'}, {name: 'Pics'}])
router.post("/addEstate",upFi,function(req,res){
  estate.addEstate(req , res);
})

router.post("/updateEstate",upFi,function(req,res){
  estate.updateEstate(req , res);
})

router.get("/getCategoryAndType",function(req,res){
  estate.getCategoryAndType(req , res);
})

router.get("/approveEstate",function(req,res){
 estate.getApproveEstateRequests(req , res);
})


module.exports = router;
