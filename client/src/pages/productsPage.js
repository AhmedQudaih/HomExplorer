import React from 'react';
import Search from '../components/search.js';
import Services from '../components/services';
import serverFunctions from '../serverFunctions/estate'
import { useLocation, useNavigate} from "react-router-dom";
import {CheckAuth} from '../components/checkData';
function Products(props) {

  const [data, setData] = React.useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  React.useEffect(()=>{

    const fetchAuctionData = async () => {
      delete location.state;
      let res = await serverFunctions.searchData({type:"625cc20fc17223a46e1a97ed"});
      setData(res);
    }

    const fetchRecommendationData = async () => {
      delete location.state;
      if (!CheckAuth()) {
          return navigate("/authPage", { state: "signIn" })
      }
      let res = await serverFunctions.getRecommendetEstates();
      setData(res);
    }

    if(location.state === "Auction"){
      fetchAuctionData();
    }else if(location.state === "Recommendation"){
      fetchRecommendationData();
    }

  },[location.state,navigate])


  const FilterData = async (formData) => {
    let data = {};
    if (formData.desc.length > 0 || formData.address.length > 0) {
      data.text = formData.address.concat(' ').concat(formData.desc);
    }
    for (const [key, value] of Object.entries(formData)) {
      if (key === "desc" || key === "address") {
        continue;
      }
      if (value.length !== 0) {
        if (key === "size" || key === "price") {
          if (value[1] === 0) {
            continue;
          }
        }
        data[key] = value;
      }
    }

    if(Object.values(data).length === 0){
      return ;
     }

    let res = await serverFunctions.searchData(data);
    setData(res);
  }

  return (<div>
    <Search filterFunc={FilterData} />
    <Services ID="services" from=" Services" Data={data}/>
  </div>)
}

export default Products;
