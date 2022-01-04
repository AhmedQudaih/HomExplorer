import React from 'react'
import Main from '../components/main.js';
import Info from '../components/infoSection/info.js';
import { homeObjOne, homeObjTwo ,homeObjThree } from '../components/infoSection/data.js';
import Services from '../components/services';
function Home() {
    return (
        <div>
            <Main />
            <Info {...homeObjOne} />
            <Info {...homeObjTwo} />
            <Services from="Services" />
            <Info {...homeObjThree} />
        </div>
    )
}

export default Home;
