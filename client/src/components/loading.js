import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import {LoadingContainer,Heading, IconNoDataWrap, IconNoData , NoDataContainer} from './Styles/loadingStyle';
import img from '../images/sad.svg';

function Loading(props){
  if(props.mood === "error"){
  return(
      <LoadingContainer>
      <CircularProgress color="success" />
        </LoadingContainer>
  );
}else {
  return(
      <NoDataContainer>
        <IconNoDataWrap>
            <IconNoData src={img} alt={"alt"} />
        </IconNoDataWrap>
        <Heading>[No Data]</Heading>
        </NoDataContainer>
  );
}
}

export default Loading;
