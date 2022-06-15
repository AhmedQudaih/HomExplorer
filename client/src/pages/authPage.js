import React from 'react'
import LoginForm from '../components/loginForm';
import RegistrationForm from '../components/registrationForm';
import { useLocation, useNavigate} from "react-router-dom";
import {CheckAuth} from '../components/checkData';
function AuthPage(props) {

    const [signInPage, setsignInPage] = React.useState(false);

    const location = useLocation();
    const navigate = useNavigate();

    React.useEffect(()=>{
      if(CheckAuth()){
        return navigate("/", { state: "signIn" })
      }else if(location.state === "signIn"){
        setsignInPage(true);
      }
    },[location.state,navigate])

    if(signInPage){
      return (
          <div>
            <LoginForm setAuth={props.setAuth} />
          </div>
      )
    }
    return (
        <div>
          <RegistrationForm setAuth={props.setAuth} />
        </div>
    )
}

export default AuthPage;
