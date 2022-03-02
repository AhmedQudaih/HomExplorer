const Waiting = require("../components/waiting");
const url = "https://homeexplorerapi.herokuapp.com/";
//const url = "http://localhost:4000/";

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
     headers: { 'Content-Type': 'application/json' },
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
           body: formData
       };
       Waiting.Waiting(true);
          return callServer(url+"addEstate", requestOptions );
  }


  exports.updateEstate = function(formData) {
    const requestOptions = {
           method: 'put',
           body: formData
       };
       Waiting.Waiting(true);
      return callServer(url+"updateEstate", requestOptions );
  }



  exports.approveEstateRequests = function(formData) {

    const requestOptions = {
       method: 'get',
       headers: { 'Content-Type': 'application/json' },
   };
    return callServer(url+"getApproveEstateRequests", requestOptions, true );
  }

/*----------------------Sprint 2----------------------*/

exports.rate = function(data) {
  const requestOptions = {
         method: 'POST',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify(data)
     };
     Waiting.Waiting(true);
     return callServer(url+"addAndUpdateRate", requestOptions );
}

exports.getRate = function(id) {

  const requestOptions = {
     method: 'get',
     headers: { 'Content-Type': 'application/json' },
 };
  return callServer(url+"getRates/"+id, requestOptions );
}

exports.saveAndUnsave = function(data) {
  const requestOptions = {
         method: 'POST',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify(data)
     };
     Waiting.Waiting(true);
       return callServer(url+"saveAndUnsave", requestOptions );
}

exports.getSaved = function(id) {

  const requestOptions = {
     method: 'get',
     headers: { 'Content-Type': 'application/json' },
 };
  return callServer(url+"getSavedEstates/"+id, requestOptions );
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
     headers: { 'Content-Type': 'application/json' },
 };
  return callServer(url+"getVisitsDates/"+id, requestOptions, true );
}

exports.scheduleVisit = function(data){
  const requestOptions = {
    method:'POST',
    headers:{'Content-Type': 'application/json'},
    body: JSON.stringify(data)
  };
  Waiting.Waiting(true);
  return callServer(url+"scheduleVisit",requestOptions);
}

function callServer(url, requestOptions, noDataReply ){
  return (fetch(url,requestOptions).then(response => {
  if (response.ok) {
    return response.json();
  }
  throw response;
}).then(data => {
  Waiting.Waiting(false);
  return data.length !== 0 ? data: noDataReply?'NoData':[] ;


}).catch(error => {
  console.error("Error fetching data: ", error);
  Waiting.Waiting(false);
  return 'error';
}));
}
