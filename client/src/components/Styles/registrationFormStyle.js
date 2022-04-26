import styled from "styled-components";
import 'animate.css';
export const UserMainForm = styled.form`
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

export const UserFormTitleBtn = styled.h1`
 grid-column: 1/ -1;
 text-align: center;
 margin: 2% 0%;


`
export const UserFormBackBtn = styled.div`
 grid-row: 2 / 4;
 text-align: center;
 margin: 2% 0%;
 @media screen and (max-width: 76.8rem){
     grid-column: 1;

 }

`
export const UserFormSubmitBtn = styled.div`
 grid-column: 1 / -1;
 text-align: center;


`
