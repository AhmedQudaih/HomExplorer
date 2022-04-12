const express = require("express");
const userController = require("../Controller/UserController");
const estate = require("../Controller/estateController");
const router  = express.Router();

/*----------Sprint 5----------*/
router.post("/addUser",function(req,res){
  userController.addUser(req, res);
})

router.post("/login",function(req,res){
  userController.login(req, res);
})

router.get("/checkAdmin",userController.verifyJWT,function(req,res){
  userController.checkAdmin(req, res);
})





module.exports = router;
