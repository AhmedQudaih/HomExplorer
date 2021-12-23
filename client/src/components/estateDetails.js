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
  ServicesDiv,
  ExpandedIconServicesCard,
  ServicesBtnCard
} from './Styles/servicesElementsStyle';
function EstateDetails(props){

    const handelDeleteBtn = (id) => {
      const requestOptions = {
         method: 'delete',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify({ _id: id })
     };
  fetch("http://localhost:4000/deleteEstate",requestOptions).then(response => {
    if (response.ok) {
      return response.json();
    }
    throw response;
  }).then(data => {
  console.log(data);
  }).catch(error => {
    console.error("Error fetching data: ", error);
  })

    };


  return(
    <div>
    <ExpandedIconServicesCard>
      <ServicesDiv>
        {props.data.category === "Apartment" ? <ApartmentIcon /> : <VillaIcone/>}
        <p>
          {props.data.category.name}
        </p>
      </ServicesDiv>
      <ServicesDiv>
        <FullscreenExitIcon/>
        <p>
          {props.data.details['size']}
        </p>
      </ServicesDiv>
      <ServicesDiv>
        <LocalHotelIcon/>
        <p>{props.data.details['numOfRooms']}
        </p>
      </ServicesDiv>
      <ServicesDiv>
        <BathtubIcon/>
        <p>
          {props.data.details['numOfBathRooms']}
        </p>
      </ServicesDiv>
      <ServicesDiv>
        <LocalOfferIcon/>
        <p> {props.data.type.name}</p>
      </ServicesDiv>
    </ExpandedIconServicesCard>
    <ServicesDiv>
      <LocationOnSharpIcon/>
      <p>Address Address Address Address Address Address{props.data.Address}</p>
    </ServicesDiv>

    <MyMap Location={[props.data.addressOnMap[0],props.data.addressOnMap[1]]} />

    <ServicesBtnCard>
      <Button color="error" onClick={()=>handelDeleteBtn(props.data._id)} variant="outlined" startIcon={<DeleteIcon />}>
        Delete
      </Button>
      <EstateForm data={props.data}/>
    </ServicesBtnCard >
    </div>
  );
}

export default EstateDetails
