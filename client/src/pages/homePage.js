import React from 'react'
import Main from '../components/main.js';
import Info from '../components/infoSection/info.js';
import { homeObjOne, homeObjTwo } from '../components/infoSection/data.js';
import Services from '../components/services';
import RegistrationForm from '../components/registrationForm';
function Home() {
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
