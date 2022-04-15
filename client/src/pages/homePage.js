import React from 'react'
import Main from '../components/main.js';
import Info from '../components/infoSection/info.js';
import { homeObjOne, homeObjTwo } from '../components/infoSection/data.js';
import Services from '../components/services';
import RegistrationForm from '../components/registrationForm';
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
            <Services dark={true} ID="services" from="Services" />
            <RegistrationForm />
        </div>
    )
}

export default Home;
