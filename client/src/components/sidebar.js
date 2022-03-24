import React from 'react';
import { SidebarContainer, Icon, CloseIconStyle, SidebarWrapper,
  SidebarMenu, SidebarLink, SideBtnWrap,
  SidebarRoute } from './Styles/sidebarElementsStyle';
import CloseIcon from '@mui/icons-material/Close';
import OptionsBar from './optionsBar.js';
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
          {false?
        <SideBtnWrap>
          <SidebarRoute onClick={()=>{toggle(false)}} to="/signin">Sign In</SidebarRoute>
        </SideBtnWrap>:
        <SideBtnWrap  onClick={()=>{toggle(false)}}>
    <OptionsBar Mobile={true}/>
        </SideBtnWrap>}
      </SidebarWrapper>
    </SidebarContainer>
  );
};
export default Sidebar;
