import React from "react";
import {FormInputs, DropDownLists} from './formInputs';
import {PredictionFormVali, FormValid, EstateFormValiMsg} from './checkData';
import { PredictionFormTitleBtn, PredictionMainForm, PredictionFormBackBtn} from './Styles/predictionFormStyle';
import {Button} from '@mui/material';
import {Save as SaveIcon} from "@mui/icons-material";
import serverFunctions from '../serverFunctions/estate';
import Info from './infoSection/info.js';
import { homeObjFour } from './infoSection/data.js';
import { KeyboardArrowLeft} from "@mui/icons-material";
import {StatusAlert, ValidationMsg} from './appAlerts';
import MyMap from './map';
import {MyContext} from '../components/provider';


const PredictionForm = ()=> {

  const [data, setData] = React.useState({addressOnMap: [30.044417093043883 ,31.235753400264315]});
  const [formActive, setFormActive] = React.useState(false);
  const [map, setMap] = React.useState(false);

  React.useEffect(() => {
    setMap(false);
    const timer = setTimeout(() => {
     setMap(true);
   }, 3000);
    return () => clearTimeout(timer);
  }, [formActive]);

  let validation ={};
  let msg ={};
  PredictionFormVali(validation , data);
  EstateFormValiMsg(msg);


  function handleChange(event) {
     let name = event.target.name;
     let value= event.target.value
    setData((prevUser) => {
     return {
        ...prevUser,
          [name]:value
      };
    });
  }

    const handleFormActive = () => {
      setFormActive((prevActiveStep) => !prevActiveStep);
    };

    homeObjFour.onClick = handleFormActive;

  const submitPredictionForm = async (event) =>{
    event.preventDefault();
    let subVali = FormValid(validation,msg);
    if(subVali.length > 0){
      ValidationMsg(subVali);
      return;
    }
      const Status = await serverFunctions.predictEstate(data);
      if(Status ==='error'){
         StatusAlert("error");
       }else{
         StatusAlert('Added');
       }
  }
  return (<MyContext.Consumer>{
      (context) => {

  return (
    <>

{formActive?
<PredictionMainForm onSubmit={submitPredictionForm}>
<PredictionFormTitleBtn>Prediction Form</PredictionFormTitleBtn>
<PredictionFormBackBtn>
    <Button size="small" onClick={handleFormActive}>
        <KeyboardArrowLeft />
    </Button>
</PredictionFormBackBtn>
    <DropDownLists  name={"category"} handleChange={handleChange} helperText={"Please select estate category"} validation={validation.Category} value={data.category||""} options={context.categoryAndType.category}/>
    <DropDownLists  name={"type"} handleChange={handleChange} helperText={"Please select estate type"} validation={validation.Type} value={data.type||""} options={context.categoryAndType.type}/>
    <FormInputs  validation={validation.Size} type={"number"} name={"size"} label={"Size"} helperText={"Please enter size in meter square (&#13217;)"} handleChange={handleChange} value={data.size||""}/>
    <FormInputs  validation={validation.floor} type={"number"} name={"floor"} label={"Floor"} helperText={"Please enter in which floor or number of floors if villa"} handleChange={handleChange} value={data.floor||""}/>
    <FormInputs  validation={validation.Number_Of_Rooms} type={"number"} name={"numOfRooms"} label={"Number of Rooms"} helperText={""} handleChange={handleChange} value={data.numOfRooms||""}/>
    <FormInputs  validation={validation.Number_Of_BathRooms} type={"number"} name={"numOfBathRooms"} label={"Number of Bathrooms"} helperText={""} handleChange={handleChange} value={data.numOfBathRooms||""}/>
    <FormInputs  validation={validation.Description} label={"Description"} type={"text"} name={"desc"} helperText={"Please describe the estate, neighborhood and any constraints"} handleChange={handleChange} multiline={true} value={data.desc||""}/>
    <FormInputs  fullWidth={true} validation={validation.Address} label={"Address"} name={"address"}  type={"text"} helperText={"Please enter the estate address and mark it on map"} handleChange={handleChange} value={data.address||""}/>

    {map &&
        <PredictionFormBackBtn>
              <MyMap Change={handleChange} Location={data.addressOnMap} />
         </PredictionFormBackBtn>
    }

     <PredictionFormBackBtn>
       <Button type="submit" color="success" variant="outlined" startIcon={<SaveIcon />}>
       Save
       </Button>
     </PredictionFormBackBtn>
   </PredictionMainForm>:<Info {...homeObjFour} />
}
</>
  )}
}</MyContext.Consumer>)
}

export default PredictionForm;
