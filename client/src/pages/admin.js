import React from 'react';
import Services from '../components/services';
import ApproveEstateReq from '../components/approveEstateReq';
import ApproveVisitReq from '../components/approveVisitReq';
import serverFunctions from '../serverFunctions/estate'
import {MyContext} from '../components/provider';

function Admin() {
  const [myEstate, setMyEstate] = React.useState(false);
  React.useEffect(()=>{
    const getMyEstate = async () => {
          let res = await serverFunctions.searchData({"sellerId":"61a81506d4c8835ca4a20610"});
          setMyEstate(res);
    }
    getMyEstate();
  },[])


  return (<MyContext.Consumer>{
      (context) => {
          const approveEstateReqSec = () =>{
              if(context.saveList !== "error"){
                return context.saveList.map(item => {return item.estateId;});
              }
              return "error";
          }
          return (
            <div>
              <Services  ID="SaveList" Data={approveEstateReqSec()} from="Saved Estates"/>
              <Services  ID="MyEstate" Data={myEstate} from="My Estates"/>
              <ApproveEstateReq estateRequests={context.estateRequests} setEstateRequests={context.setEstateRequests} />
                <ApproveVisitReq visitRequests={context.visitRequests} myVisits={context.myVisits} setVisitRequests={context.setVisitRequests} />
            </div>)
        }


    }</MyContext.Consumer>)
}
export default Admin;
