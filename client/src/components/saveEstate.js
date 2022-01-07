import React from 'react';
import {Button} from '@mui/material';
import {BookmarkBorder as BookmarkBorderIcon, Bookmark as BookmarkIcon} from '@material-ui/icons';



function SaveEstate(props){

    if(props.show ==="Icon"){
  return(
        <Button color="success" variant="outlined"  startIcon={props.saved?<BookmarkIcon />:<BookmarkBorderIcon  />} >
      Save Estate
     </Button>
  );
}
return (
  <div >
     <Button color="success" variant="outlined" startIcon={<BookmarkBorderIcon />}>
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
