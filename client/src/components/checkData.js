export const CheckData = (props) => {

  if (props.includes("error")) {
    return ("error");
  }
  if (props.includes("NoData")) {
    return ("NoData");
  }
  if (props.includes(0)) {
    return ("Loading");
  }
  return false;
}


export const EstateAuctionVali = (validation,estate) => {
    validation.duration= estate["auctionData.duration"]!==undefined && estate["auctionData.duration"] > 2 && estate["auctionData.duration"]< 15 ?"success":"error";
}




export const EstateFormVali = (validation,estate) => {

  validation.Price = estate.price!==undefined && estate.price > 0 && estate.price < 200000000?"success":"error";
  validation.Number_Of_Rooms = estate.numOfRooms!==undefined && estate.numOfRooms > 0 && estate.numOfRooms < 30  ? "success":"error";
  validation.Number_Of_BathRooms= estate.numOfBathRooms!==undefined && estate.numOfBathRooms > 0 && estate.numOfBathRooms < 30  ? "success":"error";
  validation.floor = estate.floor!==undefined && estate.floor >= 0 && estate.floor < 164  ? "success":"error";
  validation.Size= estate.size!==undefined && estate.size > 20 && estate.size < 10000?"success":"error";
  validation.Description= estate.desc!==undefined && estate.desc.length > 30 ?"success":"error" ;
  validation.Address= estate.address!==undefined && estate.address.length > 4 ?"success":"error";
  validation.Type= estate.type!==undefined && estate.type.length > 0 ?"success":"error";
  validation.Category= estate.category!==undefined && estate.category.length > 0 ?"success":"error";
  validation.Contract= estate.contract!==undefined && estate.contract !== null ?"success":"error";
  validation.Images=  estate.pic.length > 0 ?"success":"error";

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
  msg.duration="Estate duration should be between 2 and 15 days";
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


export const FormValid = (validation, msg) => {
    let alertMsg =""
    Object.entries(validation).forEach(([key, value]) => {
      (value === "error") && (alertMsg=alertMsg+"\n *"+msg[key])});
       return alertMsg;

}
