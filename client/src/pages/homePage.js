import React, {useState} from 'react'
import Footer from '../components/footer.js';
import Main from '../components/main.js';
import Info from '../components/infoSection/info.js';
import { homeObjOne, homeObjTwo ,homeObjThree } from '../components/infoSection/data.js';
import Services from '../components/services';
import Navbar from '../components/navbar.js';
import Sidebar from '../components/sidebar.js';


function Home() {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => {
        setIsOpen(!isOpen);
    }
    return (
        <div>
            <Sidebar isOpen={isOpen} toggle={toggle} />
            <Navbar toggle={toggle} />
            <Main />
            <Info {...homeObjOne} />
            <Info {...homeObjTwo} />
            <Services />
            <Info {...homeObjThree} />
            <Footer />
        </div>
    )
}

export default Home;
