import React from 'react';
import {Button} from '@mui/material';
import {BookmarkBorder as BookmarkBorderIcon, Bookmark as BookmarkIcon} from '@material-ui/icons';
import serverFunctions from '../serverFunctions/estate'
import { useNavigate  } from 'react-router-dom';
function SaveEstate(props) {
  const [save,setSave]= React.useState(props.save)
  const handleSave = async () => {
    let Save = {};
    Save.userId = props.userId;
    Save.estateId = props.estate._id;
    const status = await serverFunctions.saveAndUnsave(Save);
     status ==='error'? alert(`Somthing went wrong try again later`):props.updateData("save",Save.estateId =props.estate );
    console.log(status);
    setSave((pre)=>{return !pre})
  }

  const navigate = useNavigate();
  const handleListClick = () => {
    navigate('/admin');
  }

  if (props.show === "Icon") {
    return (<Button color="success" variant="outlined" onClick={handleSave} startIcon={save
        ? <BookmarkIcon/>
        : <BookmarkBorderIcon/>}>
      Save Estate
    </Button>);
  }
  return (<div >
    <Button color="success" variant="outlined" onClick={handleListClick} startIcon={<BookmarkBorderIcon />}>
      Saved list
    </Button>
  </div>);

};

export default SaveEstate;
SaveEstate.defaultProps = {
  show: ""
}
