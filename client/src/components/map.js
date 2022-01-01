import React from "react";
import { Map, Marker } from "pigeon-maps";

const style = {
  height:"30rem",
  margin: "3.5rem",

}

function MyMap(props){
  const handleChange = (event) => {
    event.target = {name : "addressOnMap" ,value :event.latLng};
    props.Change(event);
  };
  return(
    <div style={style}>
    <Map onClick={handleChange} defaultCenter={props.Location} defaultZoom={11}>
       <Marker width={50} anchor={props.Location} />
     </Map>
   </div>
  );
}

export default MyMap;
MyMap.defaultProps= {
  Change: ()=>{
    return null;
  }
}
