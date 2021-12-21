import React, { useState } from "react";
import Icon1 from '../images/svg-4.svg';
import DeleteIcon from "@material-ui/icons/Delete";
import BathtubIcon from "@material-ui/icons/Bathtub";
import LocalHotelIcon from "@material-ui/icons/LocalHotel";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import DetailsIcon from "@material-ui/icons/Details";
import { 
  ServicesContainer, 
  ServicesH1, 
  ServicesWrapper, 
  ServicesCard,
  ServicesIcon, 
  ServicesH2, 
  ServicesDiv 
} from './Styles/servicesElementsStyle';

function Estate(props) {
  const [isExpanded, setExpanded] = useState(false);
  function handleClick() {
    props.onDelete(props.id);
  }
  function expand() {
    setExpanded(true);
  }
  return (
    <div>
    <ServicesContainer id="services">
        <ServicesH1>Estates</ServicesH1>
        <ServicesWrapper>
            <ServicesCard>
                <ServicesIcon src={Icon1} />
                <ServicesH2>{props.HomeType}</ServicesH2>
                <ServicesDiv>Size:{props.Size}</ServicesDiv>
                <ServicesDiv><AttachMoneyIcon /> {props.Price}</ServicesDiv>
                <ServicesDiv>{props.Bathroom} <BathtubIcon /></ServicesDiv>
                <ServicesDiv>{props.Room} <LocalHotelIcon /> </ServicesDiv>
                <ServicesDiv>{props.ToBuy}</ServicesDiv>
                <ServicesDiv>Address is : {props.Address}</ServicesDiv>
                <button onClick={handleClick}>
                <DeleteIcon />
                </button>
      <button onClick={expand}>
        <DetailsIcon />
      </button>

            </ServicesCard>
      
      </ServicesWrapper>
        </ServicesContainer>
    </div>
  );
}

export default Estate;
