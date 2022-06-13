
import React from "react"
import {MenuItem ,TextField } from '@mui/material';

const DropDownLists = (props) =>{
  return(
    < TextField name={props.name} color = {props.validation}
    select label = "Select"
    required
    value = {props.value }
    fullWidth={props.fullWidth||false}
    onChange = {props.handleChange}
    helperText = {props.helperText} >
    {
    props.options.map((option) => ( <
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
  );
}


const FormInputs = (props) =>{
  return(
    <
    TextField  color = {props.validation}
    type = {props.type}
    label = {props.label}
    variant = "outlined"
    name={props.name}
    helperText = {props.helperText}
    fullWidth={props.fullWidth||false}
      multiline = {props.multiline|| false}
    required
    onChange = {props.handleChange}
    value = {props.value}
    / >
  );
}





export { DropDownLists, FormInputs }
