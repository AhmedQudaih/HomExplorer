const url = "http://localhost:4000/";

exports.getEstates = function() {
  return getData(url);
}

exports.deleteEstate = function(id) {
  const requestOptions = {
         method: 'delete',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify({ _id: id })
     };
  fetch(url + "deleteEstate",requestOptions)
      .then((res) => res.json())
      .then((data) => console.log(data));

}

exports.findEstate = function(id) {
  getData(url + "findEstate/"+id);
}

exports.addEstate = function(obj) {
  const requestOptions = {
         method: 'POST',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify(obj)
     };
  fetch("http://localhost:4000/addEstate",requestOptions)
      .then((res) => res.json())
      .then((data) => console.log(data));

}

exports.updateEstate = function(obj) {
  const requestOptions = {
         method: 'put',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify(obj)
     };
  fetch("http://localhost:4000/updateEstate",requestOptions)
      .then((res) => res.json())
      .then((data) => console.log(data));
}

exports.getApproveEstateRequests = function() {
 getData(url + "approveEstate");
}
exports.getCategoryAndType = function() {
  getData(url + "getCategoryAndType");

}

function getData(url){
  fetch(url)
       .then((res) => res.json())
       .then((data) => console.log(data));
}



/*-------------------used in testing----------------------------*/
/*const obj= {
    "_id": "61b7c4f1df3ce21f68f7bea7",
    "sellerId":{"_id":"61a81506d4c8835ca4a20610"},
    "address":"egypgds",
    "price":222222222,
    "details":{"numOfRooms":7,"numOfBathRooms":1,"size":887,"desc":"hiiii"},
    "status":true,"type":{"_id":"61a81506d4c8835ca4a2060e"},
    "category":{"_id":"61a81506d4c8835ca4a2060b"},
    "addressOnMap":[145 , 748],"contract":[],"pics":[]
}
 /// put the next code in App.js file/////
 import React from "react";
const serverEstate = require("./serverFunctions/estate");
  React.useEffect(() => {
   serverEstate.getAllEstates();
  });

*/
