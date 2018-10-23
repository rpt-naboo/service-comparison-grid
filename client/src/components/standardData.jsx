import React from 'react';
import StandardDataListing from './standardDataListing.jsx';

const StandardData = (props) => {
  console.log(props)
  return (
    <table className="productDataTable">
      <thead>
        <tr>
          <th>PICTURE</th>
        </tr>
        <tr>
          <th>NAME</th>
          {props.products.map(function(product) {
            return <span>{product.name}</span>
          })}
        </tr>
        <tr>
          <th>ADD TO CART</th>
        </tr>
        <tr>
          <th>RATING</th>
        </tr>
        <tr>
          <th>PRICE</th>
        </tr>
        <tr>
          <th>SHIPPING</th>
        </tr>
        <tr>
          <th>SOLD BY</th>
        </tr>
      </thead>
    </table>
  )
}

export default StandardData;