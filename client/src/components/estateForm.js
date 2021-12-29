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



function EstateForm(props) {


  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [estate, setEstate] = React.useState(props.data);
  const [CategoryAndType, setCategoryAndType] = React.useState([]);
  const [deletedPicNames, setDeletedPicNames] = React.useState([]);

  if(props.type==='Update' && props.data.category._id && open){
  props.data.category = props.data.category._id
    props.data.type = props.data.type._id


  }


    React.useEffect(() => {
      const fetchData = async ()=>{
      const data = await serverFunctions.getCategoryAndType();
      setCategoryAndType(data);
    }
      fetchData();
    },[])


 function valid(){

   let msg =""
     Object.entries(validation).forEach(([key, value]) => {
       (value === "error") && (msg=msg+"  "+key)});
      if(msg.length !==0){
        alert(`Please check the (${msg}) input`);
        return false;
      }
      return true;

 }
    const submitEstate = async (event) =>{
      event.preventDefault();
      event.target.pic.files = fileValue();
      if(!valid()){
        return;
      }
        const formData = new FormData(event.target);
          formData.append('sellerId',estate.sellerId);
          estate.addressOnMap.forEach(element =>{
              formData.append('addressOnMap',element);
            });

            if(props.type !== 'Add'){
                formData.append('_id',estate._id);
                    formData.append('deletedPicNames',deletedPicNames);
              const Status = await serverFunctions.updateEstate(formData);
                Status ==='error'? alert(`Somthing went wrong try again later`): props.updateData();
            }else{
                const Status = await serverFunctions.addEstate(formData);
                  Status ==='error'? alert(`Somthing went wrong try again later`):handleClose();
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

  let validation ={};
  validation.Price = estate.price > 0 && estate.price < 200000000?"success":"error";
  validation.Number_Of_Rooms = estate.numOfRooms > 0 && estate.numOfRooms < 30  ? "success":"error";
  validation.Number_Of_BathRooms= estate.numOfBathRooms > 0 && estate.numOfBathRooms < 30  ? "success":"error";
  validation.Size= estate.size > 0 && estate.size < 10000?"success":"error" ;
  validation.Description= estate.desc.length > 30 ?"success":"error" ;
  validation.Address= estate.address.length > 4 ?"success":"error";
  validation.Type= estate.type.length > 0 ?"success":"error";
  validation.Category= estate.category.length > 0 ?"success":"error";
  validation.Contract= estate.contract !== null ?"success":"error";
  validation.Images= estate.pic.length > 0 ?"success":"error";


  const handleDelete = (index ,path) => {
     estate.pic.splice(index,1);
   setEstate((prevEstate) => {
    return {
       ...prevEstate,
         "pic":estate.pic
     };
   });
   path && setDeletedPicNames((pre)=>{return [...pre,path]})
  };

  if (CategoryAndType.length === 0) {
    return (
      <Loading/>
    );
  }
  return (
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
               CategoryAndType.category.map((option) => ( <
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
                CategoryAndType.type.map((option) => ( <
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
               TextField color = {validation.Address}
               label = "Address"
               variant = "outlined"
               name = "address"
               multiline
               required
                helperText = "Please enter the estate address and mark it on map"
               onChange = {
               handleChange
               }
               value = {estate.address}/ >
               <EstateFormSubmitBtn>
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
  );
}

export default EstateForm;
EstateForm.defaultProps = {
    data :  {
      sellerId: "61a81506d4c8835ca4a20610",
        numOfRooms: "",
        numOfBathRooms: "",
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
