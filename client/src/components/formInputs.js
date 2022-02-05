
import React from "react"
import {MenuItem ,TextField } from '@mui/material';

const DropDownLists = (props) =>{
  return(
    < TextField name={props.name} color = {props.validation}
    select label = "Select"
    required
    value = {props.value }
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
    required
    onChange = {props.handleChange}
    value = {props.value}
    / >
  );
}

const FormFullWidthInput = (props) =>{
  return(
    <
    TextField color = {props.validation}
    label = {props.label}
    variant = "outlined"
    name = {props.name}
    fullWidth
    required
      helperText = {props.helperText}
     onChange = {props.handleChange}
     value = {props.value}/ >
  )
}

const FormMultiLineInput = (props) =>{
  return(
    <
    TextField color = {props.validation}
    label = {props.label}
    variant = "outlined"
    name = {props.name}
    multiline maxRows = {props.multiline}
    required
      helperText = {props.helperText}
     onChange = {props.handleChange}
     value = {props.value}/ >
  )
}




export { DropDownLists, FormInputs, FormFullWidthInput, FormMultiLineInput }
