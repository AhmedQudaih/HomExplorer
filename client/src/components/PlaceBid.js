import React from "react";
import {Button, TextField} from '@mui/material';
import serverFunctions from '../serverFunctions/estate';
import {StatusAlert,ValidationMsg, CheckOperation} from './appAlerts';
import {PlaceBidVal} from './checkData';
import { EstateCardH2} from './Styles/estateCardStyle';
import {ScheduleCard, ScheduleCardHeader} from './Styles/scheduleVisitStyle';
import {SmallNote} from './Styles/estateDetailsStyle';
const PlaceBid = (props) => {

  const [value, setValue] = React.useState("");
  const [currentBid, setCurrentBid] = React.useState(props.data.auctionHighestPrice.price);
  var total = currentBid + value;

  const validation={};
  PlaceBidVal(validation, value);


  const handlPlaceBidSubmite = async () => {

    if(validation.placeBid !== "primary"){
        return ValidationMsg("Your bid raise should be more than 500");
    }
      const confirm = await CheckOperation()
      if(confirm.isConfirmed === true){
        const status = await serverFunctions.placeBid({
          "estateId" : props.estateId,
          "price" : total
          });
        if(status==="error"){
          StatusAlert("error");
        }else{
          StatusAlert(status);
          setCurrentBid(total);
          setValue("");
        }
      }
  }
  return(
    <ScheduleCard>
    <ScheduleCardHeader>PlaceBid:</ScheduleCardHeader>
        <EstateCardH2>
            Current Highest Bid : {currentBid}
        </EstateCardH2>
        <EstateCardH2>
            Your Total Bid Amount: {total}
        </EstateCardH2>
        <TextField
            color = {validation.placeBid}
            variant = "outlined"
            type = "number"
            name="PlaceBidInpute"
            required
            onChange={(event)=>{setValue(parseInt(event.target.value))}}
            value = {value}
            / >
        <Button color="error" onClick={handlPlaceBidSubmite} variant="outlined" >
            Bid Now !
        </Button>
        <SmallNote>( {props.data.daysRemain} days Remain )</SmallNote>
    </ScheduleCard>
  );
}

export default PlaceBid;
