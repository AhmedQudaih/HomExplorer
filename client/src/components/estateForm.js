import React from 'react';
import {
  EstateMainForm,
  EstateFormTitle,
  EstateFormClose,
  EstateFormSubmitBtn,
  EstateFormAnimation,
  Input
} from './Styles/estateFormStyle';
import MyMap from './map';
import {Button , Dialog ,DialogContent,Chip,Stack } from '@mui/material';
import Loading from './loading';
import {CameraAltOutlined , AddCircleOutline as AddCircleOutlineIcon ,Cached as CachedIcon, Save as SaveIcon , Close as CloseIcon} from "@material-ui/icons";
import serverFunctions from '../serverFunctions/estate';
import {MyContext} from '../components/provider';
import {EstateFormVali, CheckData, FormValid, EstateFormValiMsg,EstateAuctionVali} from './checkData';
import {StatusAlert, ValidationMsg} from './appAlerts';
import {DropDownLists, FormInputs} from './formInputs';

function EstateForm(props) {


  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [estate, setEstate] = React.useState(props.data);
  const [deletedPicNames, setDeletedPicNames] = React.useState([]);




  const handelUpdateform = React.useCallback(() => {
        if(props.type==='Update' && props.data.category._id){
          if(props.data.type.name === "Auction"){
            setEstate((prevEstate) => {
             return {
                ...prevEstate,
                  "auctionData.duration": props.data.auctionData.duration,
              };
            });
          }

    setEstate((prevEstate) => {
     return {
        ...prevEstate,
          "category": props.data.category._id,
          "type":props.data.type._id,
      };
    });
    }
  }, [props])


  React.useEffect(() => {

       handelUpdateform();
   },[handelUpdateform])



    let validation ={};
    let msg ={};
      EstateFormVali(validation , estate);
      EstateFormValiMsg(msg)

      const addSubmit = async (data) =>{
          const Status = await serverFunctions.addEstate(data);
          if(Status ==='error'){
             StatusAlert("error");
           }else{
             handleClose();
             StatusAlert('Added');
           }
      }

      const updateSubmit = async (data) =>{
          const Status = await serverFunctions.updateEstate(data);
          if(Status ==='error'){
            StatusAlert("error");
          }else{
           handleClose();
           props.handleClose("compare",false)
           props.updateData("delete", estate._id);
           StatusAlert('Updated');
         }
      }

    const submitEstate = (event) =>{
      event.preventDefault();

      let subVali = FormValid(validation,msg);
      if(subVali.length > 0){
        ValidationMsg(subVali);
        return;
      }
        event.target.pic.files = fileValue();
        const formData = new FormData(event.target);
         formData.append('sellerId',estate.sellerId);
         estate.addressOnMap.forEach(element =>{formData.append('addressOnMap',element);});
          if(props.type === 'Add'){
              return addSubmit(formData)
          }
              formData.append('_id',estate._id);
              formData.append('deletedPicNames',deletedPicNames);
              return updateSubmit(formData);
    }





  function handleChange(event) {
    let name = event.target.name;
     let value= event.target.value
    setEstate((prevEstate) => {
     return {
        ...prevEstate,
          [name]:value
      };
    });
  }

function handlefile(event){
  let picfile =  event.target.files;
  estate.pic.push(...picfile);
  handleChange({target:{name:"pic",value:estate.pic}});

}

function fileValue(){
  let list = new DataTransfer();
  estate.pic.forEach((e)=>{
    if(!e.path){
        let file = new File([e], e.name ,{type:e.type});
          list.items.add(file);
    }
  })
  return list.files
}



  const handleDelete = (index ,path) => {
       let pic = estate.pic.filter((element,x) => {  return x !== index})
    handleChange({target:{name:"pic",value:pic}})
   path && setDeletedPicNames((pre)=>{return [...pre,path]})
  };

  return (
    <MyContext.Consumer>{(context)=>{
            const check = CheckData([context.categoryAndType ==="error"?context.categoryAndType:context.categoryAndType.length]);
            if(check){
              return <Loading mood={check}/>
            }

          function auctionData() {

            if (typeof estate.type !=="object"){
            if (estate.type && context.categoryAndType.type.find(e => e._id === estate.type).name ==="Auction"){
              EstateAuctionVali(validation, estate);
              return(
                <FormInputs fullWidth={true} validation={validation.duration} label={"auction duration"} type={"number"} name={"auctionData.duration"} helperText={"Please enter the estate auction duration in weeks"} handleChange={handleChange} value={estate["auctionData.duration"]||""}/>
              );
            }
            }
          }

return(
    <div >
    {props.type !=="Add" ?
       <Button onClick={handleOpen} color="success" variant="outlined" startIcon={<CachedIcon />}>
         Update
       </Button> : <Button onClick={handleOpen} color="success" variant="outlined" startIcon={<AddCircleOutlineIcon />}>
         Add Estate
       </Button>
     }
     <div>
           <Dialog style={EstateFormAnimation} open={open} onClose={handleClose} scroll={"paper"}>
             <div style={EstateFormClose}>
             <Button onClick={handleClose} color="success" >
             <CloseIcon />
             </Button>
             </div>
             <EstateFormTitle>  Estate Form </EstateFormTitle>
            <DialogContent dividers >
               <EstateMainForm onSubmit={submitEstate} >
                 <DropDownLists name={"category"} handleChange={handleChange} helperText={"Please select estate category"} validation={validation.Category} value={estate.category||""} options={context.categoryAndType.category}/>
                 <DropDownLists name={"type"} handleChange={handleChange} helperText={"Please select estate type"} validation={validation.Type} value={estate.type||""} options={context.categoryAndType.type}/>
                 <FormInputs validation={validation.Size} type={"number"} name={"size"} label={"Size"} helperText={"Please enter size in meter square (&#13217;)"} handleChange={handleChange} value={estate.size||""}/>
                 <FormInputs validation={validation.floor} type={"number"} name={"floor"} label={"Floor"} helperText={"Please enter in which floor or number of floors if villa"} handleChange={handleChange} value={estate.floor||""}/>
                 <FormInputs validation={validation.Number_Of_Rooms} type={"number"} name={"numOfRooms"} label={"Number of Rooms"} helperText={""} handleChange={handleChange} value={estate.numOfRooms||""}/>
                 <FormInputs validation={validation.Number_Of_BathRooms} type={"number"} name={"numOfBathRooms"} label={"Number of Bathrooms"} helperText={""} handleChange={handleChange} value={estate.numOfBathRooms||""}/>

               <div >
               <label>
                 <Input name = "pic"  onChange = {
                 handlefile
                 } multiple type="file" />
               <Button variant="outlined" color = {validation.Images} component="span"> <CameraAltOutlined />
                 </Button> Upload Estate Images
               </label>
               <Stack sx={{mt:2}} spacing={1}>
                {   estate.pic.map((e , index)=>{
                    return(  <Chip  key={e.name} label={e.name.substring(0, 7) + "...."} variant="outlined" onDelete={()=>handleDelete(index ,e.path)} />);
                  })
                }
              </Stack>
              </div>

               <div>
                <label>
                  <Input  name = "contract"  onChange = {(event)=>{handleChange({target:{name:"contract",value:event.target.files[0]}})}} type="file" />
                  <Button variant="outlined" color = {validation.Contract} component="span"> <CameraAltOutlined />
                 </Button> Upload Estate Contract
               </label>
               <Stack sx={{mt:2}} spacing={1}>
              {(estate.contract||null) && <Chip key={estate.contract.name} label={estate.contract.name}
               variant="outlined"
               onDelete={()=>{handleChange({target:{name:"contract",value:null}})}} />
              }

              </Stack>
             </div>

             <FormInputs validation={validation.Description} label={"Description"} type={"text"} name={"desc"} helperText={"Please describe the estate, neighborhood and any constraints"} handleChange={handleChange} multiline={true} value={estate.desc||""}/>
             <FormInputs validation={validation.Price} type={"number"} name={"price"} label={"Price"} helperText={"Please enter price in dollar"} handleChange={handleChange} value={estate.price||""}/>

               <EstateFormSubmitBtn>

                 {auctionData()}


                 <FormInputs fullWidth={true} validation={validation.Address} label={"Address"} name={"address"}  type={"text"} helperText={"Please enter the estate address and mark it on map"} handleChange={handleChange} value={estate.address||""}/>

                 <MyMap Change={handleChange} Location={estate.addressOnMap} />
                 </EstateFormSubmitBtn>

               <EstateFormSubmitBtn>
                 <Button type="submit" color="success" variant="outlined" startIcon={<SaveIcon />}>
                 Save
                 </Button>
               </EstateFormSubmitBtn>
             </EstateMainForm>
             </DialogContent>
             </Dialog>
         </div>
      </div>
)
  }}</MyContext.Consumer>
  )

}

export default EstateForm;
EstateForm.defaultProps = {
  data:{
    addressOnMap: [30.044417093043883 ,31.235753400264315],
    pic: [],
    sellerId:"61fa26aae91bd24b703d989d"
  },
  type:"Add"
}
