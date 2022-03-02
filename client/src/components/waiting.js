import React from 'react';
import ReactDOM from 'react-dom';
import CircularProgress from '@mui/material/CircularProgress';
import Backdrop from '@mui/material/Backdrop';


export const Waiting =  (props) =>{
if (props){
ReactDOM.render(

  <Backdrop
  sx={{ color: '#FAF9F6', zIndex: (theme) => theme.zIndex.drawer + 1 }}
  open={true}
  >
    <CircularProgress color="success" />
</Backdrop>,

  document.getElementById('loading')
);
}else{
  ReactDOM.unmountComponentAtNode(document.getElementById('loading'));
}


}
