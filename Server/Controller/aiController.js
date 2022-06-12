const express = require("express");
const {spawn} = require("child_process");
const path = require('path')

exports.predictEstate = async function(req, res) {
  //predict estate code heree
  const python = await spawn('python',[path.join(__dirname, '..', 'Model', 'predictionModel.py'), [3,2,1,195,30.119690,31.637841,0,0,0,0,1]]);

  python.stdout.on('data',(data)=>{
    const price = Number(data.toString('utf8')).toFixed(0);
      res.send({result:price})
  })
}

exports.getRecommendedEstate = async function(req, res) {
  const python = await spawn('python',[path.join(__dirname, '..', 'Model', 'recommendationModel.py'), 'paraam']);
  //get Recommended estates code heree
  res.send({result:true})

}
