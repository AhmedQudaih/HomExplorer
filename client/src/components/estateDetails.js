import React from 'react';
import MyMap from './map';
import {
  LocalOffer as LocalOfferIcon,
  LocationOnSharp as LocationOnSharpIcon,
  Home as VillaIcone,
  Apartment as ApartmentIcon,
  LocalHotel as LocalHotelIcon,
  Bathtub as BathtubIcon,
  FullscreenExit as FullscreenExitIcon,
} from "@material-ui/icons";
import {ExpandedIconDetailsCard} from './Styles/estateDetailsStyle';
import {
  EstateCardDiv,
  EstateCardH2,} from './Styles/estateCardStyle';
import PicSlider from './picSlider'
function EstateDetails(props){



  return(
        <>
        <PicSlider pic={props.data.pic} />
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
    <MyMap Location={[...props.data.addressOnMap]} />
    </>
  );
}

export default EstateDetails
EstateDetails.defaultProps = {
  compare:false
}
