import React from 'react';
import {Button} from '@mui/material';
import {BookmarkBorder as BookmarkBorderIcon, Bookmark as BookmarkIcon} from '@mui/icons-material';
import serverFunctions from '../serverFunctions/estate';
import {StatusAlert} from './appAlerts';
function SaveEstate(props) {
  const [save,setSave]= React.useState(props.save)
  const handleSave = async () => {
    const status = await serverFunctions.saveAndUnsave(props.estate._id);
     status ==='error'? StatusAlert(`error`):props.updateData("save",props.estate);
    setSave((pre)=>{return !pre})
  }
    return (<Button color="success" variant="outlined" onClick={handleSave} startIcon={save
        ? <BookmarkIcon/>
        : <BookmarkBorderIcon/>}>
      Save Estate
    </Button>);
};

export default SaveEstate;
