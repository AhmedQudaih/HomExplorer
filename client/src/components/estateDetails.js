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
} from "@material-ui/icons";
import {
  ExpandedIconDetailsCard,
  DetailsBtnCard
} from './Styles/estateDetailsStyle';
import {EstateCardDiv} from './Styles/estateCardStyle';
import serverFunctions from '../serverFunctions/estate'
function EstateDetails(props){

  const handelDeleteBtn = async (id) => {
        const Status = await serverFunctions.deleteEstate(id);
          Status ==='error'? alert(`Somthing went wrong try again later`):props.updateData();
  }


  return(
    <div>
    <ExpandedIconDetailsCard>
      <EstateCardDiv>
        {props.data.category === "Apartment" ? <ApartmentIcon /> : <VillaIcone/>}
        <p>
          {props.data.category.name}
        </p>
      </EstateCardDiv>
      <EstateCardDiv>
        <FullscreenExitIcon/>
        <p>
          {props.data.size}
        </p>
      </EstateCardDiv>
      <EstateCardDiv>
        <LocalHotelIcon/>
        <p>{props.data.numOfRooms}
        </p>
      </EstateCardDiv>
      <EstateCardDiv>
        <BathtubIcon/>
        <p>
          {props.data.numOfBathRooms}
        </p>
      </EstateCardDiv>
      <EstateCardDiv>
        <LocalOfferIcon/>
        <p> {props.data.type.name}</p>
      </EstateCardDiv>
    </ExpandedIconDetailsCard>
    <EstateCardDiv>
      <LocationOnSharpIcon/>
      <p>{props.data.address}</p>
    </EstateCardDiv>

    <MyMap Location={[props.data.addressOnMap[0],props.data.addressOnMap[1]]} />

    <DetailsBtnCard>
      <Button color="error" onClick={()=>handelDeleteBtn(props.data._id)} variant="outlined" startIcon={<DeleteIcon />}>
        Delete
      </Button>
      <EstateForm updateData={props.updateData} type={"Update"} data={props.data}/>
  </DetailsBtnCard >
</div>
  );
}

export default EstateDetails
