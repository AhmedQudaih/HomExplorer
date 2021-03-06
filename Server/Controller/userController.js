const express = require("express");
const user = require("../Model/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require('dotenv').config();

exports.addUser = async function(req, res) {
  req.body.email = req.body.email.toLowerCase();
  const checkEmail = await user.userModel.findOne({email:req.body.email});
  if(checkEmail){
    return res.send(JSON.stringify("exists"));
  }
  req.body.password = await bcrypt.hash(req.body.password, 10);
  var newUser = new user.userModel(req.body);
  newUser.save(function(error, user) {
    if (error){
           return res.status(400).send(JSON.stringify(error));
    }
      createToken(user,res)
    });
}

exports.login = async function(req,res){
  req.body.email = req.body.email.toLowerCase();
  try{
  var findUser = await user.userModel.findOne({email:req.body.email}).exec();
    if(!findUser){
      return res.json({
        message:"Invalid Username or Password"
      })
    }
    var isCorrect = await bcrypt.compare(req.body.password, findUser.password);
    console.log(isCorrect);
    if(isCorrect){
      createToken(findUser, res);
    } else {
      return res.json({
        message:"Invalid Username or Password"
      })
    }
    } catch(error){
         return res.status(400).send(JSON.stringify(error));
    }
}
 function createToken(user,res){

    const payload = {
      id:user._id,
      userName: user.name
    }
     jwt.sign(payload,
      process.env.jwtPrivateKey,
      (err,token)=>{
        if(err) return res.json({message:err})
        return res.json({
          message:"Success",
          userId:user._id,
          token:"Bearer " + token
        })
      }
    )
}

exports.verifyJWT= function (req,res,next) {
  const token = req.headers["x-access-token"]?.split(' ')[1];
  if(token){
    jwt.verify(token,process.env.jwtPrivateKey,(err,decoded)=>{
      if(err) return res.json({
        isLoggedIn: false,
        message:"Failed To Authenticate"
      })
      req.user = {};
      req.user.id = decoded.id;
      req.user.userName = decoded.userName;
      next()
    })
  }else {
    res.json({
      isLoggedIn: false,
      message:"Incorrect Token Given"
    })
  }
}


exports.serverAdminCheck = async function(req,res,next){
  var adminCheck = await user.userModel.findOne({_id:req.user.id,admin: true});
  if(adminCheck){
    next();
  }else{
    res.status(400).send(JSON.stringify("admin privilege needed"));

  }
  }



exports.checkAdmin = function(req,res){
  user.userModel.findOne({_id:req.user.id,admin: true}).then(user => {
        res.status(200).send(user?true:false);
      }).catch(error=>{
        res.status(400).send(JSON.stringify(error));
      });

    }


  exports.getAllUsers = function(req,res){
    user.userModel.find()
    .then(result => res.send(result))
    .catch(err => res.status(400).send(JSON.stringify(error)));
  }

  exports.ChangeRole= function(req,res)
  { 
      user.userModel.findOneAndUpdate({_id:req.body.userId},{admin:req.body.roleValue}).then(result => {
        res.send(JSON.stringify("ok"));
      })
      .catch(err => {
        console.log(err);
        res.status(400).send(JSON.stringify(err));
      });
  }
