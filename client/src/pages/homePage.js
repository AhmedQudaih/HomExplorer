import React from 'react'
import Main from '../components/main.js';
import Info from '../components/infoSection/info.js';
import { homeObjOne, homeObjTwo ,homeObjThree } from '../components/infoSection/data.js';
import Chart from '../components/chart.js';
import Services from '../components/services';
import {ChartDiv} from '../components/Styles/estateDetailsStyle'
import {EstateCardDiv} from '../components/Styles/estateCardStyle'
function Home() {
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
    value: 24 , //here add count of auctions

  },
  {
    name: "Villa",
    value: 13,//here add count of Rents

  }
];
    return (
        <div>
            <Main />
            <Info {...homeObjOne} />
            <Info {...homeObjTwo} />
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
          <Services ID="services" from="Services" />
            <Info {...homeObjThree} />
        </div>
    )
}

export default Home;
