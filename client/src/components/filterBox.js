import React from 'react';
import {Box,ToggleButton ,ToggleButtonGroup } from '@mui/material';


const FilterBox = (props)=>{
  return(
    <Box sx={{
      m: "2%",
      padding: "0.5%",
      backgroundColor: 'white',
      borderRadius: "1rem"
        }}>
    <ToggleButtonGroup
      color="primary"
      value={props.value}
      exclusive
      onChange={props.onChange}>
      {
        props.options.map((e, i)=>(
          <ToggleButton key={e.value+i} value={e.value}>{e.title}</ToggleButton>
        ))
      }
</ToggleButtonGroup>
</Box>
  );
}

export default FilterBox;
