const express = require("express");
const uploadpPic = require("../Controller/uploadPic");
const estate = require("../Controller/estateController");
const router  = express.Router();

router.get("/getEstates/:partition",function(req,res){
  estate.getAllEstates(req , res);
})

router.get("/findEstate/:estateId",function(req,res){
  estate.findEstate(req , res);
})

router.delete("/deleteEstate",function(req,res){
 estate.deleteEstate(req , res);
})

const upFi = uploadpPic.upload.fields([{name: 'contract'}, {name: 'pic'}])
router.post("/addEstate",upFi,function(req,res){
  estate.addEstate(req , res);
})

router.put("/updateEstate",upFi,function(req,res){
  estate.updateEstate(req , res);
})

router.get("/getCategoryAndType",function(req,res){
  estate.getCategoryAndType(req , res);
})

router.get("/getApproveEstateRequests",function(req,res){
 estate.getApproveEstateRequests(req , res);
})

/*----------Sprint 2----------*/
router.post("/addAndUpdateRate",function(req,res){
 estate.addAndUpdateRate(req , res);
})

router.get("/getRates/:userId",function(req,res){
 estate.getRates(req , res);
})

router.post("/saveAndUnsave",function(req,res){
 estate.saveAndUnsave(req , res);
})
router.get("/getSavedEstates/:userId",function(req,res){
 estate.getSavedEstates(req , res);
})

router.post("/search",function(req,res){
 estate.search(req , res);
})

/*----------Sprint 3----------*/

router.get("/getVisitsDates/:filter",function(req,res){
 estate.getVisitsDates(req , res);
})

router.post("/scheduleVisit",function(req,res){
  estate.scheduleAndUpdateVisit(req,res);
})
/*----------Sprint 4----------*/

router.get("/highestAuctionPrice/:estateId",function(req,res){
 estate.getAuctionHighestPrice(req , res);
})

router.post("/placaBid",function(req,res){
  estate.placeBid(req,res);
})

router.get("/auctionResult/:estateId",function(req,res){
 estate.auctionResult(req , res);
})
/*----------Sprint 5----------*/


router.get("/getUsers",function(req,res){
 estate.getAllUsers(req , res);
})


router.post("/changeRole",function(req,res){
  estate.ChangeRole(req,res);
})


module.exports = router;
