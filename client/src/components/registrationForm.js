import React from "react";
import {FormInputs} from './formInputs';
import {UserFormVali, FormValid, UserFormValiMsg} from './checkData';
import {UserMainForm, UserFormTitleBtn, UserFormBackBtn, UserFormSubmitBtn} from './Styles/registrationFormStyle';
import {Button} from '@mui/material';
import {Save as SaveIcon} from "@mui/icons-material";
import serverFunctions from '../serverFunctions/user';
import Info from './infoSection/info.js';
import { homeObjThree } from './infoSection/data.js';
import { KeyboardArrowLeft} from "@mui/icons-material";
import {StatusAlert, ValidationMsg} from './appAlerts';
const RegistrationForm = ()=> {

  const [user, setUser] = React.useState({});
  const [formActive, setFormActive] = React.useState(false);
  let validation ={};
  let msg ={};
  UserFormVali(validation , user);
  UserFormValiMsg(msg);


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

    const handleFormActive = () => {
      setFormActive((prevActiveStep) => !prevActiveStep);
    };
    homeObjThree.onClick = handleFormActive;

  const submitUserForm = async (event) =>{
    event.preventDefault();
    let subVali = FormValid(validation,msg);
    if(subVali.length > 0){
      ValidationMsg(subVali);
      return;
    }
      const formData = new FormData(event.target);
      const Status = await serverFunctions.addUser(formData);
      if(Status ==='error'){
         StatusAlert("error");
       }else{
         StatusAlert('Added');
       }
  }

  return (
    <>

{formActive?
<UserMainForm onSubmit={submitUserForm}>
<UserFormTitleBtn>Registration Form</UserFormTitleBtn>
<UserFormBackBtn>
    <Button size="small" onClick={handleFormActive}>
        <KeyboardArrowLeft />
    </Button>
</UserFormBackBtn>
    <FormInputs validation={validation.Name} type={"text"} name={"name"} label={"Name"} helperText={"Please enter your full name"} handleChange={handleChange} value={user.name||""}/>
    <FormInputs validation={validation.Password} type={"password"} name={"password"} label={"Password"} helperText={"Please enter password"} handleChange={handleChange} value={user.password||""}/>
    <FormInputs validation={validation.Email} type={"email"} name={"email"} label={"Email"} helperText={"Please enter your email"} handleChange={handleChange} value={user.email||""}/>
    <FormInputs validation={validation.PhoneNumber} type={"number"} name={"phoneNumber"} label={"Phone Number"} helperText={"Please enter your phone number"} handleChange={handleChange} value={user.phoneNumber||""}/>

     <UserFormSubmitBtn>
       <Button type="submit" color="success" variant="outlined" startIcon={<SaveIcon />}>
       Save
       </Button>
     </UserFormSubmitBtn>
   </UserMainForm>:<Info {...homeObjThree} />
}
</>
  );
}

export default RegistrationForm;
