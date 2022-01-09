import React from 'react';
import { scroller } from "react-scroll";
import {
  EstateCardDivCard,
  EstateIcon,
  EstateCardH2,
  EstateCardDiv,EstateIcobDiv
} from './Styles/estateCardStyle';

function EstateCard(props){

    function handleDetails(){
      props.handleDetailsClick(props.data);
      scroller.scrollTo("details", {
        duration: 500,
        delay: 0,
        smooth: "easeInOutQuart",
      });
    };
  return(
    <EstateCardDivCard onClick={handleDetails}>

    <EstateIcobDiv >
    <EstateIcon src={'uploads/'+props.data.pic[0].name}  />
</EstateIcobDiv>
    <EstateCardH2>{props.data.price}
      $</EstateCardH2>
    <EstateCardDiv>
      <p>
        {props.data.desc.substring(0, 50) + "...."}
      </p>
    </EstateCardDiv>
  </EstateCardDivCard>
  );
}

export default EstateCard;
