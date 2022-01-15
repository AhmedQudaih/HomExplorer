import React from 'react';
import EstateDetails from './estateDetails';
import {ServicesProductWrapper} from './Styles/servicesElementsStyle';
function DetailsAndCompare(props){


return(
    <ServicesProductWrapper id="details" name="details" >
      {props.compare &&
        <EstateDetails key={props.compare._id} updateData={props.updateData} compare={props.compare._id} compareFunc={props.compareFunc} handleDetailsClick={props.handleDetailsClick} data={props.compare} />
      }
  {props.details &&
        <EstateDetails key={props.details._id} updateData={props.updateData} compare={props.compare._id} compareFunc={props.compareFunc} handleDetailsClick={props.handleDetailsClick} data={props.details} />
  }
  </ServicesProductWrapper>
  );
}

export default DetailsAndCompare;
