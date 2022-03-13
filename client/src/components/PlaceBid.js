import React from "react";
import {Button, TextField} from '@mui/material';
import serverFunctions from '../serverFunctions/estate';
import {StatusAlert,ValidationMsg, CheckOperation} from './appAlerts';
import {PlaceBidVal} from './checkData';
import { EstateCardH2} from './Styles/estateCardStyle';
import {ScheduleCard, ScheduleCardHeader} from './Styles/scheduleVisitStyle';

const PlaceBid = (props) => {

  const [value, setValue] = React.useState("");
  const [currentBid, setCurrentBid] = React.useState(0);
  var total = currentBid + value;

    React.useEffect(() => {
      const fetchData = async () => {
        const currBid = await serverFunctions.getHighestPrice(props.estateId);
        setCurrentBid(parseInt(currBid.price))


      }
      fetchData();
    }, [props.estateId]);



  const validation={};
  PlaceBidVal(validation, value);


  const handlPlaceBidSubmite = async () => {

    if(validation.placeBid !== "primary"){
        return ValidationMsg("Your bid raise should be more than 500");
    }
      const confirm = await CheckOperation()
      if(confirm.isConfirmed === true){
        const status = await serverFunctions.placeBid({
          "userId" : props.userId,
          "estateId" : props.estateId,
          "price" : total
          });
        if(status==="error"){
          StatusAlert("error");
        }else{
          StatusAlert("Bid submited with amount: "+total);
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
    </ScheduleCard>
  );
}

export default PlaceBid;
