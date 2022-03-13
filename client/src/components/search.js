import React, {useState} from 'react';
import Img from '../images/productMainImg.jpg';
import {  MainBg ,ImgBg} from './Styles/mainElementsStyle';
import { ProductMainH1,SearchMainContainer,CollapseDiv ,SearchMainContent,CollapseBtn  } from './Styles/searchElementsStyle';
import { Slider ,Button,Typography} from '@mui/material';
import {Search as SearchIcon, ExpandMore as ExpandMoreIcon, ExpandLess as ExpandLessIcon} from '@material-ui/icons';
import Loading from './loading';
import {MyContext} from '../components/provider';
import {CheckData} from './checkData';
import {DropDownLists, FormInputs} from './formInputs';
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
        const validation = CheckData([context.categoryAndType ==="error"?context.categoryAndType:context.categoryAndType.length]);

    return (
        <SearchMainContainer>
            <MainBg>
                <ImgBg src={Img}/>
            </MainBg>
             <SearchMainContent>
               <ProductMainH1>Home Explorer</ProductMainH1>
               {validation ?  <ProductMainH1><Loading mood={validation} /></ProductMainH1>:<>
               <FormInputs validation={"success"} type={"text"}  helperText={""} label = {"Address"} name = {"address"}  handleChange = { handleChange } value = {searchData.address} />
                 <DropDownLists name={"category"} handleChange={handleChange} helperText={""} validation={"success"} value={searchData.category} options={context.categoryAndType.category}/>
                 <DropDownLists name={"type"} handleChange={handleChange} helperText={""} validation={"success"} value={searchData.type} options={context.categoryAndType.type}/>



              <Button id="SearchBtn" variant="contained" color = {"success"} onClick={()=>{props.filterFunc(searchData)}} >
              <SearchIcon />
              </Button>


  <Button variant="outlined" color = {"success"} style={CollapseBtn} component="span" onClick={handleExpandClick}>
  {expandSearch?<ExpandLessIcon />:<ExpandMoreIcon />}
    </Button>
    {expandSearch &&
                <CollapseDiv >
                  <FormInputs validation={"success"} type={"text"}  helperText={""} label = {"Search with Key Words"} name = {"desc"}  handleChange = { handleChange } value = {searchData.desc} />
                    <FormInputs validation={"success"} type={"number"} helperText={""} label = {"Number Of Rooms"} name = {"numOfRooms"}  handleChange = { handleChange } value = {searchData.numOfRooms} />
                      <FormInputs validation={"success"} type={"number"} helperText={""} label = {"Number Of Bathrooms"} name = {"numOfBathRooms"}  handleChange = { handleChange } value = {searchData.numOfBathRooms} />
                        <FormInputs validation={"success"} type={"number"} helperText={"Please enter in which floor or number of floors if villa"} label = {"Floor"} name = {"floor"}  handleChange = { handleChange } value = {searchData.floor} />

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
      </>}
    </SearchMainContent>
        </SearchMainContainer>)
      }}</MyContext.Consumer>
    )
}

export default Search;
