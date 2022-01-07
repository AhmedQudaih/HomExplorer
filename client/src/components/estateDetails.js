import React from 'react';
import {Button} from '@mui/material';
import EstateForm from './estateForm';
import MyMap from './map';
import {
  LocalOffer as LocalOfferIcon,
  LocationOnSharp as LocationOnSharpIcon,
  Home as VillaIcone,
  Apartment as ApartmentIcon,
  Delete as DeleteIcon,
  LocalHotel as LocalHotelIcon,
  Bathtub as BathtubIcon,
  FullscreenExit as FullscreenExitIcon,
  Close as CloseIcon,
  KeyboardArrowRight, KeyboardArrowLeft,
  Compare as CompareIcon
} from "@material-ui/icons";
import {
  ExpandedIconDetailsCard,
  DetailsBtnCard
} from './Styles/estateDetailsStyle';
import {
  EstateCardDiv,
  EstateCardDivCard,
  EstateIcon,
  EstateCardH2,
  EstateIcobDiv} from './Styles/estateCardStyle';
import serverFunctions from '../serverFunctions/estate'
import SaveEstate from './saveEstate'
import RateEstate from './rateEstate'
function EstateDetails(props){

  const handelDeleteBtn = async (id) => {
        const Status = await serverFunctions.deleteEstate(id);
          Status ==='error'? alert(`Somthing went wrong try again later`):props.updateData();
  }


const [activeStep, setActiveStep] = React.useState(0);
const handleNext = () => {
  setActiveStep((prevActiveStep) => prevActiveStep + 1);
};
const handleBack = () => {
  setActiveStep((prevActiveStep) => prevActiveStep - 1);
};
const handleClose = () => {
  if(props.compare === props.data._id){
    props.compareFunc(false);
  }else{
    props.handleDetailsClick(false)
  }
};



  return(
      <EstateCardDivCard className ={!props.compare &&"expandClass"} >

        <Button onClick={handleClose} color="success" >
          <CloseIcon />
        </Button>

      <EstateIcobDiv className ={"expandIcone"} >
      <EstateIcon src={'uploads/'+props.data.pic[activeStep].name}  />
  </EstateIcobDiv>

        <div>
              <Button size="small" onClick={handleBack} disabled={activeStep === 0 }>
                  <KeyboardArrowLeft />
              </Button>
            <Button size="small" onClick={handleNext} disabled={activeStep === props.data.pic.length-1}>
                <KeyboardArrowRight />
            </Button>
          </div>
      <EstateCardH2>{props.data.price}
        $</EstateCardH2>
      <EstateCardDiv>
        <p>
          {props.data.desc}
        </p>
      </EstateCardDiv>
    <ExpandedIconDetailsCard>
      <EstateCardDiv>
       <VillaIcone fontSize='large'/>
        <p>
          {props.data.category.name}
        </p>
      </EstateCardDiv>
      <EstateCardDiv>
        <FullscreenExitIcon fontSize='large' />
        <p>
          {props.data.size}
        </p>
      </EstateCardDiv>
      <EstateCardDiv>
        <ApartmentIcon fontSize='large' />
        <p>
        {props.data.category.name === "Apartment" ? "on the " + props.data.floor+" floor" : props.data.floor +" floors"}
        </p>
      </EstateCardDiv>

      <EstateCardDiv>
        <LocalHotelIcon fontSize='large'/>
        <p>{props.data.numOfRooms}
        </p>
      </EstateCardDiv>
      <EstateCardDiv>
        <BathtubIcon fontSize='large' />
        <p>
          {props.data.numOfBathRooms}
        </p>
      </EstateCardDiv>
      <EstateCardDiv>
        <LocalOfferIcon fontSize='large' />
        <p> {props.data.type.name}</p>
      </EstateCardDiv>
    </ExpandedIconDetailsCard>
    <EstateCardDiv>
      <LocationOnSharpIcon  fontSize='large'/>
      <p>{props.data.address}</p>
    </EstateCardDiv>

    <MyMap Location={[props.data.addressOnMap[0],props.data.addressOnMap[1]]} />


  <DetailsBtnCard>
    <Button color="primary"   onClick={()=>props.compareFunc(props.data)}  variant="outlined" startIcon={<CompareIcon  />}>
      Compare
    </Button>
    <RateEstate />

  <SaveEstate show={"Icon"} />
</DetailsBtnCard >
<DetailsBtnCard>
  <Button color="error" onClick={()=>handelDeleteBtn(props.data._id)} variant="outlined" startIcon={<DeleteIcon />}>
    Delete
  </Button>

  <EstateForm updateData={props.updateData} type={"Update"} data={props.data}/>
</DetailsBtnCard >


</EstateCardDivCard>

  );
}

export default EstateDetails
EstateDetails.defaultProps = {
  compare:false
}
