import React from 'react';
import StandardDataListing from './standardDataListing.jsx';

const StandardData = (props) => {
  console.log(props)
  return (
    <table className="productDataTable">
      <thead>
        <tr>
          <th>PICTURE</th>
            {props.products.map(function(product) {
              return <td><img src='https://images-na.ssl-images-amazon.com/images/G/01/amazonui/loading/loading-4x._CB391853216_.gif' /></td>
            })}
        </tr>
        <tr>
          <th>NAME</th>
            {props.products.map(function(product) {
              return <td>{product.name}</td>
            })}
        </tr>
        <tr>
          <th>ADD TO CART</th>
            {props.products.map(function(product) {
              return <td><button>ADD TO CART</button></td>
            })}
        </tr>
        <tr>
          <th>RATING</th>
            {props.products.map(function(product) {
              return <td>{product.customer_rating}</td>
            })}
        </tr>
        <tr>
          <th>PRICE</th>
            {props.products.map(function(product) {
              return <td>{product.price}</td>
            })}
        </tr>
        <tr>
          <th>SHIPPING</th>
            {props.products.map(function(product) {
              return <td>{product.shipping_cost}</td>
            })}
        </tr>
        <tr>
          <th>SOLD BY</th>
            {props.products.map(function(product) {
              return <td>{product.sold_by}</td>
            })}
        </tr>
      </thead>
    </table>
  )
}

export default StandardData;