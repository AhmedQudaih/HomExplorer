const express = require("express");
const aiController = require("../Controller/aiController");
const auth = require("../Controller/userController").verifyJWT;
const router  = express.Router();

/*----------Sprint 6----------*/

router.post("/predictEstatePrice",function(req,res){
  aiController.predictEstate(req, res);
})

router.get("/getRecommendedEstate",auth,function(req,res){ // add auth middleware
  aiController.getRecommendedEstate(req, res);
})

router.get("/TrainPredictModel",function(req,res){
  aiController.TrainPredictModel(req,res);
})



module.exports = router;
