const Waiting = require("../components/waiting");
const {callServer, url}= require('./callServer');

exports.login = function(formData) {
  const requestOptions = {
         method: 'POST',
         body: formData
     };
     Waiting.Waiting(true);
        return callServer(url+"user/login", requestOptions );
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
