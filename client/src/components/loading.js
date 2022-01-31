import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import {LoadingContainer} from './Styles/loadingStyle';
function Loading(props){
  if(props.mood === "error"){
  return(
      <LoadingContainer>
      <CircularProgress color="success" />
        </LoadingContainer>
  );
}else {
  return(
      <LoadingContainer>
      <CircularProgress color="success" />
      <CircularProgress color="success" />
        </LoadingContainer>
  );
}
}

export default Loading;
