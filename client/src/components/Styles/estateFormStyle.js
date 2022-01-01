import styled from "styled-components";
import {DialogTitle} from '@mui/material';
import 'animate.css';
export const EstateMainForm = styled.form`
display: grid;
grid-template-columns: 1fr 1fr;
align-items: center;
grid-gap: 1.6rem;
padding: 2% 0%;
background: #ffff;

}
@media screen and (max-width: 76.8rem){
    grid-template-columns: 1fr;
}

`
export const EstateFormClose = {
    textAlign: "end",
}

export const Input = styled('input')({
  display: 'none',
});
export const EstateFormAnimation = {
  animation: "fadeIn",
  animationDuration: "0.5s"
}

export const EstateFormTitle = styled(DialogTitle)`
 text-align: center;
 color: #01bf71;

`
export const EstateFormSubmitBtn = styled.div`
 grid-column: span 2;
 text-align: center;
 @media screen and (max-width: 76.8rem){
     grid-column: 1;

 }

`
