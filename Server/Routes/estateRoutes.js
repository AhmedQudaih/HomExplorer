const express = require("express");
const uploadpPic = require("../Controller/uploadPic");
const estate = require("../Controller/estateController");
const auth = require("../Controller/userController").verifyJWT;
const router  = express.Router();

router.get("/getEstates/:partition",function(req,res){
  estate.getAllEstates(req , res);
})

router.get("/findEstate/:estateId",function(req,res){
  estate.findEstate(req , res);
})

router.delete("/deleteEstate",auth,function(req,res){
 estate.deleteEstate(req , res);
})

const upFi = uploadpPic.upload.fields([{name: 'contract'}, {name: 'pic'}])
router.post("/addEstate",auth,upFi,function(req,res){
  estate.addEstate(req , res);
})

router.put("/updateEstate",auth,upFi,function(req,res){
  estate.updateEstate(req , res);
})

router.get("/getCategoryAndType",function(req,res){
  estate.getCategoryAndType(req , res);
})

router.get("/getApproveEstateRequests",auth,function(req,res){
 estate.getApproveEstateRequests(req , res);
})

/*----------Sprint 2----------*/
router.post("/addAndUpdateRate",auth,function(req,res){
 estate.addAndUpdateRate(req , res);
})

router.get("/getRates",auth,function(req,res){
 estate.getRates(req , res);
})

router.post("/saveAndUnsave",auth,function(req,res){
 estate.saveAndUnsave(req , res);
})
router.get("/getSavedEstates",auth,function(req,res){
 estate.getSavedEstates(req , res);
})

router.post("/search",function(req,res){
 estate.search(req , res);
})

/*----------Sprint 3----------*/

router.get("/getVisitsDates/:filter",auth,function(req,res){
 estate.getVisitsDates(req , res);
})

router.post("/scheduleVisit",auth,function(req,res){
  estate.scheduleAndUpdateVisit(req,res);
})
/*----------Sprint 4----------*/


router.post("/placaBid",auth,function(req,res){
  estate.placeBid(req,res);
})

router.post("/approveAuction",auth,function(req,res){
  estate.approveAuction(req,res);
})

router.get("/auctionOperations/:estateId",auth,function(req,res){
  estate.auctionOperations(req,res);
})

/*---------Sprint 5-----------*/
router.get("/estateReport",function(req,res){
 estate.estateReport(req , res);
})


module.exports = router;
