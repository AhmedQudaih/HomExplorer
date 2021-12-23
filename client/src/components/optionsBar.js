import React from 'react';
import {Drawer, List, ListItem, ListItemIcon, ListItemText,  } from '@mui/material';
import EstateForm from './estateForm';
import {
  NavBtn,
  NavBtnLink
} from './Styles/navbarElementsStyle';
function OptionsBar(){
  const [state, setState] = React.useState(false);
    const toggleDrawer = ( open) => (event) => {
      setState(  open );
    };
    const list = () => (
      <div
      >
        <List>
          <ListItem button>
            <EstateForm/>
          </ListItem >
        </List>

      </div>
    );

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
