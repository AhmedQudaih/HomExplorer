import React from 'react';
import Rating from '@mui/material/Rating';
import serverFunctions from '../serverFunctions/estate'
import {StatusAlert} from './appAlerts';
function RateEstate(props){
 const [value, setValue] = React.useState(props.rate);
 const handleRate = (event, newValue) => {
     setValue(newValue);
     let Rate={};
     Rate.estateId=props.estateId;
     Rate.rate = newValue;
     SaveNewRate(Rate);
   }
   const SaveNewRate = async (newValue)=>{
     const status = await serverFunctions.rate(newValue);
     status ==='error'? StatusAlert(`error`):props.updateData("rate",newValue);
   }
  return(
    <div
        >
          <p>Rate:</p>
          <Rating
            size="large"
            value={value}
            onChange={handleRate}
          />
        </div>
  );
};

export default RateEstate;
