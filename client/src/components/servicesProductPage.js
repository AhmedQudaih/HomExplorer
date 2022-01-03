import React from 'react';
import {Button , Box ,Pagination } from '@mui/material';
import Loading from './loading';
import {
  ServicesContainer,
  ServicesH1,
  ServicesWrapper,
} from './Styles/servicesProductPageElementsStyle';
import EstateCard from './estateCard';
import serverFunctions from '../serverFunctions/estate'


function Services() {
  const [page, setPage] = React.useState(1);
  const [change, setChange] = React.useState(false);
  const [data, setData] = React.useState('');
  const [partition, setPartition] = React.useState(0);
  const [expand, setExpand] = React.useState(false);
  const totalPages = Math.ceil(data.length / 6);
  const handlePageChange = (event, value) => {
    setPage(value);
    if(totalPages - value <= 1 ){
      getPartion();
    }
  };

  const updateData = () => {
    setData('');
    setExpand(false);
    setPage(1);
    if(partition !== 0){
      setPartition(0);
    }else{
      setChange((pre)=>{
        return (!pre);
      })
    }
  };


  const getPartion = () => {
    setPartition((pre)=>{
      return (pre + 1);
    })
  };

  const handleDetailsClick = (id) => {
    setExpand(id);
  };


  React.useEffect(() => {
    const fetchData = async ()=>{
      const data = await serverFunctions.getEstates(partition);
      setData((pre)=>{
        return[
          ...pre,
          ...data
        ]
      });
    }

    fetchData();
  },[partition, change])
  if (data.length === 0 ) {
    return (<ServicesContainer  id="services" name="services" >
      <ServicesH1>Services</ServicesH1>
      <Loading/>
    </ServicesContainer>);
  }
  return (
   <ServicesContainer id="services" name="services">
    <ServicesH1>Services</ServicesH1>
      <ServicesWrapper>
        {
          data.slice((Math.ceil(page) - 1) * 6, Math.ceil(page) * 6).map((e) => (
            <EstateCard updateData={updateData} key={e._id} data={e} expand={expand} handleDetailsClick={handleDetailsClick} />
           ))
        }

      </ServicesWrapper>
    <Box sx={{ m: "2%", padding: "0.5%",backgroundColor: 'white',borderRadius: "1rem"}}>
      <Button href="#services"><Pagination count={totalPages} page={page} color="success" onChange={handlePageChange}/></Button>
    </Box>
  </ServicesContainer>
);
}

export default Services
