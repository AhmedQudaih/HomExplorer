import React from 'react';
import {Badge, Button, Drawer, List, ListItem} from '@mui/material';
import EstateForm from './estateForm';
import { NavBtnLink } from './Styles/navbarElementsStyle';
import {SidebarRoute, OptionsBarLinks } from './Styles/sidebarElementsStyle';
import {MyContext} from '../components/provider';
import {DateRangeOutlined as DateRangeOutlinedIcon, BookmarkBorder as BookmarkBorderIcon, AssignmentOutlined as AssignmentOutlinedIcon, AssignmentLateOutlined  } from '@material-ui/icons';


function OptionsBar(props){
  const [state, setState] = React.useState(false);
    const toggleDrawer = ( open) => (event) => {
      setState(  open );
    };



    return (<MyContext.Consumer>{
        (context) => {

    const list = () => (
      <div
      >
        <List>
          <ListItem button>
            <EstateForm />
          </ListItem >

          <ListItem onClick={toggleDrawer(false)} button>
              <OptionsBarLinks to="/admin#SaveList">
            <Button color="success" variant="outlined" startIcon={<BookmarkBorderIcon />}>
              Saved list
            </Button>
             </OptionsBarLinks>
          </ListItem>

          <ListItem  onClick={toggleDrawer(false)} button>
              <OptionsBarLinks to="/admin#MyEstate">
            <Button color="success" variant="outlined" startIcon={<AssignmentOutlinedIcon />}>
              My Estates
            </Button>
             </OptionsBarLinks>
          </ListItem>

        <ListItem  onClick={toggleDrawer(false)} button>
            <OptionsBarLinks to="/admin#EstatesRequests">
          <Badge badgeContent={context.estateRequests === "error" || context.estateRequests === "NoData"? 0 :context.estateRequests.length}  anchorOrigin={{vertical: 'top', horizontal: 'left'}} color="error">
          <Button color="success" variant="outlined" startIcon={<AssignmentLateOutlined />}>
            Eatate Req
          </Button>
              </Badge>
               </OptionsBarLinks>
        </ListItem>

        <ListItem  onClick={toggleDrawer(false)} button>
            <OptionsBarLinks to="/admin#VisitRequests">
          <Badge badgeContent={context.visitRequests.pending? context.visitRequests.pending.length: 0 }  anchorOrigin={{vertical: 'top', horizontal: 'left'}} color="error">
          <Button color="success" variant="outlined" startIcon={<DateRangeOutlinedIcon />}>
            estate visits
          </Button>
              </Badge>
               </OptionsBarLinks>
        </ListItem>
      </List>


      </div>
    );
      return (
      <>
      {props.Mobile?
        <SidebarRoute to="#" onClick={toggleDrawer(true)}>View Bar</SidebarRoute>:
          <NavBtnLink to="#" onClick={toggleDrawer(true)} >View Bar</NavBtnLink>
      }
          <Drawer
            anchor={props.Mobile?"bottom":"right"}
            open={state}
            onClose={toggleDrawer(false)}
          >
            {list()}
          </Drawer>
      </>
    );

}}</MyContext.Consumer>)
}

export default OptionsBar;
OptionsBar.defaultProps = {
  Mobile: false
}
