import styled from "styled-components";
import 'animate.css';

export const ServicesProductContainer = styled.div`
min-height: 30%;
padding:5%;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
background: #FAF9F6;

`
export const ServicesProductWrapper = styled.div`
max-width: 180rem;
margin: 0 auto;
display: grid;
grid-template-columns: repeat(auto-fit, minmax(35rem,1fr));
align-items: center;
grid-gap: 1.6rem;
padding: 0 5rem;
@media screen and (max-width: 140rem){
  max-width: 100%;
}
@media screen and (max-width: 50rem){
  padding:0;
grid-template-columns: repeat(auto-fit, minmax(25rem,1fr));
}
`
export const ServicesProductH1 = styled.h1`
font-size: 2.5rem;
color: #000;
margin-bottom: 6.4rem;

@media screen and (max-width: 48rem){
    font-size: 2rem;
}
`
export const ServicesBackground = {
background: "#010606",
}

export const ServicesH1Color  = {
color: "#fff",
}
