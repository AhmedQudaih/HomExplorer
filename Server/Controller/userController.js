const express = require("express");
const user = require("../Model/userModel");
const bcrypt = require("bcrypt");

exports.addUser = async function(req, res) {
  console.log(req.body)
  const checkEmail = await user.userModel.findOne({email:req.body.email});
  if(checkEmail){
    return res.send(JSON.stringify("exists"));
  }
  req.body.password = await bcrypt.hash(req.body.password, 10);
  var newUser = new user.userModel(req.body);
  newUser.save(function(error, user) {
    if (error){
        console.log(error)
           return res.status(400).send(JSON.stringify(error));
    }
    res.status(200).send(JSON.stringify("Ok"));
  });
}
