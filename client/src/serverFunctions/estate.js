
exports.getEstates = function(partition) {
    return (fetch('http://localhost:4000/getEstates/'+partition).then(response => {
    if (response.ok) {
      return response.json();
    }
    throw response;
  }).then(data => {
    return data
  }).catch(error => {
    console.error("Error fetching data: ", error);
    return [];
  }));

}

exports.deleteEstate = function(id) {
  const requestOptions = {
     method: 'delete',
     headers: { 'Content-Type': 'application/json' },
     body: JSON.stringify({ _id: id })
 };
    return(  fetch("http://localhost:4000/deleteEstate",requestOptions).then(response => {
      if (response.ok) {
      return response.json();
      }
      throw response;
      }).then(data => {
      return data;
      }).catch(error => {
      console.error("Error fetching data: ", error);
      return "error";
      }))
  }

  exports.getCategoryAndType = function() {
    return (fetch('http://localhost:4000/getCategoryAndType').then(response => {
      if (response.ok) {
        return response.json();
      }
      throw response;
    }).then(data => {
      return data;
    }).catch(error => {
      console.error("Error fetching data: ", error);
      return [];
    }))

  }


  exports.addEstate = function(formData) {
    const requestOptions = {
           method: 'POST',
           body: formData
       };
    return(fetch("http://localhost:4000/addEstate",requestOptions).then(response => {
        if (response.ok) {
          return response.json();
        }
        throw response;
      }).then(data => {
          return data;
      }).catch(error => {
        console.error("Error fetching data: ", error);
          return "error";
      }));

  }


  exports.updateEstate = function(formData) {
    const requestOptions = {
           method: 'put',
           body: formData
       };
      return(fetch("http://localhost:4000/updateEstate",requestOptions).then(response => {
          if (response.ok) {
            return response.json();
          }
          throw response;
        }).then(data => {
            return data;
        }).catch(error => {
          console.error("Error fetching data: ", error);
            return "error";
        }));
  }




/*
exports.findEstate = function(id) {
  getData(url + "findEstate/"+id);
}



exports.getApproveEstateRequests = function() {
 getData(url + "approveEstate");
}

*/
