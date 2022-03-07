import React from "react";
import {Table, TableCell, TableContainer, TableHead, TableRow, TableBody, Paper} from '@mui/material';
import { TopThree } from "./Styles/endAuctionStyle";
const EndAuction = () => {
    return(
    <TopThree>
       <TableContainer component={Paper}>
      <Table sx={{ width: "80%", mx: "auto"
        }} aria-label="simple table">
        <TableHead>
          <TableRow>
           <TableCell size="small"></TableCell>
            <TableCell align="center">Top Bids</TableCell>
            <TableCell align="center">UserName</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow >
            <TableCell style={{width: "5%"}}  align="center" >
            </TableCell>
            <TableCell align="center">800$</TableCell>
            <TableCell align="center">@username</TableCell>
          </TableRow>
          <TableRow >
            <TableCell style={{width: "5%"}}  align="center" >
            </TableCell>
            <TableCell align="center">800$</TableCell>
            <TableCell align="center">@username</TableCell>
          </TableRow>
          <TableRow >
            <TableCell style={{width: "5%"}}  align="center" >
            </TableCell>
            <TableCell align="center">800$</TableCell>
            <TableCell align="center">@username</TableCell>
          </TableRow>
        </TableBody>
        </Table>
        </TableContainer>
    </TopThree>
    );
}
export default EndAuction;
