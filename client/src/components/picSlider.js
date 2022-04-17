import React from 'react';
import {
  EstateIcon,
  EstateIcobDiv} from './Styles/estateCardStyle';
import {Button} from '@mui/material';
import {
  KeyboardArrowRight, KeyboardArrowLeft,
} from "@mui/icons-material";

const url = "https://homeexplorerapi.herokuapp.com/uploads/"; // on Server
//const url = "http://localhost:4000/uploads/"; // on Local

function PicSlider(props){

  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };


  return(<>
    <EstateIcobDiv className ={props.from === "details" && "expandIcone"} >
    <EstateIcon src={url+props.pic[activeStep].name}  />
  </EstateIcobDiv>
  {props.from === "details" &&
      <div>
            <Button size="small" onClick={handleBack} disabled={activeStep === 0 }>
                <KeyboardArrowLeft />
            </Button>
          <Button size="small" onClick={handleNext} disabled={activeStep === props.pic.length-1}>
              <KeyboardArrowRight />
          </Button>
        </div>}
    </>)
}
export default PicSlider;
PicSlider.defaultProps = {
  from: ""
}
