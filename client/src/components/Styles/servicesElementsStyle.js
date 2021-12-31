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
max-width: 1250px;
margin: 0 auto;
display: grid;
grid-template-columns: repeat(auto-fit, minmax(350px,1fr));
align-items: center;
grid-gap: 16px;
padding: 0 50px;
@media screen and (max-width: 1400px){
  max-width: 100%;
}
`
export const ServicesH1 = styled.h1`
font-size: 2.5rem;
color: #fff;
margin-bottom: 64px;

@media screen and (max-width: 480px){
    font-size: 2rem;
}
`
