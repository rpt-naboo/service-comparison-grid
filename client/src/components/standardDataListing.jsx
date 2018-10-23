import React from 'react';

const StandardDataListing = (props) => {
  console.log(props)
  return (
    <tbody>
      <tr>
        <th>TODO</th>
        <th>{props.product.name}</th>
        <th>TODO</th>
        <th>{props.product.customer_rating}</th>
        <th>{props.product.price}</th>
        <th>{props.product.shipping_cost}</th>
        <th>{props.product.sold_by}</th>
      </tr>
    </tbody>
  )
}

export default StandardDataListing;