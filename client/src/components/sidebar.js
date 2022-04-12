import React from 'react';
import { SidebarContainer, Icon, CloseIconStyle, SidebarWrapper,
  SidebarMenu, SidebarLink, SideBtnWrap } from './Styles/sidebarElementsStyle';
import CloseIcon from '@mui/icons-material/Close';
import OptionsBar from './optionsBar.js';
import LoginForm from './loginForm';
import {CheckAuth} from './checkData';

const Sidebar = ({isOpen, toggle}) => {
  return (
    <SidebarContainer isOpen={isOpen}>
      <Icon onClick={()=>{toggle(false)}}>
        <CloseIcon fontSize="large" style={CloseIconStyle} />
      </Icon>
      <SidebarWrapper>
        <SidebarMenu>
          <SidebarLink to="/#recommendations" onClick={()=>{toggle(false)}}>Recommendations</SidebarLink>
          <SidebarLink to="/#auction" onClick={()=>{toggle(false)}}>Auction</SidebarLink>
          <SidebarLink to="/#services" onClick={()=>{toggle(false)}}>Services</SidebarLink>
          <SidebarLink to="/#signup" onClick={()=>{toggle(false)}}>Sign Up</SidebarLink>
        </SidebarMenu>
          {CheckAuth()?
        <SideBtnWrap  onClick={()=>{toggle(false)}}>
          <OptionsBar Mobile={true}/>
        </SideBtnWrap>:
        <SideBtnWrap>
          <LoginForm toggle={toggle} />
        </SideBtnWrap>}
      </SidebarWrapper>
    </SidebarContainer>
  );
};
export default Sidebar;
