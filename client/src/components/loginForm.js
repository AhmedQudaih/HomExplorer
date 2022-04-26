import React from 'react';
import {Button} from '@mui/material';
import { Login as LoginIcon} from "@mui/icons-material";
import serverFunctions from '../serverFunctions/user';
import { FormInputs} from './formInputs';
import { useNavigate} from "react-router-dom";
import {UserMainForm, UserFormTitleBtn, UserFormSubmitBtn} from './Styles/registrationFormStyle';
import {StatusAlert} from './appAlerts';

function LoginForm(props) {

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
         props.setAuth(true);
         navigate('/');
         StatusAlert('logged in');
       }else{
         StatusAlert("error", "Invalid Username or Password");
       }
  }


return(
      <UserMainForm onSubmit={submitLoginForm}>
     <UserFormTitleBtn>Login Form</UserFormTitleBtn>
        <FormInputs validation={"success"} type={"email"} name={"email"} label={"Email"} helperText={"Please enter your email"} handleChange={handleChange} value={user.email||""}/>
        <FormInputs validation={"success"} type={"password"} name={"password"} label={"Password"} helperText={"Please enter password"} handleChange={handleChange} value={user.password||""}/>
           <UserFormSubmitBtn>
             <Button type="submit" color="success" variant="outlined" startIcon={<LoginIcon />}>
             Login
             </Button>
           </UserFormSubmitBtn>
         </UserMainForm>
  );
}

export default LoginForm;
