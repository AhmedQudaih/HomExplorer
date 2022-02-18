import React from 'react';
import {Box, Pagination} from '@mui/material';
import Loading from './loading';
import {ServicesProductContainer, ServicesProductH1, ServicesProductWrapper, ServicesBackground, ServicesH1Color} from './Styles/servicesElementsStyle';
import EstateCard from './estateCard';
import serverFunctions from '../serverFunctions/estate'
import {ButtonR as ButtonMain} from './Styles/buttonElementsStyle';
import {ArrowForward} from '@material-ui/icons';
import {MainBtnArrowStyle} from './Styles/mainElementsStyle';
import {NavLinks} from './Styles/navbarElementsStyle';
import EstateDetailsSections from './estateDetailsSections';
import {MyContext} from '../components/provider';
import {CheckData} from './checkData';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import {CompareMood} from './appAlerts'

function Services(props) {
  const [page, setPage] = React.useState(1);
  const [data, setData] = React.useState([]);
  const [detailsAndCompare, setDetailsAndCompare] = React.useState({details: false, compare: false});
  const [partition, setPartition] = React.useState(0);
  const totalPages = Math.ceil(data.length / 12);

  React.useEffect(() => {
    const fetchData = async () => {
      if (props.Data) {
          setData(props.Data)
      } else {
        const data = await serverFunctions.getEstates(partition);
        if(data === "error"){
          return setData(data);
        }
        if(data.length === 0){
          return setData("NoData");
        }
        setData((pre) => {
          if(pre === "NoData"){
            pre = []
          }
          return [
            ...pre,
            ...data
          ]
        });
      }
    }
    fetchData();
  }, [partition, props.Data]);
  const getPartion = () => {
    setPartition((pre) => {
      return (pre + 1);
    })
  };

  const handlePageChange = (event, value) => {
    setPage(value);
    if (totalPages - value <= 1 && !props.Data ) {
      getPartion();
    }
  };

  const handleDetailsAndCompare = (name, data) => {
    setDetailsAndCompare((pre) => {
      if (name === "details" && data._id === pre.compare._id && data !== false) {
        data = pre.details;
      }
      return {
        ...pre,
        [name]: data
      }
    });
    if (name === "compare") {
      handleDetailsAndCompare("details", false);
      CompareMood(false)
    }
  };

  const [statusFilter, setStatusFilter] = React.useState('');

   const handleStatusFilterChange = (event) => {
     let update = props.Data.filter(i => i.status === event.target.value);
      setData(update);
       setStatusFilter(event.target.value);

   };

  return (
    <MyContext.Consumer>{(context)=>{
      const updateData = (operation, modif) => {
        if (operation === "delete") {
          let update = data.filter(i => i._id !== modif);
          return setData(update);
        }
        if (operation === "rate") {
          let update = context.rateList.filter(i => i.estateId !== modif.estateId);
          update.push({estateId: modif.estateId, rate: modif.rate})
          return context.setRateList(update);
        }
        if (operation === "save") {
          let index = context.saveList.findIndex(i => i.estateId._id === modif._id);
          if (index === -1) {
            context.setSaveList((pre) => {
              return [
                ...pre, {
                  "estateId": modif
                }
              ]
            });
          } else {
            let update = context.saveList;
            update.splice(index, 1);
            context.setSaveList(update);
          }
        }
      }
    const validation = CheckData([data==="error" || data==="NoData" ?data:data.length, context.saveList, context.rateList]);

  return (<ServicesProductContainer style={props.from === "Services" || props.from === "My Estates"
      ? ServicesBackground
      : null} id={props.ID} >
    <ServicesProductH1 style={props.from === "Services"|| props.from === "My Estates"
        ? ServicesH1Color
        : null}>{props.from}</ServicesProductH1>

      {
      props.from === "My Estates" &&
      <Box sx={{
        m: "2%",
        padding: "0.5%",
        backgroundColor: 'white',
        borderRadius: "1rem"
          }}>
      <ToggleButtonGroup
        color="primary"
        value={statusFilter}
        exclusive
        onChange={handleStatusFilterChange}>
    <ToggleButton value="approve">My Approved Estates</ToggleButton>
    <ToggleButton value="pending">My Pending Estates</ToggleButton>
    <ToggleButton value="reject">My Rejected Estates</ToggleButton>
</ToggleButtonGroup>
</Box>
      }
      { validation?
        <Loading mood={validation} />:<>
    <ServicesProductWrapper>
      {
        props.from === "Services"
          ?/* in case call from Services */
          data.slice(0, 3).map((e) => (<EstateCard updateData={updateData} ID={props.ID} key={e._id} data={e} handleDetailsClick={handleDetailsAndCompare}/>))
          : data.length > 0 &&/* in case call from product */
          data.slice((Math.ceil(page) - 1) * 12, Math.ceil(page) * 12).map((e) => (<EstateCard key={e._id} data={e} ID={props.ID} handleDetailsClick={handleDetailsAndCompare}/>))
      }
    </ServicesProductWrapper>
    {
      props.from === "Services"
        ? <Box sx={{
              m: "2%",
              padding: "0.5%",
              borderRadius: "1rem"
            }}>
            <ButtonMain to="/products" primary="true" dark="true">
              More Estates
              <ArrowForward style={MainBtnArrowStyle}/>
            </ButtonMain>
          </Box>
        : <Box sx={{
              m: "2%",
              padding: "0.5%",
              backgroundColor: 'white',
              borderRadius: "1rem"
            }}>
            <NavLinks to={"#"+props.ID} smooth={true} duration={500} exact='true' offset={-80}>
              <Pagination count={totalPages} page={page} color="success" onChange={handlePageChange}/>
            </NavLinks>
          </Box>
    }
    <ServicesProductWrapper id={"details"+props.ID}>
      {detailsAndCompare.compare &&<> {CompareMood(true)} <EstateDetailsSections key={detailsAndCompare.compare._id} compareMode={detailsAndCompare.compare._id} saveList={context.saveList} rateList={context.rateList} updateData={updateData} handleDetailsAndCompare={handleDetailsAndCompare} data={detailsAndCompare.compare}/></>}
      {detailsAndCompare.details && <EstateDetailsSections key={detailsAndCompare.details._id} compareMode={detailsAndCompare.compare._id} saveList={context.saveList} rateList={context.rateList} updateData={updateData} handleDetailsAndCompare={handleDetailsAndCompare} data={detailsAndCompare.details}/>}
    </ServicesProductWrapper >
    </>}
  </ServicesProductContainer>)    }}</MyContext.Consumer>
    )
}

export default Services
Services.defaultProps = {
  from: ""
}
