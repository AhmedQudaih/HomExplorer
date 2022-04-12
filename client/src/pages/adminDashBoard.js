import React from 'react';
import ApproveEstateReq from '../components/approveEstateReq';
import {MyContext} from '../components/provider';
import {CheckAuth, UserId} from '../components/checkData';
import {useNavigate} from "react-router-dom";
import serverUserFunctions from '../serverFunctions/user';
function AdminDashBoard() {
  const navigate = useNavigate();
  React.useEffect(()=>{

    const CheckAdminAuth = async () => {
      if(CheckAuth()){
        let res = await serverUserFunctions.checkAdmin(UserId());
        if (res) return ;
      }
      return navigate("/");
    }
    CheckAdminAuth();
  },[navigate])

  return (<MyContext.Consumer>{
      (context) => {

          return (
            <div>
              <ApproveEstateReq estateRequests={context.estateRequests} setEstateRequests={context.setEstateRequests} />
            </div>)
        }

    }</MyContext.Consumer>)
}
export default AdminDashBoard;
