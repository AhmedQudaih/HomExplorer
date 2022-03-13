import React from "react";
import {Table,Button, TableCell, TableContainer, TableHead, TableRow, TableBody, Paper} from '@mui/material';
import {ExpandMore as ExpandMoreIcon, ExpandLess as ExpandLessIcon} from "@material-ui/icons";
import {TableExpandDiv} from './Styles/tableStyle';
import { DetailsBtnCard } from "./Styles/estateDetailsStyle";
import serverFunctions from '../serverFunctions/estate';
import {CheckData} from './checkData';
import Loading from './loading';
const EndAuction = (props) => {

  const [expand, setExpand] = React.useState(false);
  const [data, setData] = React.useState(false);


  const expandDetails = (id) => {
    expand === id ? setExpand(false):setExpand(id);
    }

      React.useEffect(() => {
        const fetchData = async () => {
          const data = await serverFunctions.endAuction(props.estateId);
            setData(data);
        }
        fetchData();
      },[props.estateId]);


      const validation = CheckData([data === "error" || data === "NoData"?data:data.length]);

    return(
    <DetailsBtnCard>
  {validation? <Loading mood={validation}/>:
        <TableContainer component={Paper}>
          <Table sx={{
              width: "80%",  mx: "auto"
            }} aria-label="simple table">
            <TableHead>
              <TableRow>
                 <TableCell align="center">User Name</TableCell>
                 <TableCell align="center">Bid Amount </TableCell>
                 <TableCell size="small"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data && data.map((e) => (
                <React.Fragment key={e._id}>
              <TableRow onClick={()=>{expandDetails(e._id)}} >
                <TableCell align="center">{e.userId.name}</TableCell>
                <TableCell align="center">{e.price}</TableCell>
                  <TableCell style={{width: "5%"}}  align="center" size="small">
                  <Button variant="outlined" color = {"primary"} >
                  {expand === e._id?<ExpandLessIcon />:<ExpandMoreIcon />}
                    </Button>
                    </TableCell>
              </TableRow>
              {expand === e._id &&
              <TableRow >
                <TableCell colSpan="3">
                  <TableExpandDiv>
                    <TableHead>
                      <TableRow>
                        <TableCell align="center">Email</TableCell>
                        <TableCell align="center">Phone Number</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <TableRow >
                        <TableCell align="center">{e.userId.email}</TableCell>
                        <TableCell align="center">{e.userId.phoneNumber}</TableCell>
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
    </DetailsBtnCard>
    );
}
export default EndAuction;
