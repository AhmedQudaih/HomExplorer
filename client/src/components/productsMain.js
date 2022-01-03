import React, {useState} from 'react';

import Img from '../images/productMainImg.jpg';
import { MainContainer, MainBg ,ImgBg} from './Styles/mainElementsStyle';
import { ProductMainH1,ProductMainP ,MainContent,SearchAndExpand  } from './Styles/productsMainElementsStyle';
import { TextField ,Slider, Collapse ,Button} from '@mui/material';
import {Search as SearchIcon, ExpandMore as ExpandMoreIcon, ExpandLess as ExpandLessIcon} from '@material-ui/icons';
function ProductsMain() {
const [expandSearch, setExpandSearch] = useState(false)
const handelExpandClick = () => {
  setExpandSearch((pre)=>{
    return !pre;
  })
}
    return (
        <MainContainer>
            <MainBg>
                <ImgBg src={Img}/>
            </MainBg>
            <MainContent>
                <ProductMainH1>Home Explorer</ProductMainH1>
  <div>
                <
                TextField color = {"success"}
                label = "Search"
                variant = "outlined"
                name = "Search" />

                < TextField name="category" color = {"success"}
                select label = "Select"
                helperText = "Please select estate category" >
                 < /TextField>
                 < TextField name="type" color = {"success"}
                select label = "Select"
                helperText = "Please select estate type" >
              </TextField>

              <Button variant="outlined" color = {"success"} >
              <SearchIcon />
                </Button>


  </div >
  <Button variant="outlined" color = {"success"} component="span" onClick={handelExpandClick}>
  {expandSearch?<ExpandLessIcon />:<ExpandMoreIcon />}
    </Button>
                <Collapse in={expandSearch} timeout="auto" unmountOnExit={true}>
                  <
                  TextField color = {"success"}
                  label = "Search with Key Words"
                  variant = "outlined"
                  name = "SearchKeyWords" />
              <
              TextField
              color = {"success"}
              type = "number"
              name="NumOfRooms"
              label = "Number Of Rooms"
              variant = "outlined"
              / >
              <
              TextField
              color = {"success"}
              type = "number"
              name="NumOfBathRooms"
              label = "Number Of Bathrooms"
              variant = "outlined"
              / >
              <
              TextField
              color = {"success"}
              type = "number"
              name="floor"
              label = "floor"
              variant = "outlined"
              helperText = "Please enter in which floor or number of floors if villa"
              / >

              <Slider
        getAriaLabel={() => 'Minimum distance'}
        valueLabelDisplay="auto"
        disableSwap
      />
              <Slider
        getAriaLabel={() => 'Minimum distance'}
        valueLabelDisplay="auto"
        disableSwap
      />
      </Collapse>
            </MainContent>
        </MainContainer>
    )
}

export default ProductsMain;
