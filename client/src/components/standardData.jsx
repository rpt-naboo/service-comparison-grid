import React from 'react';
import StandardDataListing from './standardDataListing.jsx';

const StandardData = (props) => {
  console.log(props)
  return (
    <table className="productDataTable">
      <thead>
        <tr>
          <th></th>
            {props.products.map(function(product) {
              return <td><img className='productIMG' src='https://images-na.ssl-images-amazon.com/images/G/01/amazonui/loading/loading-4x._CB391853216_.gif' /></td>
            })}
        </tr>
        <tr>
          <th></th>
            {props.products.map(function(product, index) {
              if (index === 0) {
                return <td className='productName'><span className='thisProduct'>This Product </span>{product.name}</td>
              } else {
                return <td>{product.name}</td>
              }
            })}
        </tr>
        <tr>
          <th></th>
            {props.products.map(function(product) {
              return <td><button className='ATCButton'>ADD TO CART</button></td>
            })}
        </tr>
        <tr>
          <th className='heading'>RATING</th>
            {props.products.map(function(product) {
              return <td className='productInfo'>{product.customer_rating}</td>
            })}
        </tr>
        <tr>
          <th className='heading'>PRICE</th>
            {props.products.map(function(product) {
              return <td className='price'>{product.price}</td>
            })}
        </tr>
        <tr>
          <th className='heading'>SHIPPING</th>
            {props.products.map(function(product) {
              return <td className='productInfo'>{product.shipping_cost}</td>
            })}
        </tr>
        <tr>
          <th className='heading'>SOLD BY</th>
            {props.products.map(function(product) {
              return <td className='productInfo'>{product.sold_by}</td>
            })}
        </tr>
      </thead>
    </table>
  )
}

export default StandardData;