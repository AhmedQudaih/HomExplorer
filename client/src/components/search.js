import React, {useState} from 'react';
import Img from '../images/productMainImg.jpg';
import {  MainBg ,ImgBg} from './Styles/mainElementsStyle';
import { ProductMainH1,MainContainer,CollapseDiv ,MainContent,CollapseBtn  } from './Styles/searchElementsStyle';
import { TextField ,Slider ,Button,MenuItem,Typography} from '@mui/material';
import {Search as SearchIcon, ExpandMore as ExpandMoreIcon, ExpandLess as ExpandLessIcon} from '@material-ui/icons';
import Loading from './loading';
import {MyContext} from '../components/provider';


function Search(props) {

  const data = {
        numOfRooms: "",
        numOfBathRooms: "",
        floor:"",
        size: [0,0],
        desc: "",
        address: "",
        price:[0,0],
        type:"",
        category:""
    };

    const [searchData, setSearchData] = useState(data);
    const [expandSearch, setExpandSearch] = useState(false);


  const handleExpandClick = () => {
    setExpandSearch((pre)=>{
      return !pre;
    })
  }

  const handleChange = (event) => {
    const  { name, value }  = event.target;
    setSearchData((pre)=>{
      return{
        ...pre,
        [name]:value
      }
    })
  }


  const handleSlider = (event, newValue, activeThumb) => {

      if (activeThumb === 0) {
        event.target.value = [Math.min(newValue[0], searchData[event.target.name][1] ), searchData[event.target.name][1]];
        handleChange(event)
      } else {
        event.target.value = [searchData[event.target.name][0], Math.max(newValue[1], searchData[event.target.name][0] )];
        handleChange(event)
      }
    };

return(

  <MyContext.Consumer>{
      (context) => {

  if (context.categoryAndType === false || context.categoryAndType === "error" ) {
    return (
      <Loading/>
    );
  }
    return (
        <MainContainer>
            <MainBg>
                <ImgBg src={Img}/>
            </MainBg>
            <MainContent>

                <ProductMainH1>Home Explorer</ProductMainH1>

                <
                TextField color = {"success"}
                label = "Address"
                variant = "outlined"
                name = "address"
                onChange = {
                handleChange
                }
                value = {searchData.address}
                 />

                 < TextField name="category" color = {"success"}
                 select label = "Select"
                 value = {
                  searchData.category
                 }
                 onChange = {
                 handleChange
                 }
               >

                 {
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
                 }


                 <
                 /TextField>
                  <
                 TextField name="type" color = {"success"}
                 select label = "Select"
                 value = {
                  searchData.type
                 }
                 onChange = {
                 handleChange
                 }
                > {
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

              <Button  variant="contained" color = {"success"} onClick={()=>{props.filterFunc(searchData)}} >
              <SearchIcon />
              </Button>


  <Button variant="outlined" color = {"success"} style={CollapseBtn} component="span" onClick={handleExpandClick}>
  {expandSearch?<ExpandLessIcon />:<ExpandMoreIcon />}
    </Button>
    {expandSearch &&
                <CollapseDiv >
                  <
                  TextField color = {"success"}
                  label = "Search with Key Words"
                  variant = "outlined"
                  name = "desc"
                  onChange = {
                  handleChange
                  }
                  value = {searchData.desc}
                  />
              <
              TextField
              color = {"success"}
              type = "number"
              name="numOfRooms"
              label = "Number Of Rooms"
              variant = "outlined"
              onChange = {
              handleChange
              }
              value = {searchData.numOfRooms}
              / >
              <
              TextField
              color = {"success"}
              type = "number"
              name="numOfBathRooms"
              label = "Number Of Bathrooms"
              variant = "outlined"
              onChange = {
              handleChange
              }
              value = {searchData.numOfBathRooms}
              / >
              <
              TextField
              color = {"success"}
              type = "number"
              name="floor"
              label = "floor"
              variant = "outlined"
              helperText = "Please enter in which floor or number of floors if villa"
              onChange = {
              handleChange
              }
              value = {searchData.floor}
              / >


      <Typography variant="h5" style={CollapseBtn} gutterBottom>
    Price range :{searchData.price[0]} to {searchData.price[1]}
              <Slider
                min={1}
                step={1000}
            max={200000000}
                name="price"
      getAriaLabel={() => 'Minimum distance'}
          value = {searchData.price}
        valueLabelDisplay="auto"
        disableSwap
        onChange = {
        handleSlider
        }
      />
      </Typography>

            <Typography variant="h5"  style={CollapseBtn} gutterBottom>
          Size range :{searchData.size[0]} to {searchData.size[1]}
                    <Slider
                      min={20}
                      step={100}
                  max={10000}
                      name="size"
            getAriaLabel={() => 'Minimum distance'}
                value = {searchData.size}
              valueLabelDisplay="auto"
              disableSwap
              onChange = {
              handleSlider
              }


            />
            </Typography>
      </CollapseDiv>
      }
            </MainContent>
        </MainContainer>)
      }}</MyContext.Consumer>
    )
}

export default Search;
