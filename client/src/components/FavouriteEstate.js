import React from 'react';
import {Button , Box  } from '@mui/material';
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
  import serverFunctions from '../serverFunctions/estate';

function favouriteEstate (props){
const [estate, setEstate] = React.useState(props.data);
  const handleClose = () => setOpen(false);
  const [open, setOpen] = React.useState(false);
  const [expand, setExpand] = React.useState(false);
  const [data, setData] = React.useState('');
  const [page, setPage] = React.useState(1);
  const [change, setChange] = React.useState(false);
  const [partition, setPartition] = React.useState(0);
  const totalPages = Math.ceil(data.length / 6);
  const handlePageChange = (event, value) => {
    setPage(value);
    if(totalPages - value <= 1 ){
      getPartion();
    }
    const getPartion = () => {
      setPartition((pre)=>{
        return (pre + 1);
      })
    };
  const handleDetailsClick = (id) => {
    setExpand(id);
  };
  React.useEffect(() => {
    const fetchData = async ()=>{
      const data = await serverFunctions.getEstates(partition);
      setData((pre)=>{
        return[
          ...pre,
          ...data
        ]
      });
    }

    fetchData();
  },[partition, change])

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
    {
          data.slice((Math.ceil(page) - 1) * 6, Math.ceil(page) * 6).map((e) => (
            <EstateCard  key={e._id} data={e} expand={expand} handleDetailsClick={handleDetailsClick} />
           ))
        }
    <Box sx={{ m: "2%", padding: "0.5%",backgroundColor: 'white',borderRadius: "1rem"}}>
      <Button href="#services"><Pagination count={totalPages} page={page} color="success" onChange={handlePageChange}/></Button>
    </Box>
    </EstateMainForm>
</DialogContent>
</Dialog>


</div>
);

};
export default favouriteEstate;