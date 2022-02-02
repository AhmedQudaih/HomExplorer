exports.CheckData = (props) => {

  if (props.includes("error")) {
    return ("error");
  }
  if (props.includes(0)) {
    return ("No_data");
  }
  return false;
}

exports.EstateFormVali = (validation,estate) => {

  validation.Price = estate.price > 0 && estate.price < 200000000?"success":"error";
  validation.Number_Of_Rooms = estate.numOfRooms > 0 && estate.numOfRooms < 30  ? "success":"error";
  validation.Number_Of_BathRooms= estate.numOfBathRooms > 0 && estate.numOfBathRooms < 30  ? "success":"error";
  validation.floor = estate.floor >= 0 && estate.floor < 164  ? "success":"error";
  validation.Size= estate.size > 20 && estate.size < 10000?"success":"error";
  validation.Description= estate.desc.length > 30 ?"success":"error" ;
  validation.Address= estate.address.length > 4 ?"success":"error";
  validation.Type= estate.type.length > 0 ?"success":"error";
  validation.Category= estate.category.length > 0 ?"success":"error";
  validation.Contract= estate.contract !== null ?"success":"error";
  validation.Images= estate.pic.length > 0 ?"success":"error";

}
exports.EstateFormValiMsg = (msg) => {
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
}

exports.ScheduleInputeVal = (validation, value) => {
  validation.msg = "Date can't be at the past"
  var date1 = new Date(value);
  var date2 = new Date();
  if(date1 > date2){
    return "primary";
  }else{
    return "error";
  }
}

exports.FormValid = (validation, msg) => {
    let alertMsg =""
    Object.entries(validation).forEach(([key, value]) => {
      (value === "error") && (alertMsg=alertMsg+"\n *"+msg[key])});
       return alertMsg;

}
