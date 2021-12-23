import React from 'react';
import Icon1 from '../images/svg-4.svg';
import Pagination from '@mui/material/Pagination';
import {Button , Box } from '@mui/material';
import Collapse from '@mui/material/Collapse';
import Loading from './loading';
import EstateDetails from './estateDetails';
import {
  ServicesContainer,
  ServicesH1,
  ServicesWrapper,
  ServicesCard,
  ServicesIcon,
  ServicesH2,
  ServicesDiv,
} from './Styles/servicesElementsStyle';
import {
  Close as CloseIcon
} from "@material-ui/icons";



function Services() {
  const [page, setPage] = React.useState(1);
  const [data, setData] = React.useState(null);
  const [expand, setExpand] = React.useState(false);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handleDetailsClick = (id) => {
    setExpand(id);
  };

  React.useEffect(() => {
    fetch('http://localhost:4000/').then(response => {
      if (response.ok) {
        return response.json();
      }
      throw response;
    }).then(data => {
      setData(data);
    }).catch(error => {
      console.error("Error fetching data: ", error);
    })
  }, [])


  if (data == null) {
    return (<ServicesContainer >
      <ServicesH1>Services</ServicesH1>
      <Loading/>
    </ServicesContainer>);
  }
  return (
   <ServicesContainer name="services">
    <ServicesH1>Services</ServicesH1>
    <ServicesWrapper>
      {
        data.slice((Math.ceil(page) - 1) * 6, Math.ceil(page) * 6).map((e) => (
          <ServicesCard className ={expand === e._id
            ? "expandClass": null} key={e._id}  onClick={expand === e._id? null : () => handleDetailsClick(e._id)}>
            {expand ===e._id?
            <Button onClick={()=>handleDetailsClick(false)} color="success" >
              <CloseIcon />
            </Button>
          : null}
          <ServicesIcon src={Icon1}/>
          <ServicesH2>{e.price}
            $</ServicesH2>
          <ServicesDiv>
            <p>
              {expand === e._id ? e.details['desc'] : (e.details['desc'].substring(0, 50) + "....")}
            </p>
          </ServicesDiv>
          <Collapse in={expand === e._id} timeout="auto" unmountOnExit={true}>
            <EstateDetails data={e} />
          </Collapse>
        </ServicesCard>
         ))
      }

    </ServicesWrapper>

    <Box sx={{
        m: 5,
        padding: "1%",
        backgroundColor: 'white',
        borderRadius: "10px"
      }}>
      <Pagination count={Math.ceil(data.length / 6)} page={page} color="success" onChange={handlePageChange}/>
    </Box>

  </ServicesContainer>

);
}

export default Services
/*{


      <ServicesCard>
          <ServicesIcon src={Icon1} />
          <ServicesH2>Home Type</ServicesH2>
          <ServicesDiv>It is a long established fact that a reader will be distracted by content.</ServicesDiv>
      </ServicesCard>
      <ServicesCard>
          <ServicesIcon src={Icon2} />
          <ServicesH2>Home Type</ServicesH2>
          <ServicesDiv>It is a long established fact that a reader will be distracted by content.</ServicesDiv>
      </ServicesCard>
      <ServicesCard>
          <ServicesIcon src={Icon3} />
          <ServicesH2>Home Type</ServicesH2>
          <ServicesDiv>It is a long established fact that a reader will be distracted by content.</ServicesDiv>
      </ServicesCard>
      <ServicesCard>
          <ServicesIcon src={Icon4} />
          <ServicesH2>Home Type</ServicesH2>
          <ServicesDiv>It is a long established fact that a reader will be distracted by ontent.</ServicesDiv>
      </ServicesCard>
      <ServicesCard>
          <ServicesIcon src={Icon5} />
          <ServicesH2>Home Type</ServicesH2>
          <ServicesDiv>It is a long established fact that a reader will be distracted by content.</ServicesDiv>
      </ServicesCard>
      <ServicesCard>
          <ServicesIcon src={Icon6} />
          <ServicesH2>Home Type</ServicesH2>
          <ServicesDiv>It is a long established fact that a reader will be distracted by content.</ServicesDiv>
      </ServicesCard>

}*/
