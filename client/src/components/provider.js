import React from 'react';
import serverFunctions from '../serverFunctions/estate';
import {UserId} from '../components/checkData';

export const MyContext = React.createContext();
const Provider = (props) =>{

  const [saveList, setSaveList] = React.useState([]);
  const [rateList, setRateList] = React.useState([]);
  const [estateRequests, setEstateRequests] = React.useState([])
  const [categoryAndType, setCategoryAndType] = React.useState([]);
  const [visitRequests, setVisitRequests] = React.useState({"approve": [], "reject": [], "pending": [], "myVisit": []});

  React.useEffect(() => {
    const fetchData = async () => {
      const save = await serverFunctions.getSaved();
      const rate = await serverFunctions.getRate();
      const estateReq = await serverFunctions.approveEstateRequests();
      const categoryAndType = await serverFunctions.getCategoryAndType();
      const visitReq = await serverFunctions.getVisits(JSON.stringify({"sellerId":UserId()}));
      const myVisitsReq = await serverFunctions.getVisits(JSON.stringify({"visitorId":UserId()}));
      setCategoryAndType(categoryAndType);
      setEstateRequests(estateReq);
      setSaveList(save);
      setRateList(rate);
      setVisitRequests({"approve": visitReq.approve, "reject": visitReq.reject, "pending": visitReq.pending ,"myVisit": myVisitsReq});
      }
    fetchData();
  }, []);



return(
  <MyContext.Provider value={{saveList, rateList, categoryAndType, setSaveList, setRateList, estateRequests, setEstateRequests, visitRequests , setVisitRequests}}>
    {props.children}
  </MyContext.Provider>
)


}

export default Provider;
