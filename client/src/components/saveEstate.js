import React from 'react';
import {Button} from '@mui/material';
import {Close as CloseIcon ,Delete as DeleteIcon ,BookmarkBorder as BookmarkBorderIcon, Bookmark as BookmarkIcon} from '@material-ui/icons';

import {
  EstateMainForm,
  EstateFormTitle,
  EstateFormClose,
  EstateFormSubmitBtn,
  EstateFormAnimation,

} from './Styles/estateFormStyle';

import { Dialog ,DialogContent,Chip} from '@mui/material';
import Loading from './loading';


function SaveEstate(props){

    if(props.show ==="Icon"){
  return(
        <Button color="success" variant="outlined"  startIcon={props.saved?<BookmarkIcon />:<BookmarkBorderIcon  />} >
      Save
     </Button>
  );
}
return (
  <div >
     <Button onClick={handleOpen} color="success" variant="outlined" startIcon={<BookmarkBorderIcon />}>
       Saved list
     </Button>
  </div>
);

};

export default SaveEstate;
SaveEstate.defaultProps={
  saved:false,
  show:""
}
