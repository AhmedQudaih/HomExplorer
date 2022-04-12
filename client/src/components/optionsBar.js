import React from 'react';
import {Badge, Button, Drawer, List, ListItem} from '@mui/material';
import EstateForm from './estateForm';
import { NavBtnLink } from './Styles/navbarElementsStyle';
import {SidebarRoute, OptionsBarLinks } from './Styles/sidebarElementsStyle';
import {MyContext} from '../components/provider';
import {Logout as LogoutIcon, DateRangeOutlined as DateRangeOutlinedIcon, AssignmentOutlined as AssignmentOutlinedIcon,BookmarkBorder as BookmarkBorderIcon, AdminPanelSettingsOutlined as AdminPanelSettingsOutlinedIcon  } from '@mui/icons-material';
import serverFunctions from '../serverFunctions/user';
import {useNavigate} from "react-router-dom";
import {StatusAlert} from './appAlerts';
import serverUserFunctions from '../serverFunctions/user';
import {UserId} from '../components/checkData';
function OptionsBar(props){
  const [state, setState] = React.useState(false);
  const [adminAuth, setAdminAuth] = React.useState(false);
  const navigate = useNavigate();
    const toggleDrawer = ( open) => (event) => {
      setState(  open );
    };

    const logOut =()=>{
      toggleDrawer(false);
      serverFunctions.logOut();
      navigate('/');
      StatusAlert('logged out');
    }


    React.useEffect(()=>{
      const CheckAdminAuth= async () => {
        let res = await serverUserFunctions.checkAdmin(UserId());
        setAdminAuth(res);
      }
      CheckAdminAuth();
    },[])




    return (<MyContext.Consumer>{
        (context) => {

    const list = () => (
      <div>
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
            <OptionsBarLinks to="/admin#VisitRequests">
          <Badge badgeContent={context.visitRequests.pending? context.visitRequests.pending.length: 0 }  anchorOrigin={{vertical: 'top', horizontal: 'left'}} color="error">
          <Button color="success" variant="outlined" startIcon={<DateRangeOutlinedIcon />}>
            Estate Visits
          </Button>
              </Badge>
               </OptionsBarLinks>
        </ListItem>

        {adminAuth &&
        <ListItem  onClick={toggleDrawer(false)} button>
            <OptionsBarLinks to="/adminDashBoard#EstatesRequests">
          <Badge badgeContent={context.estateRequests === "error" || context.estateRequests === "NoData"? 0 :context.estateRequests.length}  anchorOrigin={{vertical: 'top', horizontal: 'left'}} color="error">
          <Button color="warning" variant="outlined" startIcon={<AdminPanelSettingsOutlinedIcon />}>
            Admin Board
          </Button>
              </Badge>
               </OptionsBarLinks>
        </ListItem>
       }

        <ListItem onClick={logOut} button>
          <Button color="error" variant="outlined" startIcon={<LogoutIcon />}>
            Sign Out
          </Button>
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
