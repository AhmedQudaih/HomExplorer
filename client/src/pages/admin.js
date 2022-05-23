import React from 'react';
import Services from '../components/services';
import ApproveVisitReq from '../components/approveVisitReq';
import serverEstateFunctions from '../serverFunctions/estate';
import {MyContext} from '../components/provider';
import {CheckAuth} from '../components/checkData';
import {useNavigate} from "react-router-dom";
function Admin() {
  const [myEstate, setMyEstate] = React.useState("Loading");
  const [update, setUpdate] = React.useState(0);
  const navigate = useNavigate();
  React.useEffect(()=>{
    if(!CheckAuth(true)){
      return navigate("/");
    }
    const getMyEstate = async () => {
          let res = await serverEstateFunctions.getMyEstates();
          setMyEstate(res);
    }
    getMyEstate();
  },[navigate, update])


  return (<MyContext.Consumer>{
      (context) => {
          const approveEstateReqSec = () =>{
              if(context.saveList === "error" || context.saveList === "NoData" || context.saveList === "Loading"){
                return context.saveList;
              }

              return context.saveList.map(item => {return item.estateId;});
          }
          return (
            <div>
              <Services  ID="SaveList" Data={approveEstateReqSec()} from="Saved Estates"/>
              <Services  ID="MyEstate" dark={true} Data={myEstate} updateData={setUpdate} from="My Estates"/>
              <ApproveVisitReq visitRequests={context.visitRequests} myVisits={context.myVisits} setVisitRequests={context.setVisitRequests} />
            </div>)
        }


    }</MyContext.Consumer>)
}
export default Admin;
