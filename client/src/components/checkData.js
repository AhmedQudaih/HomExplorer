export const CheckData = (props) => {
  if (props === "error" || props === "NoData"|| props.length === 0) {
    if (props.length === 0){
      return "NoData";
    }
    return (props);
  }
  if (props === "Loading") {
    return ("Loading");
  }
  return false;
}


export const CheckAuth = () => {
  return localStorage.getItem('HomExplorerToken');
}

export const UserId = () => {
  return localStorage.getItem('HomExplorerUserId');
}


/*------------------------------ Estate Validation ------------------------------*/

export const EstateAuctionVali = (validation,estate) => {
    validation.duration= estate["auctionData.duration"]!==undefined && estate["auctionData.duration"] > 2 && estate["auctionData.duration"]< 15 ?"success":"error";
}




export const EstateFormVali = (validation,estate) => {

  validation.Price = estate.price!==undefined && estate.price > 0 && estate.price < 200000000?"success":"error";
  validation.Number_Of_Rooms = estate.numOfRooms!==undefined && estate.numOfRooms > 0 && estate.numOfRooms < 30  ? "success":"error";
  validation.Number_Of_BathRooms= estate.numOfBathRooms!==undefined && estate.numOfBathRooms > 0 && estate.numOfBathRooms < 30  ? "success":"error";
  validation.floor = estate.floor!==undefined && estate.floor >= 0 && estate.floor < 164  ? "success":"error";
  validation.Size= estate.size!==undefined && estate.size > 20 && estate.size < 10000?"success":"error";
  validation.Description= estate.desc!==undefined && estate.desc.length > 30 && estate.desc.match("[a-zA-Z0-9,#.-]+") ?"success":"error" ;
  validation.Address= estate.address!==undefined && estate.address.length > 4 && estate.address.match("[a-zA-Z0-9,#.-]+") ?"success":"error";
  validation.Type= estate.type!==undefined && estate.type.length > 0 ?"success":"error";
  validation.Category= estate.category!==undefined && estate.category.length > 0 ?"success":"error";
  validation.Contract= estate.contract!==undefined && estate.contract !== null ?"success":"error";
  validation.Images=  estate.pic.length > 0 ?"success":"error";

  }


  export const PredictionFormVali = (validation,estate) => {

    validation.Number_Of_Rooms = estate.numOfRooms!==undefined && estate.numOfRooms > 0 && estate.numOfRooms < 30  ? "success":"error";
    validation.Number_Of_BathRooms= estate.numOfBathRooms!==undefined && estate.numOfBathRooms > 0 && estate.numOfBathRooms < 30  ? "success":"error";
    validation.floor = estate.floor!==undefined && estate.floor >= 0 && estate.floor < 164  ? "success":"error";
    validation.Size= estate.size!==undefined && estate.size > 20 && estate.size < 10000?"success":"error";
    validation.Description= estate.desc!==undefined && estate.desc.length > 30 && estate.desc.match("[a-zA-Z0-9,#.-]+") ?"success":"error" ;
    validation.Address= estate.address!==undefined && estate.address.length > 4 && estate.address.match("[a-zA-Z0-9,#.-]+") ?"success":"error";
    validation.Type= estate.type!==undefined && estate.type.length > 0 ?"success":"error";
    validation.Category= estate.category!==undefined && estate.category.length > 0 ?"success":"error";
  
    }

export const EstateFormValiMsg = (msg) => {
  msg.Price="Price should be between 0 and 200000000";
  msg.Number_Of_Rooms="Number of Rooms should be between 0 and 30";
  msg.Number_Of_BathRooms="Number of Bathrooms should be between 0 and 30";
  msg.floor="Number of Floors should be between 0 and 164";
  msg.Size="Estate size should be between 20 and 10000";
  msg.Description="Estate description should be at least 30 words";
  msg.Address="Estate address should be at least 4 words";
  msg.Type="Choose estate Type";
  msg.Category="Choose estate Category";
  msg.Contract="Upload your estate contract";
  msg.Images="Upload your estate images";
  msg.duration="Estate duration should be between 2 and 15 weeks";
}

export const ScheduleInputeVal = (validation, value) => {
  validation.msg = "Date can't be at the past"
  var date1 = new Date(value);
  var date2 = new Date();
  if(date1 > date2){
    return "primary";
  }else{
    return "error";
  }
}

export const PlaceBidVal = (validation, value) => {
  validation.placeBid= value > 500 ?"primary":"error";
}


/*------------------------------ Validation Function ------------------------------*/

export const FormValid = (validation, msg) => {
    let alertMsg =""
    Object.entries(validation).forEach(([key, value]) => {
      (value === "error") && (alertMsg=alertMsg+"\n *"+msg[key])});
       return alertMsg;

}

/*------------------------------ User Validation ------------------------------*/
  export const UserFormVali = (validation,user) => {
    validation.Name = user.name!==undefined && user.name.length > 0 ?"success":"error";

    validation.Password = user.password!==undefined && user.password.match("(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*#?&^_-]).{8,}")? "success":"error";
    //eslint-disable-next-line
    validation.Email= user.email!==undefined && user.email.match(/.+\@.+\..+/) ? "success":"error";
    validation.PhoneNumber = user.phoneNumber!==undefined && user.phoneNumber.length > 0 && user.phoneNumber.length < 20   ? "success":"error";
  }

  export const UserFormValiMsg = (msg) => {
    msg.Name="Please Enter your fullname";
    msg.Password="Password Should be minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character";
    msg.Email="Please Enter correct email example@example.com";
    msg.PhoneNumber="Please Enter Phone Number";
  }
