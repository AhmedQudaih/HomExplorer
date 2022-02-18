import React from "react";
import {ScheduleCard, ScheduleCardHeader} from './Styles/scheduleVisitStyle';
import {Button, TextField} from '@mui/material';
import serverFunctions from '../serverFunctions/estate';
import {StatusAlert,ValidationMsg} from './appAlerts';
import {ScheduleInputeVal} from './checkData';

const ScheduleVisit = (props) => {
  const [value, setValue] = React.useState('');
  const validation={};
   validation.value = ScheduleInputeVal(validation, value);
  const handleScheduleSubmite = async () => {
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
    <ScheduleCard>
    <ScheduleCardHeader>{props.update?"ReSchedule":"Schedule"} Visit:</ScheduleCardHeader>
    <TextField
    color = {validation.value}
    variant = "outlined"
    type = "datetime-local"
    name="scheduleVisiteInpute"
    required
    onChange={(event)=>{setValue(event.target.value)}}
    value = {value}
    / >
    <Button color={validation.value} onClick={handleScheduleSubmite} variant="outlined" >
      Schedule Visit
    </Button>

    </ScheduleCard>
  );
}

export default ScheduleVisit;
