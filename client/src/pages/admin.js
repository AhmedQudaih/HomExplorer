import React from 'react';
import Services from '../components/services';
import ApproveEstateReq from '../components/approveEstateReq';
import serverFunctions from '../serverFunctions/estate'
import {MyContext} from '../components/provider';
import {ServicesProductContainer, ServicesProductH1} from '../components/Styles/servicesElementsStyle';
import Loading from '../components/loading';

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

        if (context.saveList === false || myEstate === "error" || context.saveList === "error" ) {
          return (<ServicesProductContainer >
            <ServicesProductH1>Services</ServicesProductH1>
            <Loading/>
          </ServicesProductContainer>);
        } else {

          const display = context.saveList.map(item => {
            return item.estateId;
          })

          return (<div>

            <Services  ID="SaveList" Data={display} from="Saved Estates"/>

          <Services  ID="MyEstate" Data={myEstate} from="My Estates"/>

          <ApproveEstateReq estateRequests={context.estateRequests} setEstateRequests={context.setEstateRequests} />

          </div>)
        }

      }
    }</MyContext.Consumer>)
}
export default Admin;
