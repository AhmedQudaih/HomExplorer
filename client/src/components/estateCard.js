import React from 'react';
import {
  EstateCardDivCard,
  EstateIcon,
  EstateCardH2,
  EstateCardDiv,EstateIcobDiv
} from './Styles/estateCardStyle';


function EstateCard(props){

  return(
    <EstateCardDivCard onClick={() => props.handleDetailsClick(props.data)}>

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
