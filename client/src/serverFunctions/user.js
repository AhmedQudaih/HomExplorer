const Waiting = require("../components/waiting");
const {callServer, url}= require('./callServer');

exports.login = function(formData) {
  const requestOptions = {
         method: 'POST',
         body: formData
     };
     Waiting.Waiting(true);
        return callServer(url+"login", requestOptions );
}

  exports.addUser = function(formData) {
    const requestOptions = {
           method: 'POST',
           body: formData
       };
       Waiting.Waiting(true);
          return callServer(url+"addUser", requestOptions );
  }
