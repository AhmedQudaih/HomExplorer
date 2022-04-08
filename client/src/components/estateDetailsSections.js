import React from 'react';
import {
  DetailsBtnCard
} from './Styles/estateDetailsStyle';
import {EstateCardDivCard} from './Styles/estateCardStyle';
import {Button} from '@mui/material';
import {
  Delete as DeleteIcon,
  Close as CloseIcon,
  Compare as CompareIcon
} from "@material-ui/icons";
import serverFunctions from '../serverFunctions/estate'
import EstateDetails from './estateDetails';
import SaveEstate from './saveEstate'
import RateEstate from './rateEstate'
import EstateForm from './estateForm';
import {StatusAlert, CheckOperation} from './appAlerts';
import ScheduleVisit from './scheduleVisit';
import PlaceBid from './PlaceBid';
import EndAuction from './endAuction';
import Users from './Users'


function EstateDetailsSections(props){
  const getSave=(estateId)=>{
    let save = props.saveList.find(i => i.estateId._id === estateId );
    return save?true:false;
  }
  const getRate=(estateId)=>{
    let rate = props.rateList.find(i => i.estateId === estateId );
    return rate?rate.rate:rate=0;
  }
  const handleClose = () => {
    if(props.compareMode === props.data._id){
      props.handleDetailsAndCompare("compare",false);
    }else{
        props.handleDetailsAndCompare("details",false);
    }
  };
  const handelDeleteBtn = async (id) => {
    const confirm = await CheckOperation()
    if(confirm.isConfirmed === true){
      handleClose();
     const Status = await serverFunctions.deleteEstate(id);
      if(Status ==='error'){
         StatusAlert("error");
       }else{
         props.updateData("delete", id);
         StatusAlert('Deleted');
       }

    }
  }

  function checkDate(){
    var date1 = new Date(props.data.auctionData.startDate);
    var date2 = new Date();
    date1.setDate(date1.getDate() + props.data.auctionData.duration)
    if(date1.getDate() > date2.getDate()){
    return( <PlaceBid userId={"61fa26aae91bd24b703d989d"} estateId={props.data._id}/>);
    }
      return (<EndAuction estateId={props.data._id}/>);
  }

return(
    <EstateCardDivCard className ={!props.compareMode &&"expandClass"} >
      <Button onClick={handleClose} color="success" >
        <CloseIcon />
      </Button>
        <EstateDetails data={props.data} />
        <ScheduleVisit userId={"61fa26aae91bd24b703d989d"} estateId={props.data} />
        { props.data.type.name === "Auction" && checkDate()

        }
          <DetailsBtnCard>
            <Button color="primary" onClick={()=>props.handleDetailsAndCompare("compare",props.data)}  variant="outlined" startIcon={<CompareIcon  />}>
              Compare
            </Button>
            <RateEstate updateData={props.updateData} rate={getRate(props.data._id)} userId={"61fa26aae91bd24b703d989d"} estateId={props.data._id}/>
          <SaveEstate updateData={props.updateData} save={getSave(props.data._id)} userId={"61fa26aae91bd24b703d989d"} estate={props.data} />
        </DetailsBtnCard >
        <DetailsBtnCard>

          <Button color="error" onClick={()=>handelDeleteBtn(props.data._id)} variant="outlined" startIcon={<DeleteIcon />}>
            Delete
          </Button>
          <EstateForm handleClose={handleClose} updateData={props.updateData} type={"Update"} data={props.data}/>
        </DetailsBtnCard >
        <Users />
    </EstateCardDivCard >
  );
}

export default EstateDetailsSections;
