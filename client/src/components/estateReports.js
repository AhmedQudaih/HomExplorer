import React from 'react';
import Chart from './chart';
import {ChartDiv} from './Styles/estateDetailsStyle';
import {EstateCardDiv} from './Styles/estateCardStyle';
import serverFunctions from '../serverFunctions/estate';
const EstateReports = ()=>{

  const [data, setData] = React.useState("Loading");

    React.useEffect(() => {
      const fetchData = async () => {
          let data = await serverFunctions.estateReport();
          setData(data);
      }
      fetchData();
    }, []);

  return(
    <ChartDiv>
      <div>
        <EstateCardDiv><h2>Types Report </h2></EstateCardDiv>
        <Chart data={data.type} type="pie" />
      </div>
      <div>
        <EstateCardDiv><h2>Types and Categories Report</h2></EstateCardDiv>
        <Chart data={data.type} type="bar" />
      </div>
      <div>
        <EstateCardDiv><h2>Categories Report</h2></EstateCardDiv>
        <Chart data={data.category} type="pie" />
     </div>
  </ChartDiv>
  );
}

export default EstateReports;
