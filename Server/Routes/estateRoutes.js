const express = require("express");
const estate = require("../Controller/estateController");
const router  = express.Router();

router.get("/",function(req,res){
  estate.getAllEstates(req , res);
})

router.get("/findEstate/:estateId",function(req,res){
  estate.findEstate(req , res);
})

router.post("/addEstate",function(req,res){
  estate.addEstate(req , res);
})

router.post("/updateEstate/:estateId",function(req,res){
  estate.updateEstate(req , res);
})

router.post("/deleteEstate/:estateId",function(req,res){
 estate.deleteEstate(req , res);
})

router.get("/approveEstate",function(req,res){
 estate.getApproveEstateRequests(req , res);
})

router.post("/approveEstate/:estateId",function(req,res){
 estate.approveEstate(req , res);
})

module.exports = router;
