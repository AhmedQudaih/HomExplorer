import React, {useState} from 'react'
import Footer from '../components/footer.js';
import Main from '../components/main.js';
import Info from '../components/infoSection/info.js';
import { homeObjOne, homeObjTwo ,homeObjThree } from '../components/infoSection/data.js';
import Navbar from '../components/navbar.js';
import Estate from '../components/estate';
import Sidebar from '../components/sidebar.js';
import AddEstate from '../components/addEstate'
const Home = () => {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => {
        setIsOpen(!isOpen);
    }
    const [Estates, setEstates] = useState([]);

  function addEstate(newEstate) {
    setEstates((prevEstates) => {
      return [...prevEstates, newEstate];
    });
  }

  function deleteEstate(id) {
    setEstates((prevEstates) => {
      return prevEstates.filter((EstateItem, index) => {
        return index !== id;
      });
    });
  }
    return (
        <>
            <Sidebar isOpen={isOpen} toggle={toggle} />
            <Navbar toggle={toggle} />
            <Main />
            <Info {...homeObjOne} />
            <Info {...homeObjTwo} />
            {Estates.map((EstateItem, index) => {
        return (
          <Estate
            key={index}
            id={index}
            HomeType={EstateItem.HomeType}
            Size={EstateItem.Size}
            Price={EstateItem.Price}
            Room={EstateItem.Room}
            Bathroom={EstateItem.Bathroom}
            Address={EstateItem.Address}
            ToBuy={EstateItem.ToBuy}
            Contract={EstateItem.Contract}
            onDelete={deleteEstate}
          />
        );
      })}
            <Info {...homeObjThree} />
            
            <AddEstate onAdd={addEstate} />
            <Footer />

        </>
    )
}

export default Home;
