import React from 'react';
import {Drawer, List, ListItem, ListItemIcon, ListItemText} from '@mui/material';
import EstateForm from './estateForm';
import SaveEstate from './saveEstate';
import {
  NavBtn,
  NavBtnLink
} from './Styles/navbarElementsStyle';
import { SideBtnWrap, SidebarRoute } from './Styles/sidebarElementsStyle';


function OptionsBar(props){
  const [state, setState] = React.useState(false);
    const toggleDrawer = ( open) => (event) => {
      setState(  open );
    };
    const list = () => (
      <div
      >
        <List>
          <ListItem button>
            <EstateForm />
          </ListItem >

          <ListItem button>
            <SaveEstate />
          </ListItem >
        </List>


      </div>
    );
    if(props.Mobile){
    return (
      <SideBtnWrap>
        <SidebarRoute to="#" onClick={toggleDrawer(true)}>View Bar</SidebarRoute>
          <Drawer
            anchor={"right"}
            open={state}
            onClose={toggleDrawer(false)}
          >
            {list("right")}
          </Drawer>
      </SideBtnWrap>
    );
    }
    return (
            <NavBtn>
              <NavBtnLink to="#" onClick={toggleDrawer(true)} >
                View Bar</NavBtnLink>
                <Drawer
                  anchor={"right"}
                  open={state}
                  onClose={toggleDrawer(false)}
                >
                  {list("right")}
                </Drawer>
            </NavBtn>
    );
}

export default OptionsBar;
OptionsBar.defaultProps = {
  Mobile: false
}
