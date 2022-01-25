import React from 'react';
import {Drawer, List, ListItem} from '@mui/material';
import EstateForm from './estateForm';
import Badge from '@mui/material/Badge';
import {Button} from '@mui/material';
import {
  NavBtn,
  NavBtnLink
} from './Styles/navbarElementsStyle';
import { SideBtnWrap, SidebarRoute } from './Styles/sidebarElementsStyle';
import {MyContext} from '../components/provider';
import { useNavigate  } from 'react-router-dom';
import {BookmarkBorder as BookmarkBorderIcon, AssignmentOutlined as AssignmentOutlinedIcon, AssignmentLateOutlined  } from '@material-ui/icons';

function OptionsBar(props){
  const [state, setState] = React.useState(false);
    const toggleDrawer = ( open) => (event) => {
      setState(  open );
    };
    const navigate = useNavigate();
    const handleListClick = () => {
      navigate('/admin');
    }

    return (<MyContext.Consumer>{
        (context) => {

    const list = () => (
      <div
      >
        <List>
          <ListItem button>
            <EstateForm />
          </ListItem >

          <ListItem onClick={handleListClick} button>
            <Button color="success" variant="outlined" startIcon={<BookmarkBorderIcon />}>
              Saved list
            </Button>
          </ListItem>

          <ListItem onClick={handleListClick} button>
            <Button color="success" variant="outlined" startIcon={<AssignmentOutlinedIcon />}>
              My Estates
            </Button>
          </ListItem>


        <ListItem onClick={handleListClick} button>
          <Badge badgeContent={context.estateRequests.length}  anchorOrigin={{vertical: 'top', horizontal: 'left'}} color="error">
          <Button color="success" variant="outlined" startIcon={<AssignmentLateOutlined />}>
            Eatate Req
          </Button>
              </Badge>
        </ListItem>
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
}</MyContext.Consumer>)
}

export default OptionsBar;
OptionsBar.defaultProps = {
  Mobile: false
}
