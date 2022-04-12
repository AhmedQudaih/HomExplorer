import React from 'react'
import serverFunctions from '../serverFunctions/estate'
import {
  CheckCircle as CheckCircleIcon ,
  Close as CloseIcon, ExpandMore as ExpandMoreIcon, ExpandLess as ExpandLessIcon
} from "@mui/icons-material";
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TableFooter, TablePagination} from '@mui/material';
import {ServicesProductContainer, ServicesProductH1} from './Styles/servicesElementsStyle';
import Loading from './loading';
import {TableExpandDiv} from './Styles/tableStyle';
import {CheckData} from './checkData';
import {StatusAlert, CheckOperation} from './appAlerts';
import ScheduleVisit from './scheduleVisit';
import FilterBox from './filterBox'


function ApproveEstateReq(props) {
  const [expand, setExpand] = React.useState(false);
  const [statusFilter, setStatusFilter] = React.useState('myVisit');
  const validation = CheckData([ props.visitRequests[statusFilter] === "error" || props.visitRequests[statusFilter] === "NoData"?  props.visitRequests[statusFilter]: props.visitRequests[statusFilter].length ===0? "NoData" : false ]);
  const [page, setPage] = React.useState(0);
   const [rowsPerPage, setRowsPerPage] = React.useState(5);
   const handleChangePage = (event, newPage) => {
     setPage(newPage);
   };

   const handleChangeRowsPerPage = (event) => {
     setRowsPerPage(parseInt(event.target.value, 10));
     setPage(0);
   };

  const handelDecisionBtn = async (data,status) => {
    const formData = {
      'visitorId':data.visitorId,
      'estateId':data.estateId,
      'status':status
    }
    const confirm = await CheckOperation()
    if(confirm.isConfirmed === true){
     const Status = await serverFunctions.scheduleVisit(formData);
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
     setPage(0);
     setExpand(false);
     setStatusFilter(value);
   }



  return (<ServicesProductContainer id="VisitRequests">
      <ServicesProductH1 >Visit Requests</ServicesProductH1>

        <FilterBox value={statusFilter} onChange={(event)=>{handleStatusFilterChange(event.target.value)}}
          options={[{ value:"myVisit",title: "myVisit"},{value:"approve",title: "Approved Visits"},{value:"pending",title: "Pending Visits"},{value:"reject",title: "Rejected Visits"}]}      />


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
          {(rowsPerPage > 0
            ? props.visitRequests[statusFilter].slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : props.visitRequests[statusFilter]).map((e) => (<React.Fragment key={e._id}>
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
                {statusFilter === "myVisit" &&
                <TableBody>
                  <TableRow >
                      <TableCell colSpan="2"  align="center">
                        <ScheduleVisit updateFunc={handelChange} estateId={e.estateId} />
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
        <TableFooter>
                 <TableRow>
                   <TablePagination
                     rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                     colSpan={statusFilter !== "pending" ? 5 : 6}
                     count={props.visitRequests[statusFilter].length}
                     rowsPerPage={rowsPerPage}
                     page={page}
                     SelectProps={{
                       inputProps: {
                         'aria-label': 'rows per page',
                       },
                       native: true,
                     }}
                     onPageChange={handleChangePage}
                     onRowsPerPageChange={handleChangeRowsPerPage}

                   />
                 </TableRow>
               </TableFooter>
      </Table>
    </TableContainer>}
</ServicesProductContainer>
  )
}
export default ApproveEstateReq;
