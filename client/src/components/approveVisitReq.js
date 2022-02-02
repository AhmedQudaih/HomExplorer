import React from 'react'
import serverFunctions from '../serverFunctions/estate'
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
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import {Box} from '@mui/material';
import ScheduleVisit from './scheduleVisit';



function ApproveEstateReq(props) {
  const [expand, setExpand] = React.useState(false);
  const [statusFilter, setStatusFilter] = React.useState('myVisit');
  const validation = CheckData([ props.visitRequests[statusFilter] === "error"?  props.visitRequests[statusFilter]: props.visitRequests[statusFilter].length]);

  const handelDecisionBtn = async (data,status) => {
    const formData = {
      '_id': data._id,
      'status':status
    }
    const confirm = await CheckOperation()
    if(confirm.isConfirmed === true){
     const Status = await serverFunctions.updateVisit(formData);
      if(Status ==='error'){
         StatusAlert("error");
       }else{
         data.status = status;
         handelChange(data,status)
         StatusAlert('Operation done');
       }
    }
  }

  const handelChange = (data , status) => {
    let update;
    if(statusFilter==="myVisit"){
        update = props.visitRequests[statusFilter].filter((i) => {
        if(i._id === data._id){
            i.status = "pending";
        }
        return i;
      });

    }else{
      update = props.visitRequests[statusFilter].filter(i => i._id !== data._id);
      props.visitRequests[status].push(data);
    }
     props.setVisitRequests((pre)=>{
       return{
         ...pre,
         [statusFilter]:update
       }
     });
  }

const expandDetails = (id) => {
  expand === id ? setExpand(false):setExpand(id);
  }

   const handleStatusFilterChange =(value) => {
     setExpand(false);
     setStatusFilter(value);
   }


  return (<ServicesProductContainer id="VisitRequests">
      <ServicesProductH1>Visit Requests</ServicesProductH1>
              <Box sx={{
                m: "2%",
                padding: "0.5%",
                backgroundColor: 'white',
                 alignItems: 'center',
                borderRadius: "1rem"
                  }}>
              <ToggleButtonGroup
                color="primary"
                value={statusFilter}
                exclusive
                onChange={(event)=>{handleStatusFilterChange(event.target.value)}}>
            <ToggleButton value="myVisit">My Visits</ToggleButton>
            <ToggleButton value="approve">Approved Visits</ToggleButton>
            <ToggleButton value="pending">Pending Visits</ToggleButton>
            <ToggleButton value="reject">Rejected Visits</ToggleButton>
        </ToggleButtonGroup>
        </Box>
    {validation? <Loading mood={validation}/>:
    <TableContainer component={Paper}>
      <Table sx={{
          width: "80%",  mx: "auto"
        }} aria-label="simple table">
        <TableHead>
          <TableRow>
             <TableCell size="small"></TableCell>
            <TableCell align="center">Visitor Name</TableCell>
            <TableCell align="center">Address</TableCell>
            <TableCell align="center">Time</TableCell>
              { statusFilter === "pending" ? <>
            <TableCell align="center">Accept</TableCell>
            <TableCell align="center">Reject</TableCell>
            </>:
            <TableCell align="center">Status</TableCell>
          }
          </TableRow>
        </TableHead>
        <TableBody>
          {
            props.visitRequests[statusFilter].map((e) => (<React.Fragment key={e._id}>
          <TableRow >
            <TableCell onClick={()=>{expandDetails(e._id)}}  style={{width: "5%"}}  align="center" size="small">
            <Button variant="outlined" color = {"primary"} >
            {expand === e._id?<ExpandLessIcon />:<ExpandMoreIcon />}
              </Button>
              </TableCell>
            <TableCell align="center">{e.visitorId.name}</TableCell>
            <TableCell align="center">{e.estateId.address}</TableCell>
            <TableCell align="center">{e.date}</TableCell>
            { statusFilter === "pending" ? <>
              <TableCell align="center">
                <Button color="success" onClick={()=>{handelDecisionBtn(e, 'approve')}} variant="outlined" startIcon={<CheckCircleIcon />}>
                  Approve
                </Button>
              </TableCell>
              <TableCell align="center">
                <Button color="error" onClick={()=>{handelDecisionBtn(e, "reject")}} variant="outlined" startIcon={<CloseIcon />}>
                  Reject
                </Button>
              </TableCell>
              </>:  <TableCell align="center">{e.status}</TableCell>
            }
          </TableRow>

          {expand === e._id &&
          <TableRow >
            <TableCell colSpan="6">
              <TableExpandDiv>

                <TableHead>
                  <TableRow>
                    <TableCell align="center">Visitor Phone Number</TableCell>
                    <TableCell align="center">Email</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow >
                    <TableCell align="center">{e.visitorId.phoneNumber}</TableCell >
                    <TableCell align="center">{e.visitorId.email}</TableCell>
                  </TableRow >
                </TableBody>
                <TableHead>
                  <TableRow>
                    <TableCell colSpan="2" align="center">Estate Description</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow >
                    <TableCell colSpan="2"  align="center">{e.estateId.desc}</TableCell >
                  </TableRow >
                </TableBody>
                {statusFilter !== "pending" &&
                <TableBody>
                  <TableRow >
                      <TableCell colSpan="2"  align="center">
                  <ScheduleVisit userId={"61a81506d4c8835ca4a20610"} update={{"id":e._id, "updateFunc":handelChange}} estateId={e} />
                  </TableCell >
                  </TableRow >
                </TableBody>
              }
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
