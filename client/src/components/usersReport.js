import React from "react";
import {Table, TableCell, TableHead, TableRow, TableBody} from '@mui/material';
import {TableExpandDiv} from './Styles/tableStyle';

function Users() {
  
  return (
    <div className="container">
    <Table>
    <TableRow>
      <TableCell colSpan="3">
        <TableExpandDiv>
          <TableHead>
            <TableRow>
              <TableCell align="center">Admin</TableCell>
              <TableCell align="center">Name</TableCell>
              <TableCell align="center">Email</TableCell>
              <TableCell align="center">Phone Number</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell align="center">
              <input
            type="checkbox"
            ></input>
            </TableCell>
              <TableCell align="center">hhhhh</TableCell>
              <TableCell align="center">hhhh@yahoo.com</TableCell>
              <TableCell align="center">01154552</TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="center">
              <input
            type="checkbox"
            ></input>
            </TableCell>
              <TableCell align="center">hhhhh</TableCell>
              <TableCell align="center">hhhh@yahoo.com</TableCell>
              <TableCell align="center">01154552</TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="center">
              <input
            type="checkbox"
            ></input>
            </TableCell>
              <TableCell align="center">hhhhh</TableCell>
              <TableCell align="center">hhhh@yahoo.com</TableCell>
              <TableCell align="center">01154552</TableCell>
            </TableRow>
          </TableBody>
        </TableExpandDiv>
      </TableCell>
    </TableRow>
    </Table>
    </div>
  );
}

export default Users;