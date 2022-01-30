import React from 'react';
import Search from '../components/search.js';
import Services from '../components/services';
import serverFunctions from '../serverFunctions/estate'
function Products() {
const [data, setData] = React.useState(false);
    const FilterData = async (formData) => {
          let res = await serverFunctions.searchData(formData);
          setData(res);
    }

    return (
        <div>
          <Search filterFunc={FilterData}/>
          <Services ID="services" from=" Services" Data={data}/>
        </div>
    )
}

export default Products;
