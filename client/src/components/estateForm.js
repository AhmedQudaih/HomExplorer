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
import {Button, MenuItem ,TextField , Dialog ,DialogContent} from '@mui/material';
import Loading from './loading';
import {CameraAltOutlined , AddCircleOutline as AddCircleOutlineIcon ,Cached as CachedIcon, Save as SaveIcon , Close as CloseIcon} from "@material-ui/icons";
function EstateForm(props) {

  if(props.type==='Update' && props.data.category._id){
  props.data.category = props.data.category._id
    props.data.type = props.data.type._id
  }

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [estate, setEstate] = React.useState(props.data);
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

/*-------------------------------------------------------------------*/

  function submitEstate(event) {

    const formData = new FormData(event.target);
      estate.addressOnMap.forEach(element =>{
          formData.append('addressOnMap',element);
        });

    if(props.type !== 'Add'){
      const requestOptions = {
             method: 'put',
             body: formData
         };
      fetch("http://localhost:4000/updateEstate",requestOptions).then(response => {
        if (response.ok) {
          return response.json();
        }
        throw response;
      }).then(data => {
      }).catch(error => {
        console.error("Error fetching data: ", error);
      })
    }else{

      const requestOptions = {
             method: 'POST',
             body: formData
         };
      fetch("http://localhost:4000/addEstate",requestOptions).then(response => {
          if (response.ok) {
            return response.json();
          }
          throw response;
        }).then(data => {
        }).catch(error => {
          console.error("Error fetching data: ", error);
        })
    }
        event.preventDefault();
  }

  /*-------------------------------------------------------------------*/


  function handleChange(event) {
    const { name, value } = event.target;
    setEstate((prevEstate) => {
     return {
        ...prevEstate,
          [name]:value
      };
    });
  }

function handlefile(event){
  let name = event.target.name;
  let pic =  event.target.files;
  setEstate((prevEstate) => {
   return {
      ...prevEstate,
      [name] :[
        ...prevEstate[name],
          pic,
      ]
    };
  });
}

/*-------------------------------------------------------------------*/

  if (category.length === 0 || type.length ===0) {
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
               /TextField>


                <
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
               handleChange
               }
               value = {estate.size}
               / >
               <
               TextField color = "success"
               type = "number"
               label = "Number of Rooms"
               variant = "outlined"
               name="numOfRooms"
               onChange = {
               handleChange
               }
               value = {estate.numOfRooms}
               / >
               <
               TextField color = "success"
               type = "number"
               label = "Number of Bathrooms"
               variant = "outlined"
               name = "numOfBathRooms"
               onChange = {
               handleChange
               }
               value = {estate.numOfBathRooms}
               / >

               <label>
                 <Input name = "pics"  onChange = {
                 handlefile
                 } multiple type="file" />
                 <Button variant="outlined" color={'success'} component="span"> <CameraAltOutlined />
                 </Button> Upload Estate Images
               </label>
                <label>
                  <Input  name = "contract"  onChange = {handlefile} type="file" />
                  <Button variant="outlined" color={'success'} component="span"> <CameraAltOutlined />
                 </Button> Upload Estate Contract
               </label>
               <
               TextField color = "success"
               label = "Description"
               name = "desc"
               onChange = {
               handleChange
               }
               value = {estate.desc}
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
                 <input name="sellerId" hidden readOnly value={estate.sellerId} />
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
        contract: [],
        pics: []
    },
  type:"Add"
}

/*{      <label >Select files:
 <Button variant="outlined" color={'success'} component="span">
      <input   name = "pics" multiple  onChange = {
       handlefile
     } type="file" />upload images
  </Button></label>


  <label >Select files:
  <Button variant="outlined" color={'success'} component="span">
      <input   type="file" />upload contract
  </Button></label>
}*/
