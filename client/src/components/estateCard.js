import React from 'react';
import {Button , Collapse} from '@mui/material';
import EstateDetails from './estateDetails';
import {
  EstateCardDivCard,
  EstateIcon,
  EstateCardH2,
  EstateCardDiv,
} from './Styles/estateCardStyle';
import {
  Close as CloseIcon,
  KeyboardArrowRight, KeyboardArrowLeft
} from "@material-ui/icons";

function EstateCard(props){
  const [activeStep, setActiveStep] = React.useState(0);
  const expand = (props.expand === props.data._id?true:false)
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };


  React.useEffect(() => {
  setActiveStep(0)
},[expand])


  return(
    <EstateCardDivCard className ={expand && "expandClass"} onClick={expand? null : () => props.handleDetailsClick(props.data._id)}>
      {expand &&
      <Button onClick={()=>props.handleDetailsClick(false)} color="success" >
        <CloseIcon />
      </Button>
    }
    <EstateIcon className ={expand && "expandIcone"} src={'uploads/'+props.data.pic[activeStep].name}  />
    {expand &&
      <div>
            <Button size="small" onClick={handleBack} disabled={activeStep === 0 }>
                <KeyboardArrowLeft />
            </Button>
          <Button size="small" onClick={handleNext} disabled={activeStep === props.data.pic.length-1}>
              <KeyboardArrowRight />
          </Button>
        </div>}
    <EstateCardH2>{props.data.price}
      $</EstateCardH2>
    <EstateCardDiv>
      <p>
        {expand ? props.data.desc : (props.data.desc.substring(0, 50) + "....")}
      </p>
    </EstateCardDiv>

    <Collapse in={expand} timeout="auto" unmountOnExit={true}>
      <EstateDetails updateData={props.updateData} data={props.data} />

    </Collapse>

  </EstateCardDivCard>
  );
}

export default EstateCard;
