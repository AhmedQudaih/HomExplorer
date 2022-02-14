const url = "https://homeexplorerapi.herokuapp.com/";
exports.getEstates = function(partition) {
  const requestOptions = {
     method: 'get',
     headers: { 'Content-Type': 'application/json' },
 };
  return callServer(url+"getEstates/"+partition, requestOptions );
}

exports.deleteEstate = function(id) {
  const requestOptions = {
     method: 'delete',
     headers: { 'Content-Type': 'application/json' },
     body: JSON.stringify({ _id: id })
 };
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
          return callServer(url+"addEstate", requestOptions );
  }


  exports.updateEstate = function(formData) {
    const requestOptions = {
           method: 'put',
           body: formData
       };

      return callServer(url+"updateEstate", requestOptions );
  }



  exports.approveEstateRequests = function(formData) {

    const requestOptions = {
       method: 'get',
       headers: { 'Content-Type': 'application/json' },
   };
    return callServer(url+"getApproveEstateRequests", requestOptions );
  }

/*----------------------Sprint 2----------------------*/

exports.rate = function(data) {
  const requestOptions = {
         method: 'POST',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify(data)
     };
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
     return callServer(url+"search", requestOptions );
}



/*----------------------Sprint 3----------------------*/

exports.getVisits = function(id){
  const requestOptions = {
     method: 'get',
     headers: { 'Content-Type': 'application/json' },
 };
  return callServer(url+"getVisitsDates/"+id, requestOptions );
}

exports.scheduleVisit = function(data){
  const requestOptions = {
    method:'POST',
    headers:{'Content-Type': 'application/json'},
    body: JSON.stringify(data)
  };
  return callServer(url+"scheduleVisit",requestOptions);
}



function callServer(url, requestOptions ){
  return (fetch(url,requestOptions).then(response => {
  if (response.ok) {
    return response.json();
  }
  throw response;
}).then(data => {
  return data.length === 0 ? []: data;


}).catch(error => {
  console.error("Error fetching data: ", error);
  return 'error';
}));
}
