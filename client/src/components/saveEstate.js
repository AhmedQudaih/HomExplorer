import React from 'react';
import {Button} from '@mui/material';
import {BookmarkBorder as BookmarkBorderIcon, Bookmark as BookmarkIcon} from '@material-ui/icons';
import serverFunctions from '../serverFunctions/estate';
import {StatusAlert} from './appAlerts';
function SaveEstate(props) {
  const [save,setSave]= React.useState(props.save)
  const handleSave = async () => {
    let Save = {};
    Save.userId = props.userId;
    Save.estateId = props.estate._id;
    const status = await serverFunctions.saveAndUnsave(Save);
     status ==='error'? StatusAlert(`error`):props.updateData("save",Save.estateId =props.estate );
    setSave((pre)=>{return !pre})
  }
    return (<Button color="success" variant="outlined" onClick={handleSave} startIcon={save
        ? <BookmarkIcon/>
        : <BookmarkBorderIcon/>}>
      Save Estate
    </Button>);
};

export default SaveEstate;
