import React from "react";
import { Map, Marker } from "pigeon-maps";

function MyMap(props){
  function handleChange(event){
    event.target = {name : "addressOnMap" ,value :event.latLng};
    props.Change(event);
  };
  return(
    <Map onClick={handleChange} height={300} defaultCenter={props.Location} defaultZoom={11}>
       <Marker width={50} anchor={props.Location} />
     </Map>
  );
}

export default MyMap;
