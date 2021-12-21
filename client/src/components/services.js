import React from 'react';
import Icon1 from '../images/svg-4.svg';

import Loading from './loading';
import {
  ServicesContainer,
  ServicesH1,
  ServicesWrapper,
  ServicesCard,
  ServicesIcon,
  ServicesH2,
  ServicesDiv,
  ExpandedIconServicesCard,
  ServicesBtnCard
} from './Styles/servicesElementsStyle';
import Pagination from '@mui/material/Pagination';
import {Button , Box } from '@mui/material';
import Collapse from '@mui/material/Collapse';
import {
  LocalOffer as LocalOfferIcon,
  LocationOnSharp as LocationOnSharpIcon,
  Home as VillaIcone,
  Apartment as ApartmentIcon,
  Cached as CachedIcon,
  Delete as DeleteIcon,
  LocalHotel as LocalHotelIcon,
  Bathtub as BathtubIcon,
  FullscreenExit as FullscreenExitIcon,
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
    console.log(id , "details");
    setExpand(id);
  };

  const handelDeleteBtn = (id) => {
    console.log(id, "delete");
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
            <ExpandedIconServicesCard>
              <ServicesDiv>
                {e.category === "Apartment" ? <ApartmentIcon /> : <VillaIcone/>}
                <p>
                  {e.category.name}
                </p>
              </ServicesDiv>
              <ServicesDiv>
                <FullscreenExitIcon/>
                <p>
                  {e.details['size']}
                </p>
              </ServicesDiv>
              <ServicesDiv>
                <LocalHotelIcon/>
                <p>{e.details['numOfRooms']}
                </p>
              </ServicesDiv>
              <ServicesDiv>
                <BathtubIcon/>
                <p>
                  {e.details['numOfBathRooms']}
                </p>
              </ServicesDiv>
              <ServicesDiv>
                <LocalOfferIcon/>
                <p> {e.type.name}</p>
              </ServicesDiv>
            </ExpandedIconServicesCard>
            <ServicesDiv>
              <LocationOnSharpIcon/>
              <p>Address Address Address Address Address Address{e.Address}</p>
            </ServicesDiv>
            <ServicesBtnCard>
              <Button color="error" onClick={()=>handelDeleteBtn(e._id)} variant="outlined" startIcon={<DeleteIcon />}>
                Delete
              </Button>
              <Button color="success" variant="outlined" startIcon={<CachedIcon />}>
                Update
              </Button>
            </ServicesBtnCard >
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
