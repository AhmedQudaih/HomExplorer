import React from 'react'
import serverFunctions from '../serverFunctions/estate'
import MyMap from './map';
import PicSlider from './picSlider'
import {Button} from '@mui/material';
import {
  CheckCircle as CheckCircleIcon ,
  Close as CloseIcon, ExpandMore as ExpandMoreIcon, ExpandLess as ExpandLessIcon
} from "@material-ui/icons";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {ServicesProductContainer, ServicesProductH1} from './Styles/servicesElementsStyle';
import Loading from './loading';
import {TableExpandDiv} from './Styles/tableStyle';
import {CheckData} from './checkData';
import {StatusAlert, CheckOperation} from './appAlerts';

function ApproveEstateReq(props) {

  const [expand, setExpand] = React.useState(false)

  const handelDecisionBtn = async (id,status) => {
    const formData = new FormData();
      formData.append('_id', id);
      formData.append('status', status);

    const confirm = await CheckOperation()
    if(confirm.isConfirmed === true){
     const Status = await serverFunctions.updateEstate(formData);
      if(Status ==='error'){
         StatusAlert("error");
       }else{
         handelChange(id)
         StatusAlert('Operation done');
       }

    }
  }

  const handelChange = (id) => {
    let update = props.estateRequests.filter(i => i._id !== id);
    return props.setEstateRequests(update);
  }

const expandDetails = (id) => {
  expand === id ? setExpand(false):setExpand(id);
  }

  const validation = CheckData([props.estateRequests === "error"?props.estateRequests:props.estateRequests.length]);

  return (<ServicesProductContainer id="EstatesRequests">
      <ServicesProductH1>Estates Requests</ServicesProductH1>
    {validation? <Loading mood={validation}/>:
    <TableContainer component={Paper}>
      <Table sx={{
          width: "80%",  mx: "auto"
        }} aria-label="simple table">
        <TableHead>
          <TableRow>
           <TableCell size="small"></TableCell>
            <TableCell align="center">Price</TableCell>
            <TableCell align="center">Size</TableCell>
            <TableCell align="center">Category</TableCell>
            <TableCell align="center">Type</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
            props.estateRequests.map((e) => (<React.Fragment key={e._id}>
          <TableRow onClick={()=>{expandDetails(e._id)}} >
            <TableCell style={{width: "5%"}}  align="center" size="small">
            <Button variant="outlined" color = {"primary"} >
            {expand === e._id?<ExpandLessIcon />:<ExpandMoreIcon />}
              </Button>
              </TableCell>
            <TableCell align="center">{e.price}</TableCell>
            <TableCell align="center">{e.size}</TableCell>
            <TableCell align="center">{e.category.name}</TableCell>
            <TableCell align="center">{e.type.name}</TableCell>
          </TableRow>
          {expand === e._id &&
          <TableRow >
            <TableCell colSpan="5">
              <TableExpandDiv>

                <TableHead>
                  <TableRow>
                    <TableCell align="center">Size</TableCell>
                    <TableCell align="center">Floor</TableCell>
                    <TableCell align="center">Number Of Rooms</TableCell>
                    <TableCell align="center">Number Of Bathrooms</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow >
                    <TableCell align="center">{e.size}</TableCell >
                    <TableCell align="center">{e.floor}</TableCell>
                    <TableCell align="center">{e.numOfRooms}</TableCell>
                    <TableCell align="center">{e.numOfBathRooms}</TableCell>
                  </TableRow >
                </TableBody>

                <TableHead>
                  <TableRow>
                    <TableCell colSpan="4" align="center">Description</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow >
                    <TableCell colSpan="4" align="center">{e.desc}</TableCell>
                  </TableRow >
                </TableBody>
                <TableHead>
                  <TableRow>
                    <TableCell colSpan="4" align="center">Address</TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  <TableRow >
                    <TableCell colSpan="4" align="center">{e.address}</TableCell>
                  </TableRow >
                  <TableRow >
                    <td colSpan="4" align="center"><MyMap Location={[...e.addressOnMap]}/></td>
                  </TableRow >
                </TableBody>

                <TableHead>
                  <TableRow>
                    <TableCell colSpan="2" align="center">Images</TableCell>
                    <TableCell colSpan="2" align="center">Contract</TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  <TableRow  >
                    <TableCell colSpan="2" align="center"><PicSlider from ={"details"} pic={e.pic}/></TableCell>
                    <TableCell colSpan="2" align="center"><PicSlider from ={"details"} pic={[e.contract]}/></TableCell>
                  </TableRow >
                </TableBody>

                <TableHead>
                  <TableRow>
                    <TableCell colSpan="4" align="center">Decision</TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  <TableRow >
                    <TableCell colSpan="2" align="center">
                      <Button color="success" onClick={()=>{handelDecisionBtn(e._id, 'approve')}} variant="outlined" startIcon={<CheckCircleIcon />}>
                        Approve
                      </Button>
                    </TableCell>
                    <TableCell colSpan="2" align="center">
                      <Button color="error" onClick={()=>{handelDecisionBtn(e._id, "reject")}} variant="outlined" startIcon={<CloseIcon />}>
                        Reject
                      </Button>
                    </TableCell>
                  </TableRow >
                </TableBody>

              </TableExpandDiv>
            </TableCell>
          </TableRow >}

        </React.Fragment>))
          }
        </TableBody>
      </Table>
    </TableContainer>}
</ServicesProductContainer>
  )
}
export default ApproveEstateReq;
