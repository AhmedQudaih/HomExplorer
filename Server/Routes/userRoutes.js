const express = require("express");
const userController = require("../Controller/UserController");
const router  = express.Router();

/*----------Sprint 5----------*/
router.post("/addUser",function(req,res){
  userController.addUser(req, res);
})


module.exports = router;
