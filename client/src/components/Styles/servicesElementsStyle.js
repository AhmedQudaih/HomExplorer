import styled from "styled-components";
import 'animate.css';
export const ServicesContainer = styled.div`
min-height: 30%;
padding:5%;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
background: #010606;

`
export const ServicesWrapper = styled.div`
max-width: 100%;
margin: 0 auto;
display: grid;
grid-template-columns: repeat(auto-fit, minmax(300px,1fr));
align-items: center;
grid-gap: 16px;
padding: 0 50px;
`




export const ServicesCard = styled.div`
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

   grid-row-start: 2;
   grid-column: span 3;
   @media screen and (max-width: 1000px){
     grid-row-start: 2;
     grid-column: span 2;
   }
   @media screen and (max-width: 768px){
     grid-row-start: auto;
     grid-column: span 1;
   }
}
&:hover{
    transform: scale(1.02);
    transition: all 0.2s ease-in-out;
    cursor: pointer;
}
`


export const ServicesBtnCard = styled.div`

display: flex;
flex-direction: row;
justify-content: space-between;
margin: 5% auto;
border-radius: 10px;
padding: 30px;
box-shadow: 0 1px 3px rgba(0,0,0,0.2);
transition: all 0.2s ease-in-out;
`

export const ExpandedIconServicesCard = styled.div`
margin: 5% auto;
display: grid;
grid-template-columns: 1fr 1fr 1fr 1fr 1fr ;
grid-gap: 20px;
transition: all 0.2s ease-in-out;
`



export const ServicesIcon = styled.img`
height: 160px;
width: 160px;
margin-bottom: 10px;
`
export const ServicesH1 = styled.h1`
font-size: 2.5rem;
color: #fff;
margin-bottom: 64px;

@media screen and (max-width: 480px){
    font-size: 2rem;
}
`
export const ServicesH2 = styled.h2`
font-size: 1rem;
margin-bottom: 5px;


`
export const ServicesDiv = styled.div`
font-size: 1rem;
text-align: center;
`
