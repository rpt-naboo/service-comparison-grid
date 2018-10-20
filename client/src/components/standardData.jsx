import React from 'react';
import StandardDataListing from './standardDataListing.jsx';

const StandardData = (props) => {
  console.log(props)
  return (
    <div>
      {props.products.map(function(product) {
        return <StandardDataListing />
      })}
    </div>
  )
}

export default StandardData;