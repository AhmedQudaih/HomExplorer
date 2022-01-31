import React from 'react';
import Search from '../components/search.js';
import Services from '../components/services';
import serverFunctions from '../serverFunctions/estate'
function Products() {
  const [data, setData] = React.useState(false);
  const FilterData = async (formData) => {
    console.log(formData)

    let data = {};
    if (formData.desc.length > 0 || formData.address.length > 0) {
      data.text = formData.address.concat(' ').concat(formData.desc);
    }
    for (const [key, value] of Object.entries(formData)) {
      if (key === "desc" || key === "address") {
        continue;
      }
      if (value.length !== 0) {
        if (key === "size" || key === "price") {
          if (value[1] === 0) {
            continue;
          }
        }
        data[key] = value;
      }
    }

    if(Object.values(data).length === 0){
    return setData(false);}

    let res = await serverFunctions.searchData(data);
    setData(res);
  }

  return (<div>
    <Search filterFunc={FilterData}/>
    <Services ID="services" from=" Services" Data={data}/>
  </div>)
}

export default Products;
