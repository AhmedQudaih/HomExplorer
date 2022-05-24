import styled from "styled-components";
import 'animate.css';


export const PredictionMainForm = styled.form`
display: grid;
grid-template-columns:  1fr 1fr;
align-items: center;
grid-gap: 1.6rem;
padding: 2% 0%;
margin: 2% 10%;
background: #f9f9f9;
transition: all 0.2s ease-in-out;
animation: backInRight;
animation-duration: 0.5s;

}
@media screen and (max-width: 76.8rem){
    grid-template-columns: 1fr;
}

`
export const PredictionFormTitleBtn = styled.h1`
 grid-column: 1/ -1;
 text-align: center;
 margin: 2% 0%;


`

export const PredictionFormBackBtn = styled.div`
 grid-column: 1 / -1;
 text-align: center;


`
