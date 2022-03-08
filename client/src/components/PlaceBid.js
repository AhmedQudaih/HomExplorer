import React from "react";
import {Button, TextField} from '@mui/material';
import serverFunctions from '../serverFunctions/estate';
import {StatusAlert,ValidationMsg, CheckOperation} from './appAlerts';
import {PlaceBidVal} from './checkData';
import { EstateCardH2} from './Styles/estateCardStyle';
import { DetailsBtnCard} from './Styles/estateDetailsStyle';
import {ScheduleCard, ScheduleCardHeader} from './Styles/scheduleVisitStyle';

const PlaceBid = (props) => {

  const [value, setValue] = React.useState('');

  const validation={};
  PlaceBidVal(validation, value);

   const currentBid=50; // This Will change from DataBase !!

  const handlPlaceBidSubmite = async () => {

    if(validation.placeBid !== "primary"){
        return ValidationMsg("Your bid raise should be more than 500");
    }
      const confirm = await CheckOperation()
      if(confirm.isConfirmed === true){
        const status = await serverFunctions.placeBid({
          "userId" : props.userId,
          "estateId" : props.estateId._id,
          "price" : value
          });
        if(status==="error"){
          StatusAlert("error");
        }else{
          StatusAlert("Bid submited with amount: "+value);
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
            Your Total Bid Amount: {value}
        </EstateCardH2>
        <TextField
            color = {validation.placeBid}
            variant = "outlined"
            type = "number"
            name="PlaceBidInpute"
            required
            onChange={(event)=>{setValue(event.target.value)}}
            value = {value}
            / >
        <Button color="error" onClick={handlPlaceBidSubmite} variant="outlined" >
            Bid Now !
        </Button>
    </ScheduleCard>
  );
}

export default PlaceBid;
