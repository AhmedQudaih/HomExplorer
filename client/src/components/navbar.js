import React, {useState, useEffect} from 'react'
import FaBars from '@mui/icons-material/Menu';
import {animateScroll as scroll} from 'react-scroll';
import {
  Nav,
  NavbarContainer,
  NavLogo,
  MobileIcon,
  NavMenu,
  NavItem,
  NavLinks,
  NavBtn
} from './Styles/navbarElementsStyle';
import OptionsBar from './optionsBar.js';
import { useLocation } from "react-router-dom";
import LoginForm from './loginForm';
import {CheckAuth} from './checkData';

const Navbar = ({toggle}) => {
  const [scrollNav, setScrollNav] = useState(false)

  const changeNav = () => {

    if (window.scrollY >= 80) {
      setScrollNav(true)
    } else {
      setScrollNav(false)
    }
  }

  const { pathname } = useLocation();

  useEffect(() => {

    window.scrollTo(0, 0);
    window.addEventListener('scroll', changeNav)

  }, [pathname]);

  const toggleHome = () => {
     scroll.scrollToTop()
  }
  return (<Nav className={window.location.pathname !== "/" && "staticNav"} scrollNav={scrollNav}>
    <NavbarContainer>
      <NavLogo to='/' onClick={toggleHome}>HomExplorer</NavLogo>
      <MobileIcon onClick={()=>{toggle(true)}}>
        <FaBars fontSize="large"/>
      </MobileIcon>
      <NavMenu>
        <NavItem>
          <NavLinks to="/#recommendations" smooth={true} duration={500} exact='true' offset={-80}>
            Recommendations</NavLinks>
        </NavItem>
        <NavItem>
          <NavLinks to="/#auction" smooth={true} duration={500}  exact='true' offset={-80}>Auction</NavLinks>
        </NavItem>
        <NavItem>
          <NavLinks to="/#services" smooth={true} duration={500} exact='true' offset={-80}>Services</NavLinks>
        </NavItem>
        <NavItem>
          <NavLinks to="/#signup" smooth={true} duration={500}  exact='true' offset={-80}>Sign Up</NavLinks>
        </NavItem>
      </NavMenu>
      {CheckAuth()?
      <NavBtn>
        <OptionsBar />
      </NavBtn>:
      <NavBtn>
        <LoginForm />
      </NavBtn>}
    </NavbarContainer>
  </Nav>)
}

export default Navbar
