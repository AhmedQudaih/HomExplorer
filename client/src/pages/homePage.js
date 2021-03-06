import React from 'react'
import Main from '../components/main.js';
import Info from '../components/infoSection/info.js';
import { homeObjOne, homeObjTwo, homeObjThree } from '../components/infoSection/data.js';
import Services from '../components/services';
import PredictionForm from '../components/predictionForm';
function Home(props) {
    return (
        <div>
            <Main />
            <Info {...homeObjOne} />
            <Info {...homeObjTwo} />
            <Services dark={true} ID="services" from="Services" />
            <PredictionForm />
            {!props.auth &&
              <Info {...homeObjThree} />
            }
        </div>
    )
}

export default Home;
