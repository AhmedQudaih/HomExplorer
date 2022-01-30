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
function App() {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = (status) => {
    setIsOpen(status);
  }
  return (<Provider>
    <Router>
      <Sidebar isOpen={isOpen} toggle={toggle}/>
      <Navbar toggle={toggle}/>
      <Routes >
        <Route path="/" element={<Home />}/>
        <Route path="/products" element={<Products />}/>
        <Route path="/admin" element={<Admin />}/>
      </Routes >
      <Footer/>
    </Router>
  </Provider>);
}

export default App;
