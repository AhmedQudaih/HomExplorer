const Waiting = require("../components/waiting");
const {callServer, url}= require('./callServer');

exports.login = function(formData) {
  const requestOptions = {
         method: 'POST',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify(formData)
     };
     Waiting.Waiting(true);
         return callServer(url+"user/login", requestOptions ).then(res => {
            if(res.token){
              localStorage.setItem("HomExplorerToken", res.token);
              localStorage.setItem("HomExplorerUserId", res.userId);
            }
            return res.message;
         });
}

  exports.addUser = function(formData) {
    const requestOptions = {
           method: 'POST',
           headers: { 'Content-Type': 'application/json' },
           body: JSON.stringify(formData)
       };
       Waiting.Waiting(true);
          return callServer(url+"user/addUser", requestOptions );
  }

exports.checkAdmin = function(id) {
  const requestOptions = {
         method: 'get',
         headers: { 'Content-Type': 'application/json' },
     };
     Waiting.Waiting(true);
        return callServer(url+"user/checkAdmin/"+id, requestOptions );
}

  exports.logOut = function() {
   localStorage.removeItem("HomExplorerToken");
   localStorage.removeItem("HomExplorerUserId");
  }
