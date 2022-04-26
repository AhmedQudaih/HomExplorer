import React from "react";
import {Table, TableCell, TableContainer, TableFooter, TablePagination, Paper, TableHead, TableRow, TableBody } from '@mui/material';
import {StatusAlert, CheckOperation} from './appAlerts';
import serverFunctions from '../serverFunctions/user';
import {CheckData} from './checkData';
import Loading from './loading';
import {ServicesProductContainer, ServicesProductH1} from './Styles/servicesElementsStyle';
function UsersReport() {
  const [users,setUsers]= React.useState("Loading");
  const [page, setPage] = React.useState(0);
   const [rowsPerPage, setRowsPerPage] = React.useState(5);

   const handleChangePage = (event, newPage) => {
     setPage(newPage);
   };

   const handleChangeRowsPerPage = (event) => {
     setRowsPerPage(parseInt(event.target.value, 10));
     setPage(0);
   };


  const handelChangeRole = async (index,data) => {
    const confirm = await CheckOperation();
    if(confirm.isConfirmed === true){
     const Status = await serverFunctions.changeRole(data);
      if(Status ==='error'){
         StatusAlert("error");
       }else{
         setUsers((pre)=>{
           pre[index].admin =data.roleValue;
           return[
             ...pre
           ]
         });
         StatusAlert('Operation done');
       }
    }
  }

  React.useEffect(()=>{
    const fetchData = async () => {
        const data = await serverFunctions.getUsers();
        setUsers(data);
    }
    fetchData();
  },[])

    const validation = CheckData(users);

  return (
    <ServicesProductContainer id="UsersReport">
        <ServicesProductH1>Users Report</ServicesProductH1>
    <TableContainer component={Paper}>
        {validation? <Loading mood={validation}/>:
    <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center">Admin</TableCell>
              <TableCell align="center">Name</TableCell>
              <TableCell align="center">Email</TableCell>
              <TableCell align="center">Phone Number</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              (rowsPerPage > 0
                ? users.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                : users).map((user,index) => (
                <TableRow key={user._id}>
                  <TableCell align="center">
                  <input onChange={(event)=>{handelChangeRole(index,{"userId":user._id,"roleValue":event.target.checked})}}
                    checked={user.admin} type="checkbox"></input>
                </TableCell>
                  <TableCell align="center">{user.name}</TableCell>
                  <TableCell align="center">{user.email}</TableCell>
                  <TableCell align="center">{user.phoneNumber}</TableCell>
                </TableRow>
              ))
            }
          </TableBody>
          <TableFooter>
                   <TableRow>
                     <TablePagination
                       rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                       colSpan={5}
                       count={users.length}
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
    }
    </TableContainer>
  </ServicesProductContainer>
  );
}



export default UsersReport;
