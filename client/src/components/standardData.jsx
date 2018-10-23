import React from 'react';
import StandardDataListing from './standardDataListing.jsx';

const StandardData = (props) => {
  console.log(props)
  return (
    <table className="productDataTable">
      <thead>
        <tr>
          <th>PICTURE</th>
          <th>NAME</th>
          <th>ADD TO CART</th>
          <th>RATING</th>
          <th>PRICE</th>
          <th>SHIPPING</th>
          <th>SOLD BY</th>
        </tr>
      </thead>
      {props.products.map(function(product) {
        return <StandardDataListing product={product}/>
      })}
    </table>
  )
}

export default StandardData;