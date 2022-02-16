import React, {useState} from 'react';
import './App.css';
import {BrowserRouter  as Router, Route, Routes} from 'react-router-dom';
//import Sidebar from './components/sidebar.js';
import Navbar from './components/navbar.js';
/*import Footer from './components/footer.js';
import Home from './pages/homePage.js';
import Products from './pages/productsPage.js';
import Admin from './pages/admin.js';
import Provider from './components/provider';
import NotFound404Component from './components/notFound404Component';
*/function App() {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = (status) => {
    setIsOpen(status);
  }
  return (<Provider>
    <Router basename="/">
      <Sidebar isOpen={isOpen} toggle={toggle}/>
      <Navbar toggle={toggle}/>
      <Routes >
        <Route exact path="" element={<h1>hereee</h1>}/>
        </Routes >
      <Footer/>
    </Router>
  </Provider>);
}

export default App;
