import React, { useState } from "react";
import AddIcon from '@material-ui/icons/Add';
import { button } from "./Styles/addEstateStyle";

function AddEstate(props) {
  const [Estate, setEstate] = useState({
    HomeType: "",
    Price: "",
    Size: "",
    Room: "",
    Bathroom: "",
    ToBuy: "",
    Contract: "",
    Address: ""
  });

  function handleChange(event) {
    const { name, value } = event.target;

    setEstate((prevEstate) => {
      return {
        ...prevEstate,
        [name]: value
      };
    });
  }

  function submitEstate(event) {
    props.onAdd(Estate);
    setEstate({
      HomeType: "",
      Price: "",
      Size: "",
      Room: "",
      Bathroom: "",
      ToBuy: "",
      Contract: "",
      Address: ""
    });
    event.preventDefault();
  }

  return (
    <form className="create-Estate">
      <section className="form gridContainer">
        <div className="grid-item">
          <label name="HomeType">
            Home Type
            <select name="HomeType" onChange={handleChange}>
              <option value="Apartment"> Apartment</option>
              <option value="Land"> Land</option>
              <option value="House"> House</option>
              <option value="Building"> Building</option>
            </select>
          </label>
        </div>
        <div className="grid-item">
          <label name="Price" className="create-Estate-label">
            Price
          </label>
          <input
            type="number"
            className=" creete-Estate"
            min="0"
            max="100000000"
            step="10000"
            name="Price"
            onChange={handleChange}
            value={Estate.Price}
            placeholder="$"
          />
        </div>
        <div className="grid-item">
          <label name="size" className="create-Estate-label">
            Size
          </label>
          <input
            type="number"
            name="Size"
            onChange={handleChange}
            value={Estate.Size}
            placeholder="m^2"
          />
        </div>
        <div>
          <label>
            <select onChange={handleChange} name="ToBuy">
              <option value="To Buy"> To Buy</option>
              <option value="To Rent"> To Rent</option>
            </select>
          </label>
        </div>
        <div className="grid-item">
          <label>
            Bedrooms?
            <select name="Room" onChange={handleChange}>
              <option value="1 ">Bedroom +1 </option>
              <option value="2 ">Bedroom +2 </option>
              <option value="3 ">Bedroom +3 </option>
              <option value="4 ">Bedroom +4 </option>
              <option value="5 ">Bedroom +5 </option>
            </select>
          </label>
        </div>
        <div className="grid-item">
          <label>
            Bathrooms
            <select name="Bathroom" onChange={handleChange}>
              <option value="1 ">Bathroom +1 </option>
              <option value="2 ">Bathroom +2 </option>
              <option value="3 ">Bathroom +3 </option>
              <option value="4 ">Bathroom +4 </option>
              <option value="5 ">Bathroom +5 </option>
            </select>
          </label>
        </div>

        <div className="grid-item">
          <label name="Address">Address </label>
          <input
            name="Address"
            onChange={handleChange}
            value={Estate.Address}
            placeholder="ex:21st,Haram,Cairo"
          />
        </div>
        <div className="grid-item">
          <label name="Contract">insert Contract </label>
          <input
            type="file"
            name="Cotract"
            onChange={handleChange}
            value={Estate.Contract}
          />
        </div>
        <button onClick={submitEstate}>
          <AddIcon />
        </button>
      </section>
    </form>
  );
}

export default AddEstate;
