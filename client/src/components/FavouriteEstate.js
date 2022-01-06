import React from 'react';
import {
    EstateMainForm,
    EstateFormTitle,
    EstateFormClose,
    EstateFormSubmitBtn,
    EstateFormAnimation,
    Input
  } from './Styles/estateFormStyle';
  import EstateCard from './estateCard';
  import {Button, Dialog ,DialogContent } from '@mui/material';
  import { Close as CloseIcon} from "@material-ui/icons";

function saveEstate (props){
const [estate, setEstate] = useState(props.data);
  const handleClose = () => setOpen(false);
  const [open, setOpen] = useState(false);

return(
     <div>
<Dialog style={EstateFormAnimation} open={open} onClose={handleClose} scroll={"paper"}>
    <div style={EstateFormClose}>
         <Button onClick={handleClose} color="success" >
             <CloseIcon />
         </Button>
    </div>
<DialogContent>
    <EstateMainForm>
    <EstateCard updateData={updateData} key={e._id} data={e} expand={expand} handleDetailsClick={handleDetailsClick} />
    </EstateMainForm>
</DialogContent>
</Dialog>


</div>
);

};
export default saveEstate;