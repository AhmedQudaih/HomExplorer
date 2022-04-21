import React from 'react';
import {
  EstateMainForm,
  EstateFormTitle,
  EstateFormClose,
  EstateFormSubmitBtn,
  EstateFormAnimation,
} from './Styles/estateFormStyle';

import {Button , Dialog ,DialogContent} from '@mui/material';
import { Login as LoginIcon, Close as CloseIcon} from "@mui/icons-material";
import { NavBtnLink } from './Styles/navbarElementsStyle';
import serverFunctions from '../serverFunctions/user';
import {StatusAlert} from './appAlerts';
import { FormInputs} from './formInputs';
import { SidebarRoute } from './Styles/sidebarElementsStyle';
import { useNavigate} from "react-router-dom";
function LoginForm(props) {


  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [user, setUser] = React.useState({});
  const navigate = useNavigate();

  function handleChange(event) {
    let name = event.target.name;
     let value= event.target.value
    setUser((prevUser) => {
     return {
        ...prevUser,
          [name]:value
      };
    });
  }

  const submitLoginForm = async (event) =>{
    event.preventDefault();
      const Status = await serverFunctions.login(user);
      if(Status === 'Success'){
         navigate('/');
         StatusAlert('logged in');
       }else{
         StatusAlert("error", "Invalid Username or Password");
       }
  }



return(
    <div >
      {props.toggle?
            <SidebarRoute onClick={()=>{props.toggle(false);handleOpen()}} to="#">Sign In</SidebarRoute>:
                <NavBtnLink to="#" onClick={handleOpen}>Sign In</NavBtnLink>

      }
     <div>
           <Dialog style={EstateFormAnimation} open={open} onClose={handleClose} scroll={"paper"}>
             <div style={EstateFormClose}>
             <Button onClick={handleClose} color="success" >
             <CloseIcon />
             </Button>
             </div>
             <EstateFormTitle>  Login </EstateFormTitle>
            <DialogContent dividers >
               <EstateMainForm onSubmit={submitLoginForm}>
                 <FormInputs validation={"success"} type={"email"} name={"email"} label={"Email"} helperText={"Please enter your email"} handleChange={handleChange} value={user.email||""}/>
                 <FormInputs validation={"success"} type={"password"} name={"password"} label={"Password"} helperText={"Please enter password"} handleChange={handleChange} value={user.password||""}/>
                < EstateFormSubmitBtn>
                 <Button type="submit" color="success" variant="outlined" startIcon={<LoginIcon />}>
                 Login
                 </Button>
                 </EstateFormSubmitBtn>
             </EstateMainForm>
             </DialogContent>
             </Dialog>
         </div>
      </div>
  )

}

export default LoginForm;
