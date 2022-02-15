import React, {useState} from 'react';
import './App.css';
import {BrowserRouter  as Router, Route, Routes} from 'react-router-dom';
import Sidebar from './components/sidebar.js';
import Navbar from './components/navbar.js';
import Footer from './components/footer.js';
import Home from './pages/homePage.js';
import Products from './pages/productsPage.js';
import Admin from './pages/admin.js';
import Provider from './components/provider';
import NotFound404Component from './components/notFound404Component';
function App() {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = (status) => {
    setIsOpen(status);
  }
  return (<h1>hereeeeeeeeeee</h1>);
}

export default App;


/*
<Provider>
  <Router basename="/">
    <Sidebar isOpen={isOpen} toggle={toggle}/>
    <Navbar toggle={toggle}/>
    <Routes >
      <Route exact path="" element={<Home />}/>
      <Route exact path="products" element={<Products />}/>
      <Route exact path="admin" element={<Admin />}/>
      <Route exact path='*' element={<NotFound404Component />} />
    </Routes >
    <Footer/>
  </Router>
</Provider>*/
