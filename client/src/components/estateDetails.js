import React from 'react';
import {Button} from '@mui/material';
import EstateForm from './estateForm';
import MyMap from './map';
import {
  LocalOffer as LocalOfferIcon,
  LocationOnSharp as LocationOnSharpIcon,
  Home as VillaIcone,
  Apartment as ApartmentIcon,
  Delete as DeleteIcon,
  LocalHotel as LocalHotelIcon,
  Bathtub as BathtubIcon,
  FullscreenExit as FullscreenExitIcon,
  FavoriteIcon as FavoriteIcon,
  FavoriteBorderIcon as unFavoriteIcon,
} from "@material-ui/icons";
import {
  ExpandedIconDetailsCard,
  DetailsBtnCard
} from './Styles/estateDetailsStyle';
import {EstateCardDiv} from './Styles/estateCardStyle';
import serverFunctions from '../serverFunctions/estate'
function EstateDetails(props){
  const [favourites, setFavourites] = React.useState([]);
  //here to add estate list 

  const handelDeleteBtn = async (id) => {
        const Status = await serverFunctions.deleteEstate(id);
          Status ==='error'? alert(`Somthing went wrong try again later`):props.updateData();
  }

const addFavourite = (estate) => {
  const newFavouriteList = [...favourites, estate];
  setFavourites(newFavouriteList);
  
};

const removeFavourite = (estate) => {
  const newFavouriteList = favourites.filter(
    (favourite) => favourite.date._id !== estate.data._id
  );

  setFavourites(newFavouriteList);
};

  return(
    <div>
    <ExpandedIconDetailsCard>
      <EstateCardDiv>
       <VillaIcone fontSize='large'/>
        <p>
          {props.data.category.name}
        </p>
      </EstateCardDiv>
      <EstateCardDiv>
        <FullscreenExitIcon fontSize='large' />
        <p>
          {props.data.size}
        </p>
      </EstateCardDiv>
      <EstateCardDiv>
        <ApartmentIcon fontSize='large' />
        <p>
        {props.data.category.name === "Apartment" ? "on the " + props.data.floor+" floor" : props.data.floor +" floors"}
        </p>
      </EstateCardDiv>

      <EstateCardDiv>
        <LocalHotelIcon fontSize='large'/>
        <p>{props.data.numOfRooms}
        </p>
      </EstateCardDiv>
      <EstateCardDiv>
        <BathtubIcon fontSize='large' />
        <p>
          {props.data.numOfBathRooms}
        </p>
      </EstateCardDiv>
      <EstateCardDiv>
        <LocalOfferIcon fontSize='large' />
        <p> {props.data.type.name}</p>
      </EstateCardDiv>
    </ExpandedIconDetailsCard>
    <EstateCardDiv>
      <LocationOnSharpIcon  fontSize='large'/>
      <p>{props.data.address}</p>
    </EstateCardDiv>

    <MyMap Location={[props.data.addressOnMap[0],props.data.addressOnMap[1]]} />

    <DetailsBtnCard>
      <Button color="error" onClick={()=>handelDeleteBtn(props.data._id)} variant="outlined" startIcon={<DeleteIcon />}>
        Delete
      </Button>
      <EstateForm updateData={props.updateData} type={"Update"} data={props.data}/>
  </DetailsBtnCard >
  <DetailsBtnCard>
  <div >
    {props.favorite ?
      <Button onClick={removeFavourite(props.data)} color="success" variant="outlined" startIcon={<unFavoriteIcon />}>
      remove from favorite
      </Button>:
       <Button onClick={addFavourite(props.data)} color="error" variant="outlined" startIcon={<FavoriteIcon />}>
         Add to Favorite
       </Button> 
        
         
       
     }
   </div> 
  </DetailsBtnCard>
</div>
  );
}

export default EstateDetails
