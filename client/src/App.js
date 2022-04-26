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
import AdminDashBoard from './pages/adminDashBoard.js';
import AuthPage from './pages/authPage.js';
import NotFound404Component from './components/notFound404Component';
import {CheckAuth} from './components/checkData';

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [auth, setAuth] = useState(CheckAuth()?true:false);
  const toggle = (status) => {
    setIsOpen(status);
  }
  return (<Provider auth={auth}>
    <div id="loading"></div>
    <Router basename="/">
      <Sidebar isOpen={isOpen} setAuth={setAuth} toggle={toggle}/>
      <Navbar toggle={toggle} setAuth={setAuth} />
      <Routes >
        <Route exact path="" element={<Home />}/>
        <Route exact path="products" element={<Products />}/>
        <Route exact path="admin" element={<Admin />}/>
        <Route exact path="adminDashBoard" element={<AdminDashBoard />}/>
        <Route exact path="authPage" element={<AuthPage setAuth={setAuth}/>}/>
        <Route exact path='*' element={<NotFound404Component />} />
      </Routes >
      <Footer/>
    </Router>
  </Provider>);
}

export default App;
