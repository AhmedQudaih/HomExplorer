import React from 'react';
import Rating from '@mui/material/Rating';
import serverFunctions from '../serverFunctions/estate'
import {StatusAlert} from './appAlerts';
import {SmallNote} from './Styles/estateDetailsStyle'
function RateEstate(props){
 const [value, setValue] = React.useState(0);
 const handleRate = async (event, newValue) => {
     let Rate={};
     Rate.estateId=props.estateId;
     Rate.rate = newValue;
     const res = await serverFunctions.rate(Rate);
     if(res ==='error'){
       StatusAlert(`error`)
     }else{
       StatusAlert('Rate submitted');
       setValue(newValue);
     }
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
        <p><SmallNote>Estate overall rate : ( {props.rate} )</SmallNote></p>
        </div>
  );
};

export default RateEstate;
