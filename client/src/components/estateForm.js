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
import {Button, MenuItem ,TextField , Dialog ,DialogContent,Chip,Stack } from '@mui/material';
import Loading from './loading';
import {CameraAltOutlined , AddCircleOutline as AddCircleOutlineIcon ,Cached as CachedIcon, Save as SaveIcon , Close as CloseIcon} from "@material-ui/icons";
import serverFunctions from '../serverFunctions/estate';
import {MyContext} from '../components/provider';
import {EstateFormVali, CheckData, FormValid, EstateFormValiMsg} from './checkData';
import {StatusAlert, ValidationMsg} from './appAlerts';

function EstateForm(props) {


  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [estate, setEstate] = React.useState(props.data);
  const [deletedPicNames, setDeletedPicNames] = React.useState([]);

  const handelUpdateform = React.useCallback(() => {
        if(props.type==='Update' && props.data.category._id){
    setEstate((prevEstate) => {
     return {
        ...prevEstate,
          "category": props.data.category._id,
          "type":props.data.type._id
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


    const submitEstate = async (event) =>{
      event.preventDefault();
      event.target.pic.files = fileValue();
      let subVali = FormValid(validation,msg);
      if(subVali.length > 0){
        ValidationMsg(subVali);
        return;
      }
      const formData = new FormData(event.target);
        formData.append('sellerId',estate.sellerId);
        estate.addressOnMap.forEach(element =>{formData.append('addressOnMap',element);});
          if(props.type !== 'Add'){
                formData.append('_id',estate._id);
                formData.append('deletedPicNames',deletedPicNames);
            const Status = await serverFunctions.updateEstate(formData);
              if(Status ==='error'){
                 StatusAlert("error");
               }else{
                 handleClose();
                 props.handleClose("compare",false)
                 props.updateData("delete", estate._id);
                 StatusAlert('Updated');
               }
              }else{
                const Status = await serverFunctions.addEstate(formData);
                if(Status ==='error'){
                   StatusAlert("error");
                 }else{
                   handleClose();
                   StatusAlert('Added');
                 }
            }
    }

  function handleChange(event) {
    let name = event.target.name;
     let value=  name ==="contract"? event.target.files[0]: event.target.value
    setEstate((prevEstate) => {
     return {
        ...prevEstate,
          [name]:value
      };
    });
  }

function handlefile(event){
  let pic =  event.target.files;
  setEstate((prevEstate) => {
   return {
      ...prevEstate,
      "pic" :[
        ...prevEstate["pic"],
          ...pic,
      ]
    };
  });
}

function fileValue(event){
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
   setEstate((prevEstate) => {
    return {
       ...prevEstate,
         "pic":pic
     };
   });
   path && setDeletedPicNames((pre)=>{return [...pre,path]})
  };

  return (
    <MyContext.Consumer>{(context)=>{
            const check = CheckData([context.categoryAndType ==="error"?context.categoryAndType:context.categoryAndType.length]);
            if(check){
              return <Loading mood={check}/>
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
               < TextField name="category" color = {validation.Category}
               select label = "Select"
               required
               value = {
                estate.category
               }
               onChange = {
               handleChange
               }
               helperText = "Please select estate category" > {
               context.categoryAndType.category.map((option) => ( <
                MenuItem key = {
                  option._id
                }
                value = {
                  option._id
                } > {
                  option.name
                } <
                /MenuItem>
               ))
               } <
               /TextField>
                <
               TextField name="type" color = {validation.Type}
               select label = "Select"
               required
               value = {
                estate.type

               }
               onChange = {
               handleChange
               }
               helperText = "Please select estate type" > {
                context.categoryAndType.type.map((option) => ( <
                MenuItem key = {
                  option._id
                }
                value = {
                  option._id
                } > {
                  option.name
                } <
                /MenuItem>
               ))
               } <
               /TextField>
               <
               TextField  color = {validation.Size}
               type = "number"
               label = "Size"
               variant = "outlined"
               name="size"
               helperText = "Please enter size in meter square (&#13217;)"
               required
               onChange = {
               handleChange
               }
               value = {estate.size}
               / >
               <
               TextField
               color = {validation.floor}
               type = "number"
               name="floor"
               label = "floor"
               variant = "outlined"
               required
               helperText = "Please enter in which floor or number of floors if villa"
               onChange = {
               handleChange
               }
               value ={estate.floor}

               / >
               <
               TextField  color={validation.Number_Of_Rooms}
               type = "number"
               label = "Number of Rooms"
               variant = "outlined"
               name="numOfRooms"
               required
               onChange = {
               handleChange
               }
               value = {estate.numOfRooms}
               / >
               <
               TextField color = {validation.Number_Of_BathRooms}
               type = "number"
               label = "Number of Bathrooms"
               variant = "outlined"
               name = "numOfBathRooms"
               required
               onChange = {
               handleChange
               }
               value = {estate.numOfBathRooms}
               / >
               <div>
               <label>
                 <Input name = "pic"  onChange = {
                 handlefile
                 } multiple type="file" />
               <Button variant="outlined" color = {validation.Images} component="span"> <CameraAltOutlined />
                 </Button> Upload Estate Images
               </label>
               <Stack sx={{mt:2}} spacing={1}>
                {  estate.pic.map((e , index)=>{
                    return(  <Chip  key={e.name} label={e.name.substring(0, 7) + "...."} variant="outlined" onDelete={()=>handleDelete(index ,e.path)} />);
                  })}
              </Stack>
              </div>

               <div>
                <label>
                  <Input  name = "contract"  onChange = {handleChange} type="file" />
                  <Button variant="outlined" color = {validation.Contract} component="span"> <CameraAltOutlined />
                 </Button> Upload Estate Contract
               </label>
               <Stack sx={{mt:2}} spacing={1}>
              {estate.contract && <Chip key={estate.contract.name} label={estate.contract.name}
               variant="outlined" onDelete={()=>setEstate((prevEstate) => {
                return {...prevEstate,"contract":null};})} />
              }

              </Stack>
             </div>

               <
               TextField color = {validation.Description}
               label = "Description"
               name = "desc"
               required
                 helperText = "Please describe the estate, neighborhood and any constraints"
               onChange = {
               handleChange
               }
               value = {estate.desc}
               multiline maxRows = {
               4
               }
               variant = "outlined" / >
               <
               TextField
               color = {validation.Price}
               type = "number"
               name="price"
               label = "Price"
               variant = "outlined"
               required
               helperText = "Please enter price in dollar"
               onChange = {
               handleChange
               }
               value ={estate.price}
               / >

               <EstateFormSubmitBtn>
                 <
                 TextField color = {validation.Address}
                 label = "Address"
                 variant = "outlined"
                 name = "address"
                 fullWidth
                 required
                  helperText = "Please enter the estate address and mark it on map"
                 onChange = {
                 handleChange
                 }
                 value = {estate.address}/ >
                 <MyMap Change={handleChange} Location={estate.addressOnMap} />
                 </EstateFormSubmitBtn>
               <EstateFormSubmitBtn>
                 <Button type="submit"  color="success" variant="outlined" startIcon={<SaveIcon />}>
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
    data :  {
      sellerId: "61a81506d4c8835ca4a20610",
        numOfRooms: "",
        numOfBathRooms: "",
        floor:"",
        size: "",
        desc: "",
        address: "",
        price: "",
        type:"",
        category:"",
        addressOnMap: [30.044417093043883 ,31.235753400264315],
        contract:null,
        pic: []
    },
  type:"Add"
}
