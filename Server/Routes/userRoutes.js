const express = require("express");
const userController = require("../Controller/userController");
const estate = require("../Controller/estateController");
const router  = express.Router();

/*----------Sprint 5----------*/
router.post("/addUser",function(req,res){
  userController.addUser(req, res);
})

router.post("/login",function(req,res){
  userController.login(req, res);
})

router.get("/checkAdmin",userController.verifyJWT,userController.serverAdminCheck,function(req,res){
  userController.checkAdmin(req, res);
})

router.get("/getUsers",userController.verifyJWT,userController.serverAdminCheck,function(req,res){
 userController.getAllUsers(req , res);
})


router.post("/changeRole",userController.verifyJWT,userController.serverAdminCheck,function(req,res){
  userController.ChangeRole(req,res);
})




module.exports = router;
