const Waiting = require("../components/waiting");
const {callServer, url}= require('./callServer');


exports.getEstates = function(partition) {
  const requestOptions = {
     method: 'get',
     headers: { 'Content-Type': 'application/json' },
 };
  return callServer(url+"getEstates/"+partition, requestOptions, true );
}

exports.deleteEstate = function(id) {
  const requestOptions = {
     method: 'delete',
     headers: { 'Content-Type': 'application/json',
     'x-access-token': localStorage.getItem("HomExplorerToken") },
     body: JSON.stringify({ _id: id })
 };
 Waiting.Waiting(true);
 return callServer(url+"deleteEstate", requestOptions );
  }

  exports.getCategoryAndType = function() {
    const requestOptions = {
       method: 'get',
       headers: { 'Content-Type': 'application/json' },
   };
   return callServer(url+"getCategoryAndType", requestOptions );
  }


  exports.addEstate = function(formData) {
    const requestOptions = {
           method: 'POST',
           headers:{'x-access-token': localStorage.getItem("HomExplorerToken")},
           body: formData
       };
       Waiting.Waiting(true);
          return callServer(url+"addEstate", requestOptions );
  }


  exports.updateEstate = function(formData) {
    const requestOptions = {
           method: 'put',
           headers:{'x-access-token': localStorage.getItem("HomExplorerToken")},
           body: formData
       };
       Waiting.Waiting(true);
      return callServer(url+"updateEstate", requestOptions );
  }



  exports.approveEstateRequests = function(formData) {

    const requestOptions = {
       method: 'get',
       headers: { 'Content-Type': 'application/json',
       'x-access-token': localStorage.getItem("HomExplorerToken") },
   };
    return callServer(url+"getApproveEstateRequests", requestOptions, true );
  }

/*----------------------Sprint 2----------------------*/

exports.rate = function(data) {
  const requestOptions = {
         method: 'POST',
         headers: { 'Content-Type': 'application/json',
         'x-access-token': localStorage.getItem("HomExplorerToken") },
         body: JSON.stringify(data)
     };
     Waiting.Waiting(true);
     return callServer(url+"addAndUpdateRate", requestOptions );
}

exports.getRate = function(id) {

  const requestOptions = {
     method: 'get',
     headers: { 'Content-Type': 'application/json', 'x-access-token': localStorage.getItem("HomExplorerToken") },
 };
  return callServer(url+"getRates", requestOptions );
}

exports.saveAndUnsave = function(estateId) {
  const requestOptions = {
         method: 'POST',
         headers: { 'Content-Type': 'application/json',
                    'x-access-token': localStorage.getItem("HomExplorerToken") },
         body: JSON.stringify({"estateId":estateId})
     };
     Waiting.Waiting(true);
       return callServer(url+"saveAndUnsave", requestOptions );
}

exports.getSaved = function(id) {

  const requestOptions = {
     method: 'get',
     headers: { 'Content-Type': 'application/json', 'x-access-token': localStorage.getItem("HomExplorerToken") },
 };
  return callServer(url+"getSavedEstates", requestOptions );
}



exports.searchData = function(data) {
  const requestOptions = {
         method: 'POST',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify(data)
     };
     return callServer(url+"search", requestOptions, true );
}



/*----------------------Sprint 3----------------------*/

exports.getVisits = function(id){
  const requestOptions = {
     method: 'get',
     headers: { 'Content-Type': 'application/json',
     'x-access-token': localStorage.getItem("HomExplorerToken") },
 };
  return callServer(url+"getVisitsDates/"+id, requestOptions, true );
}

exports.scheduleVisit = function(data){
  const requestOptions = {
    method:'POST',
    headers:{'Content-Type': 'application/json',
    'x-access-token': localStorage.getItem("HomExplorerToken") },
    body: JSON.stringify(data)
  };
  Waiting.Waiting(true);
  return callServer(url+"scheduleVisit",requestOptions);
}


/*----------------------Sprint 4----------------------*/
exports.placeBid = function(data){
  const requestOptions = {
    method:'POST',
    headers:{'Content-Type': 'application/json',
    'x-access-token': localStorage.getItem("HomExplorerToken")},
    body: JSON.stringify(data)
  };
  Waiting.Waiting(true);
  return callServer(url+"placaBid",requestOptions);
}


exports.getHighestPrice = function(id){
  const requestOptions = {
     method: 'get',
     headers: { 'Content-Type': 'application/json' },
 };
  return callServer(url+"highestAuctionPrice/"+id, requestOptions, true );
}

exports.endAuction = function(id){
  const requestOptions = {
     method: 'get',
     headers: { 'Content-Type': 'application/json',
     'x-access-token': localStorage.getItem("HomExplorerToken") },
 };
  return callServer(url+"auctionResult/"+id, requestOptions, true );
}
