import React from 'react';
import {Button , Box ,Pagination } from '@mui/material';
import Loading from './loading';
import {
  ServicesProductContainer,
  ServicesProductH1,
  ServicesProductWrapper,
  ServicesBackground,
  ServicesH1Color
} from './Styles/servicesElementsStyle';
import EstateDetails from './estateDetails'
import EstateCard from './estateCard';
import serverFunctions from '../serverFunctions/estate'
import { ButtonR as ButtonMain  } from './Styles/buttonElementsStyle';
import { ArrowForward } from '@material-ui/icons';
import {MainBtnArrowStyle } from './Styles/mainElementsStyle';
import {NavLinks } from './Styles/navbarElementsStyle';


function Services(props) {
  const [page, setPage] = React.useState(1);
  const [change, setChange] = React.useState(false);
  const [data, setData] = React.useState('');
  const [compare, setCompare] = React.useState('');
  const [details, setDetails] = React.useState('');
  const [partition, setPartition] = React.useState(0);
  const [expand, setExpand] = React.useState(false);
  const totalPages = Math.ceil(data.length / 12);
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

  const handleDetailsClick = (data) => {

    setDetails(data);

  };
console.log(details);

const handleCompareClick = (data) => {
    setCompare(data)
    handleDetailsClick(false)
};


console.log(details);

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

/*in case no data*/
  if (data.length === 0 ) {
    return (<ServicesProductContainer  id="services" name="services" >
      <ServicesProductH1>Services</ServicesProductH1>
      <Loading/>
    </ServicesProductContainer>);
  }
  /*in case call from home page*/
  if(props.from ==="Services"){
    return(
      <ServicesProductContainer style={ServicesBackground} id="services" name="services">
       <ServicesProductH1 style={ServicesH1Color} >Services</ServicesProductH1>
         <ServicesProductWrapper>
           {
             data.slice(0, 3).map((e) => (
               <EstateCard updateData={updateData} key={e._id} data={e} expand={expand} handleDetailsClick={handleDetailsClick} />
              ))
           }

         </ServicesProductWrapper>
           <Box sx={{ m: "2%", padding: "0.5%",borderRadius: "1rem"}}>
         <ButtonMain  to="/products"
         primary="true"
         dark="true"
         >
             More Estates <ArrowForward  style={MainBtnArrowStyle} />
         </ButtonMain>
           </Box>
     </ServicesProductContainer>
    );
  }else {  /*in case call from products page*/
  return (
   <ServicesProductContainer id="services" name="services" >
    <ServicesProductH1>Services</ServicesProductH1>
      <ServicesProductWrapper>
        {
          data.slice((Math.ceil(page) - 1) * 12, Math.ceil(page) * 12).map((e) => (
            <EstateCard key={e._id} data={e} handleDetailsClick={handleDetailsClick} />
           ))
        }

      </ServicesProductWrapper>
    <Box sx={{ m: "2%", padding: "0.5%",backgroundColor: 'white',borderRadius: "1rem"}}>
        <NavLinks to="services" smooth={true} duration={500}  exact='true' offset={-80}>
    <Pagination count={totalPages} page={page} color="success" onChange={handlePageChange}/></NavLinks>
    </Box>
      <ServicesProductWrapper id="details" name="details" >
        {compare &&
          <EstateDetails updateData={updateData} compare={compare._id} compareFunc={handleCompareClick} handleDetailsClick={handleDetailsClick} data={compare} />
        }
    {details &&
          <EstateDetails updateData={updateData} compare={compare._id} compareFunc={handleCompareClick} handleDetailsClick={handleDetailsClick} data={details} />
}


    </ServicesProductWrapper>
  </ServicesProductContainer>
);}
}


export default Services
Services.defaultProps = {
  from:""
}
