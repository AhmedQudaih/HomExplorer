import React from "react";
import {Button, TextField} from '@mui/material';
import serverFunctions from '../serverFunctions/estate';
import {StatusAlert,ValidationMsg} from './appAlerts';
import {ScheduleInputeVal} from './checkData';
import { EstateCardH2} from './Styles/estateCardStyle';
import { DetailsBtnCard} from './Styles/estateDetailsStyle';

const PlaceBid = (props) => {
  const [value, setValue] = React.useState('');
  const validation={};
   validation.value = ScheduleInputeVal(validation, value);
   const currentBid=50; // This Will change from DataBase !!
  const handlPlaceBidSubmite = async () => {
    if(validation.value === "primary"){
        const status = await serverFunctions.scheduleVisit({
          "visitorId" : props.userId,
          "estateId" : props.estateId._id,
          "date" : value
          });
        if(status==="error"){
          StatusAlert("error");
        }else{
          if(props.updateFunc){
            props.updateFunc(props.estateId,"pending");
          }
          StatusAlert("Visit booked at "+value);
        }
      }else{
        ValidationMsg(validation.msg);
      }
  }
  return(
       
    <DetailsBtnCard>
        <EstateCardH2>
            Current Bid : {currentBid}
        </EstateCardH2>
        <EstateCardH2>
            Your Min Bid:{value}
        </EstateCardH2>
        <TextField
            color = {validation.value}
            variant = "outlined"
            type = "number"
            name="PlaceBidInpute"
            required
            onChange={(event)=>{setValue(event.target.value)}}
            value = {value}
            / >
        <Button color={validation.value} onClick={handlPlaceBidSubmite} variant="outlined" >
            Bid Now !
        </Button>
</DetailsBtnCard>
  );
}

export default PlaceBid;
