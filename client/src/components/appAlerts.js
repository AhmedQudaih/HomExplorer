
const Swal = require('sweetalert2')
const errorMsg ="Somthing went wrong try again later";
const successMsg = "successfully"
exports.StatusAlert = (props)=> {
let icon;
let message;
  if(props === 'error'){
     icon = 'error';
     message = errorMsg;
  }else{
     icon = 'success';
     message = props +" "+successMsg;
  }
  Swal.fire({
    position: 'top',
    icon: icon,
    title: message,
    showConfirmButton: false,
    timer: 5000,
    width: "80%"
  })
}

exports.CheckOperation = (props) =>{
  return (Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'confirm',
    width: "60%"
  }).then((result) => {
    return result;
  }))
}

exports.ValidationMsg = (props)=> {
Swal.fire({
  icon: "error",
  title:"Please check the following inputs :",
  html: '<pre>' + props + '</pre>',
  width: "80%"
})
}
