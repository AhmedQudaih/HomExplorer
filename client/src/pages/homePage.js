import React, {useState} from 'react'
import Footer from '../components/footer.js';
import Main from '../components/main.js';
import Info from '../components/infoSection/info.js';
import { homeObjOne, homeObjTwo ,homeObjThree } from '../components/infoSection/data.js';
import Navbar from '../components/navbar.js';
import Services from '../components/services.js';
import Sidebar from '../components/sidebar.js';
const Home = () => {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => {
        setIsOpen(!isOpen);
    }
    return (
        <>
            <Sidebar isOpen={isOpen} toggle={toggle} />
            <Navbar toggle={toggle} />
            <Main />
            <Info {...homeObjOne} />
            <Info {...homeObjTwo} />
            <Services />
            <Info {...homeObjThree} />
            <Footer />

        </>
    )
}

export default Home;
