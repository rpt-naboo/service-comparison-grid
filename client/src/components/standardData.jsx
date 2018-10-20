import React from 'react';

const StandardData = (props) => {
  console.log(props)
  return (
    <div>
      {props.products.map(function(product) {
        <div>
          <div>PICTURE TODO</div>
          <div>{product.name}</div>
        </div>
      })}
    </div>
  )
}

export default StandardData;