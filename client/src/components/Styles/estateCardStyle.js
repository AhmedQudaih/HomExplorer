import styled from "styled-components";
import 'animate.css';


export const EstateCardDivCard = styled.div`
min-width:min-content;
background: #fff;
display: flex;
flex-direction: column;
justify-content: flex-start;
text-align: center;
border-radius: 1rem;
padding: 3rem;
box-shadow: 0 0.1rem 0.3rem rgba(0,0,0,0.2);
transition: all 0.2s ease-in-out;

 & > button:first-of-type{
  align-self: end;
}
 &.expandClass{

   grid-column: 1/-1;
}
&:hover{
    transform: scale(1.02);
    transition: all 0.2s ease-in-out;
    cursor: pointer;
}

`

export const EstateIcobDiv = styled.div`
align-self: center;
height:20rem;
margin-bottom: 1rem;
&.expandIcone{
  height: 30rem;
  width: 50rem;
}
@media screen and (max-width: 42rem){
&.expandIcone{
  height: 20rem;
  width: 100%;
}
`

export const EstateIcon = styled.img`
border-radius: 1rem;
height: 100%;
width: 100%;
object-fit:cover;
}
`



export const EstateCardH2 = styled.h2`
font-size: 1.3rem;
margin-bottom: 0.5rem;
`



export const EstateCardDiv = styled.div`
font-size:  1.3rem;
text-align: center;
`
