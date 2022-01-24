import React from 'react';
import {
  EstateIcon,
  EstateIcobDiv} from './Styles/estateCardStyle';
import {Button} from '@mui/material';
import {
  KeyboardArrowRight, KeyboardArrowLeft,
} from "@material-ui/icons";

function PicSlider(props){

  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };


  return(<>
    <EstateIcobDiv className ={"expandIcone"} >
    <EstateIcon src={'uploads/'+props.pic[activeStep].name}  />
  </EstateIcobDiv>
  {props.pic.length > 1 &&
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
