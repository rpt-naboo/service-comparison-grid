import React from 'react';

const StandardDataListing = (props) => {
  console.log(props)
  return (
    <tbody>
      <tr>
        <th>TODO</th>
      </tr>
      <tr>
        <th>{props.product.name}</th>
      </tr>
      <tr>
        <th>TODO</th>
      </tr>
      <tr>
        <th>{props.product.customer_rating}</th>
      </tr>
      <tr>
        <th>{props.product.price}</th>
      </tr>
      <tr>
        <th>{props.product.shipping_cost}</th>
      </tr>
      <tr>
        <th>{props.product.sold_by}</th>
      </tr>
    </tbody>
  )
}

export default StandardDataListing;