import React from 'react'
import {MuiAlert ,Snackbar} from '@mui/material';


const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


function ResponseMessages(props){
  const [open, setOpen] = React.useState(true);

  const handleClose = (event, reason) => {
    setOpen(false);
  };
  return(
    <div>
       <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
         <Alert onClose={handleClose} severity={props.value?"success":"error"} sx={{ width: '100%' }}>
           This is a success message!
         </Alert>
       </Snackbar>

    </div>
  );
}

export default ResponseMessages;


/*{
import ResponseMessages from './responseMessages';
  <ResponseMessages value={false}/>

}*/
