import React from 'react';
import serverFunctions from '../serverFunctions/estate';
import {UserId} from '../components/checkData';

export const MyContext = React.createContext();
const Provider = (props) =>{

  const [saveList, setSaveList] = React.useState("Loading");
  const [estateRequests, setEstateRequests] = React.useState("Loading")
  const [categoryAndType, setCategoryAndType] = React.useState("Loading");
  const [visitRequests, setVisitRequests] = React.useState({"approve": "Loading", "reject": "Loading", "pending": "Loading", "myVisit": "Loading"});

  React.useEffect(() => {
    const fetchData = async () => {
      const categoryAndType = await serverFunctions.getCategoryAndType();
      setCategoryAndType(categoryAndType);
      if(!UserId()){
          return;
      }
      const save = await serverFunctions.getSaved();
      const estateReq = await serverFunctions.getEstateRequests();
      const visitReq = await serverFunctions.getVisits(JSON.stringify({"sellerId":UserId()}));
      const myVisitsReq = await serverFunctions.getVisits(JSON.stringify({"visitorId":UserId()}));
      setEstateRequests(estateReq);
      setSaveList(save);
      setVisitRequests({"approve": visitReq.approve, "reject": visitReq.reject, "pending": visitReq.pending ,"myVisit": myVisitsReq});
      }
    fetchData();
  }, [props.auth]);



return(
  <MyContext.Provider value={{saveList, categoryAndType, setSaveList, estateRequests, setEstateRequests, visitRequests , setVisitRequests}}>
    {props.children}
  </MyContext.Provider>
)


}

export default Provider;
