const express = require("express");
const {spawn} = require("child_process");
const path = require('path')


function contains(target, pattern) {
    var value = 0;
    pattern.forEach(function(word) {
        value = value + target.includes(word);
    });
    return (value === 1)
}

function preprocess_request(req) {

    let formData = {}

    formData.numOfRooms = req.body.numOfRooms
    formData.numOfBathRooms = req.body.numOfBathRooms
    formData.size = req.body.size
    formData.addressOnMap = req.body.addressOnMap;

    if (req.body.category == 'Apartment') { formData.category = 1 } else { formData.category = 2 }

    formData.pool = contains(req.body.desc, ["Pool", "pool", "مسبح", "سباحة", "سباحه"])
    if (formData.pool === true) { formData.pool = 1 } else { formData.pool = 0 }

    formData.garden = contains(req.body.desc, ["garden", "Garden", "حديقة", "حديقه", "جنينة", "جنينه"])
    if (formData.garden === true) { formData.garden = 1 } else { formData.garden = 0 }

    formData.SeaView = contains(req.body.desc, ["Sea", "sea", "Nile", "nile", "نيل", "بحر", "بحيرة", "بحيره"])
    if (formData.SeaView === true) { formData.SeaView = 1 } else { formData.SeaView = 0 }

    formData.roof = contains(req.body.desc, ["roof", "Roof", "سطح", "روف"])
    if (formData.roof === true) { formData.roof = 1 } else { formData.roof = 0 }

    formData.compound = contains(req.body.desc, ["Compund", "compund", "مجمع", "كموند", "كمباوند", "كومباوند"])
    if (formData.compound === true) { formData.compound = 1 } else { formData.compound = 0 }

    return [formData.numOfRooms, formData.numOfBathRooms, formData.category, formData.size, formData.addressOnMap[0], formData.addressOnMap[1], formData.garden, formData.pool, formData.SeaView, formData.roof, formData.compound]

}


exports.predictEstate = async function(req, res) {
  //predict estate code heree
  const formData = preprocess_request(req);
  const python = await spawn('python',[path.join(__dirname, '..', 'Model', 'predictionModel.py'), formData]);
/*
  python.stdout.on('data',(data)=>{
    console.log(data.toString('utf8'));
    const price = Number(data.toString('utf8')).toFixed(0);
      res.send({result:price})
  })*/
  python.stderr.on('data',(data)=>{
    console.log(data.toString('utf8'));
      res.send({error:data.toString('utf8')})
  })
}

exports.getRecommendedEstate = async function(req, res) {
  const python = await spawn('python',[path.join(__dirname, '..', 'Model', 'recommendationModel.py'), 'paraam']);
  //get Recommended estates code heree
  res.send({result:true})

}
