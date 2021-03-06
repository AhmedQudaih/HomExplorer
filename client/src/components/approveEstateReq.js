import React from 'react'
import serverFunctions from '../serverFunctions/estate'
import MyMap from './map';
import PicSlider from './picSlider';
import {
  CheckCircle as CheckCircleIcon ,
  Close as CloseIcon, ExpandMore as ExpandMoreIcon, ExpandLess as ExpandLessIcon
} from "@mui/icons-material";
import {Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TableFooter, TablePagination} from '@mui/material';
import {ServicesProductContainer, ServicesProductH1} from './Styles/servicesElementsStyle';
import Loading from './loading';
import {TableExpandDiv} from './Styles/tableStyle';
import {CheckData} from './checkData';
import {StatusAlert, CheckOperation} from './appAlerts';
import FilterBox from './filterBox';
function ApproveEstateReq(props) {

  const [expand, setExpand] = React.useState(false);
  const [page, setPage] = React.useState(0);
   const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [data, setData] = React.useState(props.estateRequests);

   const handleChangePage = (event, newPage) => {
     setPage(newPage);
   };

   const handleChangeRowsPerPage = (event) => {
     setRowsPerPage(parseInt(event.target.value, 10));
     setPage(0);
   };


  const handelDecisionBtn = async (id,status, auction = false) => {

    var formData = {"_id": id,"status":status };
    const confirm = await CheckOperation()
    if(confirm.isConfirmed === true){
      var Status;
      if(auction){
         Status = await serverFunctions.updateAuctionStatus(formData);
      }else{
         Status = await serverFunctions.approveEstateRequests(formData);
      }
      if(Status ==='error'){
         StatusAlert("error");
       }else{
         handelChange(id)
         StatusAlert('Operation done');
       }

    }
  }

  const handelChange = (id) => {
    let update = data.filter(i => i._id !== id);
    return props.setEstateRequests(update);
  }

  React.useEffect(() => {
    setData(props.estateRequests);

   },[props.estateRequests])



const expandDetails = (id) => {
  expand === id ? setExpand(false):setExpand(id);
  }

  const [statusFilter, setStatusFilter] = React.useState();

   const handleStatusFilterChange = (event) => {
     if(props.estateRequests !== "NoData"){
       let update = props.estateRequests.filter(i => typeof i.auctionData === event.target.value);
        setData(update);
     }

        setStatusFilter(event.target.value);

   };

  const validation = CheckData(data);

  return (<ServicesProductContainer id="EstatesRequests">
      <ServicesProductH1>Estates Requests</ServicesProductH1>

        <FilterBox value={statusFilter} onChange={handleStatusFilterChange}
          options={[{value:"object",title: "Auction Requests"},{value:"undefined",title: "Estates Requests"}]} />

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
          {(rowsPerPage > 0
            ? data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : data).map((e) => (<React.Fragment key={e._id}>
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
                    <TableCell align="center">{e.size}</TableCell>
                    <TableCell align="center">{e.floor}</TableCell>
                    <TableCell align="center">{e.numOfRooms}</TableCell>
                    <TableCell align="center">{e.numOfBathRooms}</TableCell>
                  </TableRow >
                </TableBody>
                {e.type.name=== "Auction"&&
                    <TableBody>
                    <TableRow>
                          <TableCell colSpan="4" align="center">
                      Auction Duration : {e.auctionData.duration} Weeks
                       </TableCell>
                  </TableRow >
                    </TableBody>
              }

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
                      <Button color="success" onClick={()=>{handelDecisionBtn(e._id, 'approve' , e.type.name=== "Auction"&& true)}} variant="outlined" startIcon={<CheckCircleIcon />}>
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
        <TableFooter>
                 <TableRow>
                   <TablePagination
                     rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                     colSpan={5}
                     count={data.length}
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
