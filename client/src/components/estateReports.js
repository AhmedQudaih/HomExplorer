import React from 'react';
import Chart from './chart';
import {ChartDiv} from './Styles/estateDetailsStyle';
import {EstateCardDiv} from './Styles/estateCardStyle';
const EstateReports = ()=>{
  const data = [
  {
    name: "Auction",
    value: 24 , //here add count of auctions
    Apartment:10,
    Villa:3
  },
  {
    name: "Rent",
    value: 13,//here add count of Rents
    Apartment:10,
    Villa:3
  },
  {
    name: "Sell",
    value: 20, //here add count of Sells
   Apartment:11,
   Villa:15
  }
];
const data01 = [
  {
    name: "Apartment",
    value: 24 , //here add count of Apartment

  },
  {
    name: "Villa",
    value: 13,//here add count of Villa

  }
];
  return(
    <ChartDiv>
      <div>
        <EstateCardDiv><h2>Report One</h2></EstateCardDiv>
        <Chart data={data} type="pie" />
      </div>
      <div>
        <EstateCardDiv><h2>Report One</h2></EstateCardDiv>
        <Chart data={data} type="bar" />
      </div>
      <div>
        <EstateCardDiv><h2>Report One</h2></EstateCardDiv>
        <Chart data={data01} type="pie" />
     </div>
  </ChartDiv>
  );
}

export default EstateReports;
