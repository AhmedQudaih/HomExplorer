import React from 'react';
import serverFunctions from '../serverFunctions/estate'
export const MyContext = React.createContext();
const Provider = (props) =>{

  const [saveList, setSaveList] = React.useState(false);
  const [rateList, setRateList] = React.useState(false);
  const [estateRequests, setEstateRequests] = React.useState(false)
  const [categoryAndType, setCategoryAndType] = React.useState(false);
  
  React.useEffect(() => {
    const fetchData = async () => {
      const save = await serverFunctions.getSaved("61a81506d4c8835ca4a20610");
      const rate = await serverFunctions.getRate("61a81506d4c8835ca4a20610");
      const estateReq = await serverFunctions.approveEstateRequests();
      const categoryAndType = await serverFunctions.getCategoryAndType();
      setCategoryAndType(categoryAndType);
      setEstateRequests(estateReq);
      setSaveList(save);
      setRateList(rate);
      }
    fetchData();
  }, []);

return(
  <MyContext.Provider value={{saveList , rateList, categoryAndType, setSaveList, setRateList, estateRequests, setEstateRequests}}>
    {props.children}
  </MyContext.Provider>
)


}

export default Provider;
