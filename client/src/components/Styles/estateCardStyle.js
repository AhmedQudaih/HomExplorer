import styled from "styled-components";
import 'animate.css';


export const EstateCardDivCard = styled.div`
min-width:min-content;
animation: bounceInRight;
animation-duration: 2s;
background: #fff;
display: flex;
flex-direction: column;
justify-content: flex-start;
align-items: center;
border-radius: 10px;
padding: 30px;
box-shadow: 0 1px 3px rgba(0,0,0,0.2);
transition: all 0.2s ease-in-out;

 & > button:first-of-type{
  align-self: end;
}
 &.expandClass{

   grid-row-start: 3;
   grid-column: 1/-1;
   @media screen and (max-width: 1000px){
     grid-row-start: 2;

   }
   @media screen and (max-width: 768px){
     grid-row-start: auto;

   }
}
&:hover{
    transform: scale(1.02);
    transition: all 0.2s ease-in-out;
    cursor: pointer;
}

`

export const EstateIcon = styled.img`
border-radius: 10px;
height: 200px;
width: 300px;
margin-bottom: 10px;
&.expandIcone{
  height: 300px;
  width: 500px;
}
@media screen and (max-width: 768px){
&.expandIcone{
  height: 200px;
  width: 300px;
}
}
`



export const EstateCardH2 = styled.h2`
font-size: 1rem;
margin-bottom: 5px;
`



export const EstateCardDiv = styled.div`
font-size: 1rem;
text-align: center;
`
