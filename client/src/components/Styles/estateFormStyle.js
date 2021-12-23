import styled from "styled-components";
import {DialogTitle} from '@mui/material';
export const EstateMainForm = styled.form`
display: grid;
grid-template-columns: 1fr 1fr;
align-items: center;
grid-gap: 16px;
padding:2.5%;
background: #ffff;


}
@media screen and (max-width: 768px){
    grid-template-columns: 1fr;
}

`
export const EstateFormClose = {
    textAlign: "end",
}

export const EstateFormTitle = styled(DialogTitle)`
 text-align: center;
 color: #01bf71;
`
export const EstateFormSubmitBtn = styled.div`
 grid-column: span 2;
 text-align: center;
 @media screen and (max-width: 768px){
     grid-column: 1;

 }

`
