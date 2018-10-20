import React from 'react';

const StandardDataListing = (props) => {
  console.log(props)
  return (
    <span>{props.product.name}</span>
  )
}

export default StandardDataListing;