import React from 'react';
import { scroller } from "react-scroll";
import {
  EstateCardDivCard,
  EstateCardH2,
  EstateCardDiv
} from './Styles/estateCardStyle';
import PicSlider from './picSlider'

function EstateCard(props){
    function handleDetails(){
      props.handleDetailsClick("details",props.data);
      scroller.scrollTo("details", {
        duration: 500,
        delay: 0,
        smooth: "easeInOutQuart",
      });
    };
  return(
    <EstateCardDivCard onClick={handleDetails}>

    <PicSlider pic={[props.data.pic[0]]} />
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
