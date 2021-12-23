import React from 'react';
import {
  EstateMainForm,
  EstateFormTitle,
  EstateFormClose,
  EstateFormSubmitBtn,
  EstateFormAnimation
} from './Styles/estateFormStyle';
import MyMap from './map';
import {Button, MenuItem ,TextField , Dialog ,DialogContent} from '@mui/material';
import Loading from './loading';
import { AddCircleOutline as AddCircleOutlineIcon ,Cached as CachedIcon, Save as SaveIcon , Close as CloseIcon} from "@material-ui/icons";
function EstateForm(props) {

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

const data =  {
  sellerId: "61a81506d4c8835ca4a20610",
    details: {
        numOfRooms: "",
        numOfBathRooms: "",
        size: "",
        desc: ""
    },
    address: "",
    price: "",
    type: "",
    category: "",
    addressOnMap: [30.044417093043883 ,31.235753400264315],
    contract: [],
    pics: []
}
if(props.data){
  data._id = props.data._id;
  data.details.numOfBathRooms = props.data.details.numOfBathRooms;
  data.details.numOfRooms = props.data.details.numOfRooms;
  data.details.size = props.data.details.size;
  data.details.desc = props.data.details.desc;
  data.address= props.data.address;
  data.price= props.data.price;
  data.category= props.data.category._id;
  data.type= props.data.type._id;
  data.addressOnMap= props.data.addressOnMap;
  data.contract= props.data.contract;
  data.pics= props.data.pics;

}
const [estate, setEstate] = React.useState(data);
const [category, setCategory] = React.useState([]);
const [type, setType] = React.useState([]);


React.useEffect(() => {
  fetch('http://localhost:4000/getCategoryAndType').then(response => {
    if (response.ok) {
      return response.json();
    }
    throw response;
  }).then(data => {
    setCategory(data["category"]);
    setType(data["type"]);
  }).catch(error => {
    console.error("Error fetching data: ", error);
  })
}, [])

  function handleChange(event) {
    const { name, value } = event.target;
    setEstate((prevEstate) => {
     return {
        ...prevEstate,
          [name]:value
      };
    });
  }
  function handleDetailsChange(event) {
    const { name, value } = event.target;
    setEstate((prevEstate) => {
     return {
        ...prevEstate,
        details :{
          ...prevEstate.details,
          [name]:value
        }
      };
    });
  }
/*-------------------------------------------------------------------*/


  function submitEstate(event) {
    if(props.data){
      const requestOptions = {
             method: 'put',
             headers: { 'Content-Type': 'application/json' },
             body: JSON.stringify(estate)
         };
      fetch("http://localhost:4000/updateEstate",requestOptions).then(response => {
        if (response.ok) {
          return response.json();
        }
        throw response;
      }).then(data => {
      console.log(data);
      }).catch(error => {
        console.error("Error fetching data: ", error);
      })
    }else{
      const requestOptions = {
             method: 'POST',
             headers: { 'Content-Type': 'application/json' },
             body: JSON.stringify(estate)
         };
      fetch("http://localhost:4000/addEstate",requestOptions).then(response => {
          if (response.ok) {
            return response.json();
          }
          throw response;
        }).then(data => {
        console.log(data);
        }).catch(error => {
          console.error("Error fetching data: ", error);
        })
    }

      event.preventDefault();
  }


function handlefile(event){
  console.log(event.target.files);
  let pic =  event.target.files[0];
  setEstate((prevEstate) => {
   return {
      ...prevEstate,
      pics :[
        ...prevEstate.pics,
        pic
      ]
    };
  });

}


console.log(estate);


  if (category.length === 0 || type.length ===0) {
    return (
      <Loading/>
    );
  }
  return (
    <div >
    {props.data ?
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
               <EstateMainForm >
               < TextField name="category" color = "success"
               select label = "Select"
               value = {
               estate.category
               }
               onChange = {
               handleChange
               }
               helperText = "Please select estate category" > {
               category.map((option) => ( <
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
               /TextField> <
               TextField name="type" color = "success"
               select label = "Select"
               value = {
               estate.type
               }
               onChange = {
               handleChange
               }
               helperText = "Please select estate type" > {
               type.map((option) => ( <
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
               TextField color = "success"
               type = "number"
               name="price"
               label = "Price"
               variant = "outlined"
               onChange = {
               handleChange
               }
               value ={estate.price}

               / >
               <
               TextField color = "success"
               type = "number"
               label = "Size"
               variant = "outlined"
               name="size"
               onChange = {
               handleDetailsChange
               }
               value = {estate.details.size}
               / >
               <
               TextField color = "success"
               type = "number"
               label = "Number of Rooms"
               variant = "outlined"
               name="numOfRooms"
               onChange = {
               handleDetailsChange
               }
               value = {estate.details["numOfRooms"]}
               / >
               <
               TextField color = "success"
               type = "number"
               label = "Number of Bathrooms"
               variant = "outlined"
               name = "numOfBathRooms"
               onChange = {
               handleDetailsChange
               }
               value = {estate.details["numOfBathRooms"]}
               / >
               <
               TextField color = "success"
               label = "pics"
               type = "file"
               onChange = {
               handlefile
               }
               InputLabelProps = {
               {
                shrink: true,
               }
               }
               /> <
               TextField color = "success"
               label = "contract"
               type = "file"
               onChange = {
               handlefile
               }
               InputLabelProps = {
               {
                shrink: true,
               }
               }
               />
               <
               TextField color = "success"
               label = "Description"
               name = "desc"
               onChange = {
               handleDetailsChange
               }
               value = {estate.details["desc"]}
               multiline maxRows = {
               4
               }
               variant = "outlined" / >
               <
               TextField color = "success"
               label = "Address"
               variant = "outlined"
               name = "address"
               onChange = {
               handleChange
               }
               value = {estate.address}/ >
               <EstateFormSubmitBtn>
                 <MyMap Change={handleChange} Location={estate.addressOnMap} />
                 </EstateFormSubmitBtn>
               <EstateFormSubmitBtn>
                 <Button type="submit"onClick={submitEstate} color="success" variant="outlined" startIcon={<SaveIcon />}>
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
