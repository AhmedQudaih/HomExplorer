import react from 'react';
import Rating from '@mui/material/Rating';
function RateEstate(props){
 const [value, setValue] = react.useState(0);
  return(

    <div
        >
          <p>Rate:</p>
          <Rating
            size="large"
            value={value}
            onChange={(event, newValue) => {
              setValue(newValue);
            }}
          />

        </div>

  );
};

export default RateEstate;
