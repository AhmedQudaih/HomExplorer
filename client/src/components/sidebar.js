import React from 'react';
import { SidebarContainer, Icon, CloseIcon, SidebarWrapper,
  SidebarMenu, SidebarLink, SideBtnWrap,
  SidebarRoute } from './Styles/sidebarElementsStyle';

const Sidebar = ({isOpen, toggle}) => {
  return (
    <SidebarContainer isOpen={isOpen} onClick={toggle}>
      <Icon onClick={toggle}>
        <CloseIcon />
      </Icon>
      <SidebarWrapper>
        <SidebarMenu>
          <SidebarLink to="recommendations" onClick={toggle}>Recommendations</SidebarLink>
          <SidebarLink to="auction" onClick={toggle}>Auction</SidebarLink>
          <SidebarLink to="services" onClick={toggle}>Services</SidebarLink>
          <SidebarLink to="signup" onClick={toggle}>Sign Up</SidebarLink>
        </SidebarMenu>
        <SideBtnWrap>
          <SidebarRoute to="/signin">Sign In</SidebarRoute>
        </SideBtnWrap>
      </SidebarWrapper>
    </SidebarContainer>
  );
};
export default Sidebar;