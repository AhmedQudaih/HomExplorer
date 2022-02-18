import React from 'react';
import serverFunctions from '../serverFunctions/estate'
export const MyContext = React.createContext();
const Provider = (props) =>{

  const [saveList, setSaveList] = React.useState([]);
  const [rateList, setRateList] = React.useState([]);
  const [estateRequests, setEstateRequests] = React.useState([])
  const [categoryAndType, setCategoryAndType] = React.useState([]);
  const [visitRequests, setVisitRequests] = React.useState({"approve": [], "reject": [], "pending": [], "myVisit": []});

  React.useEffect(() => {
    const fetchData = async () => {
      const save = await serverFunctions.getSaved("620a7b01d691986bf34fcbde");
      const rate = await serverFunctions.getRate("620a7b01d691986bf34fcbde");
      const estateReq = await serverFunctions.approveEstateRequests();
      const categoryAndType = await serverFunctions.getCategoryAndType();
      const visitReq = await serverFunctions.getVisits(JSON.stringify({"sellerId":"620a7b01d691986bf34fcbde"}));
      const myVisitsReq = await serverFunctions.getVisits(JSON.stringify({"visitorId":"620a7b01d691986bf34fcbde"}));
      setCategoryAndType(categoryAndType);
      setEstateRequests(estateReq);
      setSaveList(save);
      setRateList(rate);
      console.log(myVisitsReq)
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
