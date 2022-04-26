import React from 'react';
import {
  DetailsBtnCard,CenterDetailsBtnCard
} from './Styles/estateDetailsStyle';
import {EstateCardDivCard} from './Styles/estateCardStyle';
import {Button} from '@mui/material';
import {
  Delete as DeleteIcon,
  Close as CloseIcon,
  Compare as CompareIcon
} from "@mui/icons-material";
import serverFunctions from '../serverFunctions/estate'
import EstateDetails from './estateDetails';
import SaveEstate from './saveEstate'
import RateEstate from './rateEstate'
import EstateForm from './estateForm';
import {StatusAlert, CheckOperation} from './appAlerts';
import ScheduleVisit from './scheduleVisit';
import {CheckAuth} from './checkData';
import EstateAuctionSection from './estateAuctionSection';

function EstateDetailsSections(props){
  const getSave=(estateId)=>{
    let save = props.saveList.find(i => i.estateId._id === estateId );
    return save?true:false;
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


return(
    <EstateCardDivCard className ={!props.compareMode &&"expandClass"} >
      <Button onClick={handleClose} color="success" >
        <CloseIcon />
      </Button>
        <EstateDetails data={props.data} />
    {CheckAuth()&&<>

        { props.data.type.name === "Auction" && <EstateAuctionSection data={props.data} />}

        {props.userId === props.data.sellerId?
        <DetailsBtnCard>
          <Button color="error" onClick={()=>handelDeleteBtn(props.data._id)} variant="outlined" startIcon={<DeleteIcon />}>
            Delete
          </Button>
          <EstateForm handleClose={handleClose} updateData={props.updateData} type={"Update"} data={props.data}/>
        </DetailsBtnCard >:
        <>
        <ScheduleVisit userId={props.userId} estateId={props.data} />
        <SaveEstate updateData={props.updateData} save={getSave(props.data._id)} userId={props.userId} estate={props.data} />
        <CenterDetailsBtnCard>
          <RateEstate updateData={props.updateData} rate={props.data.rate} userId={props.userId} estateId={props.data._id}/>
    </CenterDetailsBtnCard >
      </>
      }
        </>  }
          <Button color="primary" onClick={()=>props.handleDetailsAndCompare("compare",props.data)}  variant="outlined" startIcon={<CompareIcon  />}>
            Compare
          </Button>

    </EstateCardDivCard >
  );
}

export default EstateDetailsSections;
