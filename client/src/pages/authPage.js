import React from 'react'
import LoginForm from '../components/loginForm';
import RegistrationForm from '../components/registrationForm';
import { useLocation} from "react-router-dom";
function AuthPage(props) {

    const [signInPage, setsignInPage] = React.useState(false);

    const location = useLocation();

    React.useEffect(()=>{
        if(location.state === "signIn"){
          setsignInPage(true);
        }
    },[location.state])

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
